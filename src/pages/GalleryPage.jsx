import PageHero from '../components/PageHero';
import Gallery from '../components/Gallery';

export default function GalleryPage() {
  return (
    <>
      <PageHero
        title="Gallery"
        subtitle="A visual tour of WOWPIO — from source and production to everyday purity moments."
        crumbs={[{ label: 'Gallery' }]}
      />
      <Gallery />
    </>
  );
}
