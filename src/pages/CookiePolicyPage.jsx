import LegalDocument from '../components/LegalDocument';

const sections = [
  {
    id: 'what-are-cookies',
    title: '1. What are cookies?',
    paragraphs: [
      'Cookies are small text files stored on your device when you visit a website. They help the site remember preferences, understand how pages are used, and keep certain features working smoothly.',
      'Similar technologies — such as local storage, pixels, or session identifiers — may be used for the same purposes. In this policy, “cookies” includes those related tools.',
    ],
  },
  {
    id: 'how-we-use',
    title: '2. How WOWPIO uses cookies',
    paragraphs: [
      'We use cookies to run a reliable website experience and to learn what content helps visitors most. We aim to keep tracking minimal and purposeful.',
    ],
    bullets: [
      'Essential cookies — required for core site functions, security, and remembering basic consent choices.',
      'Preference cookies — remember language or UI choices where available.',
      'Analytics cookies — help us understand page visits, traffic sources, and performance (in aggregated form where possible).',
      'Marketing cookies — used only if enabled, to measure campaign effectiveness or show relevant brand messages.',
    ],
  },
  {
    id: 'types',
    title: '3. Types of cookies we may use',
    paragraphs: ['Depending on your visit and consent settings, you may encounter:'],
    bullets: [
      'Session cookies — expire when you close your browser.',
      'Persistent cookies — remain for a set period or until you delete them.',
      'First-party cookies — set by WOWPIO.',
      'Third-party cookies — set by trusted providers (for example analytics), subject to their own policies.',
    ],
  },
  {
    id: 'managing',
    title: '4. Managing your cookie choices',
    paragraphs: [
      'When you first visit, you can accept or manage non-essential cookies through our cookie banner. You can change your mind later by clearing site data in your browser or revisiting cookie settings where offered.',
      'Most browsers also let you block or delete cookies in settings. Blocking essential cookies may affect how parts of the site work.',
    ],
  },
  {
    id: 'third-parties',
    title: '5. Third-party services',
    paragraphs: [
      'If we use analytics or similar tools, those providers may process limited technical data under their terms. We select partners carefully and prefer configurations that reduce unnecessary personal identifiers where practical.',
    ],
  },
  {
    id: 'updates',
    title: '6. Updates to this policy',
    paragraphs: [
      'We may revise this Cookie Policy as our site, tools, or legal requirements change. The “Last updated” date reflects the latest version. Significant changes may also be highlighted via the cookie banner or site notice.',
    ],
  },
  {
    id: 'more',
    title: '7. More information',
    paragraphs: [
      'For how we handle personal data more broadly, see our Privacy Policy. Questions about cookies can be sent to care@wowpio.com.',
    ],
  },
];

export default function CookiePolicyPage() {
  return (
    <LegalDocument
      title="Cookie Policy"
      subtitle="A clear look at the cookies and similar technologies WOWPIO may use on this website."
      crumb="Cookie Policy"
      sections={sections}
      related={[
        { to: '/privacy', label: 'Privacy Policy' },
        { to: '/terms', label: 'Terms of Service' },
        { to: '/contact', label: 'Contact us' },
      ]}
    />
  );
}
