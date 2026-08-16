import PageHero from '../components/PageHero';
import ManufacturingUnit from '../components/ManufacturingUnit';
import BatchCoachTable from '../components/BatchCoachTable';
import BatchVerification from '../components/BatchVerification';
import BatchQuality from '../components/BatchQuality';
import PlantFilm from '../components/PlantFilm';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function ManufacturingPage() {
  return (
    <>
      <PageHero
        title="Manufacturing Unit"
        subtitle="Bachcoach — place of manufacture for WOWPIO packaged drinking water. Factory details, address, and licence information."
        crumbs={[{ label: 'Manufacturing Unit' }]}
      />
      <ManufacturingUnit />
      <BatchCoachTable />
      <BatchVerification />
      <PlantFilm />
      <BatchQuality />
      <section className="bg-[#F6F4F0] pb-20 md:pb-28">
        <div className="mx-auto max-w-7xl px-5 text-center md:px-10">
          <Link
            to="/process"
            className="inline-flex items-center gap-2 rounded-xl bg-[#C9A259] px-7 py-3.5 font-heading text-sm font-bold uppercase tracking-[0.12em] text-[#0C0C0C] hover:bg-[#A8893F]"
          >
            See purity process
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
