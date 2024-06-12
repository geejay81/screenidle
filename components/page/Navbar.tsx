import { headings } from "@/ui/fonts";
import Link from "next/link";
import { FaCalendar, FaFilm } from "react-icons/fa";
import { FaClapperboard } from "react-icons/fa6";

const navLinks = [
    {
        "url": "/posters",
        "title": "Today's puzzle",
        "icon": <FaFilm className="inline" />
    },
    {
        "url": "/posters/history",
        "title": "History",
        "icon": <FaCalendar className="inline" />
    }
]

export default function Navbar() {
    return (
        <nav className="max-w-md p-4 mx-auto flex flex-row items-center justify-between
            md:max-w-screen-lg md:px-8">
            <div className={`text-xl md:text-2xl ${headings.className}`}>
                <Link href="/" className="space-x-2">
                    <FaClapperboard className="inline" /><span>ScreenIdle</span>
                </Link>
            </div>
            <div className="flex flex-row space-x-4 items-end">
                {navLinks &&
                        navLinks
                            .map((link: any) => (
                            <Link 
                                key={link.url} 
                                href={link.url} 
                                className="inline-flex flex-row items-center space-x-2"
                                title={link.title}>
                                {link.icon}
                                <span className="sr-only md:not-sr-only">{link.title}</span>
                            </Link>
                        ))
                    }
            </div>
        </nav>
    )
}

/*
<nav className="container mx-auto max-w-5xl flex items-center justify-between p-4 px-8">
                <div className="text-2xl md:text-3xl">
                    <Link href="/" className={`${logo.className} space-x-1`}>
                        <FaRecordVinyl className="inline" />
                        <span>{gameConfig.gameTitle}</span>
                    </Link>
                </div>
                <div className="space-x-5">
                    {navLinks &&
                        navLinks
                            .map((link: any) => (
                            <Link 
                                key={link.url} 
                                href={link.url} 
                                className="inline-flex flex-row items-center space-x-2"
                                title={link.title}>
                                {link.icon}
                                <span className="sr-only md:not-sr-only">{link.title}</span>
                            </Link>
                        ))
                    }
                </div> 
            </nav>
*/