import { Star } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Gérald B.",
      role: "Acquéreur - Maison de Maitre",
      initials: "GB",
      content: "Je tenais particulièrement à remercier Mr Luc Lubert, pour son professionnalisme, sa réactivité, sa disponibilité et sa discrétion. Sa parfaite connaissance de la région, son carnet de contacts, vous permettra j'en suis sur, comme nous, de faire rapidement l'acquisition de votre rêve!"
    },
    {
      name: "Jean-Luc M.",
      role: "Vendeur - Domaine viticole",
      initials: "JL",
      content: "Professionnalisme, discrétion et expertise. Hors-Série a rendu possible la vente de notre domaine familial dans les meilleures conditions."
    },
    {
      name: "Sophie & Antoine R.",
      role: "Acquéreurs - Loft Angers",
      initials: "SA",
      content: "Un accompagnement personnalisé du début à la fin. Nous avons trouvé notre loft d'artiste grâce à leur réseau exclusif et leur connaissance du marché."
    }
  ];

  return (
    <section className="py-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display font-semibold text-4xl text-neutral-900 mb-6">Ils Nous Font Confiance</h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Les témoignages de nos clients reflètent notre engagement à offrir un service d'exception.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="flex text-terracotta-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-neutral-700 mb-6 italic">
                "{testimonial.content}"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-terracotta-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  {testimonial.initials}
                </div>
                <div>
                  <div className="font-semibold text-neutral-900">{testimonial.name}</div>
                  <div className="text-sm text-neutral-600">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
