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
          onClick={openCart}
          aria-label="Abrir carrito"
          className="relative inline-flex h-11 items-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105 active:scale-95"
        >
          <ShoppingBag className="h-5 w-5" />
          <span className="hidden sm:inline">Carrito</span>

          {totalItems > 0 && (
            <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-foreground px-1 text-xs font-bold text-background">
              {totalItems}
            </span>
          )}
        </button>

      </div>
    </header>
  )
}