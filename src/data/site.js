export const siteTheme = {
  background: '#211D2B',
  surface: '#302A40',
  surfaceStrong: '#3B3450',
  accent: '#C5A9E8',
  accentSecondary: '#A9DCC8',
  text: '#F0EAF7',
  textMuted: '#B8AEC6',
  backdropGradient:
    'radial-gradient(circle at 18% 12%, rgba(197, 169, 232, 0.13), transparent 30%), radial-gradient(circle at 84% 18%, rgba(169, 220, 200, 0.08), transparent 26%), linear-gradient(160deg, #211D2B 0%, #1C1826 55%, #18141F 100%)',
  effects: [],
  decorations: [],
  motif: 'star',
};

export const site = {
  name: 'Jeremy Mamani',
  handle: 'HaxBv',
  role: 'Game Developer',
  summary:
    'A game developer portfolio exploring playful systems, expressive interfaces, and worlds worth getting lost in.',
  about: {
    paragraphs: [
      'This space collects the games, experiments, and worlds I am building as a game developer.',
      'The focus is on clear mechanics, playful presentation, and small details that reward curiosity.',
      'A fuller background and development story will be added here as the portfolio grows.',
    ],
    card: {
      name: 'HaxBv',
      role: 'Game Developer',
      status: 'Building',
    },
  },
  skills: {
    intro:
      'A detailed toolkit breakdown is on the way. Engines, languages, art tools, and workflow notes will live here.',
    groups: [],
  },
  contact: {
    heading: 'Contact channels are being prepared.',
    body: 'This space is ready for an email address or social links when they are available.',
    email: null,
    links: [],
  },
};

export const navigation = [
  { label: 'Home', to: '/', sectionId: null },
  { label: 'Projects', to: '/projects', sectionId: 'projects' },
  { label: 'Skills', to: '/skills', sectionId: 'skills' },
  { label: 'About', to: '/about', sectionId: 'about' },
  { label: 'Contact', to: '/contact', sectionId: 'contact' },
];
