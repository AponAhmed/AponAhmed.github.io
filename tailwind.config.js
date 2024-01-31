module.exports = {
  // ...
  content: [
    "index.html",
    "*.js",
    "./pages/**/*.html", // Include all html files
    "./popups/**/*.html", // Include all html files
  ],
  options: {
    safelist: [], // Add any class names that should not be purged
  },
  theme: {
    extend: {
      colors: {
        "primary-color": "#01EEFE",
        "primary-dark": "#048995",
        "primary-dark-full": "#1A1F25",
        "custom-bg": "#20242D",
        "custom-bg-light": "#323846",
      },
      translate: {
        'full-with-offset-40': 'calc(100% - 40px)',
      },
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      }
    },
  },

  // ...
};
