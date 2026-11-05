import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { EVENT_TEMPLATES } from "../../services/templatesData";
import { eventStore } from "../../services/eventStore";
import { CreateEventModal } from "./CreateEventModal";

export const TemplatesPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const categories = ["All", "Medical & Healthcare", "Business & Tech", "Education & Skills"];

  const filtered = EVENT_TEMPLATES.filter((t) => {
    if (selectedCategory === "All") return true;
    return t.category === selectedCategory;
  });

  const handleUseTemplate = (templateId: string, templateName: string) => {
    const created = eventStore.createEvent({
      name: `${templateName} ${new Date().getFullYear()}`,
      templateId,
    });
    navigate(`/admin/events/${created.id}/builder`);
  };

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Event Templates Catalog
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Kickstart your next event with expertly designed, structured section templates.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-2xl w-fit">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setSelectedCategory(c)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              selectedCategory === c
                ? "bg-slate-900 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((tpl) => (
          <div
            key={tpl.id}
            className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <img
                  src={tpl.thumbnail}
                  alt={tpl.name}
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-900/90 text-white backdrop-blur-xs font-mono">
                  {tpl.category}
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold font-mono uppercase text-slate-900 group-hover:text-zinc-600 transition">
                  {tpl.name}
                </h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {tpl.description}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap gap-1.5 font-mono">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600">
                    Hero Banner
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600">
                    Speakers
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600">
                    Schedule
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600">
                    Registration
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600">
                    Sponsors
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={() => handleUseTemplate(tpl.id, tpl.name)}
                className="w-full py-2.5 px-4 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold font-mono text-xs flex items-center justify-center gap-2 transition duration-200 shadow-sm active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Use This Template</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <CreateEventModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};
