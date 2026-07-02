"use client"

import Image from "next/image"
import { formatPrice, type Product } from "@/lib/products"
import { Eye } from "lucide-react"

export function ProductCard({
  product,
  onSelect,
}: {
  product: Product
  onSelect: (product: Product) => void
}) {
  // Tomamos la primera imagen disponible o el placeholder seguro
  const defaultImage = product.variants?.[0]?.image_url ?? "/placeholder.svg"

  const handlePress = () => {
    onSelect(product)
  }

  return (
    <button
      type="button"
      onClick={handlePress}
      onTouchStart={handlePress} // Disparo instantáneo al tacto nativo en móviles iOS
      className="group w-full text-left cursor-pointer select-none overflow-hidden bg-background focus:outline-none"
    >
      {/* CONTENEDOR DE IMAGEN */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-muted transition-all duration-300 group-hover:shadow-md">
        
        {/* Imagen Optimizada */}
        <Image
          src={defaultImage}
          alt={product.name}
          fill
          sizes="(max-w-640px) 50vw, (max-w-1024px) 33vw, 25vw"
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Overlay sutil de contraste oscuro */}
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/[0.08]" />

        {/* Badge de Categoría Minimalista */}
        <span className="absolute left-3 top-3 rounded-full bg-background/80 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-foreground backdrop-blur-md border border-border/40 shadow-sm">
          {product.category}
        </span>

        {/* Hover CTA Avanzado (Transición limpia sin hidden/flex bugs) */}
        <div className="absolute inset-x-0 bottom-4 flex justify-center px-4 translate-y-4 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 hidden sm:flex">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-background/95 px-4 py-2.5 text-xs font-semibold text-foreground shadow-xl border border-border/50 backdrop-blur-sm transition-transform active:scale-95">
            <Eye className="h-3.5 w-3.5 text-muted-foreground" />
            <span>Ver detalles</span>
          </div>
        </div>
      </div>

      {/* INFORMACIÓN DEL PRODUCTO */}
      <div className="mt-3.5 space-y-1 px-1.5">
        
        {/* Nombre de la prenda */}
        <h3 className="text-sm font-medium tracking-tight text-foreground/90 transition-colors group-hover:text-foreground line-clamp-1">
          {product.name}
        </h3>

        {/* Fila de Precio y Variantes */}
        <div className="flex items-center justify-between gap-2 pt-0.5">
          <p className="text-sm font-bold tracking-tight text-foreground">
            {formatPrice(product.price)}
          </p>

          {/* Indicador visual de variantes de color (si existen) */}
          {product.variants && product.variants.length > 1 && (
            <div className="flex -space-x-1 overflow-hidden">
              {product.variants.slice(0, 3).map((variant, i) => (
                <span
                  key={variant.image_url + i}
                  className="h-2.5 w-2.5 rounded-full border border-background ring-1 ring-muted-foreground/20 bg-muted"
                  style={{
                    backgroundColor: variant.color_code || "#ccc" 
                  }}
                  title={variant.color}
                />
              ))}
              {product.variants.length > 3 && (
                <span className="text-[9px] font-bold text-muted-foreground pl-1">
                  +{product.variants.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

      </div>
    </button>
  )
}