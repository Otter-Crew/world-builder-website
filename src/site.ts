export const site = {
  name: 'World Builder',
  fullName: "Otter Crew's World Builder",
  description:
    'A desktop writing app that keeps a novel and its world in one folder of plain files. Runs on your Mac. Buy it once.',
  store: {
    label: 'Mac App Store',
    href: 'https://www.apple.com/app-store/',
  },
  nav: [
    { label: 'Writing', href: '#writing' },
    { label: 'Editorial review', href: '#editorial' },
    { label: 'Your files', href: '#ownership' },
    { label: 'Export', href: '#export' },
    { label: 'Learn', href: '/learn/' },
  ],
} as const;
