import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Search } from "lucide-react";

export default function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "Accueil", href: "/" },
    { name: "Nos biens", href: "/biens" },
    { name: "Notre philosophie", href: "/philosophie" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location === path;
    if (path.startsWith("/#")) return false;
    return location.startsWith(path);
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-gray-700/95 backdrop-blur-md" 
          : "bg-gray-700"
      }`}
    >
      <div className="w-full px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 w-full">
          {/* Logo - Left Edge */}
          <div className="flex-shrink-0">
            <Link href="/">
              <div className="flex items-center space-x-3 group cursor-pointer">
                <span className="text-2xl font-display-light text-white group-hover:text-chartreuse transition-colors duration-300">
                  Hors-Serie<span className="text-chartreuse">.immo</span>
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - Center */}
          <div className="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-10">
              {navigation.map((item) => {
                return (
                  <Link key={item.name} href={item.href}>
                    <div
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      className={`relative flex items-center px-4 py-3 rounded-lg transition-all duration-300 group ${
                        isActive(item.href)
                          ? "text-chartreuse font-semibold"
                          : "text-white hover:text-chartreuse"
                      }`}
                    >
                      <span className="font-medium">{item.name}</span>
                      <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-chartreuse transform origin-left transition-transform duration-300 ${
                        isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}></div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Search Button - Right Edge */}
          <div className="hidden md:flex flex-shrink-0">
            <Link href="/biens">
              <Button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="btn-chartreuse px-6 py-2 rounded-full font-semibold flex items-center space-x-2"
              >
                <Search className="w-4 h-4" />
                <span>Recherche</span>
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-white hover:text-chartreuse">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-gray-800 border-l border-gray-700">
              <div className="flex flex-col space-y-6 mt-8">
                <Link href="/">
                  <div className="flex items-center space-x-3 mb-12">
                    <span className="text-2xl font-display-light text-white">
                      Hors-Serie<span className="text-chartreuse">.immo</span>
                    </span>
                  </div>
                </Link>
                
                {navigation.map((item) => {
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => {
                        setIsOpen(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      <div
                        className={`flex items-center px-6 py-4 rounded-lg transition-all duration-300 ${
                          isActive(item.href)
                            ? "text-chartreuse bg-gray-900 border border-chartreuse/20"
                            : "text-white hover:text-chartreuse hover:bg-gray-900"
                        }`}
                      >
                        <span className="font-medium text-lg">{item.name}</span>
                      </div>
                    </Link>
                  );
                })}

                <div className="pt-6 border-t border-gray-700">
                  <Button className="btn-chartreuse w-full py-3 rounded-lg flex items-center justify-center space-x-2">
                    <Search className="w-4 h-4" />
                    <span>Recherche Avancée</span>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}