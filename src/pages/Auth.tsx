import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageCircle, Key, User, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Auth = () => {
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: `${pseudo}@bluevision.com`,
        password: password,
      });

      if (error) throw error;

      toast({
        title: "Connexion réussie !",
        description: `Bienvenue ${pseudo}`,
      });

      window.location.href = "/chat";
    } catch (error) {
      toast({
        title: "Erreur de connexion",
        description: "Vérifiez votre pseudo et votre mot de passe",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary flex items-center justify-center p-4">
      <Card className="w-full max-w-md card-glass">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center neon-glow">
              <MessageCircle className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            BlueVision
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Connectez-vous à votre compte
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="pseudo" className="flex items-center space-x-2">
                <User className="w-4 h-4 text-primary" />
                <span>Pseudo</span>
              </Label>
              <Input
                id="pseudo"
                type="text"
                placeholder="Votre pseudo"
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
                className="bg-input border-border/50 focus:border-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center space-x-2">
                <Key className="w-4 h-4 text-primary" />
                <span>Mot de passe</span>
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-input border-border/50 focus:border-primary"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full btn-gradient text-lg py-6 neon-glow"
              disabled={isLoading}
            >
              {isLoading ? "Connexion..." : "Se connecter"}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-4">
            <p className="text-muted-foreground">
              Pas encore de compte ?{" "}
              <Link to="/register" className="text-primary hover:underline">
                Créer un compte
              </Link>
            </p>
            
            <div className="border-t border-border/50 pt-4">
              <p className="text-xs text-muted-foreground mb-2">
                Clé perdue ? Téléchargez votre fichier .bvk
              </p>
              <Button variant="outline" size="sm" className="border-primary/30">
                Récupérer ma clé
              </Button>
            </div>
          </div>

          <div className="mt-6">
            <Link to="/">
              <Button variant="ghost" size="sm" className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour à l'accueil
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;