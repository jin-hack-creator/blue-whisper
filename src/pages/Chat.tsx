import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  MessageCircle, 
  Send, 
  Search, 
  Settings, 
  Users, 
  Plus,
  MoreVertical,
  Menu
} from "lucide-react";
import { Sidebar } from "@/components/Chat/Sidebar";
import { ChatWindow } from "@/components/Chat/ChatWindow";
import { ConversationsList } from "@/components/Chat/ConversationsList";

const Chat = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>("1");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen bg-background flex">
      {/* Sidebar - Desktop */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Sidebar - Mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-80">
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Conversations List */}
      <div className="w-full md:w-80 border-r border-border/50 bg-card/50">
        <ConversationsList 
          selectedConversation={selectedConversation}
          onSelectConversation={setSelectedConversation}
          onOpenSidebar={() => setSidebarOpen(true)}
        />
      </div>

      {/* Chat Window */}
      <div className="flex-1">
        {selectedConversation ? (
          <ChatWindow conversationId={selectedConversation} />
        ) : (
          <div className="h-full flex items-center justify-center bg-gradient-to-br from-background to-secondary/20">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center mx-auto neon-glow">
                <MessageCircle className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Bienvenue sur BlueVision</h3>
              <p className="text-muted-foreground max-w-md">
                Sélectionnez une conversation pour commencer à discuter ou créez-en une nouvelle.
              </p>
              <Button className="btn-gradient neon-glow">
                <Plus className="w-4 h-4 mr-2" />
                Nouvelle conversation
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;