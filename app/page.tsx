import Image from "next/image"
import { Catalog } from "@/components/catalog"
import { CartSheet } from "@/components/cart-sheet"
import { SiteHeader } from "@/components/site-header"
import { CartProvider } from "@/lib/cart-context"
import { SHOP_CONFIG } from "@/lib/products"

export default function Page() {
  return (
    <CartProvider>
      <div className="min-h-dvh bg-background text-foreground antialiased selection:bg-black selection:text-white">
        <SiteHeader />

        <main>
          {/* HERO SECTION */}
          <section className="relative isolate overflow-hidden bg-background">
            {/* Imagen Optimizada de Next.js */}
            <Image
              src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1950&q=80"
              alt={SHOP_CONFIG.name}
              fill
              priority
              sizes="100vw"
              className="absolute inset-0 -z-30 h-full w-full object-cover object-center brightness-[0.85]"
            />

            {/* Capa de contraste ambiental */}
            <div className="absolute inset-0 -z-20 bg-black/40" />

            {/* DEGRADÉ INFERIOR EFECTIVO */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/10 to-transparent" />

            {/* Contenido del Hero */}
            <div className="relative mx-auto flex min-h-[85vh] max-w-7xl items-end px-6 pb-20 pt-32 sm:px-8 sm:pb-28 lg:min-h-[95vh] lg:px-12">
              <div className="max-w-3xl">
                
                {/* Badge de Estado */}
                <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md shadow-sm">
                  Catálogo Oficial {new Date().getFullYear()}
                </span>

                {/* Título Directo */}
                <h1 className="mt-6 text-5xl font-extrabold leading-[0.95] tracking-tighter text-white sm:text-7xl lg:text-8xl drop-shadow-sm">
                  Tu pedido, <br />
                  <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                    al WhatsApp.
                  </span>
                </h1>

                {/* Descripción breve de uso */}
                <p className="mt-4 max-w-md text-base leading-snug text-zinc-300 sm:text-lg font-medium drop-shadow-sm">
                  Explorá el stock disponible, sumá tus prendas favoritas al carrito y envianos el pedido para coordinar el pago y la entrega en minutos.
                </p>

                {/* Botones de Acción (CTAs) */}
                <div className="mt-10 flex flex-col gap-3.5 sm:flex-row">
                  <a
                    href="#catalogo"
                    className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-black transition-all duration-300 hover:bg-zinc-200 hover:shadow-xl hover:shadow-white/5 active:scale-95"
                  >
                    Ver catálogo
                  </a>

                  <a
                    href={`https://wa.me/${SHOP_CONFIG.whatsappNumber}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/10 active:scale-95"
                  >
                    Soporte directo
                  </a>
                </div>

              </div>
            </div>
          </section>

          {/* SECCIÓN DEL CATÁLOGO */}
          <div id="catalogo" className="scroll-mt-20 bg-background pt-10">
            <Catalog />
          </div>
        </main>

        {/* FOOTER SECTION */}
        <footer className="border-t border-border bg-muted/20">
          <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-bold tracking-tight">
                  {SHOP_CONFIG.name}
                </h3>
                <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                  {SHOP_CONFIG.tagline}
                </p>
              </div>

              {/* Redes Sociales con SVGs Inline (Cero problemas de importación) */}
              <div className="flex items-center gap-4">
                {/* Instagram */}
                <a 
                  href="https://instagram.com/okcomputersgo" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </a>

                {/* LinkedIn */}
                <a 
                  href="https://linkedin.com/in/patocorbalanli" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect width="4" height="12" x="2" y="9"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>

                {/* WhatsApp */}
                <a 
                  href="https://wa.me/543856128340" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  aria-label="WhatsApp"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Separador e información de autoría */}
            <div className="mt-12 border-t border-border pt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs text-muted-foreground/80">
              <div>
                © {new Date().getFullYear()} {SHOP_CONFIG.name}. Todos los derechos reservados.
              </div>
              <div className="font-medium tracking-wide">
                Hecho por{" "}
                <a 
                  href="https://instagram.com/okcomputersgo" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-foreground transition-colors hover:underline"
                >
                  okcomputersgo
                </a>{" "}
                — Creado por{" "}
                <a 
                  href="https://linkedin.com/in/patocorbalanli" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-foreground transition-colors hover:underline"
                >
                  @patocorbalanli
                </a>
              </div>
            </div>
          </div>
        </footer>

        <CartSheet />
      </div>
    </CartProvider>
  )
}