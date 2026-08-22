import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { Logo } from '../components/Logo';
import {
  Clock,
  ChefHat,
  Users,
  Printer,
  ArrowLeft,
  Check,
  Flame,
  Utensils,
  Share2,
} from 'lucide-react';

export const RecipeDetailView: React.FC = () => {
  const {
    recipes,
    selectedRecipeSlug,
    setCurrentPage,
    setIsBookingModalOpen,
  } = useCMS();

  const recipe =
    recipes.find((r) => r.slug === selectedRecipeSlug) || recipes[0];

  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});

  const toggleIngredient = (key: string) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-[#F5EFE4] text-[#1E1714] pb-24">
      {/* Back button bar */}
      <div className="bg-[#FCFAF5] border-b border-[#E8DDCC] py-3 px-4 sm:px-8 no-print">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={() => setCurrentPage('recipes')}
            className="text-xs font-semibold uppercase tracking-wider text-[#5A1F24] hover:text-[#B58A4A] flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Recipes</span>
          </button>
          <button
            onClick={handlePrint}
            className="text-xs font-semibold uppercase tracking-wider text-[#5A1F24] hover:text-[#B58A4A] flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Recipe Card</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Recipe Title & Meta Header */}
        <div className="text-center space-y-4">
          <span className="inline-block px-3 py-1 bg-[#5A1F24] text-[#FCFAF5] text-[10px] font-bold uppercase tracking-widest rounded">
            Royal Punjabi Master Recipe · {recipe.category}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#5A1F24]">
            {recipe.title}
          </h1>
          {recipe.hindiTitle && (
            <span className="text-sm font-serif text-[#B58A4A] block">
              {recipe.hindiTitle}
            </span>
          )}
          <p className="text-xs sm:text-sm text-[#1E1714]/70 max-w-2xl mx-auto leading-relaxed">
            {recipe.description}
          </p>

          {/* Quick Metrics Bar */}
          <div className="flex items-center justify-center gap-6 sm:gap-10 py-4 border-y border-[#E8DDCC] text-xs text-[#1E1714] font-medium max-w-xl mx-auto">
            <div className="text-center">
              <span className="text-[10px] uppercase tracking-wider text-[#1E1714]/50 block">Prep Time</span>
              <strong className="text-sm font-serif text-[#5A1F24]">{recipe.prepTime}</strong>
            </div>
            <div className="text-center">
              <span className="text-[10px] uppercase tracking-wider text-[#1E1714]/50 block">Cook Time</span>
              <strong className="text-sm font-serif text-[#5A1F24]">{recipe.cookTime}</strong>
            </div>
            <div className="text-center">
              <span className="text-[10px] uppercase tracking-wider text-[#1E1714]/50 block">Difficulty</span>
              <strong className="text-sm font-serif text-[#5A1F24]">{recipe.difficulty}</strong>
            </div>
            <div className="text-center">
              <span className="text-[10px] uppercase tracking-wider text-[#1E1714]/50 block">Yield</span>
              <strong className="text-sm font-serif text-[#5A1F24]">{recipe.servings}</strong>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-80 sm:h-[400px] object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Structured Ingredients Checklist */}
        <div className="bg-white p-8 rounded-2xl border border-[#E8DDCC] shadow-sm space-y-6">
          <div className="pb-2 border-b border-[#E8DDCC]">
            <h3 className="text-xl font-serif font-bold text-[#5A1F24]">
              Ingredients & Spice Geometry
            </h3>
            <p className="text-xs text-[#1E1714]/60">
              Click any ingredient to check it off your prep station.
            </p>
          </div>

          <div className="space-y-6">
            {recipe.ingredients.map((sec, secIdx) => (
              <div key={secIdx} className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#B58A4A]">
                  {sec.section}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {sec.items.map((item, itemIdx) => {
                    const key = `${secIdx}-${itemIdx}`;
                    const isDone = !!checkedIngredients[key];
                    return (
                      <div
                        key={itemIdx}
                        onClick={() => toggleIngredient(key)}
                        className={`p-3 rounded-lg border cursor-pointer flex items-center gap-3 transition-colors ${
                          isDone
                            ? 'bg-[#F5EFE4]/60 border-[#E8DDCC] opacity-60 line-through'
                            : 'bg-white border-[#E8DDCC] hover:border-[#5A1F24]'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                            isDone
                              ? 'bg-[#5A1F24] border-[#5A1F24] text-white'
                              : 'border-[#1E1714]/40 bg-white'
                          }`}
                        >
                          {isDone && <Check className="w-3 h-3" />}
                        </div>
                        <span className="text-xs text-[#1E1714]">
                          {item}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step by Step Cooking Method */}
        <div className="bg-white p-8 rounded-2xl border border-[#E8DDCC] shadow-sm space-y-6">
          <h3 className="text-xl font-serif font-bold text-[#5A1F24]">
            Step-by-Step Royal Method
          </h3>

          <div className="space-y-4">
            {recipe.steps.map((step) => (
              <div key={step.stepNumber} className="p-4 rounded-lg bg-[#F5EFE4]/50 border border-[#E8DDCC]/70 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#5A1F24] text-[#B58A4A] font-bold text-xs flex items-center justify-center shrink-0 border border-[#B58A4A]">
                    {step.stepNumber}
                  </div>
                  <h4 className="text-sm font-serif font-bold text-[#5A1F24]">
                    {step.title}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-[#1E1714]/80 leading-relaxed font-serif-body text-base pl-8">
                  {step.instruction}
                </p>
                {step.tip && (
                  <div className="ml-8 p-2.5 bg-white rounded border-l-2 border-[#B58A4A] text-xs text-[#5A1F24] italic">
                    <strong className="not-italic text-[#B58A4A]">Pro Chef Tip:</strong> {step.tip}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chef's Master Secret */}
        {recipe.chefSecret && (
          <div className="bg-[#5A1F24] text-[#FCFAF5] p-8 rounded-2xl border border-[#B58A4A] shadow-md space-y-2">
            <div className="flex items-center gap-2 text-[#B58A4A]">
              <ChefHat className="w-4 h-4" />
              <span className="text-xs uppercase tracking-widest font-bold">
                Chef's Master Secret (Since 1974)
              </span>
            </div>
            <p className="text-sm font-serif italic text-[#FCFAF5] leading-relaxed">
              "{recipe.chefSecret}"
            </p>
          </div>
        )}

        {/* Dine with us CTA */}
        <div className="p-8 bg-[#FCFAF5] rounded-2xl border border-[#E8DDCC] text-center space-y-3 no-print">
          <h4 className="text-lg font-serif font-bold text-[#5A1F24]">
            Prefer It Prepared by Our Master Chefs?
          </h4>
          <p className="text-xs text-[#1E1714]/70 max-w-md mx-auto">
            Visit Queen's Restaurant at Church Street or New BEL Road to taste this masterwork hot from our clay tandoor hearth.
          </p>
          <button
            onClick={() => setIsBookingModalOpen(true)}
            className="px-6 py-2.5 bg-[#5A1F24] text-[#FCFAF5] rounded text-xs font-semibold uppercase tracking-wider hover:bg-[#43161A] transition-colors border border-[#B58A4A]"
          >
            Book a Table
          </button>
        </div>

      </div>
    </div>
  );
};
