import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react"; // ou outro ícone, opcional

const ScrollToTopButton = () => {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowButton(window.scrollY > 100);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        showButton && (
            <button
                onClick={scrollToTop}
                className="fixed bottom-6 right-6 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all z-50"
                aria-label="Voltar ao topo"
            >
                <ArrowUp className="w-5 h-5" />
            </button>
        )
    );
};

export default ScrollToTopButton;
