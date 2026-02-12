export interface ValentinePage {
  id: string;
  name: string;
  message: string;
  theme: Theme;
  created_at: string;
}

export interface ValentineMessage {
  id: string;
  page_id: string;
  content: string;
  created_at: string;
}

export type Theme = 
  | 'romantic-red'
  | 'soft-pink'
  | 'purple-dreams'
  | 'golden-elegance'
  | 'pastel-dream';

export interface ThemeConfig {
  id: Theme;
  name: string;
  gradient: string;
  accentColor: string;
  bgPattern: string;
}

export const themes: Record<Theme, ThemeConfig> = {
  'romantic-red': {
    id: 'romantic-red',
    name: 'Romantic Red',
    gradient: 'from-red-500 via-pink-500 to-rose-500',
    accentColor: 'text-red-600',
    bgPattern: 'bg-red-100',
  },
  'soft-pink': {
    id: 'soft-pink',
    name: 'Soft Pink',
    gradient: 'from-pink-300 via-pink-200 to-pink-300',
    accentColor: 'text-pink-600',
    bgPattern: 'bg-pink-100',
  },
  'purple-dreams': {
    id: 'purple-dreams',
    name: 'Purple Dreams',
    gradient: 'from-purple-500 via-violet-500 to-purple-600',
    accentColor: 'text-purple-600',
    bgPattern: 'bg-purple-100',
  },
  'golden-elegance': {
    id: 'golden-elegance',
    name: 'Golden Elegance',
    gradient: 'from-yellow-400 via-amber-300 to-yellow-500',
    accentColor: 'text-amber-600',
    bgPattern: 'bg-amber-100',
  },
  'pastel-dream': {
    id: 'pastel-dream',
    name: 'Pastel Dream',
    gradient: 'from-cyan-200 via-blue-200 to-indigo-200',
    accentColor: 'text-blue-600',
    bgPattern: 'bg-blue-100',
  },
};

export const themeOptions = Object.values(themes);

