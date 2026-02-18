"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { linksPage } from "@/helpers/links-page-menu";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const HeaderSheet = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {" "}
      {/* 3. Vincular o estado */}
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="group relative overflow-hidden border border-orange-600 bg-white p-3 transition-all duration-300 hover:border-orange-300 hover:shadow-lg active:scale-95 lg:hidden"
        >
          <Menu className="relative z-10 h-6 w-6 text-orange-600 transition-all duration-300 group-hover:scale-110 group-hover:text-orange-700" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[90%]">
        <SheetHeader>
          <SheetTitle>Rangooo</SheetTitle>
          <SheetDescription>
            Gerencie seu estabelecimento de forma eficiente.
          </SheetDescription>
        </SheetHeader>
        <nav className="w-full p-4">
          <ul className="w-full space-y-4 font-bold">
            <li className="border-b border-orange-300 py-2 text-lg">
              <Link
                href="https://rangooo.vercel.app/"
                onClick={() => setOpen(false)}
                className="text-orange-600"
              >
                App Rangooo
              </Link>
            </li>

            {linksPage.map((item) => (
              <li
                key={item.id}
                className="border-b border-orange-300 py-2 text-lg"
              >
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-orange-600 block w-full"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default HeaderSheet;
