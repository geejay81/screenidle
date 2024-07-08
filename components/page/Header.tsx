import { headings } from "@/ui/fonts"

type HeaderProps = {
    title: string
}

export default function Header({title}: HeaderProps) {
    return (
        <header>
            <div className="header-container">
                <h1 className={`header-title ${headings.className}`}>
                    {title}
                </h1>
            </div>
        </header>
    )
}