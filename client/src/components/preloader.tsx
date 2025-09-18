import { useEffect, useState } from "react";

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`preloader ${!isVisible ? 'fade-out' : ''}`}>
      <div className="preloader-logo animate-fade-in">
        Hors-Série.immo
      </div>
    </div>
  );
}