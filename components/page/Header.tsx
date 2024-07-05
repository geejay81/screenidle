import { headings } from "@/ui/fonts"

type HeaderProps = {
    title: string
}

export default function Header({title}: HeaderProps) {
    return (
        <header>
            <div className="max-w-md p-4 mx-auto md:max-w-screen-lg md:px-8">
                <h1 className={`text-2xl w-fullwidth text-center md:text-left md:text-3xl ${headings.className}`}>
                    {title}
                </h1>
            </div>
        </header>
    )
}