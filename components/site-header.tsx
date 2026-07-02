"use client"

import Image from "next/image"
import { useCart } from "@/lib/cart-context"
import { SHOP_CONFIG } from "@/lib/products"

export function SiteHeader() {
  const { totalItems, openCart } = useCart()

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/60 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-6 lg:px-12">

        {/* BRAND LOGO & INFO */}
        <a href="#" className="flex items-center gap-3 transition-opacity hover:opacity-90">
          {SHOP_CONFIG.logo && (
            <div className="relative h-9 w-9 overflow-hidden rounded-lg border border-border/60">
              <Image
                src={SHOP_CONFIG.logo}
                alt={SHOP_CONFIG.name}
                fill
                sizes="36px"
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="flex flex-col leading-tight">
            <span className="text-sm font-extrabold tracking-tight sm:text-base">
              {SHOP_CONFIG.name}
            </span>
            {SHOP_CONFIG.tagline && (
              <span className="text-[11px] font-medium tracking-wide text-muted-foreground">
                {SHOP_CONFIG.tagline}
              </span>
            )}
          </div>
        </a>

        {/* CART BUTTON */}
        <button 
          type="button" 
          onClick={openCart}
          className="group relative rounded-full p-2.5 text-muted-foreground transition-all hover:bg-muted hover:text-foreground active:scale-95"
          aria-label="Abrir carrito"
        >
          {/* Icono de bolsa premium inline */}
          <svg 
            className="h-5 w-5 transition-transform group-hover:scale-105" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          
          {/* Contador de items flotante refinado */}
          {totalItems > 0 && (
            <span className="absolute top-1 right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-foreground px-1 text-[9px] font-black tracking-tighter text-background ring-2 ring-background animate-in fade-in zoom-in duration-200">
              {totalItems}
            </span>
          )}
        </button>

      </div>
    </header>
  )
}