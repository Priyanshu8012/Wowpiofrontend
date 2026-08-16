import PageHero from '../components/PageHero';
import Process from '../components/Process';
import PlantFilm from '../components/PlantFilm';
import BatchQuality from '../components/BatchQuality';

export default function ProcessPage() {
  return (
    <>
      <PageHero
        title="Purity Process"
        subtitle="From protected source to sealed pack — the WOWPIO path to everyday purity."
        crumbs={[{ label: 'Process' }]}
      />
      <PlantFilm />
      <Process />
      <BatchQuality />
    </>
  );
}
