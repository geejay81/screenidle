export default function AdBlockRecovery() {
    return (
        <>
            <script type="text/javascript" async src="https://btloader.com/tag?o=5698917485248512&upapi=true&domain=screenidle.app"></script>
            <script dangerouslySetInnerHTML={{ __html: 
            `!function(){"use strict";var e;e=document,function(){var t,n;function r(){var t=e.createElement("script");t.src="https://cafemedia-com.videoplayerhub.com/galleryplayer.js",e.head.appendChild(t)}function a(){var t=e.cookie.match("(^|[^;]+)\\s*__adblocker\\s*=\\s*([^;]+)");return t&&t.pop()}function c(){clearInterval(n)}return{init:function(){var e;"true"===(t=a())?r():(e=0,n=setInterval((function(){100!==e&&"false" !== t || c(), "true" === t && (r(), c()), t = a(), e++}), 50))}}}().init()}();`
            }} />
        </>
    )
}