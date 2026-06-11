export default function BackgroundGrid() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" style={{ contain: 'strict' }}>
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(to right, rgba(251, 191, 36, 0.03) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(251, 191, 36, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }} />

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
      <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent" />

      {/* Single ambient orb — enough for depth without extra GPU paint layers */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-pulse" />
    </div>
  );
}

