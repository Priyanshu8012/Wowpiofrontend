import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Preloader from '../components/Preloader';
import Banner from '../components/Banner';
import Hero from '../components/Hero';
import TrustAuthority from '../components/TrustAuthority';
import BatchQuality from '../components/BatchQuality';
import PlantFilm from '../components/PlantFilm';
import PackCompare from '../components/PackCompare';
import Products from '../components/Products';
import LifestyleMoment from '../components/LifestyleMoment';
import OriginStory from '../components/OriginStory';
import SustainabilityProof from '../components/SustainabilityProof';
import Testimonials from '../components/Testimonials';
import DistributorCTA from '../components/DistributorCTA';
import ManufacturingUnit from '../components/ManufacturingUnit';

const PRELOAD_KEY = 'wowpio_home_preloaded';

export default function Home() {
  const [loading, setLoading] = useState(() => {
    try {
      return sessionStorage.getItem(PRELOAD_KEY) !== '1';
    } catch {
      return true;
    }
  });

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [loading]);

  const finishPreload = () => {
    try {
      sessionStorage.setItem(PRELOAD_KEY, '1');
    } catch {
      /* ignore */
    }
    setLoading(false);
    document.body.style.overflow = '';
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" onComplete={finishPreload} />}
      </AnimatePresence>

      <Banner />
      <Hero />
      <TrustAuthority />
      <BatchQuality />
      <PlantFilm />
      <PackCompare />
      <Products featured />
      <LifestyleMoment />
      <OriginStory />
      <SustainabilityProof />
      <Testimonials />
      <ManufacturingUnit compact />
      <DistributorCTA />
    </>
  );
}
