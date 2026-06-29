"use client"

import { Plus } from "lucide-react"
import { formatPrice, type Product } from "@/lib/products"

export function ProductCard({
  product,
  onSelect,
}: {
  product: Product
  onSelect: (product: Product) => void
}) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg">
      <button
        type="button"
        onClick={() => onSelect(product)}
        aria-label={`Ver opciones de ${product.name}`}
        className="relative aspect-square overflow-hidden bg-muted"
      >
        <img
          src={
            product.variants?.[0]?.image_url ?? "/placeholder.svg"
          }
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-xs font-medium text-foreground shadow-sm">
          {product.category}
        </span>
      </button>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex-1">
          <h3 className="text-balance text-sm font-semibold leading-snug sm:text-base">
            {product.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="text-base font-bold sm:text-lg">
            {formatPrice(product.price)}
          </span>
          <button
            type="button"
            onClick={() => onSelect(product)}
            className="inline-flex h-10 items-center gap-1.5 rounded-full bg-primary px-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105 active:scale-95"
          >
            <Plus className="h-4 w-4" />
            Agregar
          </button>
        </div>
      </div>
    </article>
  )
}
