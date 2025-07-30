import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Shield, ArrowLeft, Eye, Lock, Database, UserX } from "lucide-react";
import { Link } from "react-router-dom";

const Privacy = () => {
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
              <Shield className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Politique de <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Confidentialité</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Chez BlueVision, votre vie privée est notre priorité absolue. 
              Découvrez comment nous protégeons vos données et respectons votre anonymat.
            </p>
          </div>

          {/* Key Principles */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="card-glass p-6">
              <Eye className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Transparence Totale</h3>
              <p className="text-muted-foreground">
                Nous vous expliquons clairement quelles données nous collectons 
                et comment nous les utilisons. Aucune surprise, aucune collecte cachée.
              </p>
            </Card>

            <Card className="card-glass p-6">
              <UserX className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Anonymat Préservé</h3>
              <p className="text-muted-foreground">
                Pas d'email, pas de numéro de téléphone. Votre identité réelle 
                reste totalement séparée de votre présence sur BlueVision.
              </p>
            </Card>
          </div>

          {/* Detailed Sections */}
          <div className="space-y-12">
            {/* Data Collection */}
            <Card className="card-glass">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Database className="w-6 h-6 text-primary" />
                  <span>Données Collectées</span>
                </CardTitle>
                <CardDescription>
                  Voici exactement ce que BlueVision collecte et stocke
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-green-400 mb-3">✅ Ce que nous collectons :</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2"></div>
                      <span><strong>Pseudo :</strong> Le nom d'utilisateur que vous choisissez</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2"></div>
                      <span><strong>Photo de profil :</strong> L'image que vous uploadez volontairement</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2"></div>
                      <span><strong>Messages :</strong> Vos conversations (chiffrées de bout en bout)</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2"></div>
                      <span><strong>Clé d'identification :</strong> Générée automatiquement pour sécuriser votre compte</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-red-400 mb-3">❌ Ce que nous ne collectons JAMAIS :</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-destructive rounded-full mr-3 mt-2"></div>
                      <span>Adresse email ou numéro de téléphone</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-destructive rounded-full mr-3 mt-2"></div>
                      <span>Nom réel ou informations d'identité</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-destructive rounded-full mr-3 mt-2"></div>
                      <span>Localisation GPS ou adresse IP</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-destructive rounded-full mr-3 mt-2"></div>
                      <span>Données de navigation ou cookies de tracking</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Security */}
            <Card className="card-glass">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Lock className="w-6 h-6 text-primary" />
                  <span>Sécurité et Chiffrement</span>
                </CardTitle>
                <CardDescription>
                  Comment nous protégeons vos données et conversations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">🔐 Chiffrement des Messages</h4>
                    <p className="text-muted-foreground text-sm">
                      Tous vos messages sont chiffrés de bout en bout avec des algorithmes 
                      de niveau militaire. Même nous ne pouvons pas lire vos conversations.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">🛡️ Authentification Sécurisée</h4>
                    <p className="text-muted-foreground text-sm">
                      Votre clé d'identification unique remplace les mots de passe traditionnels, 
                      offrant une sécurité cryptographique avancée.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">🔒 Stockage Sécurisé</h4>
                    <p className="text-muted-foreground text-sm">
                      Nos serveurs utilisent un chiffrement AES-256 et sont hébergés 
                      dans des centres de données certifiés ISO 27001.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">⏰ Messages Éphémères</h4>
                    <p className="text-muted-foreground text-sm">
                      Option de suppression automatique des messages après une durée 
                      définie pour une confidentialité maximale.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* User Rights */}
            <Card className="card-glass">
              <CardHeader>
                <CardTitle>Vos Droits</CardTitle>
                <CardDescription>
                  Vous gardez le contrôle total sur vos données
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold">✅ Droit d'accès</h4>
                    <p className="text-muted-foreground text-sm">
                      Consultez toutes les données associées à votre pseudo
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold">🗑️ Droit à l'effacement</h4>
                    <p className="text-muted-foreground text-sm">
                      Supprimez votre compte et toutes vos données en un clic
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold">📥 Portabilité</h4>
                    <p className="text-muted-foreground text-sm">
                      Exportez vos données dans un format standard
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold">🚫 Droit d'opposition</h4>
                    <p className="text-muted-foreground text-sm">
                      Bloquez ou signalez tout utilisateur problématique
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact */}
          <div className="text-center mt-16 p-8 card-glass rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">Questions sur la Confidentialité ?</h3>
            <p className="text-muted-foreground mb-6">
              Notre équipe est disponible pour répondre à toutes vos préoccupations
            </p>
            <Button variant="outline" className="border-primary/30 hover:border-primary">
              Nous Contacter
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Privacy;