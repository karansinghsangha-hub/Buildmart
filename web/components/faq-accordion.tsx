"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { faqs } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function FaqAccordion() {
  const [open, setOpen] = useState(0);

  return (
    <div>
      {faqs.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="border-b border-border py-5">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="flex w-full items-center justify-between text-left text-base font-semibold text-primary"
              aria-expanded={isOpen}
            >
              <span>{item.q}</span>
              <Plus className={cn("h-[18px] w-[18px] flex-none transition-transform duration-300", isOpen && "rotate-45")} />
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-300"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="max-w-[70ch] pt-3.5 text-sm text-muted-foreground">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FaqAccordion;
