export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#7C4DFF",
          light: "#9A77FF",
          dark: "#5B34CC",
        },
        secondary: {
          DEFAULT: "#FF9F43",
          light: "#FFB76E",
          dark: "#E8892E",
        },
        neutral: {
          black: "#111827",
          700: "#374151",
          500: "#6B7280",
          300: "#D1D5DB",
          100: "#F3F4F6",
          white: "#FFFFFF",
        },
        section: "#FAFAFF",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "16px",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'blob': 'blob 7s infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 20px -2px rgba(0, 0, 0, 0.1), 0 10px 25px -5px rgba(0, 0, 0, 0.08)',
        'large': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 20px 50px -15px rgba(0, 0, 0, 0.1)',
        'glow-orange': '0 0 20px rgba(249, 115, 22, 0.4)',
        'glow-purple': '0 0 20px rgba(124, 77, 255, 0.4)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
    },
  },
  plugins: [],
};
