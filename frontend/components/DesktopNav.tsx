'use client'
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
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
export default function DesktopNav({ isUserAuthenticated }: { isUserAuthenticated: boolean }) {
    const pathname = usePathname()
    console.log(isUserAuthenticated)
    return (
        <div className="flex gap-6 items-center justify-center xl:w-max">
            {links.map((link) => (
                <Link key={link.path} href={link.path} className="hover:text-orange-500 transition-all ease-in-out duration-500">{link.name}</Link>
            ))}
            {!isUserAuthenticated && pathname === '/dashboard' && redirect('/')}
        </div>
    )
}