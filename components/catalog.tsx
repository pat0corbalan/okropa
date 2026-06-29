"use client"

import { useMemo, useState, useRef, useEffect } from "react"
import { ProductCard } from "@/components/product-card"
import { ProductDialog } from "@/components/product-dialog"
import { CATEGORIES, PRODUCTS, type Category, type Product } from "@/lib/products"
import { Search, X, ArrowUpDown, SlidersHorizontal } from "lucide-react"

type Filter = Category | "Todos"
type SortOption = "default" | "price-asc" | "price-desc"

export function Catalog() {
  // Estados originales
  const [filter, setFilter] = useState<Filter>("Todos")
  const [selected, setSelected] = useState<Product | null>(null)

  // Nuevos estados para el buscador inteligente y UI
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<SortOption>("default")
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)

  const searchRef = useRef<HTMLDivElement>(null)
  const filters: Filter[] = ["Todos", ...CATEGORIES]

  // Cerrar el panel de sugerencias al hacer clic fuera del buscador
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Función auxiliar inteligente para limpiar acentos, diacríticos y mayúsculas
  const cleanText = (text: string) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")

  // 1. Filtrado combinado (Categoría + Buscador tolerante a acentos) y Ordenamiento
  const filteredProducts = useMemo(() => {
    const cleanQuery = cleanText(searchQuery)

    let result = PRODUCTS.filter((product) => {
      const matchesCategory = filter === "Todos" || product.category === filter
      
      if (!cleanQuery) return matchesCategory

      const matchesSearch =
        cleanText(product.name).includes(cleanQuery) ||
        cleanText(product.description).includes(cleanQuery) ||
        cleanText(product.category).includes(cleanQuery)

      return matchesCategory && matchesSearch
    })

    // Aplicar ordenamiento por precio
    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price)
    if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price)

    return result
  }, [filter, searchQuery, sortBy])

  // 2. Panel de sugerencias predictivas (primeros 5 resultados coincidentes sin acentos)
  const suggestions = useMemo(() => {
    const cleanQuery = cleanText(searchQuery)
    if (!cleanQuery.trim()) return []

    return PRODUCTS.filter((p) => cleanText(p.name).includes(cleanQuery)).slice(0, 5)
  }, [searchQuery])

  return (
    <section id="catalogo" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      
      {/* Barra de Herramientas Principal */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between border-b border-border pb-6">
        
        {/* BUSCADOR INTELIGENTE CON AUTOCOMPLETADO */}
        <div ref={searchRef} className="relative flex-1 max-w-xl w-full">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="¿Qué estás buscando? (ej. remeras, pantalon, jogger...)"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setShowSuggestions(true)
              }}
              onFocus={() => setShowSuggestions(true)}
              className="w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-10 text-sm shadow-sm ring-offset-background transition-all placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("")
                  setShowSuggestions(false)
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Limpiar búsqueda"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Menú Desplegable de Sugerencias Predictivas */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-50 mt-2 w-full rounded-xl border border-border bg-popover p-2 shadow-xl animate-in fade-in slide-in-from-top-1 duration-200">
              <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Sugerencias encontradas
              </p>
              <div className="mt-1 space-y-0.5">
                {suggestions.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => {
                      setSearchQuery(product.name)
                      setShowSuggestions(false)
                    }}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <span className="font-medium truncate mr-2">{product.name}</span>
                    <span className="text-xs text-muted-foreground shrink-0 uppercase tracking-wide text-[10px]">
                      {product.category}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* CONTROLES DE INTERFAZ: FILTRO DE PRECIOS Y BOTÓN DE MÓVIL */}
        <div className="flex items-center justify-between sm:justify-end gap-3 w-full lg:w-auto">
          {/* Selector de Orden por Precio */}
          <div className="relative flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2.5 shadow-sm w-full sm:w-auto">
            <ArrowUpDown className="h-4 w-4 text-muted-foreground shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-transparent text-sm font-medium text-foreground focus:outline-none cursor-pointer pr-2 w-full sm:w-auto"
            >
              <option value="default">Ordenar productos</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
            </select>
          </div>

          {/* Botón para alternar categorías en móviles */}
          <button
            type="button"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium shadow-sm sm:w-auto lg:hidden hover:bg-accent shrink-0"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span className="hidden min-[360px]:inline">Categorías</span>
          </button>
        </div>
      </div>

      {/* SECCIÓN DE CATEGORÍAS RESPONSIVE */}
      {/* En móviles/tablets se oculta/muestra con el botón; en desktop siempre se ve horizontal */}
      <div className={`mt-4 ${showMobileFilters ? "flex" : "hidden"} lg:flex flex-wrap gap-2 max-sm:overflow-x-auto max-sm:pb-2 max-sm:-mx-4 max-sm:px-4 max-sm:scrollbar-none`}>
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-medium transition-all sm:text-sm ${
              filter === f
                ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/10"
                : "border-border bg-card text-foreground hover:border-primary hover:bg-accent"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Contador de Resultados */}
      <div className="mt-6 text-xs font-medium text-muted-foreground">
        Mostrando {filteredProducts.length} {filteredProducts.length === 1 ? "producto" : "productos"}
      </div>

      {/* GRID DE PRODUCTOS O ESTADO VACÍO */}
      {filteredProducts.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={setSelected}
            />
          ))}
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-center justify-center text-center max-w-md mx-auto">
          <div className="rounded-full bg-muted p-4">
            <Search className="h-6 w-6 text-muted-foreground" />
          </div>
          <p className="mt-4 text-lg font-medium text-foreground">Sin resultados exactos</p>
          <p className="mt-1 text-sm text-muted-foreground">
            No encontramos coincidencias para "{searchQuery}". Intenta reajustar los filtros o escribir otra palabra.
          </p>
          <button
            type="button"
            onClick={() => {
              setFilter("Todos")
              setSearchQuery("")
              setSortBy("default")
            }}
            className="mt-5 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 shadow-sm transition-colors"
          >
            Restablecer catálogo
          </button>
        </div>
      )}

      {/* Detalle del Producto (Modal) */}
      <ProductDialog product={selected} onClose={() => setSelected(null)} />
    </section>
  )
}