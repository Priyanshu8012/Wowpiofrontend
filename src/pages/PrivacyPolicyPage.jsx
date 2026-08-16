import LegalDocument from '../components/LegalDocument';

const sections = [
  {
    id: 'overview',
    title: '1. Overview',
    paragraphs: [
      'WOWPIO (“we”, “us”, “our”) respects your privacy. This Privacy Policy explains what information we collect when you visit our website, enquire about products or partnerships, or otherwise interact with us — and how we use, store, and protect that information.',
      'By using our website or sharing your details with us, you agree to the practices described here. If you do not agree, please discontinue use of the site and contact us before sharing personal data.',
    ],
  },
  {
    id: 'information-we-collect',
    title: '2. Information we collect',
    paragraphs: [
      'We collect only what we need to respond to you, improve our services, and operate our business responsibly.',
    ],
    bullets: [
      'Identity & contact details — name, phone number, email address, city, and organisation (when you submit a form or enquire).',
      'Business enquiry details — franchise interest, order requirements, delivery location, and related notes you provide.',
      'Technical data — IP address, browser type, device information, pages visited, and approximate location derived from analytics or cookies.',
      'Communications — messages you send us by email, phone, or website forms.',
    ],
  },
  {
    id: 'how-we-use',
    title: '3. How we use your information',
    paragraphs: ['We use personal information for legitimate business purposes, including:'],
    bullets: [
      'Responding to product, support, and partnership enquiries.',
      'Processing distributor or franchise conversations and related follow-ups.',
      'Improving website performance, content, and user experience.',
      'Sending service updates or marketing messages where you have opted in (you may unsubscribe anytime).',
      'Meeting legal, regulatory, and security obligations.',
    ],
  },
  {
    id: 'sharing',
    title: '4. How we share information',
    paragraphs: [
      'We do not sell your personal information. We may share limited data with trusted service providers who help us operate (for example hosting, email, analytics, or logistics partners), only as needed for those services and under appropriate confidentiality expectations.',
      'We may also disclose information if required by law, regulation, court order, or to protect the rights, safety, and property of WOWPIO, our customers, or the public.',
    ],
  },
  {
    id: 'retention',
    title: '5. Retention & security',
    paragraphs: [
      'We keep personal information only as long as reasonably necessary for the purposes described in this policy, or as required by applicable law. When information is no longer needed, we take steps to delete or anonymise it.',
      'We apply reasonable technical and organisational measures to protect data against unauthorised access, alteration, disclosure, or loss. No method of transmission over the internet is fully secure; please use strong passwords and share sensitive details carefully.',
    ],
  },
  {
    id: 'your-rights',
    title: '6. Your choices & rights',
    paragraphs: [
      'Depending on applicable law, you may request access to, correction of, or deletion of personal information we hold about you. You may also object to certain processing or withdraw consent where processing is based on consent.',
      'To exercise these rights, email care@wowpio.com with enough detail for us to verify and respond to your request. We may need to retain some records where the law requires it.',
    ],
  },
  {
    id: 'children',
    title: '7. Children',
    paragraphs: [
      'Our website and services are intended for a general and business audience. We do not knowingly collect personal information from children under 13. If you believe a child has provided us data, contact us and we will take appropriate steps to remove it.',
    ],
  },
  {
    id: 'updates',
    title: '8. Policy updates',
    paragraphs: [
      'We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. The “Last updated” date at the top of this page will change when we do. Continued use of the site after an update means you accept the revised policy.',
    ],
  },
  {
    id: 'contact',
    title: '9. Contact',
    paragraphs: [
      'For privacy questions or requests, contact WOWPIO Care at care@wowpio.com, call our helpline, or write to Plot No. 118K, Tilmapur, Ashapur, Varanasi, U.P, 221007.',
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalDocument
      title="Privacy Policy"
      subtitle="How WOWPIO collects, uses, and protects your information — written clearly, handled carefully."
      crumb="Privacy Policy"
      sections={sections}
      related={[
        { to: '/cookies', label: 'Cookie Policy' },
        { to: '/terms', label: 'Terms of Service' },
        { to: '/contact', label: 'Contact us' },
      ]}
    />
  );
}
