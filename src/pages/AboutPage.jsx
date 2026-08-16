import PageHero from '../components/PageHero';
import About from '../components/About';
import OriginStory from '../components/OriginStory';
import TrustAuthority from '../components/TrustAuthority';
import PlantFilm from '../components/PlantFilm';

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Our Journey"
        subtitle="The story of WOWPIO — purity with purpose, craft you can trust, and water made for everyday life."
        crumbs={[{ label: 'About' }]}
      />
      <OriginStory compact />
      <About />
      <TrustAuthority />
      <PlantFilm />
    </>
  );
}
