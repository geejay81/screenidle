export default function GoogleAnalytics({GA_MEASUREMENT_ID}: {GA_MEASUREMENT_ID : string}) {
    return (
        <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}></script>
            <script id="gtag-config" dangerouslySetInnerHTML={{ __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
            `}}>
            </script>
        </>
    )
}