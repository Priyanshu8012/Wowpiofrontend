import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import BrandLogo from '../components/BrandLogo';

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center justify-center bg-[#0C0C0C] px-5 py-28">
      <div className="flex max-w-lg flex-col items-center text-center">
        <BrandLogo size="lg" showTagline={false} asLink={false} />
        <p className="mt-8 font-heading text-sm font-bold uppercase tracking-[0.3em] text-[#C9A259]">
          404
        </p>
        <h1 className="mt-3 font-heading text-4xl font-extrabold text-white">
          Page not found
        </h1>
        <p className="mt-4 leading-relaxed text-white/60">
          This drop took a wrong turn. Let’s get you back to pure water.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#C9A259] px-6 py-3 font-heading text-sm font-bold uppercase tracking-wider text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>
    </section>
  );
}
