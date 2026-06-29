"use client"

import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react"
import type { Product } from "@/lib/products"

export interface CartItem {
  key: string
  id: number
  name: string
  price: number
  image_url: string // 👈 ahora viene del color seleccionado
  size: string
  color: string
  quantity: number
}

type CartAction =
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
  switch (action.type) {
    case "ADD": {
      const key = `${action.product.id}-${action.size}-${action.color}`

      const existing = state.find((i) => i.key === key)

      if (existing) {
        return state.map((i) =>
          i.key === key
            ? { ...i, quantity: i.quantity + action.quantity }
            : i,
        )
      }

      return [
        ...state,
        {
          key,
          id: action.product.id,
          name: action.product.name,
          price: action.product.price,
          image_url: action.image_url, // 👈 importante
          size: action.size,
          color: action.color,
          quantity: action.quantity,
        },
      ]
    }

    case "INCREMENT":
      return state.map((i) =>
        i.key === action.key ? { ...i, quantity: i.quantity + 1 } : i,
      )

    case "DECREMENT":
      return state
        .map((i) =>
          i.key === action.key ? { ...i, quantity: i.quantity - 1 } : i,
        )
        .filter((i) => i.quantity > 0)

    case "REMOVE":
      return state.filter((i) => i.key !== action.key)

    case "CLEAR":
      return []

    default:
      return state
  }
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