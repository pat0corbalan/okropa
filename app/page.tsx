import { Catalog } from "@/components/catalog"
import { CartSheet } from "@/components/cart-sheet"
import { SiteHeader } from "@/components/site-header"
import { CartProvider } from "@/lib/cart-context"
import { SHOP_CONFIG } from "@/lib/products"

export default function Page() {
  return (
    <CartProvider>
      <div className="min-h-dvh bg-background">
        <SiteHeader />

        <main>
          {/* Hero */}
          <section className="border-b border-border bg-card">
            <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
              <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                Nueva temporada
              </span>
              <h1 className="mt-4 max-w-2xl text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                Ropa y accesorios para armar tu estilo
              </h1>
              <p className="mt-3 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
                Elegí tus prendas favoritas, seleccioná talle y color, y enviá tu
                pedido directo por WhatsApp. Sin vueltas.
              </p>
              <a
                href="#catalogo"
                className="mt-6 inline-flex h-12 items-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105 active:scale-95"
              >
                Ver catálogo
              </a>
            </div>
          </section>

          <Catalog />
        </main>

        <footer className="border-t border-border">
          <div className="mx-auto max-w-6xl px-4 py-8 text-center text-sm text-muted-foreground sm:px-6">
            <p className="font-semibold text-foreground">{SHOP_CONFIG.name}</p>
            <p className="mt-1">{SHOP_CONFIG.tagline}</p>
            <p className="mt-3 text-xs">
              Realizá tu pedido por WhatsApp · Coordinamos pago y envío
            </p>
          </div>
        </footer>

        <CartSheet />
      </div>
    </CartProvider>
  )
}
