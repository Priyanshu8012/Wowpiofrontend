import PageHero from '../components/PageHero';
import Contact from '../components/Contact';
import B2BEnquiry from '../components/B2BEnquiry';

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="Reach our team for orders, partnerships, or support — we’re here to help."
        crumbs={[{ label: 'Contact' }]}
      />
      <B2BEnquiry />
      <Contact />
    </>
  );
}
