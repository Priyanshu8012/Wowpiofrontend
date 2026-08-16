import LegalDocument from '../components/LegalDocument';

const sections = [
  {
    id: 'agreement',
    title: '1. Agreement to terms',
    paragraphs: [
      'These Terms of Service (“Terms”) govern your use of the WOWPIO website and related online enquiries. By accessing or using the site, you agree to these Terms. If you do not agree, please do not use the site.',
    ],
  },
  {
    id: 'use',
    title: '2. Permitted use',
    paragraphs: [
      'You may browse the site for personal or legitimate business purposes related to WOWPIO products and partnerships. You agree not to misuse the site — including attempting unauthorised access, scraping at abusive scale, introducing malware, or using content in a way that harms the brand or others.',
    ],
  },
  {
    id: 'products',
    title: '3. Products & information',
    paragraphs: [
      'Product descriptions, images, and process information on this site are provided for general communication. Specs, availability, and packaging may change. Formal supply, franchise, or distribution arrangements are governed by separate written agreements.',
    ],
  },
  {
    id: 'enquiries',
    title: '4. Enquiries & communications',
    paragraphs: [
      'When you submit a form or contact us, you confirm that the information you provide is accurate to the best of your knowledge. Submitting an enquiry does not create a contract, partnership, or supply commitment unless we confirm it in writing.',
    ],
  },
  {
    id: 'ip',
    title: '5. Intellectual property',
    paragraphs: [
      'All trademarks, logos, text, imagery, and design on this website belong to WOWPIO or its licensors. You may not copy, modify, or distribute site content for commercial use without our prior written permission.',
    ],
  },
  {
    id: 'liability',
    title: '6. Disclaimer & liability',
    paragraphs: [
      'The website is provided on an “as available” basis. While we aim for accuracy and uptime, we do not warrant that the site will be uninterrupted or error-free. To the fullest extent permitted by law, WOWPIO is not liable for indirect or consequential losses arising from use of the site.',
    ],
  },
  {
    id: 'privacy',
    title: '7. Privacy & cookies',
    paragraphs: [
      'Personal data and cookie use are described in our Privacy Policy and Cookie Policy. Those documents form part of how we operate this website alongside these Terms.',
    ],
  },
  {
    id: 'changes',
    title: '8. Changes',
    paragraphs: [
      'We may update these Terms periodically. The latest version will be posted on this page with an updated date. Continued use of the site after changes means you accept the revised Terms.',
    ],
  },
  {
    id: 'contact',
    title: '9. Contact',
    paragraphs: [
      'Questions about these Terms: support@wowpio.com or Plot No. 118K, Tilmapur, Ashapur, Varanasi, U.P, 221007.',
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalDocument
      title="Terms of Service"
      subtitle="The ground rules for using the WOWPIO website — clear, fair, and built for trust."
      crumb="Terms of Service"
      sections={sections}
      related={[
        { to: '/privacy', label: 'Privacy Policy' },
        { to: '/cookies', label: 'Cookie Policy' },
        { to: '/contact', label: 'Contact us' },
      ]}
    />
  );
}
