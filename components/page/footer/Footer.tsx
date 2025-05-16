import Link from "next/link";
import { FaBluesky, FaXTwitter } from "react-icons/fa6";

export default function Footer() {

    const footerLinks = [
        {
            "title": "X",
            "url": "https://x.com/screenidlegame",
            "icon": <FaXTwitter />
        },
        {
            "title": "X",
            "url": "https://bsky.app/profile/screenidle.app",
            "icon": <FaBluesky />
        }
    ]
    
    return (
        <footer className="footer-section">
            <div className="footer-container">
                {footerLinks.map((link,index) => (
                    <Link key={index} href={link.url} title={`Visit ScreenIdle on ${link.title}`} className="p-4"
                        prefetch={false}>
                        {link.icon}<span className="sr-only">Visit ScreenIdle on {link.title}</span>
                    </Link>
                ))}
                <Link href="/privacy" prefetch={false} className="p-4" title="Privacy">
                    Privacy
                </Link>
            </div>
        </footer>
    )
}