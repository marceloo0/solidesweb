module.exports = {
  purge: ['./pages/**/*.js', './components/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif']
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
