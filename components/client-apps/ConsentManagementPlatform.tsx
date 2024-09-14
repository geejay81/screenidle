"use client"

import Script from "next/script";

declare var cookieconsent: any;
declare var gtag: any;
declare var window: any;

type ConsentManagementPlatformProps = {
    GA_MEASUREMENT_ID : string
};

export default function ConsentManagementPlatform({GA_MEASUREMENT_ID} : ConsentManagementPlatformProps)
{
    return (
        <>
            <Script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}></Script>
            <Script id="gtag-config">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('consent', 'default', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied'
            });

            gtag('config', '${GA_MEASUREMENT_ID}');
            `}</Script>
            <Script src="//www.termsfeed.com/public/cookie-consent/4.1.0/cookie-consent.js" onLoad={() => {
                cookieconsent.run(
                    {
                      "notice_banner_type":"simple",
                      "consent_type":"express",
                      "palette":"light",
                      "language":"en",
                      "page_load_consent_levels":["strictly-necessary"],
                      "notice_banner_reject_button_hide":false,
                      "preferences_center_close_button_hide":false,
                      "page_refresh_confirmation_buttons":false,
                      "callbacks": {
                        "scripts_specific_loaded": (level: string) => {
                          switch(level) {
                            case 'targeting':
                              gtag('consent', 'update', {
                                'analytics_storage': 'granted'
                              });
                              if (window.clarity) window.clarity('consent');
                              break;
                          }
                        }
                      },
                      "callbacks_force": true
                    });
            }}></Script>
            
            <script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script>
            <script>{`
              window.googletag = window.googletag || {cmd: []};
              googletag.cmd.push(function() {
                googletag.defineSlot(
                  '/18190176,23123829744/MCM_Validation',
                  [1, 1],
                  'div-gpt-ad-1614955491295-0'
                ).addService(googletag.pubads());
                googletag.pubads().enableSingleRequest();
                googletag.enableServices();
              });
              `}
            </script>
            <div id="div-gpt-ad-1614955491295-0">
              <script>{`
                googletag.cmd.push(function() {
                  if (googletag.pubads().isInitialLoadDisabled()) {
                    googletag.display('div-gpt-ad-1614955491295-0');
                    googletag.refresh('div-gpt-ad-1614955491295-0');
                  } else {
                    googletag.display('div-gpt-ad-1614955491295-0');
                  }
                });
                `}
              </script>
            </div>
        </>
    );
}