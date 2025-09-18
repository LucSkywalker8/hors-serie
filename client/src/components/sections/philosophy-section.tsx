import { Button } from "@/components/ui/button";
import { Heart, Gem, Lock } from "lucide-react";
import { Link } from "wouter";
import officeImage from "@assets/soft shadow_1756752467411.jpg";

export default function PhilosophySection() {
  return (
    <section id="philosophie" className="py-20 bg-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-display font-semibold text-4xl text-white mb-8">Notre Philosophie</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-chartreuse text-gray-900 p-3 rounded-full flex-shrink-0">
                  <Heart className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-xl text-white mb-2">Une Approche Humaine</h3>
                  <p className="text-gray-300">
                    Chaque bien que nous proposons est sélectionné avec passion. Nous prenons le temps de comprendre l'histoire de chaque propriété et les aspirations de nos clients.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-chartreuse text-gray-900 p-3 rounded-full flex-shrink-0">
                  <Gem className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-xl text-white mb-2">L'Exception comme Standard</h3>
                  <p className="text-gray-300">
                    Nous ne proposons que des biens uniques, dotés d'une âme et d'un caractère particulier. Châteaux, manoirs, lofts d'artiste ou domaines viticoles, chaque propriété raconte une histoire.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-chartreuse text-gray-900 p-3 rounded-full flex-shrink-0">
                  <Lock className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-xl text-white mb-2">Discrétion & Confidentialité</h3>
                  <p className="text-gray-300">
                    Nous respectons la confidentialité de nos clients et propriétaires. Notre approche sur-mesure garantit un service personnalisé et discret pour chaque transaction.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Link href="/equipe">
                <Button className="bg-white text-gray-900 hover:bg-chartreuse hover:text-gray-900 transition-colors px-6 py-3 rounded-full">
                  En savoir plus sur notre équipe
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={officeImage} 
                alt="Bureau Hors Série - Design moderne" 
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>

            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-chartreuse">150+</div>
                  <div className="text-sm text-gray-600">Biens vendus</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-chartreuse">15 ans</div>
                  <div className="text-sm text-gray-600">D'expérience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
