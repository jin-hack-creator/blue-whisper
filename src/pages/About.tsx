import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Shield, Users, ArrowLeft, Heart, Lock, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center neon-glow">
              <MessageCircle className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              BlueVision
            </h1>
          </Link>
          
          <Link to="/">
            <Button variant="ghost">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary to-accent rounded-2xl mb-6 neon-glow">
              <Heart className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              À propos de <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">BlueVision</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              BlueVision est né d'une vision simple : permettre à chacun de s'exprimer librement 
              tout en préservant sa vie privée. Ici, seuls votre pseudo et votre photo comptent.
            </p>
          </div>

          {/* Mission Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="card-glass p-6">
              <Lock className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Confidentialité par Design</h3>
              <p className="text-muted-foreground">
                Aucune donnée personnelle sensible n'est collectée. Pas d'email, pas de numéro, 
                juste votre créativité et votre pseudo.
              </p>
            </Card>

            <Card className="card-glass p-6">
              <Zap className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Technologie Moderne</h3>
              <p className="text-muted-foreground">
                Chiffrement de bout en bout, interface fluide et responsive, 
                expérience utilisateur optimisée sur tous les appareils.
              </p>
            </Card>

            <Card className="card-glass p-6">
              <Users className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Communauté Libre</h3>
              <p className="text-muted-foreground">
                Un espace d'échange sans jugement où chacun peut exprimer ses idées 
                et créer des liens authentiques.
              </p>
            </Card>
          </div>

          {/* Features Section */}
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">Nos Engagements</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                BlueVision s'engage à protéger votre liberté d'expression et votre vie privée
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="card-glass p-8">
                <CardHeader className="pb-4">
                  <Shield className="w-8 h-8 text-primary mb-2" />
                  <CardTitle>Sécurité Maximale</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Chiffrement end-to-end des messages
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Serveurs sécurisés et conformes RGPD
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Authentification par clé cryptographique
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Messages éphémères optionnels
                  </div>
                </CardContent>
              </Card>

              <Card className="card-glass p-8">
                <CardHeader className="pb-4">
                  <MessageCircle className="w-8 h-8 text-primary mb-2" />
                  <CardTitle>Expérience Utilisateur</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Interface intuitive et moderne
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Discussions privées et groupes
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Partage de fichiers et médias
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Notifications intelligentes
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16 p-8 card-glass rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">Prêt à rejoindre BlueVision ?</h3>
            <p className="text-muted-foreground mb-6">
              Créez votre compte en quelques secondes et commencez à discuter librement
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="btn-gradient neon-glow">
                  Créer un compte
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="lg" variant="outline" className="border-primary/30 hover:border-primary">
                  Se connecter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;