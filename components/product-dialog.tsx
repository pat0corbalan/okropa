"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Minus, Plus, X, ShoppingBag } from "lucide-react"
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

  const [size, setSize] = useState("")
  const [colorIndex, setColorIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (!product) return

    setSize(product.sizes?.[0] ?? "")
    setColorIndex(0)
    setQuantity(1)
  }, [product])

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

  if (!product || !product.variants?.length) return null

  const variant = product.variants[colorIndex]

  const handleAdd = () => {
    addItem(
      product,
      size,
      variant.color,
      variant.image_url,
      quantity,
    )
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
      
      {/* BACKDROP CON ANIMACIÓN */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
      />

      {/* CONTENEDOR MODAL RESPONSIVE */}
      <div className="relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-y-auto rounded-t-[2rem] bg-card text-card-foreground shadow-2xl outline-none animate-in slide-in-from-bottom duration-300 ease-out sm:max-h-[85vh] sm:rounded-[2rem] sm:slide-in-from-bottom-0 sm:zoom-in-95 md:overflow-hidden">
        
        {/* BOTÓN DE CIERRE MINIMALISTA */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 rounded-full bg-background/80 p-2 text-muted-foreground backdrop-blur-md border border-border/40 hover:bg-accent hover:text-foreground shadow-sm transition-all active:scale-90"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="grid h-full w-full gap-0 md:grid-cols-2">
          
          {/* SECCIÓN DE IMAGEN FLUIDA */}
          <div className="relative aspect-[4/5] w-full bg-muted md:aspect-auto md:h-full min-h-[320px] md:min-h-[500px]">
            <Image
              src={variant.image_url}
              alt={product.name}
              fill
              priority
              sizes="(max-w-768px) 100vw, 50vw"
              className="h-full w-full object-cover object-top"
            />
          </div>

          {/* DETALLES Y ACCIONES */}
          <div className="flex flex-col justify-between p-6 sm:p-8 md:max-h-[85vh] md:overflow-y-auto">
            
            <div className="space-y-6">
              {/* CABECERA */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">
                  {product.category}
                </span>
                <h2 className="mt-1 text-xl font-bold tracking-tight sm:text-2xl">
                  {product.name}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
                <p className="mt-4 text-2xl font-extrabold tracking-tight text-foreground">
                  {formatPrice(product.price)}
                </p>
              </div>

              {/* SELECTOR DE COLORES */}
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/90">
                  Color: <span className="text-foreground normal-case font-medium">{variant.color}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v, i) => {
                    const isSelected = i === colorIndex
                    return (
                      <button
                        key={v.color}
                        onClick={() => setColorIndex(i)}
                        className={`inline-flex items-center justify-center rounded-full border px-4 py-2 text-xs font-semibold transition-all active:scale-95 ${
                          isSelected
                            ? "border-foreground bg-foreground text-background shadow-md shadow-foreground/10"
                            : "border-border bg-background hover:border-foreground/30 hover:bg-accent"
                        }`}
                      >
                        {v.color}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* SELECTOR DE TALLES */}
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/90">
                  Talle Seleccionado
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => {
                    const isSelected = size === s
                    return (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        className={`inline-flex min-w-11 items-center justify-center rounded-full border py-2 text-xs font-bold transition-all active:scale-95 ${
                          isSelected
                            ? "border-foreground bg-foreground text-background shadow-md shadow-foreground/10"
                            : "border-border bg-background hover:border-foreground/30 hover:bg-accent"
                        }`}
                      >
                        {s}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* SECCIÓN INFERIOR DE COMPRA */}
            <div className="mt-8 space-y-4 border-t border-border/60 pt-6">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/90">
                  Cantidad
                </p>

                <div className="flex items-center rounded-full border border-border bg-background shadow-sm">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="p-2.5 text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>

                  <span className="w-10 text-center text-sm font-bold tabular-nums">
                    {quantity}
                  </span>

                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-2.5 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* BOTÓN AGREGAR */}
              <button
                onClick={handleAdd}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground text-sm font-semibold text-background shadow-xl shadow-foreground/5 transition-all hover:bg-foreground/90 active:scale-[0.98]"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Agregar al carrito · {formatPrice(product.price * quantity)}</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}