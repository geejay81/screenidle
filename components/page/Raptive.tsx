export default function Raptive() {
    return (
        <>
            <script data-no-optimize="1" data-cfasync="false" dangerouslySetInnerHTML={{ __html: `
            (function(w, d) {
                w.adthrive = w.adthrive || {};
                w.adthrive.cmd = w.
                adthrive.cmd || [];
                w.adthrive.plugin = 'adthrive-ads-manual';
                w.adthrive.host = 'ads.adthrive.com';var s = d.createElement('script');
                s.async = true;
                s.referrerpolicy='no-referrer-when-downgrade';
                s.src = 'https://' + w.adthrive.host + '/sites/66e44c7208809622c00c1bca/ads.min.js?referrer=' + w.encodeURIComponent(w.location.href) + '&cb=' + (Math.floor(Math.random() * 100) + 1);
                var n = d.getElementsByTagName('script')[0];
                n.parentNode.insertBefore(s, n);
            })(window, document);
            `}} />
        </>
    )
}