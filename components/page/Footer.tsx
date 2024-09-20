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
        <footer className="footer-section">
            <div className="footer-container">
                {footerLinks.map((link,index) => (
                    <Link key={index} href={link.url} title={`Visit ScreenIdle on ${link.title}`} className="p-4"
                        prefetch={false}>
                        {link.icon}<span className="sr-only">Visit ScreenIdle on {link.title}</span>
                    </Link>
                ))}
                {/* <a href="" onClick={"javascript:adthrive.cmd.push(adthrive.showPrivacyPreferences);"} id="open_preferences_center" className="p-4" title="Manage cookies">
                    <FaCookie /><span className="sr-only">Manage cookies</span>
                </a> */}
                <a href="/privacy" className="p-4" title="Privacy">
                    Privacy
                </a>
            </div>
        </footer>
    )
}