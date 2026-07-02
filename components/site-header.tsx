"use client"

import { ShoppingBag } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { SHOP_CONFIG } from "@/lib/products"

export function SiteHeader() {
  const { totalItems, openCart } = useCart()

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">

        {/* LOGO + INFO */}
        <div className="flex items-center gap-3">

          {SHOP_CONFIG.logo && (
            <img
              src={SHOP_CONFIG.logo}
              alt={SHOP_CONFIG.name}
              className="h-9 w-9 rounded-lg object-cover"
            />
          )}

          <div className="flex flex-col leading-none">
            <span className="text-sm font-bold sm:text-lg">
              {SHOP_CONFIG.name}
            </span>

            <span className="text-xs text-muted-foreground">
              {SHOP_CONFIG.tagline}
            </span>
          </div>
        </div>

        {/* CARRITO */}
        <button 
  type="button" 
  onClick={openCart} // O la función que uses para setear isOpen en true
  className="relative p-2 text-foreground/80 hover:text-foreground transition-colors"
  aria-label="Abrir carrito"
>
  <ShoppingBag className="h-5 w-5" />
  
  {/* Si tenés el contador de items flotante, va acá adentro */}
  {totalItems > 0 && (
    <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
      {totalItems}
    </span>
  )}
</button>

      </div>
    </header>
  )
}