import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import heroImage from "@assets/DEP49_attractivite_territoriale_lancement_1756396617000.jpg";

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`
        }}
      ></div>

      <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
        <h1 className="font-display font-light text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight">
          Hors Série<br />
          <span className="font-bold text-chartreuse">Singulier par nature.</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-8 font-light italic max-w-2xl mx-auto">
          Le caractère d'un bien, l'exigence sur-mesure.
        </p>
        <Link href="/biens">
          <Button size="lg" className="bg-transparent border-2 border-white text-chartreuse hover:bg-white hover:text-gray-900 transform hover:scale-105 transition-all duration-300 px-8 py-3 rounded-full">
            Découvrir nos biens
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
