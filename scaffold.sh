#!/bin/bash
set -e

echo ""
echo "  AnswersMD Dev - NewPatients hero fix"
echo "  ======================================"
echo ""

echo "  Patching hero colors..."

sed -i '' 's|bg="brand.evergreen" ref={heroRef}|bg="brand.ivory" ref={heroRef}|' src/pages/NewPatients/index.jsx

sed -i '' 's|color="whiteAlpha.500" mb={5}|color="brand.champagne" mb={5}|' src/pages/NewPatients/index.jsx

sed -i '' 's|fontWeight={700} color="white" lineHeight|fontWeight={700} color="brand.slate" lineHeight|' src/pages/NewPatients/index.jsx

sed -i '' 's|color="whiteAlpha.700" lineHeight={1.8} maxW="520px"|color="brand.body" lineHeight={1.8} maxW="520px"|' src/pages/NewPatients/index.jsx

echo ""
echo "  Done. Hero now matches Services page (ivory bg, dark text)."
echo ""