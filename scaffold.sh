#!/bin/bash
set -e

echo ""
echo "  AnswersMD Dev - Signup logo match"
echo "  ==================================="
echo ""

sed -i '' 's|h={{ base: "28px", md: "36px" }}|h={{ base: "32px", md: "42px" }}|' src/pages/Signup/index.jsx

echo "  Done. Signup logo now 32/42px (exact match to main nav)."
echo ""