"use client"

import { useMemo, useState, useRef, useEffect } from "react"
import { ProductCard } from "@/components/product-card"
import { ProductDialog } from "@/components/product-dialog"
import { CATEGORIES, PRODUCTS, type Category, type Product } from "@/lib/products"
import { Search, X, SlidersHorizontal, ShoppingBag } from "lucide-react"

type Filter = Category | "Todos"

export function Catalog() {
  const [filter, setFilter] = useState<Filter>("Todos")
  const [selected, setSelected] = useState<Product | null>(null)
  const [search, setSearch] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  const searchRef = useRef<HTMLDivElement>(null)
  const mobileFiltersRef = useRef<HTMLDivElement>(null)
  const filters: Filter[] = ["Todos", ...CATEGORIES]

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      // Si se hizo click dentro del buscador, no cerramos nada
      if (searchRef.current && searchRef.current.contains(e.target as Node)) {
        return
      }
      // Si la barra móvil está abierta y se hizo click dentro de ella, tampoco cerramos
      if (mobileFiltersRef.current && mobileFiltersRef.current.contains(e.target as Node)) {
        return
      }
      // En cualquier otro caso fuera de estos contenedores, ocultamos los filtros
      setShowFilters(false)
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const clean = (text: string) =>
    text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")

  const filteredProducts = useMemo(() => {
    const q = clean(search)

    return PRODUCTS.filter((p) => {
      const matchesCategory = filter === "Todos" || p.category === filter
      const matchesSearch =
        !q ||
        clean(p.name).includes(q) ||
        clean(p.description).includes(q) ||
        clean(p.category).includes(q)

      return matchesCategory && matchesSearch
    })
  }, [filter, search])

  const getCategoryCount = (f: Filter) => {
    const q = clean(search)
    return PRODUCTS.filter((p) => {
      const matchesCategory = f === "Todos" || p.category === f
      const matchesSearch = !q || clean(p.name).includes(q) || clean(p.description).includes(q)
      return matchesCategory && matchesSearch
    }).length
  }

  return (
    <section id="catalogo" className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-12">
      
      {/* TOOLBAR CONTENEDOR */}
      <div className="flex flex-col gap-4 border-b border-border/80 pb-6 md:flex-row md:items-center md:justify-between">
        
        {/* BUSCADOR */}
        <div ref={searchRef} className="relative w-full md:max-w-md">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/80" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar prendas, calzado, accesorios..."
            className="w-full rounded-full border border-border bg-card/50 py-2.5 pl-10 pr-10 text-sm font-medium outline-none transition-all placeholder:text-muted-foreground/60 focus:border-foreground/30 focus:bg-background focus:ring-4 focus:ring-foreground/[0.03]"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* FILTROS DESKTOP */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold tracking-tight transition-all active:scale-95 md:hidden ${
              showFilters ? "bg-foreground text-background border-foreground" : "bg-card border-border"
            }`}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filtros
          </button>

          <div className="hidden flex-wrap gap-2 md:flex">
            {filters.map((f) => {
              const count = getCategoryCount(f)
              const isSelected = filter === f
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  disabled={count === 0 && !isSelected}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-medium tracking-tight transition-all duration-200 active:scale-95 ${
                    isSelected
                      ? "border-foreground bg-foreground text-background shadow-md shadow-foreground/5"
                      : count === 0
                        ? "opacity-30 cursor-not-allowed border-dashed"
                        : "border-border bg-card hover:border-foreground/30 hover:bg-accent"
                  }`}
                >
                  <span>{f}</span>
                  <span className={`text-[10px] ${isSelected ? "text-background/70" : "text-muted-foreground/80"}`}>
                    ({count})
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* FILTROS RESPONSIVE (Mobile desplegable corregido) */}
      {showFilters && (
        <div 
          ref={mobileFiltersRef}
          className="mt-4 flex flex-wrap gap-2 border-b border-border/40 pb-4 animate-in fade-in slide-in-from-top-2 duration-200 md:hidden"
        >
          {filters.map((f) => {
            const count = getCategoryCount(f)
            const isSelected = filter === f
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                disabled={count === 0 && !isSelected}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all active:scale-95 ${
                  isSelected
                    ? "border-foreground bg-foreground text-background"
                    : count === 0
                      ? "opacity-30 cursor-not-allowed border-dashed"
                      : "border-border bg-card"
                }`}
              >
                <span>{f}</span>
                <span className="text-[10px] opacity-70">({count})</span>
              </button>
            )
          })}
        </div>
      )}

      {/* METRICAS DE RESULTADOS */}
      <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground font-medium tracking-tight">
        <p>Mostrando {filteredProducts.length} {filteredProducts.length === 1 ? 'producto' : 'productos'}</p>
        {filter !== "Todos" && (
          <button 
            type="button"
            onClick={() => setFilter("Todos")}
            className="text-foreground font-semibold hover:underline"
          >
            Ver todas las categorías
          </button>
        )}
      </div>

      {/* GRILLA DE PRODUCTOS */}
      {filteredProducts.length > 0 ? (
        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={setSelected}
            />
          ))}
        </div>
      ) : (
        /* ESTADO VACIO PREMIUM */
        <div className="mt-20 flex flex-col items-center justify-center text-center max-w-sm mx-auto">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <ShoppingBag className="h-5 w-5 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-sm font-semibold text-foreground tracking-tight">No hay resultados</h3>
          <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
            No encontramos prendas que coincidan con &quot;{search}&quot; dentro de la categoría seleccionada.
          </p>
          <button
            type="button"
            onClick={() => {
              setFilter("Todos")
              setSearch("")
            }}
            className="mt-5 rounded-full bg-foreground px-5 py-2 text-xs font-semibold text-background transition-all hover:bg-foreground/90 active:scale-95"
          >
            Restablecer búsqueda
          </button>
        </div>
      )}

      <ProductDialog
        product={selected}
        onClose={() => setSelected(null)}
      />
    </section>
  )
}