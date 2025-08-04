import { useState, useMemo, memo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Plus, Menu, Users, User } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

interface ConversationsListProps {
  selectedConversation: string | null;
  onSelectConversation: (id: string) => void;
  onOpenSidebar: () => void;
}

const fetchConversations = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("User not logged in");

  const { data, error } = await supabase
    .from('conversations')
    .select(`
      id,
      name,
      participants:participants!inner(profile:profiles(id, username, avatar_url))
    `)
    .eq('participants.user_id', user.id);

  if (error) throw error;
  return data;
};

const fetchUsers = async () => {
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    if (!currentUser) throw new Error("User not logged in");

    const { data, error } = await supabase.from('profiles').select('id, username, avatar_url').neq('id', currentUser.id);
    if (error) throw error;
    return data;
};

const createPrivateConversation = async (otherUserId: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("User not logged in");

    const { data: existingConversations, error: existingError } = await supabase.rpc('get_private_conversation', { user_1: user.id, user_2: otherUserId });

    if (existingError) throw existingError;
    if (existingConversations.length > 0) return existingConversations[0];

    const { data: conversation, error: convError } = await supabase
        .from('conversations')
        .insert([{}])
        .select();

    if (convError) throw convError;

    const participants = [
        { conversation_id: conversation[0].id, user_id: user.id },
        { conversation_id: conversation[0].id, user_id: otherUserId },
    ];
    const { error: partError } = await supabase.from('participants').insert(participants);

    if (partError) throw partError;

    return conversation[0];
};

const createGroupConversation = async ({ name, user_ids }) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("User not logged in");

  const { data: conversation, error: convError } = await supabase
    .from('conversations')
    .insert([{ name }])
    .select();

  if (convError) throw convError;

  const allUserIds = [...user_ids, user.id];
  const participants = allUserIds.map(user_id => ({ conversation_id: conversation[0].id, user_id }));
  const { error: partError } = await supabase.from('participants').insert(participants);

  if (partError) throw partError;

  return conversation;
};

export const ConversationsList = memo(({ 
  selectedConversation, 
  onSelectConversation,
  onOpenSidebar,
}: ConversationsListProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [creationMode, setCreationMode] = useState<'private' | 'group' | null>(null);
  const [newConversationName, setNewConversationName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const queryClient = useQueryClient();

  const { data: conversations, isLoading, error } = useQuery({
    queryKey: ['conversations'],
    queryFn: fetchConversations,
  });

  const { data: users } = useQuery({ queryKey: ['users'], queryFn: fetchUsers });

  const privateConversationMutation = useMutation({
    mutationFn: createPrivateConversation,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      onSelectConversation(data.id);
      setIsCreating(false);
    },
  });

  const groupConversationMutation = useMutation({
    mutationFn: createGroupConversation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      setIsCreating(false);
      setNewConversationName("");
      setSelectedUsers([]);
    },
  });

  const handleCreateGroup = () => {
    if (newConversationName.trim() && selectedUsers.length > 0) {
      groupConversationMutation.mutate({ name: newConversationName, user_ids: selectedUsers });
    }
  };

  const filteredConversations = useMemo(() => {
    if (!conversations) return [];
    return conversations.filter(c => {
        if (c.name) return c.name.toLowerCase().includes(searchQuery.toLowerCase());
        const otherParticipant = c.participants.find(p => p.profile.id !== queryClient.getQueryData(['session'])?.data.session?.user.id);
        return otherParticipant?.profile.username.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [conversations, searchQuery, queryClient]);

  return (
    <div className="h-full flex flex-col border-r border-border/50">
      {/* Header */}
      <div className="p-4 border-b border-border/50 bg-card/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onOpenSidebar}
              className="md:hidden"
            >
              <Menu className="w-4 h-4" />
            </Button>
            <h2 className="font-semibold">Discussions</h2>
          </div>
          <Dialog open={isCreating} onOpenChange={setIsCreating}>
            <DialogTrigger asChild>
              <Button 
                size="sm" 
                className="btn-gradient"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nouvelle conversation</DialogTitle>
              </DialogHeader>
              {!creationMode ? (
                <div className="flex flex-col space-y-4">
                    <Button onClick={() => setCreationMode('private')} variant="outline"><User className="mr-2 h-4 w-4"/> Nouvelle discussion privée</Button>
                    <Button onClick={() => setCreationMode('group')} variant="outline"><Users className="mr-2 h-4 w-4"/> Nouveau groupe</Button>
                </div>
              ) : creationMode === 'private' ? (
                <ScrollArea className="h-64">
                    {users?.map(user => (
                    <div key={user.id} className="flex items-center space-x-2 p-2 hover:bg-secondary/50 rounded-lg cursor-pointer" onClick={() => privateConversationMutation.mutate(user.id)}>
                        <Avatar>
                            <AvatarImage src={user.avatar_url} />
                            <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span>{user.username}</span>
                    </div>
                    ))}
                </ScrollArea>
              ) : (
                <div className="space-y-4">
                    <Input 
                    placeholder="Nom du groupe"
                    value={newConversationName}
                    onChange={(e) => setNewConversationName(e.target.value)}
                    />
                    <h3 className="text-sm font-medium">Inviter des utilisateurs</h3>
                    <ScrollArea className="h-40">
                    {users?.map(user => (
                        <div key={user.id} className="flex items-center space-x-2 p-2">
                        <Checkbox 
                            id={user.id}
                            onCheckedChange={(checked) => {
                            setSelectedUsers(prev => 
                                checked ? [...prev, user.id] : prev.filter(id => id !== user.id)
                            );
                            }}
                        />
                        <label htmlFor={user.id}>{user.username}</label>
                        </div>
                    ))}
                    </ScrollArea>
                    <Button onClick={handleCreateGroup} disabled={groupConversationMutation.isPending}>
                    {groupConversationMutation.isPending ? 'Création...' : 'Créer le groupe'}
                    </Button>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="Rechercher..."
            className="pl-10 bg-input border-border/50 focus:border-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Conversations List */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <p>Chargement des conversations...</p>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-red-500">Erreur de chargement</p>
            </div>
          ) : filteredConversations.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-muted-foreground">Aucune conversation trouvée</p>
            </div>
          ) : (
            filteredConversations.map((conversation) => {
              const otherParticipant = conversation.participants.find(p => p.profile.id !== queryClient.getQueryData(['session'])?.data.session?.user.id);
              const displayName = conversation.name || otherParticipant?.profile.username || 'Conversation';
              const displayAvatar = conversation.name ? conversation.name.charAt(0).toUpperCase() : otherParticipant?.profile.username.charAt(0).toUpperCase() || 'C';

              return (
              <div
                key={conversation.id}
                onClick={() => onSelectConversation(conversation.id)}
                className={`
                  p-3 rounded-lg cursor-pointer transition-colors mb-1
                  ${selectedConversation === conversation.id 
                    ? 'bg-primary/10 border border-primary/20' 
                    : 'hover:bg-secondary/50'
                  }
                `}
              >
                <div className="flex items-start space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={!conversation.name ? otherParticipant?.profile.avatar_url : undefined} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {displayAvatar}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm truncate">
                      {displayName}
                    </h3>
                  </div>
                </div>
              </div>
            )}) 
          )}
        </div>
      </ScrollArea>
    </div>
  );
});