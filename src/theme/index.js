// src/theme/index.js
import { extendTheme } from '@chakra-ui/react';

var theme = extendTheme({
  colors: {
    brand: {
      evergreen: '#1B3A34',
      evergreenLight: '#234840',
      forest: '#2A4A42',
      forestLight: '#3A5E54',
      champagne: '#C4A265',
      champagneLight: '#D4B87A',
      champagneDark: '#A88B50',
      champagneSoft: 'rgba(196, 162, 101, 0.06)',
      champagneLine: 'rgba(196, 162, 101, 0.2)',
      ivory: '#FAFAF7',
      mist: '#F0EDE8',
      white: '#FFFFFF',
      slate: '#2D2D2D',
      body: '#4A4540',
      bodyLight: '#6B6560',
      warmGrayLight: '#9A9590',
      border: '#E8E4DE',
      borderLight: '#F0ECE6',
      overlay: 'rgba(27, 58, 52, 0.85)'
    }
  },
  fonts: {
    heading: '"Libre Baskerville", Georgia, serif',
    body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1.0625rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '2rem',
    '4xl': '2.5rem',
    '5xl': '3.25rem',
    '6xl': '4rem',
    '7xl': '5rem'
  },
  radii: {
    btn: '8px',
    card: '18px',
    image: '24px',
    panel: '28px'
  },
  space: {
    section: '120px',
    sectionMobile: '80px'
  },
  styles: {
    global: {
      'html': {
        overflowX: 'hidden',
        width: '100%'
      },
      'body': {
        bg: 'brand.ivory',
        color: 'brand.body',
        fontFamily: 'body',
        fontSize: 'md',
        lineHeight: 1.7,
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        overflowX: 'hidden',
        width: '100%',
        position: 'relative'
      },
      '#root': {
        overflowX: 'hidden',
        width: '100%',
        position: 'relative'
      },
      'h1, h2, h3, h4, h5, h6': {
        fontFamily: 'heading',
        color: 'brand.slate',
        fontWeight: 700,
        lineHeight: 1.15
      },
      a: {
        color: 'inherit',
        textDecoration: 'none',
        transition: 'color 0.2s ease'
      },
      '::selection': {
        bg: 'brand.champagneSoft',
        color: 'brand.slate'
      }
    }
  },
  components: {
    Button: {
      baseStyle: {
        fontFamily: 'body',
        fontWeight: 500,
        transition: 'all 0.3s ease'
      },
      variants: {
        primary: {
          bg: 'brand.evergreen',
          color: 'white',
          fontSize: 'md',
          borderRadius: 'btn',
          px: 8,
          py: 6,
          _hover: {
            bg: 'brand.evergreenLight',
            transform: 'translateY(-2px)',
            shadow: '0 8px 24px rgba(27, 58, 52, 0.2)'
          },
          _active: {
            transform: 'translateY(0)'
          }
        },
        secondary: {
          bg: 'transparent',
          color: 'brand.evergreen',
          fontSize: 'md',
          borderRadius: 'btn',
          border: '1px solid',
          borderColor: 'brand.border',
          px: 8,
          py: 6,
          _hover: {
            borderColor: 'brand.evergreen',
            bg: 'brand.evergreen',
            color: 'white',
            transform: 'translateY(-2px)'
          }
        },
        ghost: {
          color: 'brand.body',
          borderRadius: 'btn',
          _hover: {
            bg: 'brand.mist',
            color: 'brand.slate'
          }
        },
        light: {
          bg: 'white',
          color: 'brand.evergreen',
          fontSize: 'md',
          borderRadius: 'btn',
          px: 8,
          py: 6,
          _hover: {
            bg: 'brand.ivory',
            transform: 'translateY(-2px)',
            shadow: '0 8px 24px rgba(27, 58, 52, 0.15)'
          }
        }
      },
      sizes: {
        lg: { px: 10, py: 7, fontSize: 'md' },
        md: { px: 8, py: 6, fontSize: 'sm' },
        sm: { px: 6, py: 5, fontSize: 'md' }
      }
    }
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false
  }
});

export default theme;
