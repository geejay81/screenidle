import Link from "next/link";
import { FaCookie, FaXTwitter } from "react-icons/fa6";

export default function Footer() {

    const footerLinks = [
        {
            "title": "X",
            "url": "https://x.com/screenidlegame",
            "icon": <FaXTwitter />
        }
    ]
    
    return (
        <footer className="border-t border-slate-400">
            <div className="max-w-md p-4 mx-auto flex flex-row items-center justify-center
                md:justify-start md:max-w-screen-lg md:px-8">
                {footerLinks.map((link,index) => (
                    <Link key={index} href={link.url} title={`Visit ScreenIdle on ${link.title}`} className="p-4"
                        prefetch={false}>
                        {link.icon}<span className="sr-only">Visit ScreenIdle on {link.title}</span>
                    </Link>
                ))}
                <a href="#" id="open_preferences_center" className="p-4" title="Manage cookies">
                    <FaCookie /><span className="sr-only">Manage cookies</span>
                </a>
            </div>
        </footer>
    )
}