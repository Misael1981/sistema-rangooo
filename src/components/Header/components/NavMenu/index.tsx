import { Button } from "@/components/ui/button";
import { linksPage } from "@/helpers/links-page-menu";
import Link from "next/link";

const NavMenu = () => {
  return (
    <nav className="w-full">
      <ul className="flex w-full items-center gap-6 font-bold">
        <li className="group relative">
          <Button
            variant="ghost"
            className="group relative w-full transform overflow-hidden rounded-xl bg-linear-to-r from-orange-500 to-red-500 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-orange-600 hover:to-red-600 hover:shadow-2xl active:scale-95"
            asChild
          >
            <Link href="https://rangooo.vercel.app/">
              {/* Efeito de brilho no hover */}
              <span className="absolute inset-0 translate-x-full bg-linear-to-r from-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              {/* Texto do botão */}
              <span className="relative z-10 text-white hover:text-yellow-100">
                App Rangooo
              </span>
            </Link>
          </Button>
        </li>
        {linksPage.map((item) => (
          <li key={item.id} className="group relative">
            <a
              href={item.href}
              className="relative z-10 rounded-lg px-4 py-2 font-medium text-orange-600 transition-all duration-500 group-hover:text-white"
            >
              {item.label}
              <span className="absolute inset-0 -z-10 scale-0 rounded-lg bg-linear-to-r from-orange-500 to-red-500 transition-transform duration-500 group-hover:scale-100"></span>
            </a>
          </li>
        ))}
        <li>
          <Button
            variant="ghost"
            className="group relative w-full transform overflow-hidden rounded-xl bg-linear-to-r from-orange-500 to-red-500 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-orange-600 hover:to-red-600 hover:shadow-2xl active:scale-95"
            asChild
          >
            <Link href="/cadastro">
              {/* Efeito de brilho no hover */}
              <span className="absolute inset-0 translate-x-full bg-linear-to-r from-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              {/* Texto do botão */}
              <span className="relative z-10 text-white hover:text-yellow-100">
                Teste Grátis
              </span>
            </Link>
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default NavMenu;
