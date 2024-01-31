module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        xxxs: '0.60',
        xxs: '0.76rem',
        xs: '0.82rem',
        sm: '0.9rem',
        lg: '1.05rem',
        xl: '1.2rem',
        '2xl': '1.563rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem',
      },
      colors: {
        primaryColor: '#1E42B6',
        bgColor: '#FFF',
        accentColor: '#4F46E5'
      },
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ]
}
