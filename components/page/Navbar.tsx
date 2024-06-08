import { headings } from "@/ui/fonts";
import Link from "next/link";
import { FaClapperboard } from "react-icons/fa6";


export default function Navbar() {
    return (
        <nav className="max-w-md p-4 mx-auto flex items-center justify-center">
            <div className={`text-2xl md:text-3xl ${headings.className}`}>
                <Link href="/" className="space-x-2">
                    <FaClapperboard className="inline" /><span>ScreenIdle</span>
                </Link>
            </div>
        </nav>
    )
}