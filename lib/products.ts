// ============================================================================
// CONFIGURACIÓN DEL SHOWROOM
// ----------------------------------------------------------------------------
// Cambiá estos valores por los de tu negocio.
// El número de WhatsApp debe ir con código de país, SIN "+", espacios ni guiones.
// Ejemplo Argentina: 5491122334455
// ============================================================================
export const SHOP_CONFIG = {
  name: "Showroom",
  tagline: "Ropa y accesorios seleccionados",
  whatsappNumber: "543856128340", // <-- REEMPLAZAR por tu número
  currency: "$",
}

export type Category = "Remeras" | "Pantalones" | "Accesorios"

export interface Product {
  id: number
  name: string
  price: number
  description: string
  category: Category
  sizes: string[]
  colors: string[]
  image_url: string
}

export const CATEGORIES: Category[] = ["Remeras", "Pantalones", "Accesorios"]

// ============================================================================
// STOCK (array local de productos)
// ============================================================================
export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Remera Oversize Premium",
    price: 18900,
    description:
      "Remera de algodón peinado con caída oversize. Suave, fresca y con costuras reforzadas.",
    category: "Remeras",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blanco", "Negro", "Arena"],
    image_url: "/products/remera-oversize.png",
  },
  {
    id: 2,
    name: "Remera Manga Larga Rayas",
    price: 21500,
    description:
      "Manga larga a rayas, tejido liviano ideal para entretiempo. Clásico que combina con todo.",
    category: "Remeras",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blanco/Negro", "Azul/Blanco"],
    image_url: "/products/remera-rayas.png",
  },
  {
    id: 3,
    name: "Remera Básica Negra",
    price: 15900,
    description:
      "La básica que no puede faltar. Cuello redondo, algodón premium y corte regular.",
    category: "Remeras",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Negro", "Blanco", "Gris"],
    image_url: "/products/remera-negra.png",
  },
  {
    id: 4,
    name: "Jean Mom Fit",
    price: 39900,
    description:
      "Denim rígido de tiro alto con calce mom. Atemporal, cómodo y favorecedor.",
    category: "Pantalones",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Azul", "Celeste", "Negro"],
    image_url: "/products/jean-mom.png",
  },
  {
    id: 5,
    name: "Pantalón Cargo",
    price: 34500,
    description:
      "Cargo de gabardina con bolsillos laterales y ajuste regular. Resistente y versátil.",
    category: "Pantalones",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Arena", "Verde", "Negro"],
    image_url: "/products/pantalon-cargo.png",
  },
  {
    id: 6,
    name: "Jogger Frisa",
    price: 28900,
    description:
      "Jogger de frisa con puño y cintura elastizada. Abrigado y perfecto para el día a día.",
    category: "Pantalones",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Gris", "Negro", "Beige"],
    image_url: "/products/jogger.png",
  },
  {
    id: 7,
    name: "Gorra Clásica",
    price: 12900,
    description:
      "Gorra de gabardina con visera curva y cierre regulable. Talle único.",
    category: "Accesorios",
    sizes: ["Único"],
    colors: ["Negro", "Beige", "Blanco"],
    image_url: "/products/gorra.png",
  },
  {
    id: 8,
    name: "Riñonera Urbana",
    price: 16900,
    description:
      "Riñonera de nylon resistente con cierre y correa ajustable. Práctica y liviana.",
    category: "Accesorios",
    sizes: ["Único"],
    colors: ["Negro", "Gris"],
    image_url: "/products/rinonera.png",
  },
  {
    id: 9,
    name: "Lentes de Sol",
    price: 14500,
    description:
      "Lentes con protección UV400 y marco liviano. Estilo moderno para cualquier outfit.",
    category: "Accesorios",
    sizes: ["Único"],
    colors: ["Negro", "Tortuga"],
    image_url: "/products/lentes.png",
  },
]

export function formatPrice(value: number): string {
  return `${SHOP_CONFIG.currency}${value.toLocaleString("es-AR")}`
}
