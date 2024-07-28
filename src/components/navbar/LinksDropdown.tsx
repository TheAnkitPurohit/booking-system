import Link from "next/link";
import { links } from "@/utils/links";
import { auth } from "@clerk/nextjs/server";
import { LuAlignLeft } from "react-icons/lu";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import UserIcon from "./UserIcon";
import { Button } from "../ui/button";
import SignOutLink from "./SignOutLink";

function LinksDropdown() {
  const { userId } = auth();
  const isAdminUser = userId === process.env.ADMIN_USER_ID;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex gap-4 max-w-[100px]">
          <LuAlignLeft className="w-6 h-6" />
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52" align="start" sideOffset={10}>
        <SignedOut>
          <DropdownMenuItem>
            <SignInButton mode="modal">
              <button type="button" className="w-full text-left">
                Login
              </button>
            </SignInButton>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignUpButton mode="modal">
              <button type="button" className="w-full text-left">
                Register
              </button>
            </SignUpButton>
          </DropdownMenuItem>
        </SignedOut>
        <SignedIn>
          {links.map((link) => {
            if (link.label === "admin" && !isAdminUser) return null;
            return (
              <DropdownMenuItem key={link.href}>
                <Link href={link.href} className="capitalize w-full">
                  {link.label}
                </Link>
              </DropdownMenuItem>
            );
          })}
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignOutLink />
          </DropdownMenuItem>
        </SignedIn>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default LinksDropdown;
