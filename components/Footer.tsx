export default function Footer() {
  return (
    <footer className="bg-carbon px-6 md:px-13 py-12 border-t border-forest/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <span
        className="font-bebas text-white/45 uppercase tracking-[.22em]"
        style={{ fontSize: 22 }}
      >
        LID Academy
      </span>
      <p
        className="font-dm font-light text-white/40 uppercase tracking-[.18em]"
        style={{ fontSize: 11 }}
      >
        Miguel Ángel Jr · Health &amp; Performance Coach · lidacademy.com
      </p>
    </footer>
  );
}
