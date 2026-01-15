/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'dark-bg': '#0a0a0f',
                'dark-surface': '#12121a',
                'dark-card': '#1a1a25',
                'dark-text': '#f4f4f5',
                'dark-muted': '#a1a1aa',
                'light-bg': '#fafafa',
                'light-surface': '#ffffff',
                'light-card': '#f4f4f5',
                'light-text': '#18181b',
                'light-muted': '#71717a',
                'accent-purple': '#a855f7',
                'accent-violet': '#8b5cf6',
                'accent-cyan': '#06b6d4',
                'accent-pink': '#ec4899',
                'accent-blue': '#3b82f6',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'hero-gradient': 'linear-gradient(135deg, #a855f7 0%, #06b6d4 50%, #3b82f6 100%)',
                'card-gradient': 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)',
            },
            boxShadow: {
                'glow': '0 0 60px -15px rgba(168, 85, 247, 0.4)',
                'glow-lg': '0 0 100px -15px rgba(168, 85, 247, 0.5)',
                'card': '0 4px 30px rgba(0, 0, 0, 0.1)',
                'card-hover': '0 8px 40px rgba(168, 85, 247, 0.2)',
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                glow: {
                    '0%, 100%': { opacity: '0.4' },
                    '50%': { opacity: '0.8' },
                },
                gradientFlow: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
            },
            animation: {
                'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
                'float': 'float 6s ease-in-out infinite',
                'glow': 'glow 3s ease-in-out infinite',
                'gradient-flow': 'gradientFlow 5s ease infinite',
            },
        },
    },
    plugins: [],
};
