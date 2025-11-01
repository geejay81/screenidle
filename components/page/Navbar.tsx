"use client"

import { headings } from "@/ui/fonts";
import Link from "next/link";
import { useState } from "react";
import { FaCalendar, FaFilm, FaGamepad, FaQuoteLeft, FaUnderline } from "react-icons/fa";
import Logo from "../ui/Logo";

const navLinks = [
    {
        "url": "/posters",
        "title": "Guess today's poster",
        "icon": <FaFilm className="inline" />
    },
    {
        "url": "/posters/history",
        "title": "Poster game history",
        "icon": <FaCalendar className="inline" />
    },
    {
        "url": "/taglines",
        "title": "Guess today's tagline",
        "icon": <FaQuoteLeft className="inline" />
    },
    {
        "url": "/taglines/history",
        "title": "Tagline game history",
        "icon": <FaCalendar className="inline" />
    },
    {
        "url": "/blank-buster",
        "title": "Today's movie blank buster",
        "icon": <FaUnderline className="inline" />
    },
    {
        "url": "/blank-buster/history",
        "title": "Movie blank buster game history",
        "icon": <FaCalendar className="inline" />
    },
    {
        "url": "/games",
        "title": "More games",
        "icon": <FaGamepad className="inline" />
    }
]

export default function Navbar() {

    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <nav className="nav-section">
            <div className="nav-container">
                <div className={`nav-brand ${headings.className}`}>
                    <Link prefetch={false} href="/" className="space-x-2">
                        <Logo />
                    </Link>
                </div>
                <div className="nav-links">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                </div>
                {isOpen && (
                    <div className="absolute top-0 right-0 w-full md:w-96 h-screen z-50" role="navigation">
                        <div className="bg-screenidle-success h-full p-6 text-slate-800">
                            <a href="#" onClick={() => setIsOpen(false)} 
                                className="text-3xl float-right">&times;</a>
                            <ul>
                            {navLinks &&
                                navLinks
                                    .map((link: any) => (
                                    <li key={link.url} className="mt-4">
                                        <Link 
                                            href={link.url} 
                                            title={link.title}
                                            onClick={() => setIsOpen(false)} 
                                            className="space-x-2"
                                            prefetch={false}>
                                            {link.icon}
                                            <span>{link.title}</span>
                                        </Link>
                                    </li>
                                ))
                            } 
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}
