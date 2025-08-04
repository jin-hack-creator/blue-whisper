import { useState, useEffect, useRef, memo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  Send, 
  MoreVertical, 
  Paperclip, 
  Smile,
  Phone,
  Video
} from "lucide-react";

interface ChatWindowProps {
  conversationId: string;
}

const fetchMessages = async (conversationId: string) => {
  const { data, error } = await supabase
    .from('messages')
    .select(`
      id,
      content,
      created_at,
      user_id,
      profile:profiles(username, avatar_url)
    `)
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data;
};

const fetchConversationDetails = async (conversationId: string) => {
  const { data, error } = await supabase
    .from('conversations')
    .select('name')
    .eq('id', conversationId)
    .single();
  if (error) throw error;
  return data;
}

const sendMessage = async ({ conversationId, content, userId }) => {
  const { data, error } = await supabase
    .from('messages')
    .insert([{ conversation_id: conversationId, content, user_id: userId }]);
  
  if (error) throw error;
  return data;
};

export const ChatWindow = memo(({ conversationId }: ChatWindowProps) => {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const queryClient = useQueryClient();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { data: session } = useQuery({ queryKey: ['session'], queryFn: () => supabase.auth.getSession() });

  const { data: messages, isLoading, error } = useQuery({
    queryKey: ['messages', conversationId],
    queryFn: () => fetchMessages(conversationId),
    enabled: !!conversationId,
  });

  const { data: conversationDetails } = useQuery({
    queryKey: ['conversationDetails', conversationId],
    queryFn: () => fetchConversationDetails(conversationId),
    enabled: !!conversationId,
  });

  const mutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', conversationId] });
    },
  });

  useEffect(() => {
    const channel = supabase.channel(`chat:${conversationId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `conversation_id=eq.${conversationId}` }, payload => {
        queryClient.invalidateQueries({ queryKey: ['messages', conversationId] });
      })
      .on('broadcast', { event: 'typing' }, (payload) => {
        if (payload.payload.user_id !== session?.data.session?.user.id) {
            setIsTyping(true);
            setTimeout(() => setIsTyping(false), 3000);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId, queryClient, session]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const handleTyping = () => {
    const channel = supabase.channel(`chat:${conversationId}`);
    channel.send({
        type: 'broadcast',
        event: 'typing',
        payload: { user_id: session?.data.session?.user.id },
    });
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && session?.data.session?.user.id) {
      mutation.mutate({ conversationId, content: message, userId: session.data.session.user.id });
      setMessage("");
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b border-border/50 bg-card/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {conversationDetails?.name?.charAt(0).toUpperCase() || 'C'}
                </AvatarFallback>
              </Avatar>
            </div>
            <div>
              <h3 className="font-medium">{conversationDetails?.name || 'Conversation'}</h3>
              {isTyping && <p className="text-sm text-muted-foreground">écrit...</p>}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Phone className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Video className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <p>Chargement des messages...</p>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-red-500">Erreur de chargement des messages</p>
            </div>
          ) : messages?.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-muted-foreground">Aucun message pour le moment</p>
            </div>
          ) : (
            messages?.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.user_id === session?.data.session?.user.id ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-end space-x-2 max-w-[70%] ${msg.user_id === session?.data.session?.user.id ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  {msg.user_id !== session?.data.session?.user.id && (
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={msg.profile?.avatar_url} alt={msg.profile?.username} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        {msg.profile?.username?.charAt(0)?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div className={`
                    px-4 py-2 rounded-2xl 
                    ${msg.user_id === session?.data.session?.user.id 
                      ? 'bg-primary text-primary-foreground rounded-br-md' 
                      : 'bg-secondary text-secondary-foreground rounded-bl-md'
                    }
                  `}>
                    <p className="text-sm">{msg.content}</p>
                    <p className={`text-xs mt-1 ${msg.user_id === session?.data.session?.user.id ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                      {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4 border-t border-border/50 bg-card/50">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <Button type="button" variant="ghost" size="sm">
            <Paperclip className="w-4 h-4" />
          </Button>
          
          <div className="flex-1 relative">
            <Input
              value={message}
              onChange={(e) => {
                setMessage(e.target.value)
                handleTyping()
              }}
              placeholder="Tapez votre message..."
              className="pr-10 bg-input border-border/50 focus:border-primary"
            />
            <Button 
              type="button" 
              variant="ghost" 
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              <Smile className="w-4 h-4" />
            </Button>
          </div>
          
          <Button 
            type="submit" 
            className="btn-gradient"
            disabled={!message.trim() || mutation.isPending}
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
});