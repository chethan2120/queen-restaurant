import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Logo } from '../components/Logo';
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
} from 'lucide-react';

export const JournalDetailView: React.FC = () => {
  const {
    journalArticles,
    selectedJournalSlug,
    setSelectedJournalSlug,
    setCurrentPage,
    setIsBookingModalOpen,
  } = useCMS();

  const article =
    journalArticles.find((a) => a.slug === selectedJournalSlug) || journalArticles[0];

  const relatedArticles = journalArticles.filter((a) => a.id !== article.id).slice(0, 2);

  return (
    <div className="bg-[#F5EFE4] text-[#1E1714] pb-24">
      {/* Back button header */}
      <div className="bg-[#FCFAF5] border-b border-[#E8DDCC] py-3 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={() => setCurrentPage('journal')}
            className="text-xs font-semibold uppercase tracking-wider text-[#5A1F24] hover:text-[#B58A4A] flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Journal</span>
          </button>
          <span className="text-xs text-[#1E1714]/50 font-serif">
            The Queen's Journal · Volume 50
          </span>
        </div>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 bg-[#5A1F24] text-[#FCFAF5] text-[10px] font-bold uppercase tracking-widest rounded">
            {article.category}
          </span>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#5A1F24] leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center justify-center gap-4 text-xs text-[#1E1714]/60 pt-2">
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-[#B58A4A]" />
              {article.author.name} ({article.author.role})
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {article.publishedDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="my-8 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-80 sm:h-[440px] object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Article Body Content */}
        <div className="bg-white p-8 sm:p-12 rounded-2xl border border-[#E8DDCC] shadow-sm space-y-6 text-[#1E1714]/90 font-serif-body text-lg leading-relaxed">
          <p className="text-xl font-serif text-[#5A1F24] leading-relaxed italic border-l-4 border-[#B58A4A] pl-4">
            "{article.excerpt}"
          </p>

          <div className="space-y-5 text-base font-normal">
            <p>
              In authentic North Indian and Mughlai gastronomy, technique is never a shortcut. 
              The alchemy of deep, rounded flavours is born through the sacred rhythm of <em>dheemi aanch</em>—the art of patient, slow-fire reduction that coaxes richness from whole lentils, aged bone broth, and handcrafted masalas.
            </p>

            <h3 className="text-2xl font-serif font-bold text-[#5A1F24] pt-4">
              The Living Clay Tandoor Hearth
            </h3>

            <p>
              Unlike modern convection ovens, an authentic clay tandoor functions as a dynamic microclimate. 
              Lump charcoal burning at its base heats the thick terracotta walls up to 900°F (480°C). 
              When marinated meats or handcrafted flatbreads hit the radiant walls, sugars caramelize instantaneously, 
              sealing in succulent moisture while the fat drips onto white-hot embers to create signature aromatic smoke.
            </p>

            <h3 className="text-2xl font-serif font-bold text-[#5A1F24] pt-4">
              Potli Masalas: The Secret Geometry of Spices
            </h3>

            <p>
              Rather than pre-ground powders that lose volatile essential oils within hours, the master spice blenders 
              at Queen’s bundle whole cloves, green and black cardamoms, star anise, dried rose petals, and mace into muslin cloth sachets (<em>potli</em>). 
              These sachets steep quietly in the slow gravies for hours, yielding fragrance without overpowering bitterness.
            </p>

            <div className="my-6 p-6 bg-[#F5EFE4] rounded-xl border border-[#E8DDCC] text-xs font-sans space-y-2">
              <span className="font-bold text-[#5A1F24] uppercase tracking-wider block">
                The Chef's Golden Rule
              </span>
              <p className="text-[#1E1714]/80">
                "Real Punjabi food is never greasy or overwhelmingly hot; it is rich, balanced, deeply aromatic, and soothing to the soul."
              </p>
            </div>

            <p>
              For half a century on Church Street and New BEL Road, our kitchen brigade has maintained these recipes unchanged, 
              ensuring that each generation experiences the authentic warmth of true Punjabi Mehmaan-Nawazi.
            </p>
          </div>

          {/* Social Share & Tags */}
          <div className="pt-8 border-t border-[#E8DDCC] flex flex-wrap items-center justify-between gap-4 font-sans text-xs">
            <div className="flex items-center gap-1.5 flex-wrap">
              {article.tags.map((tag, i) => (
                <span key={i} className="bg-[#F5EFE4] text-[#5A1F24] px-3 py-1 rounded font-medium border border-[#E8DDCC]">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#1E1714]/60">Share Article:</span>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(article.title + ' - Queen’s Restaurant Journal')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#25D366] text-white rounded-full hover:opacity-90"
              >
                <Share2 className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* CTA Box */}
        <div className="my-12 p-8 bg-[#5A1F24] text-[#FCFAF5] rounded-2xl text-center space-y-4 border border-[#B58A4A] shadow-lg">
          <Logo variant="dark" size="sm" className="mx-auto" />
          <h3 className="text-2xl font-serif font-bold">
            Taste This Heritage in Person
          </h3>
          <p className="text-xs text-[#D8CEBE] max-w-md mx-auto">
            Experience our 18-hour Dal Makhani and tandoori masterworks at Church Street or New BEL Road.
          </p>
          <button
            onClick={() => setIsBookingModalOpen(true)}
            className="px-6 py-2.5 bg-[#B58A4A] hover:bg-[#D4AF37] text-[#1E1714] font-semibold uppercase tracking-wider text-xs rounded transition-colors"
          >
            Reserve Your Table
          </button>
        </div>

        {/* Related Articles */}
        <div className="space-y-6 pt-4">
          <h3 className="text-xl font-serif font-bold text-[#5A1F24]">
            More from The Queen's Journal
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedArticles.map((rel) => (
              <div
                key={rel.id}
                onClick={() => {
                  setSelectedJournalSlug(rel.slug);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white p-5 rounded-xl border border-[#E8DDCC] cursor-pointer hover:shadow-md transition-all flex gap-4 items-center group"
              >
                <img
                  src={rel.image}
                  alt={rel.title}
                  className="w-20 h-20 rounded-lg object-cover shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-[#B58A4A]">
                    {rel.category}
                  </span>
                  <h4 className="text-sm font-serif font-bold text-[#1E1714] group-hover:text-[#5A1F24] leading-snug line-clamp-2">
                    {rel.title}
                  </h4>
                  <span className="text-[11px] text-[#1E1714]/50 block">
                    {rel.readTime}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </article>
    </div>
  );
};
