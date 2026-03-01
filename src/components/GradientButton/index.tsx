import Link from "next/link";
import { Button } from "../ui/button";

type GradientButtonProps = {
  href: string;
  children: React.ReactNode;
};

const GradientButton = ({ href, children }: GradientButtonProps) => {
  return (
    <Button
      variant="ghost"
      className="group relative w-full transform overflow-hidden rounded-xl bg-linear-to-r from-orange-500 to-red-500 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-orange-600 hover:to-red-600 hover:shadow-2xl active:scale-95"
      asChild
    >
      <Link href={href} target="_blank" rel="noopener noreferrer">
        {/* Efeito de brilho no hover */}
        <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

        {/* Texto do botão */}
        <span className="relative z-10 text-white hover:text-yellow-100">
          {children}
        </span>
      </Link>
    </Button>
  );
};

export default GradientButton;
