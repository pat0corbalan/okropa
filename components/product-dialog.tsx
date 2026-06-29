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

  const [size, setSize] = useState("")
  const [color, setColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [variantIndex, setVariantIndex] = useState(0)

  // 👇 SIEMPRE hooks arriba (regla de oro)

  useEffect(() => {
    if (!product) return

    setSize(product.sizes[0] ?? "")
    setVariantIndex(0)
    setColor(product.variants?.[0]?.color ?? "")
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

  // 👇 después de hooks, validación segura
  if (!product || !product.variants?.length) return null

  const variant =
    product.variants[variantIndex] ?? product.variants[0]

  const handleAdd = () => {
    addItem(
      product,
      size,
      color,
      variant.image_url,
      quantity,
    )
    onClose()
  }

  const handleColorChange = (colorName: string, index: number) => {
    setColor(colorName)
    setVariantIndex(index)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* 🛠️ CAMBIO AQUÍ: Se cambió 'overflow-hidden' por 'overflow-y-auto' */}
      <div className="relative z-10 flex max-h-[92vh] w-full max-w-3xl flex-col overflow-y-auto rounded-3xl bg-card">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-20"
        >
          <X />
        </button>

        <div className="grid sm:grid-cols-2">
          {/* imagen */}
          <div className="aspect-square bg-muted">
            <img
              src={
                variant?.image_url ??
                product.variants[0].image_url
              }
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="p-6 flex flex-col gap-5">
            <div>
              <h2 className="text-xl font-bold">{product.name}</h2>
              <p className="text-sm text-muted-foreground">
                {product.description}
              </p>
              <p className="text-2xl font-bold">
                {formatPrice(product.price)}
              </p>
            </div>

            {/* talle */}
            <div>
              <p className="font-semibold mb-2">Talle</p>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`border px-3 py-2 rounded-xl ${
                      size === s
                        ? "bg-primary text-white"
                        : ""
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* color */}
            <div>
              <p className="font-semibold mb-2">Color</p>
              <div className="flex gap-2 flex-wrap">
                {product.variants.map((v, i) => (
                  <button
                    key={v.color}
                    onClick={() =>
                      handleColorChange(v.color, i)
                    }
                    className={`border px-3 py-2 rounded-xl ${
                      color === v.color
                        ? "bg-accent"
                        : ""
                    }`}
                  >
                    {v.color}
                  </button>
                ))}
              </div>
            </div>

            {/* cantidad */}
            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  setQuantity((q) => Math.max(1, q - 1))
                }
              >
                <Minus />
              </button>

              <span>{quantity}</span>

              <button
                onClick={() => setQuantity((q) => q + 1)}
              >
                <Plus />
              </button>
            </div>

            {/* add */}
            <button
              onClick={handleAdd}
              className="mt-auto bg-primary text-white py-3 rounded-full"
            >
              Agregar ·{" "}
              {formatPrice(product.price * quantity)}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}