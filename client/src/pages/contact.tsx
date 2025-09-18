import ContactForm from "@/components/contact/contact-form";
import GoogleMap from "@/components/contact/google-map";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  return (
    <div className="pt-32 min-h-screen bg-gray-700">
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="font-display font-semibold text-5xl md:text-6xl text-white mb-6">
              Nous <span className="font-bold text-chartreuse">Contacter</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Prêt à découvrir votre bien d'exception ? Notre équipe vous accompagne dans votre projet immobilier.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 items-start">
              {/* Contact Form */}
              <div className="glass-effect rounded-2xl p-8">
                <ContactForm />
              </div>

              {/* Contact Info & Map */}
              <div className="space-y-8">
                <div>
                  <h3 className="font-display text-2xl text-white mb-6">Nos Coordonnées</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-chartreuse rounded-xl flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-gray-900" />
                      </div>
                      <div>
                        <div className="font-semibold text-white">Adresse</div>
                        <div className="text-gray-300">15 Rue des Tonneliers<br />49400 Saumur, France</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-chartreuse rounded-xl flex items-center justify-center">
                        <Phone className="h-6 w-6 text-gray-900" />
                      </div>
                      <div>
                        <div className="font-semibold text-white">Téléphone</div>
                        <div className="text-gray-300">+33 2 41 50 XX XX</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-chartreuse rounded-xl flex items-center justify-center">
                        <Mail className="h-6 w-6 text-gray-900" />
                      </div>
                      <div>
                        <div className="font-semibold text-white">Email</div>
                        <div className="text-gray-300">contact@hors-serie.immo</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-chartreuse rounded-xl flex items-center justify-center">
                        <Clock className="h-6 w-6 text-gray-900" />
                      </div>
                      <div>
                        <div className="font-semibold text-white">Horaires</div>
                        <div className="text-gray-300">Lun-Ven: 9h-18h<br />Sam: 9h-12h sur RDV</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Carte dans la colonne de droite */}
                <div className="w-full">
                  <div className="mb-4">
                    <h4 className="font-display text-lg text-white mb-1">Notre Localisation</h4>
                    <p className="text-gray-400 text-sm">Saumur, Maine-et-Loire</p>
                  </div>
                  <GoogleMap />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}