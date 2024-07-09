import Link from "next/link";
import Image from "next/image";
import { FaYoutube, FaFacebook, FaTwitter } from "react-icons/fa";
import { Button } from "./ui/button";
import DropDown from "./DropDown";
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";
const socials = [
    { name: "YouTube", href: "https://www.youtube.com", icon: <FaYoutube /> },
    { name: "Facebook", href: "https://www.facebook.com", icon: <FaFacebook /> },
    { name: "Twitter", href: "https://www.twitter.com", icon: <FaTwitter /> },
]
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default async function Header() {
    const { isAuthenticated, getUser } = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();
    const user = await getUser();
    return (
        <header className="py-6 shadow-md">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row md:justify-between gap-6">
                    <div className="flex gap-6 items-center justify-center xl:w-max">
                        <Link href="/">
                            <Image
                                src="/booking-high-resolution-logo.png"
                                alt="Booking Logo"
                                width={100}
                                height={100}
                            />
                        </Link>
                        <div className="w-px h-10 bg-gray-300"></div>
                        <div className="flex gap-3">
                            {socials.map((social) => (
                                <Link
                                    key={social.name}
                                    href={social.href}
                                    className="text-gray-500 hover:text-gray-700 transition-all duration-400 ease-in-out"
                                    target="_blank"
                                >
                                    {social.icon}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-8 items-center justify-center xl:w-max">
                        <div className="flex gap-3 items-center xl:order-2">
                            {isUserAuthenticated ? <DropDown user={user} /> : <div className="flex gap-3">
                                <LoginLink>
                                    <Button variant={"ghost"}>Sign in</Button>
                                </LoginLink>
                                <RegisterLink>
                                    <Button>Sign up</Button>
                                </RegisterLink>
                            </div>}
                        </div>
                        <div className="xl:hidden lg:hidden"><MobileNav/></div>
                        <div className="hidden xl:flex lg:flex"><DesktopNav isUserAuthenticated={isUserAuthenticated}/></div>
                    </div>
                </div>
            </div>
        </header>
    );
}