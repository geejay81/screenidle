"use client"

import Script from "next/script";

declare var cookieconsent: any;
declare var gtag: any;

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
                      "notice_banner_type":"headline",
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
                              break;
                          }
                        }
                      },
                      "callbacks_force": true
                    });
            }}></Script>
            
            {/* <Script src="/scripts/termsfeed-config.js"></Script> */}
        </>
    );
}