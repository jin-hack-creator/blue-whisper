import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Menu } from "lucide-react";

interface Conversation {
  id: string;
  name: string;
  lastMessage?: string;
  timestamp?: string;
  unread?: number;
  isOnline?: boolean;
  isGroup?: boolean;
  isPrivate?: boolean;
  avatar?: string;
}

interface ConversationsListProps {
  conversations: Conversation[];
  selectedConversation: string | null;
  onSelectConversation: (id: string) => void;
  onOpenSidebar: () => void;
  onCreateNew: () => void;
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export const ConversationsList = ({ 
  conversations = [],
  selectedConversation, 
  onSelectConversation,
  onOpenSidebar,
  onCreateNew,
  onSearch,
  isLoading = false
}: ConversationsListProps) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

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
          <Button 
            size="sm" 
            className="btn-gradient"
            onClick={onCreateNew}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="Rechercher..."
            className="pl-10 bg-input border-border/50 focus:border-primary"
            onChange={handleSearch}
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
          ) : conversations.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-muted-foreground">Aucune conversation</p>
            </div>
          ) : (
            conversations.map((conversation) => (
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
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {conversation.avatar || conversation.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {conversation.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
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
                      {conversation.timestamp && (
                        <span className="text-xs text-muted-foreground">
                          {conversation.timestamp}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      {conversation.lastMessage && (
                        <p className="text-sm text-muted-foreground truncate">
                          {conversation.lastMessage}
                        </p>
                      )}
                      {(conversation.unread || 0) > 0 && (
                        <Badge className="ml-2 bg-primary text-primary-foreground text-xs min-w-[20px] h-5 px-1.5">
                          {conversation.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};