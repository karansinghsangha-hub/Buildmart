import { Star } from "lucide-react";
import { testimonials } from "@/lib/site-data";

export function TestimonialsGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((t) => (
        <div key={t.name} className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
          <div className="mb-4 flex gap-0.5 text-brass-300">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-current" />
            ))}
          </div>
          <p className="mb-5 text-sm italic text-[#faf7f0]/75">&ldquo;{t.quote}&rdquo;</p>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-950 font-display text-sm font-bold text-brass-300">
              {t.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <strong className="block text-sm text-[#faf7f0]">{t.name}</strong>
              <span className="text-xs text-[#faf7f0]/55">{t.role}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TestimonialsGrid;
