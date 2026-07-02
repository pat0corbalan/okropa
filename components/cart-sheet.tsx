"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Minus, Plus, ShoppingBag, Trash2, X, Copy, Check } from "lucide-react"
import { useCart, type CartItem } from "@/lib/cart-context"
import { formatPrice, SHOP_CONFIG } from "@/lib/products"

function buildWhatsappMessage(items: CartItem[], subtotal: number): string {
  const lines: string[] = []
  lines.push(`*Nuevo pedido — ${SHOP_CONFIG.name}*`)
  lines.push("")
  items.forEach((item, index) => {
    lines.push(`${index + 1}. *${item.name}*`)
    lines.push(`   Talle: ${item.size} | Color: ${item.color}`)
    lines.push(
      `   Cantidad: ${item.quantity} x ${formatPrice(item.price)} = ${formatPrice(
        item.price * item.quantity,
      )}`,
    )
    lines.push("")
  })
  lines.push(`*TOTAL: ${formatPrice(subtotal)}*`)
  lines.push("")
  lines.push("¡Gracias! Quedo a la espera para coordinar el pago y la entrega.")
  return lines.join("\n")
}

export function CartSheet() {
  const {
    items,
    subtotal,
    totalItems,
    isOpen,
    closeCart,
    increment,
    decrement,
    removeItem,
  } = useCart()

  const [copiedType, setCopiedType] = useState<"alias" | "cvu" | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart()
    }
    if (isOpen) {
      window.addEventListener("keydown", onKey)
      document.body.style.overflow = "hidden"
    }
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [isOpen, closeCart])

  const copyToClipboard = (text: string, type: "alias" | "cvu") => {
    navigator.clipboard.writeText(text)
    setCopiedType(type)
    setTimeout(() => setCopiedType(null), 2000)
  }

  const handleCheckout = () => {
    const message = buildWhatsappMessage(items, subtotal)
    const url = `https://wa.me/${SHOP_CONFIG.whatsappNumber}?text=${encodeURIComponent(
      message,
    )}`
    window.open(url, "_blank")
  }

  // Datos mockeados de respaldo por si no están en tu SHOP_CONFIG todavía
  const paymentDetails = {
    bank: (SHOP_CONFIG as any).bankName || "Mercado Pago",
    alias: (SHOP_CONFIG as any).alias || "patocorba.mp",
    cvu: (SHOP_CONFIG as any).cvu || "0000003100029273093344" // Cambiar por el real
  }

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        isOpen ? "visible opacity-100" : "invisible opacity-0"
      }`}
      aria-hidden={!isOpen}
    >
      {/* OVERLAY CON BACKDROP BLUR */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      {/* PANEL LATERAL SLIDE-OVER */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-card text-card-foreground shadow-2xl transition-transform ease-out duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* CABECERA */}
        <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="h-4 w-4 text-foreground/80" />
            <h2 className="text-sm font-bold tracking-tight">
              Tu carrito{totalItems > 0 ? ` (${totalItems})` : ""}
            </h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Cerrar carrito"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/40 bg-background/50 text-muted-foreground transition-all hover:bg-accent hover:text-foreground active:scale-90"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* CONTENIDO PRINCIPAL */}
        {items.length === 0 ? (
          /* ESTADO VACÍO */
          <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 text-center max-w-sm mx-auto">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <ShoppingBag className="h-5 w-5 text-muted-foreground" />
            </div>
            <h3 className="mt-2 text-sm font-semibold tracking-tight">Tu carrito está vacío</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Agregá algunas prendas de nuestro catálogo para iniciar tu pedido.
            </p>
            <button
              type="button"
              onClick={closeCart}
              className="mt-4 inline-flex h-10 items-center justify-center rounded-full bg-foreground px-5 text-xs font-semibold text-background transition-all hover:bg-foreground/90 active:scale-95"
            >
              Explorar tienda
            </button>
          </div>
        ) : (
          <>
            {/* LISTA DE ITEMS */}
            <ul className="flex-1 divide-y divide-border/40 overflow-y-auto px-5">
              {items.map((item) => (
                <li key={item.key} className="flex gap-4 py-4 items-center">
                  <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-xl bg-muted border border-border/20">
                    <Image
                      src={item.image_url || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      sizes="64px"
                      className="object-cover object-top"
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col h-20 justify-between py-0.5">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="truncate text-sm font-semibold tracking-tight text-foreground/90">
                          {item.name}
                        </h3>
                        <button
                          type="button"
                          onClick={() => removeItem(item.key)}
                          aria-label={`Quitar ${item.name}`}
                          className="shrink-0 p-0.5 text-muted-foreground/70 transition-colors hover:text-destructive"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="mt-0.5 text-[11px] font-medium text-muted-foreground">
                        Talle {item.size} · {item.color}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center rounded-full border border-border bg-background shadow-sm">
                        <button
                          type="button"
                          onClick={() => decrement(item.key)}
                          aria-label="Restar una unidad"
                          className="inline-flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => increment(item.key)}
                          aria-label="Sumar una unidad"
                          className="inline-flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="text-xs font-bold tracking-tight text-foreground">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* RESUMEN DE COMPRA + DATOS DE TRANSFERENCIA */}
            <div className="border-t border-border/60 bg-card px-5 py-5 space-y-4 shadow-[0_-8px_30px_rgb(0,0,0,0.04)]">
              
              {/* BLOQUE DE DATOS BANCARIOS PREMIUM */}
              <div className="rounded-2xl border border-border/60 bg-muted/30 p-3.5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Datos de Transferencia ({paymentDetails.bank})
                  </span>
                </div>
                
                <div className="grid gap-1.5 text-xs">
                  {/* Fila Alias */}
                  <div className="flex items-center justify-between rounded-lg bg-background border border-border/40 p-2">
                    <span className="text-muted-foreground font-medium">Alias: <strong className="text-foreground select-all">{paymentDetails.alias}</strong></span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(paymentDetails.alias, "alias")}
                      className="p-1 text-muted-foreground/80 hover:text-foreground transition-colors"
                      aria-label="Copiar Alias"
                    >
                      {copiedType === "alias" ? <Check className="h-3..5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>

                  {/* Fila CVU */}
                  <div className="flex items-center justify-between rounded-lg bg-background border border-border/40 p-2">
                    <span className="text-muted-foreground font-medium truncate max-w-[280px]">CVU: <strong className="text-foreground select-all tracking-tighter tabular-nums">{paymentDetails.cvu}</strong></span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(paymentDetails.cvu, "cvu")}
                      className="p-1 text-muted-foreground/80 hover:text-foreground transition-colors"
                      aria-label="Copiar CVU"
                    >
                      {copiedType === "cvu" ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* TOTALES */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground tabular-nums">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between border-t border-border/40 pt-2">
                  <span className="text-sm font-bold tracking-tight">Total estimado</span>
                  <span className="text-lg font-extrabold tracking-tight text-foreground tabular-nums">
                    {formatPrice(subtotal)}
                  </span>
                </div>
              </div>

              {/* ACCIÓN PRINCIPAL */}
              <div className="pt-0.5">
                <button
                  type="button"
                  onClick={handleCheckout}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground text-sm font-semibold text-background shadow-xl shadow-foreground/5 transition-all hover:bg-foreground/90 active:scale-[0.98]"
                >
                  <span>Finalizar pedido por WhatsApp</span>
                </button>
                <p className="mt-2 text-center text-[10px] font-medium text-muted-foreground/80 leading-snug">
                  Transferí o guardá los datos arriba y completá el envío para pasar el comprobante.
                </p>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}