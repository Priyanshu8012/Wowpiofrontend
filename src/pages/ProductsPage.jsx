import PageHero from '../components/PageHero';
import PackCompare from '../components/PackCompare';
import Products from '../components/Products';
import TrustAuthority from '../components/TrustAuthority';

export default function ProductsPage() {
  return (
    <>
      <PageHero
        title="Our Products"
        subtitle="Natural drinking water in packs built for conferences, daily life, offices, and bulk supply — sealed for purity you can trust."
        crumbs={[{ label: 'Products' }]}
      />
      <PackCompare />
      <Products />
      <TrustAuthority />
    </>
  );
}
