export function Background() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Gradient orbs - Purple/Burgundy */}
      <div className="bg-orb bg-orb-purple -top-[200px] -left-[200px]" />
      <div className="bg-orb bg-orb-burgundy top-[40%] -right-[150px]" />

      {/* Grid pattern - Purple tinted */}
      <div className="absolute inset-0 bg-grid" />

      {/* Scan lines */}
      <div className="absolute inset-0 bg-scanlines" />

      {/* Noise overlay */}
      <div className="bg-noise absolute inset-0" />

      {/* Vignette */}
      <div className="absolute inset-0 vignette" />
    </div>
  );
}
