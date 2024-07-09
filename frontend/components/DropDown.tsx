import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuLabel,
    DropdownMenuGroup,
    DropdownMenuShortcut
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { FaCalendarCheck, FaHome, FaSignOutAlt } from 'react-icons/fa';

export default function DropDown({ user }: { user: any }) {
    console.log(user)
    return (
        <div className="flex items-center justify-center">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <Avatar>
                            <AvatarImage src={user?.picture} />
                            <AvatarFallback className="bg-orange-500 text-white rounded">
                                {user?.given_name?.charAt(0)} {user?.family_name?.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="flex gap-1 font-bold">
                                <p>{user?.given_name}</p>
                                <p>{user?.family_name}</p>
                            </div>
                            <p className="text-sm font-semibold">{user?.email}</p>
                        </div>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link href="/">
                        <DropdownMenuItem>
                            Home
                            <DropdownMenuShortcut className="text-orange-500"> <FaHome /> </DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </Link>
                    <Link href="/dashboard">
                        <DropdownMenuItem>
                            Dashboard
                            <DropdownMenuShortcut className="text-orange-500"> <FaCalendarCheck /> </DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <LogoutLink>
                    <DropdownMenuItem>
                            Log out
                            <DropdownMenuShortcut className="text-orange-500"> <FaSignOutAlt /> </DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </LogoutLink>
                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    );
}