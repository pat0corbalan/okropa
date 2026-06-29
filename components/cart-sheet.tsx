"use client"

import { useEffect } from "react"
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react"
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

  const handleCheckout = () => {
    const message = buildWhatsappMessage(items, subtotal)
    const url = `https://wa.me/${SHOP_CONFIG.whatsappNumber}?text=${encodeURIComponent(
      message,
    )}`
    window.open(url, "_blank")
  }

  return (
    <div
      className={`fixed inset-0 z-50 ${isOpen ? "" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      {/* Overlay */}
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-foreground/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-card shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <h2 className="text-base font-bold">
              Tu carrito{totalItems > 0 ? ` (${totalItems})` : ""}
            </h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Cerrar carrito"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <ShoppingBag className="h-7 w-7 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium">Tu carrito está vacío</p>
            <p className="text-sm text-muted-foreground">
              Agregá productos para empezar tu pedido.
            </p>
            <button
              type="button"
              onClick={closeCart}
              className="mt-2 inline-flex h-11 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105 active:scale-95"
            >
              Ver productos
            </button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-border overflow-y-auto px-5">
              {items.map((item) => (
                <li key={item.key} className="flex gap-3 py-4">
                  <img
                    src={item.image_url || "/placeholder.svg"}
                    alt={item.name}
                    className="h-20 w-20 shrink-0 rounded-xl object-cover"
                  />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="truncate text-sm font-semibold">
                        {item.name}
                      </h3>
                      <button
                        type="button"
                        onClick={() => removeItem(item.key)}
                        aria-label={`Quitar ${item.name}`}
                        className="shrink-0 text-muted-foreground transition-colors hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Talle {item.size} · {item.color}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="inline-flex items-center rounded-lg border border-border">
                        <button
                          type="button"
                          onClick={() => decrement(item.key)}
                          aria-label="Restar"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-l-lg transition-colors hover:bg-muted"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => increment(item.key)}
                          aria-label="Sumar"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-r-lg transition-colors hover:bg-muted"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="text-sm font-bold">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-border px-5 py-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-base font-bold">Total</span>
                <span className="text-xl font-bold">{formatPrice(subtotal)}</span>
              </div>
              <button
                type="button"
                onClick={handleCheckout}
                className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-95"
              >
                Finalizar pedido por WhatsApp
              </button>
              <p className="mt-2 text-center text-xs text-muted-foreground">
                Se abrirá WhatsApp con el detalle de tu pedido.
              </p>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
