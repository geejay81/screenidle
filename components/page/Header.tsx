import { headings } from "@/ui/fonts"

type HeaderProps = {
    title: string
}

export default function Header({title}: HeaderProps) {
    return (
        <h1 className={`text-2xl ${headings.className}`}></h1>
    )
}