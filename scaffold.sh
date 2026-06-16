#!/bin/bash
set -e

echo ""
echo "  AnswersMD Dev - Contact hero + Signup logo fix"
echo "  ================================================"
echo ""

echo "  Fixing Contact hero (green -> ivory)..."
sed -i '' 's|pb={{ base: 12, md: 16 }} bg="brand.evergreen"|pb={{ base: 12, md: 16 }} bg="brand.ivory"|' src/pages/Contact/index.jsx
sed -i '' 's|color="whiteAlpha.500" mb={5}|color="brand.champagne" mb={5}|' src/pages/Contact/index.jsx
sed -i '' 's|fontWeight={700} color="white" lineHeight|fontWeight={700} color="brand.slate" lineHeight|' src/pages/Contact/index.jsx
sed -i '' 's|color="whiteAlpha.700" lineHeight={1.8}|color="brand.body" lineHeight={1.8}|' src/pages/Contact/index.jsx

echo "  Fixing Signup logo size..."
sed -i '' 's|src="/logo-dark.png" alt="AnswersMD" h="24px"|src="/logo-dark.png" alt="AnswersMD" h={{ base: "28px", md: "36px" }}|' src/pages/Signup/index.jsx

echo ""
echo "  Done."
echo "    - Contact hero: ivory bg, dark text"
echo "    - Signup logo: 28px mobile / 36px desktop (matches nav)"
echo ""