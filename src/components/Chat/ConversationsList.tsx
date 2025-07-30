import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Menu } from "lucide-react";

interface ConversationsListProps {
  selectedConversation: string | null;
  onSelectConversation: (id: string) => void;
  onOpenSidebar: () => void;
}

export const ConversationsList = ({ 
  selectedConversation, 
  onSelectConversation,
  onOpenSidebar 
}: ConversationsListProps) => {
  const conversations = [
    {
      id: "1",
      name: "Alice92",
      lastMessage: "Salut ! Comment ça va ?",
      timestamp: "14:30",
      unread: 2,
      isOnline: true
    },
    {
      id: "2",
      name: "Bob_dev",
      lastMessage: "J'ai vu ton message sur le projet",
      timestamp: "13:45",
      unread: 0,
      isOnline: false
    },
    {
      id: "3",
      name: "Groupe Tech",
      lastMessage: "Charlie: Quelqu'un a testé la nouvelle API ?",
      timestamp: "12:20",
      unread: 5,
      isOnline: true,
      isGroup: true
    },
    {
      id: "4",
      name: "Emma_design",
      lastMessage: "Les maquettes sont prêtes 🎨",
      timestamp: "11:15",
      unread: 1,
      isOnline: true
    },
    {
      id: "5",
      name: "Discussion Privée",
      lastMessage: "Message chiffré",
      timestamp: "10:30",
      unread: 0,
      isOnline: false,
      isPrivate: true
    }
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border/50">
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
          <Button size="sm" className="btn-gradient">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="Rechercher..."
            className="pl-10 bg-input border-border/50 focus:border-primary"
          />
        </div>
      </div>

      {/* Conversations */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => onSelectConversation(conversation.id)}
              className={`
                p-3 rounded-lg cursor-pointer transition-colors mb-1
                ${selectedConversation === conversation.id 
                  ? 'bg-primary/20 border border-primary/30' 
                  : 'hover:bg-secondary/50'
                }
              `}
            >
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {conversation.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {conversation.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-sm truncate">
                        {conversation.name}
                      </h3>
                      {conversation.isGroup && (
                        <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                          Groupe
                        </Badge>
                      )}
                      {conversation.isPrivate && (
                        <Badge variant="outline" className="text-xs px-1.5 py-0.5 border-primary">
                          Privé
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {conversation.timestamp}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground truncate">
                      {conversation.lastMessage}
                    </p>
                    {conversation.unread > 0 && (
                      <Badge className="ml-2 bg-primary text-primary-foreground text-xs min-w-[20px] h-5 px-1.5">
                        {conversation.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};