"use client"

import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useState,
  useEffect,
  type ReactNode,
} from "react"
import type { Product } from "@/lib/products"

export interface CartItem {
  key: string
  id: number
  name: string
  price: number
  image_url: string
  size: string
  color: string
  quantity: number
}

type CartAction =
  | { type: "INIT"; items: CartItem[] }
  | {
      type: "ADD"
      product: Product
      size: string
      color: string
      image_url: string
      quantity: number
    }
  | { type: "INCREMENT"; key: string }
  | { type: "DECREMENT"; key: string }
  | { type: "REMOVE"; key: string }
  | { type: "CLEAR" }

function reducer(state: CartItem[], action: CartAction): CartItem[] {
  let newState: CartItem[]

  switch (action.type) {
    case "INIT": {
      return action.items
    }

    case "ADD": {
      const key = `${action.product.id}-${action.size}-${action.color}`
      const existing = state.find((i) => i.key === key)

      if (existing) {
        newState = state.map((i) =>
          i.key === key
            ? { ...i, quantity: i.quantity + action.quantity }
            : i,
        )
      } else {
        newState = [
          ...state,
          {
            key,
            id: action.product.id,
            name: action.product.name,
            price: action.product.price,
            image_url: action.image_url,
            size: action.size,
            color: action.color,
            quantity: action.quantity,
          },
        ]
      }
      break
    }

    case "INCREMENT":
      newState = state.map((i) =>
        i.key === action.key ? { ...i, quantity: i.quantity + 1 } : i,
      )
      break

    case "DECREMENT":
      newState = state
        .map((i) =>
          i.key === action.key ? { ...i, quantity: i.quantity - 1 } : i,
        )
        .filter((i) => i.quantity > 0)
      break

    case "REMOVE":
      newState = state.filter((i) => i.key !== action.key)
      break

    case "CLEAR":
      newState = []
      break

    default:
      return state
  }

  // Guardamos en localStorage solo si estamos ejecutando en el cliente
  if (typeof window !== "undefined") {
    localStorage.setItem("spp_cart_items", JSON.stringify(newState))
  }
  return newState
}

interface CartContextValue {
  items: CartItem[]
  totalItems: number
  subtotal: number
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  addItem: (
    product: Product,
    size: string,
    color: string,
    image_url: string,
    quantity: number,
  ) => void
  increment: (key: string) => void
  decrement: (key: string) => void
  removeItem: (key: string) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(reducer, [])
  const [isOpen, setIsOpen] = useState(false)

  // Carga inicial segura para Next.js App Router (Evita desajustes Server/Client)
  useEffect(() => {
    const local = localStorage.getItem("spp_cart_items")
    if (local) {
      try {
        dispatch({ type: "INIT", items: JSON.parse(local) })
      } catch (e) {
        console.error("Error al cargar localStorage", e)
      }
    }
  }, [])

  const value = useMemo<CartContextValue>(() => {
    const totalItems = items.reduce((acc, i) => acc + i.quantity, 0)
    const subtotal = items.reduce(
      (acc, i) => acc + i.price * i.quantity,
      0,
    )

    return {
      items,
      totalItems,
      subtotal,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),

      addItem: (product, size, color, image_url, quantity) => {
        dispatch({
          type: "ADD",
          product,
          size,
          color,
          image_url,
          quantity,
        })
        setIsOpen(true)
      },

      increment: (key) => dispatch({ type: "INCREMENT", key }),
      decrement: (key) => dispatch({ type: "DECREMENT", key }),
      removeItem: (key) => dispatch({ type: "REMOVE", key }),
      clear: () => dispatch({ type: "CLEAR" }),
    }
  }, [items, isOpen])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider")
  return ctx
}