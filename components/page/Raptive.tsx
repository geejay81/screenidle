export default function Raptive() {
    return (
        <>
            <script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script>
            <script dangerouslySetInnerHTML={{ __html: `
            window.googletag = window.googletag || {cmd: []};
            googletag.cmd.push(function() {
                googletag.defineSlot(
                '/18190176,23123829744/MCM_Validation',
                [1, 1],
                'div-gpt-ad-1614955491295-0'
                ).addService(googletag.pubads());
                googletag.pubads().enableSingleRequest();
                googletag.enableServices();
            });`}} />
            <div id="div-gpt-ad-1614955491295-0">
            <script dangerouslySetInnerHTML={{ __html: `
                googletag.cmd.push(function() {
                if (googletag.pubads().isInitialLoadDisabled()) {
                    googletag.display('div-gpt-ad-1614955491295-0');
                    googletag.refresh('div-gpt-ad-1614955491295-0');
                } else {
                    googletag.display('div-gpt-ad-1614955491295-0');
                }
                });`}} />
            
            </div>
        </>
    )
}