import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Link, useNavigate } from "react-router-dom";

interface SidebarProps {
  onClose?: () => void;
}

const fetchUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('username, avatar_url')
    .eq('id', user.id)
    .single();

  if (error) throw error;
  return data;
};

export const Sidebar = ({ onClose }: SidebarProps) => {
  const navigate = useNavigate();
  const { data: user, isLoading } = useQuery({ queryKey: ['user'], queryFn: fetchUser });

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
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
        <Link to="/profile">
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-sidebar-accent/50 hover:bg-sidebar-accent transition-colors">
            <Avatar className="w-10 h-10">
              <AvatarImage src={user?.avatar_url || undefined} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {user?.username?.charAt(0).toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sidebar-foreground truncate">
                {user?.username || 'Utilisateur'}
              </p>
              <p className="text-xs text-sidebar-foreground/60">En ligne</p>
            </div>
          </div>
        </Link>
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
        
        <Link to="/profile">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <User className="w-4 h-4 mr-3" />
            Profil
          </Button>
        </Link>
        
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
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-3" />
          Déconnexion
        </Button>
      </div>
    </div>
  );
};