'use client';
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { RiMenu4Fill } from "react-icons/ri";
import Link from "next/link";

export default function MobileNav() {
    const links = [
        {
            name: "Home",
            path: "/",
        },
        {
            name: "About",
            path: "/"
        },
        {
            name: "Best deals",
            path: "/",
        },
        {
            name: "Contact",
            path: "/"
        }
    ]
    return (
        <Sheet>
            <SheetTrigger><RiMenu4Fill className="text-orange-600 text-2xl" /></SheetTrigger>
            <SheetContent>
                <div className="flex flex-col gap-4 items-center pt-20">
                    {links.map((link) => (
                        <Link key={link.path} href={link.path} className="hover:text-orange-500 transition-all ease-in-out duration-500">{link.name}</Link>
                    ))}
                </div>
            </SheetContent>
        </Sheet>

    )
}