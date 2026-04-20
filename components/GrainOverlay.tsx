export default function GrainOverlay() {
  return (
    <div
      className="fixed inset-0 z-[500] pointer-events-none select-none"
      aria-hidden="true"
      style={{ opacity: 0.032 }}
    >
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh" }}
      >
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  );
}
