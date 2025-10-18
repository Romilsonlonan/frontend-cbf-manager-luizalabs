
"use client";

import Image from "next/image";
import Link from "next/link";
import { Bell, ChevronLeft, ChevronRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const userAvatar = PlaceHolderImages.find((img) => img.id === "user-avatar");

export function DashboardHeader() {
  const { state } = useSidebar();
  // Mock login state
  const isLoggedIn = false; 

  return (
    <header className="flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6 sticky top-0 z-30">
      <SidebarTrigger className="md:hidden" />
      <div className="w-full flex-1" />
      <Button variant="ghost" size="icon" className="rounded-full">
        <Bell className="h-5 w-5" />
        <span className="sr-only">Toggle notifications</span>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            {userAvatar && (
              <Image
                src={userAvatar.imageUrl}
                width={40}
                height={40}
                alt={userAvatar.description}
                data-ai-hint={userAvatar.imageHint}
                className="rounded-full"
              />
            )}
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {isLoggedIn ? (
            <>
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Configurações</DropdownMenuItem>
              <DropdownMenuItem>Suporte</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Sair</DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem asChild>
                <Link href="/login">Login</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/register">Cadastre-se</Link>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
       <SidebarTrigger className="hidden md:flex" asChild>
          <Button variant="ghost" size="icon">
            {state === 'expanded' ? <ChevronLeft /> : <ChevronRight />}
          </Button>
        </SidebarTrigger>
    </header>
  );
}
