"use client"

import { headings } from "@/ui/fonts";
import Link from "next/link";
import { useState } from "react";
import { FaCalendar, FaFilm, FaGamepad, FaQuoteLeft } from "react-icons/fa";
import { FaClapperboard } from "react-icons/fa6";

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
                    <Link href="/" className="space-x-2">
                        <FaClapperboard className="inline" /><span>ScreenIdle</span>
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
                    <div className="absolute top-0 right-0 w-96 max-w-full h-screen">
                        <div className="bg-screenidle-warning h-full p-6 text-slate-800">
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
                                            onClick={() => setIsOpen(false)} className="space-x-2">
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