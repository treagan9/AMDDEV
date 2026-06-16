#!/bin/bash
set -e
echo ""
echo "  AnswersMD Dev - OG image fix"
echo "  =============================="
echo ""
echo "Writing files..."

echo "  -> index.html"
cat > "index.html" << 'AMD_EOF_01'
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>Concierge Medicine Made Simple &middot; AnswersMD&#8482;</title>
    <meta name="title" content="Concierge Medicine Made Simple &middot; AnswersMD&#8482;" />
    <meta name="description" content="Direct access to your physician whenever you need it. Personalized, accessible and designed around your life. Tampa, St. Petersburg and Boca Raton." />

    <meta name="keywords" content="concierge medicine, direct primary care, concierge doctor Tampa, concierge doctor St Petersburg, concierge doctor Boca Raton, AnswersMD, executive health, house calls, 24/7 physician access, membership medicine Florida" />
    <meta name="author" content="AnswersMD" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://answersmd01.netlify.app/" />

    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://answersmd01.netlify.app/" />
    <meta property="og:title" content="Concierge Medicine Made Simple &middot; AnswersMD&#8482;" />
    <meta property="og:description" content="Direct access to your physician whenever you need it. Personalized, accessible and designed around your life. Tampa, St. Petersburg and Boca Raton." />
    <meta property="og:image" content="https://answersmd01.netlify.app/answersmd-sms-1200x630.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="AnswersMD - Concierge Medicine Made Simple" />
    <meta property="og:site_name" content="AnswersMD" />
    <meta property="og:locale" content="en_US" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="https://answersmd01.netlify.app/" />
    <meta name="twitter:title" content="Concierge Medicine Made Simple &middot; AnswersMD&#8482;" />
    <meta name="twitter:description" content="Direct access to your physician whenever you need it. Personalized, accessible and designed around your life." />
    <meta name="twitter:image" content="https://answersmd01.netlify.app/answersmd-sms-1200x630.png" />

    <meta name="theme-color" content="#1B3A34" />

    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      "name": "AnswersMD",
      "url": "https://answersmd.com",
      "logo": "https://answersmd.com/images/AnswersMD_logo_black.png",
      "description": "AnswersMD is a concierge medicine practice delivering personalized, proactive primary care through a membership model in Tampa, St. Petersburg and Boca Raton, Florida.",
      "telephone": "+1-813-727-3233",
      "email": "info@answersmd.com",
      "medicalSpecialty": "Family Medicine",
      "address": [
        {
          "@type": "PostalAddress",
          "addressLocality": "Tampa",
          "addressRegion": "FL",
          "addressCountry": "US"
        },
        {
          "@type": "PostalAddress",
          "addressLocality": "St. Petersburg",
          "addressRegion": "FL",
          "addressCountry": "US"
        },
        {
          "@type": "PostalAddress",
          "addressLocality": "Boca Raton",
          "addressRegion": "FL",
          "addressCountry": "US"
        }
      ],
      "sameAs": [
        "https://www.instagram.com/answersmd/"
      ]
    }
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
AMD_EOF_01


echo ""
echo "  Done. OG image URL now points to answersmd01.netlify.app"
echo "  Title: Concierge Medicine Made Simple . AnswersMD TM"
echo ""
echo "  Commit and push to see the SMS preview update."
echo ""