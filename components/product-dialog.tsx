"use client"

import { useEffect, useState } from "react"
import { Check, Minus, Plus, X } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { formatPrice, type Product } from "@/lib/products"

export function ProductDialog({
  product,
  onClose,
}: {
  product: Product | null
  onClose: () => void
}) {
  const { addItem } = useCart()
  const [size, setSize] = useState<string>("")
  const [color, setColor] = useState<string>("")
  const [quantity, setQuantity] = useState(1)

  // Reinicia la selección cada vez que se abre un producto distinto.
  useEffect(() => {
    if (product) {
      setSize(product.sizes[0] ?? "")
      setColor(product.colors[0] ?? "")
      setQuantity(1)
    }
  }, [product])

  // Cerrar con tecla Escape.
  useEffect(() => {
    if (!product) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [product, onClose])

  if (!product) return null

  const handleAdd = () => {
    addItem(product, size, color, quantity)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label={`Opciones de ${product.name}`}
    >
      <div
        className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl bg-card shadow-2xl sm:rounded-3xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-3 top-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm transition-colors hover:bg-muted"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid gap-0 overflow-y-auto sm:grid-cols-2">
          <div className="aspect-square bg-muted sm:aspect-auto">
            <img
              src={product.image_url || "/placeholder.svg"}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-5 p-5 sm:p-6">
            <div>
              <span className="text-xs font-medium uppercase tracking-wide text-primary">
                {product.category}
              </span>
              <h2 className="mt-1 text-balance text-xl font-bold leading-tight sm:text-2xl">
                {product.name}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </p>
              <p className="mt-3 text-2xl font-bold">
                {formatPrice(product.price)}
              </p>
            </div>

            {/* Talle */}
            <div>
              <p className="mb-2 text-sm font-semibold">Talle</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={`min-w-11 rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${
                      size === s
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background hover:border-primary"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div>
              <p className="mb-2 text-sm font-semibold">Color</p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${
                      color === c
                        ? "border-primary bg-accent text-accent-foreground"
                        : "border-border bg-background hover:border-primary"
                    }`}
                  >
                    {color === c && <Check className="h-3.5 w-3.5" />}
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Cantidad */}
            <div>
              <p className="mb-2 text-sm font-semibold">Cantidad</p>
              <div className="inline-flex items-center rounded-xl border border-border">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Restar"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-l-xl transition-colors hover:bg-muted"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center text-sm font-semibold">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Sumar"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-r-xl transition-colors hover:bg-muted"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className="mt-auto inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-95"
            >
              Agregar al carrito · {formatPrice(product.price * quantity)}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
