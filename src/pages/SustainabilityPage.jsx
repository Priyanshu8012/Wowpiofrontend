import PageHero from '../components/PageHero';
import Sustainability from '../components/Sustainability';
import SustainabilityProof from '../components/SustainabilityProof';

export default function SustainabilityPage() {
  return (
    <>
      <PageHero
        title="Sustainability"
        subtitle="Responsible packaging, smarter logistics, and a cleaner path to pure drinking water — for people and the planet."
        crumbs={[{ label: 'Sustainability' }]}
      />
      <SustainabilityProof />
      <Sustainability />
    </>
  );
}
