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
              className="absolute inset-0 -z-30 h-full w-full object-cover object-center brightness-[0.95]"
            />

            {/* Capa de contraste ambiental (Mantiene los textos legibles arriba y al centro) */}
            <div className="absolute inset-0 -z-20 bg-black/25" />

            {/* DEGRADÉ INFERIOR EFECTIVO: El sistema que reaccionó bien en tu pantalla, 
                pero con opacidades sutiles (via-background/15) para no lavar ni tapar la imagen */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/15 to-transparent" />

            {/* Contenido del Hero */}
            <div className="relative mx-auto flex min-h-[85vh] max-w-7xl items-end px-6 pb-20 pt-32 sm:px-8 sm:pb-28 lg:min-h-[95vh] lg:px-12">
              <div className="max-w-2xl">
                
                {/* Badge de Colección */}
                <span className="inline-flex items-center rounded-full border border-white/30 bg-black/20 px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md shadow-sm">
                  Nueva colección
                </span>

                {/* Título Principal con degradé en texto */}
                <h1 className="mt-6 text-4xl font-extrabold leading-[0.95] tracking-tighter text-white sm:text-6xl lg:text-8xl drop-shadow-sm">
                  Vestite <br />
                  <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                    con identidad.
                  </span>
                </h1>

                {/* Descripción */}
                <p className="mt-6 max-w-md text-base leading-relaxed text-zinc-100 sm:text-lg font-medium drop-shadow-sm">
                  Encontrá prendas pensadas para un estilo moderno, minimalista y cómodo. 
                  Elegí tus favoritos, sumalos al carrito y pedilos directamente por WhatsApp.
                </p>

                {/* Botones de Acción (CTAs) */}
                <div className="mt-10 flex flex-col gap-3.5 sm:flex-row">
                  <a
                    href="#catalogo"
                    className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-black transition-all duration-300 hover:bg-zinc-100 hover:shadow-xl hover:shadow-white/5 active:scale-95"
                  >
                    Explorar catálogo
                  </a>

                  <a
                    href={`https://wa.me/${SHOP_CONFIG.whatsappNumber}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-12 items-center justify-center rounded-full border border-white/30 bg-black/20 px-8 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white/50 hover:bg-white/10 active:scale-95"
                  >
                    Asesoría personalizada
                  </a>
                </div>

                {/* Métricas / Datos rápidos */}
                {/* <div className="mt-14 grid grid-cols-3 gap-8 border-t border-white/20 pt-8 text-white">
                  <div>
                    <p className="text-2xl font-semibold tracking-tight sm:text-3xl drop-shadow-sm">+500</p>
                    <p className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-zinc-200">
                      Prendas
                    </p>
                  </div>

                  <div>
                    <p className="text-2xl font-semibold tracking-tight sm:text-3xl drop-shadow-sm">Inmediata</p>
                    <p className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-zinc-200">
                      Respuesta
                    </p>
                  </div>

                  <div>
                    <p className="text-2xl font-semibold tracking-tight sm:text-3xl drop-shadow-sm">100%</p>
                    <p className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-zinc-200">
                      Calidad
                    </p>
                  </div>
                </div> */}

              </div>
            </div>
          </section>

          {/* BANNER DE VALORES DE MARCA: Conexión orgánica entre Hero y Catálogo */}
          {/* <section className="border-b border-border bg-background py-10 relative z-10">
            <div className="mx-auto max-w-7xl px-6 lg:px-12">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-4 text-center text-sm text-muted-foreground">
                <div className="flex flex-col items-center gap-1.5">
                  <p className="font-semibold text-foreground tracking-tight">Envíos a todo el país</p>
                  <p className="text-xs text-muted-foreground/80">Recibí tu pedido en la puerta de tu casa</p>
                </div>
                <div className="flex flex-col items-center gap-1.5 border-y border-border/60 py-5 sm:border-x sm:border-y-0 sm:py-0">
                  <p className="font-semibold text-foreground tracking-tight">Showroom Exclusivo</p>
                  <p className="text-xs text-muted-foreground/80">Atención personalizada con cita previa</p>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <p className="font-semibold text-foreground tracking-tight">Compra Segura</p>
                  <p className="text-xs text-muted-foreground/80">Coordiná el pago de forma directa y confiable</p>
                </div>
              </div>
            </div>
          </section> */}

          {/* SECCIÓN DEL CATÁLOGO: scroll-mt-20 evita que el header tape el contenido al hacer clic en "Explorar" */}
          <div id="catalogo" className="scroll-mt-20 bg-background pt-10">
            <Catalog />
          </div>
        </main>

        {/* FOOTER SECTION */}
        <footer className="border-t border-border bg-muted/30">
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

              <div className="text-sm text-muted-foreground max-w-md md:text-right">
                Armá tu carrito con las prendas que te identifiquen, envianos el pedido por WhatsApp y coordinamos los detalles de pago y entrega en minutos.
              </div>
            </div>

            <div className="mt-12 border-t border-border pt-6 text-center text-xs text-muted-foreground/80">
              © {new Date().getFullYear()} {SHOP_CONFIG.name}. Todos los derechos reservados.
            </div>
          </div>
        </footer>

        <CartSheet />
      </div>
    </CartProvider>
  )
}