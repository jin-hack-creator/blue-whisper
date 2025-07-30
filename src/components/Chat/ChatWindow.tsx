import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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

export const ChatWindow = ({ conversationId }: ChatWindowProps) => {
  const [message, setMessage] = useState("");

  // Messages simulés
  const messages = [
    {
      id: "1",
      sender: "Alice92",
      content: "Salut ! Comment ça va ?",
      timestamp: "14:25",
      isOwn: false
    },
    {
      id: "2",
      sender: "Moi",
      content: "Ça va bien merci ! Et toi ?",
      timestamp: "14:26",
      isOwn: true
    },
    {
      id: "3",
      sender: "Alice92",
      content: "Super ! Tu as vu le nouveau design de l'app ?",
      timestamp: "14:27",
      isOwn: false
    },
    {
      id: "4",
      sender: "Moi",
      content: "Oui, c'est vraiment réussi ! J'adore le thème sombre et les effets de lumière",
      timestamp: "14:28",
      isOwn: true
    },
    {
      id: "5",
      sender: "Alice92",
      content: "Moi aussi ! L'équipe a fait du super boulot 🎨",
      timestamp: "14:30",
      isOwn: false
    }
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Logique d'envoi de message
      console.log("Envoi du message:", message);
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
                  A
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
            </div>
            <div>
              <h3 className="font-medium">Alice92</h3>
              <p className="text-sm text-muted-foreground">En ligne</p>
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
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-end space-x-2 max-w-[70%] ${msg.isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
                {!msg.isOwn && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      {msg.sender.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div className={`
                  px-4 py-2 rounded-2xl 
                  ${msg.isOwn 
                    ? 'bg-primary text-primary-foreground rounded-br-md' 
                    : 'bg-secondary text-secondary-foreground rounded-bl-md'
                  }
                `}>
                  <p className="text-sm">{msg.content}</p>
                  <p className={`text-xs mt-1 ${msg.isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            </div>
          ))}
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
              onChange={(e) => setMessage(e.target.value)}
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
            disabled={!message.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};