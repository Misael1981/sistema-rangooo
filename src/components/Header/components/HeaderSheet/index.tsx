"use client";

import GradientButton from "@/components/GradientButton";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
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
        <nav className="mt-6 flex flex-col justify-between h-full gap-4">
          <div className="flex flex-col gap-4 p-6">
            {linksPage.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setOpen(false)}
                className="pb-2 border-b border-orange-600 text-lg font-semibold text-orange-600 transition-all duration-300 hover:bg-orange-50 hover:text-orange-700"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <SheetFooter className="mt-4 border-t space-y-4 border-orange-200 p-6">
            <GradientButton href="https://rangooo.vercel.app/">
              App Rangooo
            </GradientButton>

            <GradientButton href="/cadastro">Teste Grátis</GradientButton>
          </SheetFooter>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default HeaderSheet;
