#!/bin/bash
set -e

echo ""
echo "  AnswersMD Dev - Hero text visibility fix"
echo "  =========================================="
echo ""

echo "  Boosting overlay and text contrast..."

sed -i '' 's|bg="rgba(250,250,247,0.45)"|bg={{ base: "rgba(250,250,247,0.6)", md: "rgba(250,250,247,0.45)" }}|' src/pages/Home/components/Hero.jsx

sed -i '' 's|color="brand.warmGrayLight" letterSpacing="1px"|color="brand.body" fontWeight={500} letterSpacing="1px"|' src/pages/Home/components/Hero.jsx

sed -i '' 's|bg="brand.champagneLine"|bg="brand.champagne"|' src/pages/Home/components/Hero.jsx

sed -i '' 's|color="brand.bodyLight"|color="brand.body"|' src/pages/Home/components/Hero.jsx

echo ""
echo "  Done."
echo "    - Mobile overlay: 60% (was 45%)"
echo "    - Location text: brand.body + medium weight"
echo "    - Dot separators: solid champagne"
echo "    - Secondary link: darker"
echo ""