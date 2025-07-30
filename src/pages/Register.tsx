import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageCircle, User, Upload, Download, ArrowLeft, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const [step, setStep] = useState(1);
  const [pseudo, setPseudo] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [generatedKey, setGeneratedKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const generateSecretKey = () => {
    // Génération d'une clé unique simulée
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 32; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulation de l'inscription
    setTimeout(() => {
      const key = generateSecretKey();
      setGeneratedKey(key);
      setIsLoading(false);
      setStep(2);
      
      toast({
        title: "Compte créé !",
        description: "Votre clé secrète a été générée",
      });
    }, 2000);
  };

  const downloadKey = () => {
    const keyData = {
      pseudo: pseudo,
      secretKey: generatedKey,
      createdAt: new Date().toISOString(),
      version: "1.0"
    };
    
    const blob = new Blob([JSON.stringify(keyData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${pseudo}_bluevision.bvk`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Clé téléchargée !",
      description: "Conservez ce fichier précieusement",
    });
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
              Votre clé secrète a été générée
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="bg-secondary/50 p-4 rounded-lg border border-border/50">
              <Label className="text-sm font-medium text-muted-foreground mb-2 block">
                Votre clé secrète :
              </Label>
              <div className="bg-input p-3 rounded-md font-mono text-sm break-all">
                {generatedKey}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                ⚠️ Conservez cette clé précieusement, elle est unique et irremplaçable !
              </p>
            </div>

            <Button
              onClick={downloadKey}
              className="w-full btn-gradient neon-glow"
            >
              <Download className="w-4 h-4 mr-2" />
              Télécharger ma clé (.bvk)
            </Button>

            <div className="text-center space-y-4">
              <p className="text-xs text-muted-foreground">
                Le fichier .bvk contient votre clé et peut être utilisé pour récupérer votre accès
              </p>
              
              <Link to="/auth">
                <Button className="w-full" variant="outline">
                  Se connecter maintenant
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
            Créez votre identité anonyme en quelques étapes
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
              />
              <p className="text-xs text-muted-foreground">
                Ce sera votre identité publique sur BlueVision
              </p>
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
                Optionnel - Vous pourrez la modifier plus tard
              </p>
            </div>

            <Button
              type="submit"
              className="w-full btn-gradient text-lg py-6 neon-glow"
              disabled={isLoading || !pseudo}
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