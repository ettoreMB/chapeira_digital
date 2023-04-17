import { Roboto } from 'next/font/google'

export const roboto = Roboto({ weight: ['400', '700'], subsets: ['latin'] })
export const defaultTheme = {
  colors: {
    zinc: {
      'zinc-200': '#E4E4E7',
      'zinc-50': '#FAFAFA',
    },
    sky: {
      'sky-100': '#E0F2FE',
      'sky-200': '#BAE6FD',
      'sky-400': '#38BDF8',
      'sky-500': '#0EA5E9',
      'sky-600': '#0284C7',
    },
    neutral: {
      '500': '#737373',
    },
    gray: {
      '400': '#7C7C8A',
      '600': '#3323238',
    },
    white: '#fff',
    background: '#E4E4E7',

    blue: '#2563EB',
    yellow: '#EAB308',
    red: '#EF4444',
    red_light: '#EF6666',
    red_dark: '#EF3333',
    green: '#22C55E',
  },
  fonts: {
    default: roboto.style.fontFamily,
  },
} as const
