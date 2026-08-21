/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        soc: {
          // deep base surfaces
          950: '#05080f',
          900: '#080d18',
          850: '#0b1220',
          800: '#0e1626',
          750: '#121c30',
          700: '#172338',
          650: '#1c2a42',
          600: '#243450',
          // neutral text
          300: '#8b9cb8',
          200: '#aebdd6',
          100: '#d3deee',
          50: '#eef3fb',
        },
        accent: {
          DEFAULT: '#3b82f6',
          soft: '#60a5fa',
          deep: '#1d4ed8',
          glow: 'rgba(59, 130, 246, 0.45)',
        },
        threat: {
          low: '#22c55e',
          medium: '#f59e0b',
          high: '#ef4444',
          critical: '#dc2626',
        },
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(59,130,246,0.18), 0 18px 50px -12px rgba(59,130,246,0.25)',
        'glow-red':
          '0 0 0 1px rgba(239,68,68,0.20), 0 18px 50px -12px rgba(239,68,68,0.30)',
        card: '0 24px 60px -24px rgba(0,0,0,0.8), 0 4px 16px -4px rgba(0,0,0,0.4)',
      },
      keyframes: {
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '70%': { transform: 'scale(1.4)', opacity: '0' },
          '100%': { transform: 'scale(1.4)', opacity: '0' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        ticker: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' },
        },
      },
      animation: {
        'pulse-ring': 'pulse-ring 2.2s cubic-bezier(0.4,0,0.2,1) infinite',
        'fade-up': 'fade-up 0.5s ease-out both',
        shimmer: 'shimmer 2.5s linear infinite',
        ticker: 'ticker 30s linear infinite',
      },
    },
  },
  plugins: [],
};
