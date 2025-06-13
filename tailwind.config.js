/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "form-enter": {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "form-exit": {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(10px)", opacity: "0" },
        },
        "modal-enter": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "modal-exit": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(0.95)", opacity: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "slide-up": {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-down": {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(10px)", opacity: "0" },
        },
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        "pulse-cta": {
          "0%, 100%": {
            transform: "scale(1)",
            boxShadow: "0 0 0 0 rgba(var(--primary), 0.4)"
          },
          "50%": {
            transform: "scale(1.05)",
            boxShadow: "0 0 0 10px rgba(var(--primary), 0)"
          }
        },
        "rating-pop": {
          "0%": {
            transform: "scale(1)"
          },
          "50%": {
            transform: "scale(1.2)"
          },
          "100%": {
            transform: "scale(1)"
          }
        },
        "spinner-rotate": {
          "0%": {
            transform: "rotate(0deg)"
          },
          "100%": {
            transform: "rotate(360deg)"
          }
        }
      },
      animation: {
        "form-enter": "form-enter 0.3s ease-out",
        "form-exit": "form-exit 0.3s ease-in",
        "modal-enter": "modal-enter 0.2s ease-out",
        "modal-exit": "modal-exit 0.2s ease-in",
        "fade-in": "fade-in 0.2s ease-out",
        "fade-out": "fade-out 0.2s ease-in",
        "slide-up": "slide-up 0.3s ease-out",
        "slide-down": "slide-down 0.3s ease-in",
        "fade-in-up": "fade-in-up 0.5s ease-out forwards",
        "pulse-cta": "pulse-cta 2s infinite",
        "rating-pop": "rating-pop 0.3s ease-out",
        "spinner-rotate": "spinner-rotate 1s linear infinite"
      },
      // ... rest of your existing theme config
    },
  },
  plugins: [require("tailwindcss-animate")],
} 