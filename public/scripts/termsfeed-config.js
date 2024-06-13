function configureCMP() {
  cookieconsent.run(
    {
      "notice_banner_type":"simple",
      "consent_type":"express",
      "palette":"dark",
      "language":"en",
      "page_load_consent_levels":["strictly-necessary"],
      "notice_banner_reject_button_hide":false,
      "preferences_center_close_button_hide":false,
      "page_refresh_confirmation_buttons":false,
      "callbacks": {
        "scripts_specific_loaded": (level) => {
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
}

if (document.readyState !== 'loading') {
  configureCMP();
} else {
  document.addEventListener('DOMContentLoaded', function () {
    configureCMP();
  });
}
