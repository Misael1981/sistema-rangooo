import Image from "next/image";
import HeaderSheet from "./components/HeaderSheet";
import NavMenu from "./components/NavMenu";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 lg:px-20">
      <Image src="/logo-rangooo.png" alt="Rangooo" width={70} height={50} />
      <div className="hidden lg:block">
        <NavMenu />
      </div>
      <HeaderSheet />
    </header>
  );
};

export default Header;
