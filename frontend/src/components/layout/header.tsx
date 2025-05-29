"use client";
import { useUser } from "@/hooks/use-user";
import { Avatar, AvatarImage } from "../ui/avatar";
import { ChevronUp, Sun, User2 } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { logoutUser } from "@/actions/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Menu from "./menu";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileMenu from "./mobile-menu";

const Header = () => {
  const { data } = useUser();
  const router = useRouter();
  const { isMobile } = useIsMobile();

  const handleLogout = async () => {
    try {
      const res = await logoutUser();
      if (res.success) {
        router.push("/sign-in");
        toast("You were logged out");
      }
    } catch (e) {
      if (e instanceof Error) {
        toast(e.message);
      }
    }
  };

  return (
    <header className="w-full h-16 px-4 flex items-center justify-end gap-5 border-b bg-white shadow-sm">
      {!isMobile && <Menu />}
      {data && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer">
              {data ? (
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={`${data.data.avatar_url}`}
                    alt="user avatar"
                  />
                </Avatar>
              ) : (
                <User2 />
              )}
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate text-sm">
                  {data ? data.data.full_name : data.data.email}
                </span>
              </div>
              <ChevronUp className="ml-auto" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={"bottom"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuItem>
              <Link href={`/account`}>Account</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      <div>
        <Sun />
      </div>
      {isMobile && <MobileMenu />}
    </header>
  );
};

export default Header;
