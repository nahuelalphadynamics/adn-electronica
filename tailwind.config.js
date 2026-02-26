/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#00ffcc",
                "background-light": "#f5f8f8",
                "background-dark": "#0f231f",
            },
            fontFamily: {
                "display": ["Space Grotesk", "sans-serif"],
                "body": ["Noto Sans", "sans-serif"],
                "mono": ["JetBrains Mono", "monospace"],
            },
            animation: {
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'scanline': 'scanline 8s linear infinite',
            },
            keyframes: {
                scanline: {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(100%)' }
                }
            }
        },
    },
    plugins: [],
}
