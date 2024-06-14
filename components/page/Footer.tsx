export default function Footer() {

    const showCookieManager = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        
    }
    return (
        <footer className="max-w-md p-4 mx-auto flex flex-col md:flex-row items-center justify-between
            md:max-w-screen-lg md:px-8">
            <a href="" onClick={showCookieManager}>Manage cookies</a>
        </footer>
    )
}