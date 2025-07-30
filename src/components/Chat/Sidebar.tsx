import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  MessageCircle, 
  Search, 
  Settings, 
  Users, 
  User,
  LogOut,
  Shield,
  X
} from "lucide-react";

interface SidebarProps {
  onClose?: () => void;
}

export const Sidebar = ({ onClose }: SidebarProps) => {
  const currentUser = {
    pseudo: "MonPseudo",
    avatar: null
  };

  return (
    <div className="w-64 h-full bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-sidebar-foreground">BlueVision</span>
          </div>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose} className="md:hidden">
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4">
        <div className="flex items-center space-x-3 p-3 rounded-lg bg-sidebar-accent/50 hover:bg-sidebar-accent transition-colors">
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {currentUser.pseudo.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sidebar-foreground truncate">
              {currentUser.pseudo}
            </p>
            <p className="text-xs text-sidebar-foreground/60">En ligne</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <MessageCircle className="w-4 h-4 mr-3" />
          Discussions
        </Button>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <Search className="w-4 h-4 mr-3" />
          Rechercher
        </Button>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <Users className="w-4 h-4 mr-3" />
          Groupes
        </Button>
        
        <Separator className="my-4 bg-sidebar-border" />
        
        <Button 
          variant="ghost" 
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <User className="w-4 h-4 mr-3" />
          Profil
        </Button>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <Settings className="w-4 h-4 mr-3" />
          Paramètres
        </Button>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <Shield className="w-4 h-4 mr-3" />
          Confidentialité
        </Button>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-sidebar-foreground hover:bg-destructive hover:text-destructive-foreground"
        >
          <LogOut className="w-4 h-4 mr-3" />
          Déconnexion
        </Button>
      </div>
    </div>
  );
};