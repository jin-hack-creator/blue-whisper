import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle, Shield, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center neon-glow">
              <MessageCircle className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              BlueVision
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/about">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                À propos
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="outline" className="border-primary/30 hover:border-primary">
                Se connecter
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary to-accent rounded-2xl mb-6 neon-glow">
              <MessageCircle className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                BlueVision
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Discussion libre et sécurisée. <br />
              Votre identité reste privée, seuls votre pseudo et votre photo comptent.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/register">
              <Button size="lg" className="btn-gradient text-lg px-8 py-6 neon-glow hover:scale-105 transition-transform">
                Créer un compte
              </Button>
            </Link>
            <Link to="/auth">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-primary/30 hover:border-primary hover:bg-primary/10">
                Se connecter
              </Button>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <Card className="card-glass p-8 hover:scale-105 transition-transform duration-300">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Confidentialité totale</h3>
              <p className="text-muted-foreground">
                Aucun email, aucun numéro. Seuls votre pseudo et votre photo vous représentent.
              </p>
            </Card>

            <Card className="card-glass p-8 hover:scale-105 transition-transform duration-300">
              <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Messages chiffrés</h3>
              <p className="text-muted-foreground">
                Vos conversations sont protégées par un chiffrement de bout en bout.
              </p>
            </Card>

            <Card className="card-glass p-8 hover:scale-105 transition-transform duration-300">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Discussions libres</h3>
              <p className="text-muted-foreground">
                Groupes publics ou conversations privées, échangez en toute liberté.
              </p>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-muted-foreground">© 2024 BlueVision. Votre liberté d'expression protégée.</span>
            </div>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                Confidentialité
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                CGU
              </Link>
              <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;