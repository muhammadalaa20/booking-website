import Image from "next/image";
export default function Footer() {
    return (

        <footer className="bg-slate-900 shadow">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a
                        href="/"
                        className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <Image
                            src="/key.png"
                            width={32}
                            height={32}
                            alt="Booking Logo"/>
                        <span
                            className="self-center text-2xl font-semibold whitespace-nowrap text-white">Booking</span>
                    </a>
                    <ul
                        className="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0 text-gray-400">
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">About</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">Contact</a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"/>
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024
                    <a href="/" className="hover:underline"> Booking™</a>. All Rights Reserved.</span>
            </div>
        </footer>

    );
}