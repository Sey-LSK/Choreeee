/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
      extend: {
        maskImage: {
          gradient: 'linear-gradient(black, transparent 50%)'
        }
      }
    },
    plugins: []
  }