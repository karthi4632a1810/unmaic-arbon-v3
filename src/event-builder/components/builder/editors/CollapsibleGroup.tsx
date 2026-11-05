import React, { useState } from "react";
import { ChevronDown, Maximize2 } from "lucide-react";

export interface CollapsibleGroupProps {
  id?: string;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  badge?: string;
  headerAction?: React.ReactNode;
  onExpand?: () => void;
  expandTooltip?: string;
  isOpen?: boolean;
  defaultOpen?: boolean;
  onToggle?: () => void;
  children: React.ReactNode;
  className?: string;
}

export const CollapsibleGroup: React.FC<CollapsibleGroupProps> = ({
  title,
  subtitle,
  icon,
  badge,
  headerAction,
  onExpand,
  expandTooltip = "Expand to fullscreen gallery",
  isOpen: controlledIsOpen,
  defaultOpen = false,
  onToggle,
  children,
  className = "",
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen);
  const isControlled = typeof controlledIsOpen === "boolean";
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    }
    if (!isControlled) {
      setInternalIsOpen((prev) => !prev);
    }
  };

  return (
    <div
      className={`rounded-xl border border-zinc-200/90 bg-white overflow-hidden shadow-2xs transition-all duration-200 ${
        isOpen ? "ring-1 ring-zinc-300/60" : "hover:border-zinc-300"
      } ${className}`}
    >
      <div className="w-full px-3.5 py-2.5 flex items-center justify-between gap-2.5 text-left bg-white hover:bg-zinc-50/90 transition-colors select-none">
        <div
          onClick={handleToggle}
          className="flex items-center gap-2.5 min-w-0 flex-1 cursor-pointer"
        >
          {icon && (
            <div className="w-6 h-6 rounded-lg bg-zinc-100 text-zinc-800 flex items-center justify-center shrink-0 border border-zinc-200/60 shadow-2xs">
              {icon}
            </div>
          )}
          <div className="min-w-0">
            <span className="text-xs font-bold text-zinc-900 tracking-tight block truncate">
              {title}
            </span>
            {subtitle && (
              <span className="text-[10px] text-zinc-400 font-mono block truncate">
                {subtitle}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {headerAction && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center"
            >
              {headerAction}
            </div>
          )}
          {badge && (
            <span
              onClick={handleToggle}
              className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200/80 truncate max-w-[130px] cursor-pointer"
            >
              {badge}
            </span>
          )}
          {onExpand && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onExpand();
              }}
              title={expandTooltip}
              className="w-5 h-5 rounded-md hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900 flex items-center justify-center transition cursor-pointer"
            >
              <Maximize2 className="w-3 h-3" />
            </button>
          )}
          <div
            onClick={handleToggle}
            className={`w-5 h-5 rounded-md flex items-center justify-center text-zinc-400 transition-transform duration-200 cursor-pointer ${
              isOpen ? "rotate-180 text-zinc-700" : ""
            }`}
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="p-3.5 border-t border-zinc-100 bg-zinc-50/40 space-y-3.5 animate-in fade-in-50 duration-150">
          {children}
        </div>
      )}
    </div>
  );
};
