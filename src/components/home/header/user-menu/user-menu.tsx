"use client";

// Remove Image import - vamos usar img tag normal
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useAuth } from "@/context/AuthContext";
import styles from "./user-menu.module.css";

const userAvatar = PlaceHolderImages.find((img) => img.id === "user-avatar");

export function UserMenu() {
  const { user, isAuthenticated, logout } = useAuth(); // Renamed isLoggedIn to isAuthenticated

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={styles.userMenuTrigger}>
          {isAuthenticated && user && ( // Renamed isLoggedIn to isAuthenticated
            <img
              src={user.profile_image_url || userAvatar?.imageUrl || 'https://placehold.co/400x400/png'}
              width={40}
              height={40}
              alt={user.name || user.email || "User Avatar"}
              className={styles.userAvatar}
            />
          )}
          {!isAuthenticated && userAvatar && ( // Renamed isLoggedIn to isAuthenticated
            <img
              src={userAvatar.imageUrl}
              width={40}
              height={40}
              alt={userAvatar.description}
              data-ai-hint={userAvatar.imageHint}
              className={styles.placeholderAvatar}
            />
          )}
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {isAuthenticated && user ? ( // Renamed isLoggedIn to isAuthenticated
          <>
            <DropdownMenuLabel>{user.name || user.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/home/settings">Configurações</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Suporte</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>Sair</DropdownMenuItem>
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
  );
}
