"use client";

import React, { useState } from "react";
import { ChevronDown, Check, Search, X } from "lucide-react";
import { departmentGroups, brandCounts } from "@/lib/products";

export interface FilterState {
  departments: string[];
  brands: string[];
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  onOfferOnly: boolean;
}

interface ShopFiltersProps {
  value: FilterState;
  onChange: (next: FilterState) => void;
  bounds: { min: number; max: number };
  activeCount: number;
  onClear: () => void;
}

/** A collapsible filter section. */
const Section: React.FC<{
  title: string;
  /** Number of active selections, shown beside the title. */
  badge?: number;
  defaultOpen?: boolean;
  children: React.ReactNode;
}> = ({ title, badge = 0, defaultOpen = false, children }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-[#e6e0d3] last:border-b-0">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between py-4 text-left group"
      >
        <span className="flex items-center gap-2">
          <span className="font-display text-[17px] text-[#171512]">{title}</span>
          {badge > 0 && (
            <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-[#C58E2A] text-[#171512] text-[10px] font-bold flex items-center justify-center tabular-nums">
              {badge}
            </span>
          )}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-[#a49e91] group-hover:text-[#C58E2A] transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Height-animated so the panel opens rather than snapping */}
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pb-5">{children}</div>
        </div>
      </div>
    </div>
  );
};

const Tick: React.FC<{ on: boolean }> = ({ on }) => (
  <span
    className={`w-4 h-4 shrink-0 rounded-[3px] border flex items-center justify-center transition-colors ${
      on
        ? "bg-[#171512] border-[#171512]"
        : "border-[#d8d1c2] group-hover:border-[#C58E2A]"
    }`}
  >
    {on && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
  </span>
);

const CheckRow: React.FC<{
  label: string;
  count?: number;
  on: boolean;
  onToggle: () => void;
}> = ({ label, count, on, onToggle }) => (
  <button
    onClick={onToggle}
    aria-pressed={on}
    className="w-full group flex items-center gap-3 py-[7px] text-left"
  >
    <Tick on={on} />
    <span
      className={`flex-1 text-[13px] transition-colors ${
        on ? "text-[#171512] font-medium" : "text-[#6f6a60] group-hover:text-[#171512]"
      }`}
    >
      {label}
    </span>
    {count !== undefined && (
      <span className="text-[11px] tabular-nums text-[#a49e91]">{count}</span>
    )}
  </button>
);

export const ShopFilters: React.FC<ShopFiltersProps> = ({
  value,
  onChange,
  bounds,
  activeCount,
  onClear,
}) => {
  const [brandQuery, setBrandQuery] = useState("");

  const toggle = (key: "departments" | "brands", name: string) =>
    onChange({
      ...value,
      [key]: value[key].includes(name)
        ? value[key].filter((x) => x !== name)
        : [...value[key], name],
    });

  const visibleBrands = brandCounts.filter((b) =>
    b.name.toLowerCase().includes(brandQuery.trim().toLowerCase())
  );

  const availabilityCount =
    (value.inStockOnly ? 1 : 0) + (value.onOfferOnly ? 1 : 0);
  const priceTouched =
    value.minPrice > bounds.min || value.maxPrice < bounds.max;

  return (
    <div>
      <div className="flex items-baseline justify-between pb-4 border-b border-[#171512]">
        <h2 className="font-display text-xl text-[#171512]">Filter</h2>
        {activeCount > 0 && (
          <button
            onClick={onClear}
            className="text-[11px] uppercase tracking-[0.14em] text-[#6f6a60] hover:text-[#C58E2A] transition-colors"
          >
            Clear all ({activeCount})
          </button>
        )}
      </div>

      {/* ---------- Department, grouped ---------- */}
      <Section
        title="Category"
        badge={value.departments.length}
        defaultOpen
      >
        <div className="space-y-4">
          {departmentGroups.map(({ group, departments }) => (
            <div key={group}>
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#a49e91] mb-1.5">
                {group}
              </div>
              {departments.map(({ name, count }) => (
                <CheckRow
                  key={name}
                  label={name}
                  count={count}
                  on={value.departments.includes(name)}
                  onToggle={() => toggle("departments", name)}
                />
              ))}
            </div>
          ))}
        </div>
      </Section>

      {/* ---------- Brand ---------- */}
      <Section title="Brand" badge={value.brands.length}>
        <div className="relative mb-3">
          <Search className="w-3.5 h-3.5 text-[#a49e91] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={brandQuery}
            onChange={(e) => setBrandQuery(e.target.value)}
            placeholder="Search brands"
            aria-label="Search brands"
            className="w-full bg-[#f7f4ee] border border-[#e6e0d3] rounded-full pl-8 pr-8 py-2 text-[12.5px] text-[#201c17] placeholder:text-[#a49e91] focus:outline-none focus:border-[#C58E2A] transition-colors"
          />
          {brandQuery && (
            <button
              onClick={() => setBrandQuery("")}
              aria-label="Clear brand search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#a49e91] hover:text-[#171512]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="max-h-64 overflow-y-auto pr-1">
          {visibleBrands.length > 0 ? (
            visibleBrands.map(({ name, count }) => (
              <CheckRow
                key={name}
                label={name}
                count={count}
                on={value.brands.includes(name)}
                onToggle={() => toggle("brands", name)}
              />
            ))
          ) : (
            <p className="text-[12.5px] text-[#a49e91] py-2">
              No brand matches “{brandQuery}”.
            </p>
          )}
        </div>
      </Section>

      {/* ---------- Price ---------- */}
      <Section title="Price" badge={priceTouched ? 1 : 0}>
        <div className="flex items-center gap-2.5 mb-4">
          {(
            [
              ["Min", "minPrice"],
              ["Max", "maxPrice"],
            ] as const
          ).map(([label, key]) => (
            <label key={key} className="flex-1">
              <span className="block text-[10px] uppercase tracking-[0.16em] text-[#a49e91] mb-1">
                {label}
              </span>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[11px] text-[#a49e91]">
                  GHS
                </span>
                <input
                  type="number"
                  min={bounds.min}
                  max={bounds.max}
                  value={value[key]}
                  onChange={(e) => {
                    const n = Number(e.target.value);
                    if (Number.isNaN(n)) return;
                    onChange({ ...value, [key]: n });
                  }}
                  // Keep the pair ordered once the field loses focus, so typing
                  // a max of 5 on the way to 500 does not fight the shopper.
                  onBlur={() =>
                    onChange({
                      ...value,
                      minPrice: Math.max(
                        bounds.min,
                        Math.min(value.minPrice, value.maxPrice)
                      ),
                      maxPrice: Math.min(
                        bounds.max,
                        Math.max(value.minPrice, value.maxPrice)
                      ),
                    })
                  }
                  className="w-full bg-[#f7f4ee] border border-[#e6e0d3] rounded-lg pl-10 pr-2 py-2 text-[13px] tabular-nums text-[#201c17] focus:outline-none focus:border-[#C58E2A] transition-colors"
                />
              </div>
            </label>
          ))}
        </div>

        <input
          type="range"
          min={bounds.min}
          max={bounds.max}
          step={10}
          value={value.maxPrice}
          onChange={(e) =>
            onChange({ ...value, maxPrice: Number(e.target.value) })
          }
          aria-label="Maximum price"
          className="w-full accent-[#C58E2A] cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-[#a49e91] mt-1 tabular-nums">
          <span>GHS {bounds.min}</span>
          <span>GHS {bounds.max}</span>
        </div>
      </Section>

      {/* ---------- Availability ---------- */}
      <Section title="Availability" badge={availabilityCount} defaultOpen>
        <CheckRow
          label="In stock only"
          on={value.inStockOnly}
          onToggle={() => onChange({ ...value, inStockOnly: !value.inStockOnly })}
        />
        <CheckRow
          label="On offer"
          on={value.onOfferOnly}
          onToggle={() => onChange({ ...value, onOfferOnly: !value.onOfferOnly })}
        />
      </Section>
    </div>
  );
};
