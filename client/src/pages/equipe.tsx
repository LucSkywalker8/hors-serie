import { Button } from "@/components/ui/button";
import { Mail, Phone, Linkedin } from "lucide-react";
import { Link } from "wouter";

export default function Equipe() {
  const teamMembers = [
    {
      name: "Luc LUBERT",
      role: "Directrice & Fondatrice",
      image: "https://images.unsplash.com/photo-1494790108755-2616c1799006?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      description: "10 ans d'expérience dans l'immobilier. Spécialisée dans les propriétés historiques du Maine-et-Loire.",
      email: "lucs@hors-serie.immo",
      phone: "+33 6 85 09 98 94"
    },
   
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-display font-light text-4xl md:text-6xl text-white mb-6">
              Notre <span className="text-chartreuse font-bold">Équipe</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Une équipe passionnée et expérimentée, dédiée à l'accompagnement de vos projets immobiliers d'exception.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display font-semibold text-xl text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-chartreuse font-medium mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-600 mb-6">
                    {member.description}
                  </p>
                  <div className="flex flex-col space-y-2">
                    <a 
                      href={`mailto:${member.email}`}
                      className="flex items-center text-gray-600 hover:text-chartreuse transition-colors"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      {member.email}
                    </a>
                    <a 
                      href={`tel:${member.phone}`}
                      className="flex items-center text-gray-600 hover:text-chartreuse transition-colors"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      {member.phone}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-light text-4xl text-white mb-6">
              Nos <span className="text-chartreuse font-bold">Valeurs</span>
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Ce qui nous guide dans chaque transaction et chaque relation client.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-chartreuse rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-gray-900">E</span>
              </div>
              <h3 className="font-display font-semibold text-xl text-white mb-4">Excellence</h3>
              <p className="text-gray-300">
                Nous visons l'excellence dans chaque détail, de la sélection des biens à l'accompagnement client.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-chartreuse rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-gray-900">C</span>
              </div>
              <h3 className="font-display font-semibold text-xl text-white mb-4">Confiance</h3>
              <p className="text-gray-300">
                La transparence et l'honnêteté sont au cœur de notre approche relationnelle.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-chartreuse rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-gray-900">P</span>
              </div>
              <h3 className="font-display font-semibold text-xl text-white mb-4">Passion</h3>
              <p className="text-gray-300">
                Notre passion pour l'immobilier d'exception nous permet de révéler le potentiel unique de chaque bien.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-light text-4xl text-gray-900 mb-6">
            Prêt à nous <span className="text-chartreuse font-bold">rencontrer</span> ?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Contactez-nous pour un entretien personnalisé et découvrez comment nous pouvons vous accompagner.
          </p>
          <Link href="/contact">
            <Button className="btn-chartreuse px-8 py-3 rounded-full">
              Prendre rendez-vous
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}