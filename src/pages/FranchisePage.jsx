import PageHero from '../components/PageHero';
import DistributorCTA from '../components/DistributorCTA';
import FranchiseKit from '../components/FranchiseKit';
import Contact from '../components/Contact';

export default function FranchisePage() {
  return (
    <>
      <PageHero
        title="Franchise & Distributors"
        subtitle="Partner with WOWPIO — grow with a trusted packaged drinking water brand."
        crumbs={[{ label: 'Franchise' }]}
      />
      <DistributorCTA />
      <FranchiseKit />
      <Contact />
    </>
  );
}
