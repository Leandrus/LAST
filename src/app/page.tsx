export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-background relative overflow-hidden">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>
      
      <div className="z-10 text-center space-y-8 glass p-12 rounded-lg max-w-3xl animate-in fade-in zoom-in duration-1000">
        <h1 className="text-6xl md:text-8xl font-heading font-bold text-gradient tracking-tighter">
          TEAM LAST
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground font-light tracking-wide uppercase">
          The Resurgence
        </p>
        
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent my-8" />
        
        <p className="text-lg text-foreground/80 max-w-xl mx-auto leading-relaxed">
          Iniciando sistemas de telemetría... Preparando la leyenda para la nueva era del simracing.
        </p>

        <div className="pt-8">
          <button className="px-8 py-3 rounded-md bg-primary text-primary-foreground font-semibold tracking-wide hover:bg-primary/90 transition-all duration-300 shadow-[0_0_20px_rgba(230,120,23,0.3)] hover:shadow-[0_0_30px_rgba(230,120,23,0.5)]">
            EXPLORAR ROSTER
          </button>
        </div>
      </div>
    </main>
  );
}
