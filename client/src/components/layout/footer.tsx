import { Link } from "wouter";
import { Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-display font-bold text-xl mb-6">
              Hors-Série<span className="text-chartreuse">.immo</span>
            </h3>
            <p className="text-white mb-6">
              L’immobilier confidentiel dans le Maine-et-Loire.<br />
              Nous mettons en lumière des biens uniques, pour des projets singuliers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-chartreuse transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-chartreuse transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-chartreuse transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-6 text-white">Nos Services</h4>
            <ul className="space-y-3 text-white">
              <li><a href="#" className="hover:text-chartreuse transition-colors">Vente de biens d'exception</a></li>
              <li><a href="#" className="hover:text-chartreuse transition-colors">Estimation gratuite</a></li>
              <li><a href="#" className="hover:text-chartreuse transition-colors">Accompagnement personnalisé</a></li>
              <li><a href="#" className="hover:text-chartreuse transition-colors">Conseil en investissement</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-6 text-white">Types de Biens</h4>
            <ul className="space-y-3 text-white">
              <li><Link href="/biens?type=château" className="hover:text-chartreuse transition-colors">Châteaux</Link></li>
              <li><Link href="/biens?type=maison de maître" className="hover:text-chartreuse transition-colors">Maisons de maître</Link></li>
              <li><Link href="/biens?type=maison de ville" className="hover:text-chartreuse transition-colors">Maisons de ville</Link></li>
              <li><Link href="/biens?type=propriété viticole" className="hover:text-chartreuse transition-colors">Propriétés viticoles</Link></li>
              <li><Link href="/biens?type=villa" className="hover:text-chartreuse transition-colors">Villas</Link></li>
              <li><Link href="/biens?type=appartement" className="hover:text-chartreuse transition-colors">Appartements</Link></li>
              <li><Link href="/biens?type=loft" className="hover:text-chartreuse transition-colors">Lofts</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-6 text-white">Contact</h4>
            <div className="space-y-3 text-white">
              <p>Luc LUBERT<br /></p>
              <p>4 place de la Bilange<br />49400 Saumur</p>
              <p>+33 6 85 09 98 94</p>
              <p>luc@hors-serie.immo</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © 2025 Hors-Série.immo. Tous droits réservés.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-300 hover:text-chartreuse text-sm transition-colors">Mentions légales</a>
            <a href="#" className="text-gray-300 hover:text-chartreuse text-sm transition-colors">Politique de confidentialité</a>
            <Link href="/admin" className="text-gray-300 hover:text-chartreuse text-sm transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
