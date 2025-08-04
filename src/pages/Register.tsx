import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageCircle, User, Upload, Key, ArrowLeft, Check } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Register = () => {
  const [step, setStep] = useState(1);
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: `${pseudo}@bluevision.com`,
        password: password,
        options: {
          data: {
            username: pseudo,
          }
        }
      });

      if (error) throw error;

      if (profileImage) {
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(`${data.user?.id}/profile.png`, profileImage, {
            cacheControl: '3600',
            upsert: true,
          });

        if (uploadError) {
          console.error("Error uploading image:", uploadError);
        }
      }

      setStep(2);
      toast({
        title: "Compte créé !",
        description: "Votre compte a été créé avec succès",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création du compte.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary flex items-center justify-center p-4">
        <Card className="w-full max-w-md card-glass">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center neon-glow">
                <Check className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl text-green-400">
              Compte créé avec succès !
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Vous pouvez maintenant vous connecter
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Votre identité <span className="font-medium text-primary">{pseudo}</span> a été enregistrée
              </p>
              
              <Link to="/auth">
                <Button className="w-full btn-gradient">
                  Se connecter maintenant
                </Button>
              </Link>

              <Link to="/">
                <Button className="w-full" variant="outline">
                  Retour à l'accueil
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
            Rejoindre BlueVision
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Créez votre identité anonyme
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleRegister} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="pseudo" className="flex items-center space-x-2">
                <User className="w-4 h-4 text-primary" />
                <span>Choisissez votre pseudo</span>
              </Label>
              <Input
                id="pseudo"
                type="text"
                placeholder="MonPseudo"
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
                className="bg-input border-border/50 focus:border-primary"
                required
                minLength={3}
                maxLength={20}
              />
              <p className="text-xs text-muted-foreground">
                3 à 20 caractères - lettres, chiffres et underscores
              </p>
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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="flex items-center space-x-2">
                <Key className="w-4 h-4 text-primary" />
                <span>Confirmer le mot de passe</span>
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirmez votre mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-input border-border/50 focus:border-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center space-x-2">
                <Upload className="w-4 h-4 text-primary" />
                <span>Photo de profil</span>
              </Label>
              
              <div className="border-2 border-dashed border-border/50 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                {imagePreview ? (
                  <div className="space-y-3">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-primary"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById('imageInput')?.click()}
                    >
                      Changer l'image
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto" />
                    <p className="text-sm text-muted-foreground">
                      Cliquez pour sélectionner une image
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById('imageInput')?.click()}
                    >
                      Parcourir
                    </Button>
                  </div>
                )}
                
                <input
                  id="imageInput"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Optionnel - Formats: JPG, PNG (max 2MB)
              </p>
            </div>

            <Button
              type="submit"
              className="w-full btn-gradient text-lg py-6 neon-glow"
              disabled={isLoading || !pseudo || !password || !confirmPassword}
            >
              {isLoading ? "Création du compte..." : "Créer mon compte"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Déjà un compte ?{" "}
              <Link to="/auth" className="text-primary hover:underline">
                Se connecter
              </Link>
            </p>
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

export default Register;