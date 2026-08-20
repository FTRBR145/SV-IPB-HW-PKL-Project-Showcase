/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Outfit', 'Open Sans', 'sans-serif'],
        body: ['Open Sans', 'Inter', 'sans-serif'],
      },
      colors: {
        'ipb-navy-dark': '#1f2937',
        'ipb-navy': '#374151',
        'ipb-navy-light': '#4b5563',
        'accent-blue': '#4b5563',
        'dark-slate-canvas': '#111827',
        'accent-sky': '#0284c7',
        'accent-cyan': '#38bdf8',
        'accent-ocean': '#0284c7',
        'accent-vibrant': '#2563eb',
        'sv-official-blue': '#3986AC',
        'sv-official-sky': '#00A0D2',
        'sv-official-maroon': '#B34E4D',
        'sv-official-crimson': '#DC3232',
        'sv-official-gold': '#C09854',
        'sv-official-orange': '#FF6900',
        'sv-official-green': '#458746',
        'ipb-slate': {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        }
      }
    },
  },
  plugins: [],
}
