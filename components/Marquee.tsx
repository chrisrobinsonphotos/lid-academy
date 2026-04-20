export default function Marquee() {
  const text =
    "Executive Reality Assessment · Lifestyle & Habit Diagnosis · Physical Performance Evaluation · Strategic Alignment Plan · 50 clients per year · Systems, not discipline · ";

  return (
    <section className="bg-forest overflow-hidden py-[13px]" aria-label="Services">
      <div className="marquee-track">
        {[text, text].map((chunk, idx) => (
          <span
            key={idx}
            className="font-bebas tracking-[.14em] text-mist/65 whitespace-nowrap"
            style={{ fontSize: "clamp(18px, 5.2vw, 60px)" }}
            aria-hidden={idx > 0 ? true : undefined}
          >
            {chunk}
          </span>
        ))}
      </div>
    </section>
  );
}
