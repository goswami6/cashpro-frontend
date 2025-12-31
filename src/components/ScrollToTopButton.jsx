import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    const scrolled = window.scrollY;
    setIsVisible(scrolled > 400);

    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrolled / scrollHeight) * 100;
    setScrollProgress(progress);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // SVG Circle Logic:
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <button
        type="button"
        onClick={scrollToTop}
        className={`
          relative flex items-center justify-center w-14 h-14 rounded-full shadow-xl
          bg-white transition-all duration-500 ease-in-out transform
          ${isVisible ? "translate-y-0 opacity-100 scale-100 rotate-0" : "translate-y-24 opacity-0 scale-0 rotate-180"}
          hover:scale-110 active:scale-95 group
        `}
      >
        {/* Progress Circle (SVG) */}
        <svg className="absolute w-full h-full -rotate-90 transform">
          {/* Background Track */}
          <circle
            cx="28"
            cy="28"
            r={radius}
            stroke="currentColor"
            strokeWidth="3"
            fill="transparent"
            className="text-gray-100"
          />
          {/* Progress Bar */}
          <circle
            cx="28"
            cy="28"
            r={radius}
            stroke="currentColor"
            strokeWidth="3"
            fill="transparent"
            strokeDasharray={circumference}
            style={{ 
              strokeDashoffset: offset, 
              transition: "stroke-dashoffset 0.1s linear" 
            }}
            className="text-primary"
          />
        </svg>

        {/* Arrow Icon - Removed bounce animation */}
        <ArrowUp 
          size={22} 
          className="text-dark group-hover:text-primary transition-colors z-10" 
        />

        {/* Note: Outer Pulsing Glow (ping) has been removed */}
      </button>
    </div>
  );
};

export default ScrollToTopButton;