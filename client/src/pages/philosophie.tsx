import { Button } from "@/components/ui/button";
import { Heart, Gem, Lock } from "lucide-react";
import { Link } from "wouter";
import officeImage from "@assets/soft shadow_1756752467411.jpg";

export default function PhilosophiePage() {
  return (
    <div className="min-h-screen bg-gray-700">
      {/* Hero Section */}
      <section className="pt-32 pb-8 bg-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-display font-semibold text-5xl md:text-6xl text-white mb-6">
              Notre Philosophie
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Une approche unique de l'immobilier de caractère, fondée sur l'humain, l'exception et la confidentialité.
            </p>
          </div>
        </div>
      </section>

      {/* Main Philosophy Section */}
      <section className="py-12 bg-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Philosophy Points */}
            <div className="space-y-12">
              <div className="flex items-start space-x-6">
                <div className="bg-chartreuse text-gray-900 p-4 rounded-full flex-shrink-0">
                  <Heart className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-2xl text-white mb-4">Une Approche Humaine</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Chaque bien que nous proposons est sélectionné avec passion. 
                    Nous prenons le temps de comprendre l'histoire de chaque propriété et les aspirations de nos clients.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="bg-chartreuse text-gray-900 p-4 rounded-full flex-shrink-0">
                  <Gem className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-2xl text-white mb-4">L'Exception comme Standard</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Nous ne proposons que des biens uniques, dotés d'une âme et d'un caractère particulier. 
                    Châteaux, manoirs, lofts d'artiste ou domaines viticoles, chaque propriété raconte une histoire.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="bg-chartreuse text-gray-900 p-4 rounded-full flex-shrink-0">
                  <Lock className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-2xl text-white mb-4">Discrétion & Confidentialité</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Nous respectons la confidentialité de nos clients et propriétaires. 
                    Notre approche sur-mesure garantit un service personnalisé et discret pour chaque transaction.
                  </p>
                </div>
              </div>

              <div className="mt-12">
                <Link href="/equipe">
                  <Button 
                    size="lg" 
                    className="bg-white text-gray-900 hover:bg-chartreuse hover:text-gray-900 transition-colors px-8 py-4 rounded-full text-lg"
                    data-testid="button-team-info"
                  >
                    En savoir plus sur notre équipe
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column - Image and Stats */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={officeImage} 
                  alt="Bureau Hors Série - Design moderne" 
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>

              {/* Stats Card */}
              <div className="absolute -bottom-12 -left-12 bg-white p-8 rounded-3xl shadow-xl">
                <div className="grid grid-cols-2 gap-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-chartreuse mb-2">150+</div>
                    <div className="text-gray-600 font-medium">Biens vendus</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-chartreuse mb-2">15 ans</div>
                    <div className="text-gray-600 font-medium">D'expérience</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Philosophy Content */}
      <section className="py-20 bg-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-semibold text-4xl text-white mb-6">
              Notre Engagement
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Chez Hors-Série, nous nous engageons à redéfinir l'expérience immobilière haut de gamme.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gray-700 rounded-2xl">
              <div className="text-chartreuse text-5xl font-bold mb-4">Satisfaction Client</div>
              <h3 className="text-white text-xl font-semibold mb-3">Satisfaction Client</h3>
              <p className="text-gray-300">
                Chaque client bénéficie d'un accompagnement personnalisé jusqu'à la finalisation de son projet.
              </p>
            </div>

            <div className="text-center p-8 bg-gray-700 rounded-2xl">
              <div className="text-chartreuse text-5xl font-bold mb-4">24/7</div>
              <h3 className="text-white text-xl font-semibold mb-3">Disponibilité</h3>
              <p className="text-gray-300">
                Notre équipe reste à votre disposition pour répondre à vos questions et vous accompagner.
              </p>
            </div>

            <div className="text-center p-8 bg-gray-700 rounded-2xl">
              <div className="text-chartreuse text-5xl font-bold mb-4">∞</div>
              <h3 className="text-white text-xl font-semibold mb-3">Réseau</h3>
              <p className="text-gray-300">
                Un réseau étendu de partenaires et d'experts pour vous offrir les meilleures opportunités.
              </p>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
