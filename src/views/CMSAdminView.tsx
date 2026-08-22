import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { MenuItem, TableReservation, JournalArticle, RecipeItem } from '../types';
import { DISH_IMAGES } from '../data/images';
import { Logo } from '../components/Logo';
import {
  Utensils,
  BookOpen,
  ChefHat,
  Calendar,
  Plus,
  Trash2,
  CheckCircle,
  XCircle,
  RotateCcw,
} from 'lucide-react';

export const CMSAdminView: React.FC = () => {
  const {
    menuItems,
    addMenuItem,
    deleteMenuItem,
    journalArticles,
    recipes,
    reservations,
    updateReservationStatus,
    resetToDefaults,
    setCurrentPage,
  } = useCMS();

  const [activeTab, setActiveTab] = useState<'menu' | 'reservations' | 'journal' | 'recipes'>('reservations');

  // New Menu Item Form State
  const [isAddingDish, setIsAddingDish] = useState(false);
  const [newDishName, setNewDishName] = useState('');
  const [newDishHindi, setNewDishHindi] = useState('');
  const [newDishCategory, setNewDishCategory] = useState<MenuItem['category']>('starters');
  const [newDishPrice, setNewDishPrice] = useState(380);
  const [newDishDescription, setNewDishDescription] = useState('');
  const [newDishIsVeg, setNewDishIsVeg] = useState(false);
  const [newDishIsSpecial, setNewDishIsSpecial] = useState(false);
  const [newDishImage, setNewDishImage] = useState(DISH_IMAGES.bhattiDaMurgh);

  const handleCreateDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDishName || !newDishDescription) return;

    addMenuItem({
      name: newDishName,
      hindiName: newDishHindi,
      category: newDishCategory,
      price: Number(newDishPrice),
      description: newDishDescription,
      isVeg: newDishIsVeg,
      isChefSpecial: newDishIsSpecial,
      isPopular: true,
      spiceLevel: 2,
      image: newDishImage,
      portion: 'Serving for 2',
      allergens: ['Dairy'],
    });

    setIsAddingDish(false);
    setNewDishName('');
    setNewDishDescription('');
    setNewDishHindi('');
  };

  return (
    <div className="bg-[#F5EFE4] text-[#1E1714] min-h-screen pb-24">
      {/* CMS Admin Top Bar */}
      <div className="bg-[#1E1714] text-[#FCFAF5] py-8 px-4 sm:px-8 border-b border-[#B58A4A]/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Logo variant="dark" size="sm" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#B58A4A] bg-[#5A1F24] px-2 py-0.5 rounded">
                  Headless CMS Engine
                </span>
                <span className="text-xs text-[#D8CEBE]">Active Session</span>
              </div>
              <h1 className="text-xl font-serif font-bold text-[#FCFAF5] mt-0.5">
                Queen’s Restaurant Content & Operations Manager
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={resetToDefaults}
              className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-[#D8CEBE] rounded text-xs font-medium flex items-center gap-1.5 transition-colors border border-white/10"
              title="Restore initial 1974 menu and content"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#B58A4A]" />
              <span>Reset to Defaults</span>
            </button>

            <button
              onClick={() => setCurrentPage('home')}
              className="px-4 py-1.5 bg-[#5A1F24] hover:bg-[#72272e] text-[#FCFAF5] rounded text-xs font-semibold uppercase tracking-wider border border-[#B58A4A] transition-colors"
            >
              View Live Website
            </button>
          </div>
        </div>
      </div>

      {/* Main CMS Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#E8DDCC] pb-3 overflow-x-auto">
          {[
            { id: 'reservations', label: `Table Reservations (${reservations.length})`, icon: Calendar },
            { id: 'menu', label: `Menu Items (${menuItems.length})`, icon: Utensils },
            { id: 'journal', label: `Journal & Blog (${journalArticles.length})`, icon: BookOpen },
            { id: 'recipes', label: `Master Recipes (${recipes.length})`, icon: ChefHat },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#5A1F24] text-[#FCFAF5] shadow-md border border-[#B58A4A]'
                    : 'bg-white text-[#1E1714] hover:bg-[#E8DDCC] border border-[#E8DDCC]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#B58A4A]' : 'text-[#5A1F24]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: RESERVATIONS */}
        {activeTab === 'reservations' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-serif font-bold text-[#5A1F24]">
                  Table Reservations & Guest List
                </h3>
                <p className="text-xs text-[#1E1714]/60">
                  Real-time guest booking logs saved via local storage state engine.
                </p>
              </div>
            </div>

            {reservations.length === 0 ? (
              <div className="bg-white p-12 rounded-xl text-center border border-[#E8DDCC]">
                <p className="text-sm font-serif italic text-[#5A1F24]">
                  No table reservations logged yet. Use the "Book a Table" modal to create a test booking.
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-[#E8DDCC] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F5EFE4] text-[#1E1714] uppercase tracking-wider font-semibold border-b border-[#E8DDCC]">
                      <tr>
                        <th className="p-3.5">Ref Code</th>
                        <th className="p-3.5">Guest Name</th>
                        <th className="p-3.5">Venue</th>
                        <th className="p-3.5">Date & Time</th>
                        <th className="p-3.5">Covers</th>
                        <th className="p-3.5">Seating Area</th>
                        <th className="p-3.5">Status</th>
                        <th className="p-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8DDCC]">
                      {reservations.map((res) => (
                        <tr key={res.id} className="hover:bg-[#FCFAF5]">
                          <td className="p-3.5 font-mono font-bold text-[#5A1F24]">
                            #{res.referenceCode}
                          </td>
                          <td className="p-3.5">
                            <strong className="block text-sm font-serif text-[#1E1714]">
                              {res.fullName}
                            </strong>
                            <span className="text-[11px] text-[#1E1714]/60">{res.phone} • {res.email}</span>
                          </td>
                          <td className="p-3.5 font-medium">
                            {res.locationId === 'church-street' ? 'Church Street' : 'New BEL Road'}
                          </td>
                          <td className="p-3.5">
                            <span className="font-semibold">{res.date}</span>
                            <span className="text-[#1E1714]/60 block">{res.timeSlot}</span>
                          </td>
                          <td className="p-3.5 font-bold">
                            {res.guestCount} Pax
                          </td>
                          <td className="p-3.5 text-[#1E1714]/70">
                            {res.seatingPreference}
                          </td>
                          <td className="p-3.5">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                res.status === 'confirmed'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {res.status}
                            </span>
                          </td>
                          <td className="p-3.5 text-right space-x-1">
                            {res.status === 'confirmed' && (
                              <>
                                <button
                                  onClick={() => updateReservationStatus(res.id, 'cancelled')}
                                  className="p-1 text-red-700 hover:bg-red-50 rounded"
                                  title="Cancel Reservation"
                                >
                                  <XCircle className="w-4 h-4" />
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MENU ITEMS */}
        {activeTab === 'menu' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-serif font-bold text-[#5A1F24]">
                  Royal Menu Catalog Management
                </h3>
                <p className="text-xs text-[#1E1714]/60">
                  Add new dishes, update prices, toggle signature badges, and manage menu items.
                </p>
              </div>

              <button
                onClick={() => setIsAddingDish(!isAddingDish)}
                className="px-4 py-2 bg-[#5A1F24] hover:bg-[#43161A] text-[#FCFAF5] rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 border border-[#B58A4A]"
              >
                <Plus className="w-4 h-4 text-[#B58A4A]" />
                <span>{isAddingDish ? 'Cancel' : 'Add New Royal Dish'}</span>
              </button>
            </div>

            {/* Add New Dish Form */}
            {isAddingDish && (
              <form onSubmit={handleCreateDish} className="bg-white p-6 rounded-xl border-2 border-[#5A1F24] shadow-md space-y-4 text-xs">
                <h4 className="text-sm font-serif font-bold text-[#5A1F24]">
                  Create New Menu Item
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-semibold mb-1">Dish Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Royal Raan-e-Queen"
                      value={newDishName}
                      onChange={(e) => setNewDishName(e.target.value)}
                      className="w-full p-2 bg-[#F5EFE4] border border-[#E8DDCC] rounded"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Hindi/Regional Name</label>
                    <input
                      type="text"
                      placeholder="e.g. शाही रान"
                      value={newDishHindi}
                      onChange={(e) => setNewDishHindi(e.target.value)}
                      className="w-full p-2 bg-[#F5EFE4] border border-[#E8DDCC] rounded"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Category *</label>
                    <select
                      value={newDishCategory}
                      onChange={(e) => setNewDishCategory(e.target.value as any)}
                      className="w-full p-2 bg-[#F5EFE4] border border-[#E8DDCC] rounded"
                    >
                      <option value="starters">Tandoori Starters</option>
                      <option value="veg-mains">Vegetarian Curries</option>
                      <option value="non-veg-mains">Royal Non-Veg Mains</option>
                      <option value="breads-rice">Tandoori Breads & Rice</option>
                      <option value="beverages">Beverages</option>
                      <option value="desserts">Desserts</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-semibold mb-1">Price (₹) *</label>
                    <input
                      type="number"
                      required
                      value={newDishPrice}
                      onChange={(e) => setNewDishPrice(Number(e.target.value))}
                      className="w-full p-2 bg-[#F5EFE4] border border-[#E8DDCC] rounded"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Photo Image URL</label>
                    <input
                      type="url"
                      value={newDishImage}
                      onChange={(e) => setNewDishImage(e.target.value)}
                      className="w-full p-2 bg-[#F5EFE4] border border-[#E8DDCC] rounded"
                    />
                  </div>

                  <div className="flex items-center gap-4 pt-4">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newDishIsVeg}
                        onChange={(e) => setNewDishIsVeg(e.target.checked)}
                      />
                      <span>Vegetarian</span>
                    </label>

                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newDishIsSpecial}
                        onChange={(e) => setNewDishIsSpecial(e.target.checked)}
                      />
                      <span>1974 Special</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Culinary Description *</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Describe the cooking method, potli spices, and flavour profile..."
                    value={newDishDescription}
                    onChange={(e) => setNewDishDescription(e.target.value)}
                    className="w-full p-2 bg-[#F5EFE4] border border-[#E8DDCC] rounded"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2 bg-[#5A1F24] text-white rounded font-semibold uppercase tracking-wider hover:bg-[#43161A]"
                >
                  Save Dish to Menu
                </button>
              </form>
            )}

            {/* Menu Items Table */}
            <div className="bg-white rounded-xl border border-[#E8DDCC] overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F5EFE4] uppercase tracking-wider font-semibold border-b border-[#E8DDCC]">
                    <tr>
                      <th className="p-3.5">Dish</th>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Dietary</th>
                      <th className="p-3.5">Price</th>
                      <th className="p-3.5">Tags</th>
                      <th className="p-3.5 text-right">Delete</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8DDCC]">
                    {menuItems.map((dish) => (
                      <tr key={dish.id} className="hover:bg-[#FCFAF5]">
                        <td className="p-3.5 flex items-center gap-3">
                          <img
                            src={dish.image}
                            alt={dish.name}
                            className="w-10 h-10 rounded object-cover border border-[#E8DDCC]"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <strong className="text-sm font-serif text-[#1E1714]">
                              {dish.name}
                            </strong>
                            <p className="text-[11px] text-[#1E1714]/60 line-clamp-1">
                              {dish.description}
                            </p>
                          </div>
                        </td>
                        <td className="p-3.5 capitalize">{dish.category}</td>
                        <td className="p-3.5">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              dish.isVeg ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {dish.isVeg ? 'Veg' : 'Non-Veg'}
                          </span>
                        </td>
                        <td className="p-3.5 font-bold font-serif text-[#5A1F24]">
                          ₹{dish.price}
                        </td>
                        <td className="p-3.5">
                          {dish.isChefSpecial && (
                            <span className="bg-[#B58A4A]/20 text-[#8C6527] px-2 py-0.5 rounded text-[10px] font-bold">
                              1974 Special
                            </span>
                          )}
                        </td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => deleteMenuItem(dish.id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Remove Dish"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: JOURNAL */}
        {activeTab === 'journal' && (
          <div className="space-y-4">
            <h3 className="text-lg font-serif font-bold text-[#5A1F24]">
              Journal Articles & SEO Guides ({journalArticles.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {journalArticles.map((art) => (
                <div key={art.id} className="bg-white p-5 rounded-xl border border-[#E8DDCC] flex gap-4">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-24 h-24 rounded-lg object-cover shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-[#B58A4A]">{art.category}</span>
                    <h4 className="text-sm font-serif font-bold text-[#1E1714]">{art.title}</h4>
                    <p className="text-xs text-[#1E1714]/60 line-clamp-2">{art.excerpt}</p>
                    <span className="text-[11px] text-[#1E1714]/40 block">{art.publishedDate} • {art.readTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: RECIPES */}
        {activeTab === 'recipes' && (
          <div className="space-y-4">
            <h3 className="text-lg font-serif font-bold text-[#5A1F24]">
              Royal Master Recipes ({recipes.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recipes.map((rec) => (
                <div key={rec.id} className="bg-white p-5 rounded-xl border border-[#E8DDCC] space-y-2">
                  <img
                    src={rec.image}
                    alt={rec.title}
                    className="w-full h-32 rounded-lg object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-[10px] uppercase font-bold text-[#B58A4A]">{rec.category}</span>
                  <h4 className="text-sm font-serif font-bold text-[#1E1714]">{rec.title}</h4>
                  <p className="text-xs text-[#1E1714]/60 line-clamp-2">{rec.description}</p>
                  <div className="text-[11px] text-[#5A1F24] font-medium pt-1">
                    Prep: {rec.prepTime} | {rec.servings}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
