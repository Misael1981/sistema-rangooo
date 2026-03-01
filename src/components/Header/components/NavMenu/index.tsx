import GradientButton from "@/components/GradientButton";
import { linksPage } from "@/helpers/links-page-menu";

const NavMenu = () => {
  return (
    <nav className="w-full">
      <ul className="flex w-full items-center gap-6 font-bold">
        <li className="group relative">
          <GradientButton href="https://rangooo.vercel.app/">
            App Rangooo
          </GradientButton>
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
          <GradientButton href="/cadastro">Teste Grátis</GradientButton>
        </li>
      </ul>
    </nav>
  );
};

export default NavMenu;
