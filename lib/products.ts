// ============================================================================
// CONFIGURACIÓN DEL SHOWROOM
// ============================================================================
export const SHOP_CONFIG = {
  name: "Tienda Showroom",
  tagline: "Ropa y accesorios seleccionados",
  whatsappNumber: "543856128340",
  currency: "$",
  logo: "/okcomputer.jpg", 
}

export type Category = "Remeras" | "Pantalones" | "Buzos" |"Accesorios"

export interface ProductVariant {
  color: string
  image_url: string
}

export interface Product {
  id: number
  name: string
  price: number
  description: string
  category: Category
  sizes: string[]
  variants: ProductVariant[]
}

// ============================================================================
// STOCK
// ============================================================================
export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Buzo del Argentina",
    price: 18900,
    description:
      "Buzos para alentar a nuestra selección Argentina.",
    category: "Buzos",
    sizes: ["S", "M", "L", "XL"],
    variants: [
      {
        color: "Azul",
        image_url: "https://instagram.fsde2-1.fna.fbcdn.net/v/t51.82787-15/723852970_17944068393247360_8953126117718285369_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=101&ig_cache_key=MzkyMDE4NDg2ODAwNDExMTYwNA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuOTAwLnNkci5yZWd1bGFyX3Bob3RvLkMzIn0%3D&_nc_ohc=Z6feUqPAc8EQ7kNvwEauX60&_nc_oc=AdoXhfGL7hZij11_n0V7GYWzPjOOXC7AWnzh0Bdwz20hIxeGFmfJZ-Zf44Qn9OKaYlo&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fsde2-1.fna&_nc_gid=JOK7tcGReE46GbwGdryL4g&_nc_ss=7a22e&oh=00_Af9p0rL6B7O37KpD63LaQOPrD1pwkW7OWywAqe0QMrUtoQ&oe=6A486ECE",
      },
      {
        color: "Negro",
        image_url: "https://instagram.fsde2-1.fna.fbcdn.net/v/t51.82787-15/722447689_17944068423247360_1209650730239879082_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=105&ig_cache_key=MzkyMDE4NDg2OTE4Njg1MzgyNw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuOTAwLnNkci5yZWd1bGFyX3Bob3RvLkMzIn0%3D&_nc_ohc=F9o6NEe9WtoQ7kNvwHzUR5g&_nc_oc=Adq9fK1lQSXEMAHGpg5CJWu26Pqor7leQiUHmISUvroqbUKexh3SYt4O2FyE-YrlbQw&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fsde2-1.fna&_nc_gid=JOK7tcGReE46GbwGdryL4g&_nc_ss=7a22e&oh=00_Af8XUg33kXXTqVWOVlcn9zZgrDuHqyCV513OHUDaPnFWaA&oe=6A487362",
      },
      {
        color: "Arena",
        image_url: "/products/remera-oversize-arena.png",
      },
    ],
  },

  {
    id: 2,
    name: "Remera Oversize Premium",
    price: 18900,
    description:
      "Remera de algodón peinado con caída oversize. Suave, fresca y con costuras reforzadas.",
    category: "Remeras",
    sizes: ["S", "M", "L", "XL"],
    variants: [
      {
        color: "Blanco",
        image_url: "/products/remera-oversize-blanca.webp",
      },
      {
        color: "Negro",
        image_url: "/products/remera-oversize-negra.webp",
      },
      {
        color: "Arena",
        image_url: "/products/remera-oversize-arena.png",
      },
    ],
  },

  {
    id: 3,
    name: "Remera Manga Larga Rayas",
    price: 21500,
    description:
      "Manga larga a rayas, tejido liviano ideal para entretiempo. Clásico que combina con todo.",
    category: "Remeras",
    sizes: ["S", "M", "L", "XL"],
    variants: [
      {
        color: "Blanco/Negro",
        // image_url: "/products/remera-rayas-blanco-negro.png",
        image_url: "/products/remera-rayas.png",
      },
      {
        color: "Azul/Blanco",
        image_url: "/products/remera-rayas.png",
      },
    ],
  },

  {
    id: 4,
    name: "Remera Básica",
    price: 15900,
    description:
      "La básica que no puede faltar. Cuello redondo, algodón premium y corte regular.",
    category: "Remeras",
    sizes: ["S", "M", "L", "XL"],
    variants: [
      {
        color: "Negro",
        image_url: "/products/remera-negra.png",
      },
      {
        color: "Blanco",
        image_url: "/products/remera-negra.png",
      },
      {
        color: "Gris",
        image_url: "/products/remera-negra.png",
      },
    ],
  },

  {
    id: 5,
    name: "Jean Mom Fit",
    price: 39900,
    description:
      "Denim rígido de tiro alto con calce mom. Atemporal, cómodo y favorecedor.",
    category: "Pantalones",
    sizes: ["S", "M", "L", "XL"],
    variants: [
      {
        color: "Azul",
        image_url: "/products/jean-mom.png",
      },
      {
        color: "Celeste",
        image_url: "/products/jean-mom.png",
      },
      {
        color: "Negro",
        image_url: "/products/jean-mom.png",
      },
    ],
  },

  {
    id: 6,
    name: "Pantalón Cargo",
    price: 34500,
    description:
      "Cargo de gabardina con bolsillos laterales y ajuste regular. Resistente y versátil.",
    category: "Pantalones",
    sizes: ["S", "M", "L", "XL"],
    variants: [
      {
        color: "Arena",
        image_url: "/products/pantalon-cargo.png",
      },
      {
        color: "Verde",
        image_url: "/products/pantalon-cargo.png",
      },
      {
        color: "Negro",
        image_url: "/products/pantalon-cargo.png",
      },
    ],
  },

  {
    id: 7,
    name: "Jogger Frisa",
    price: 28900,
    description:
      "Jogger de frisa con puño y cintura elastizada. Abrigado y perfecto para el día a día.",
    category: "Pantalones",
    sizes: ["S", "M", "L", "XL"],
    variants: [
      {
        color: "Gris",
        image_url: "/products/jogger.png",
      },
      {
        color: "Negro",
        image_url: "/products/jogger.png",
      },
      {
        color: "Beige",
        image_url: "/products/jogger.png",
      },
    ],
  },

  {
    id: 8,
    name: "Gorra Clásica",
    price: 12900,
    description:
      "Gorra de gabardina con visera curva y cierre regulable. Talle único.",
    category: "Accesorios",
    sizes: ["Único"],
    variants: [
      {
        color: "Negro",
        image_url: "/products/gorra.png",
      },
      {
        color: "Beige",
        image_url: "/products/gorra.png",
      },
      {
        color: "Blanco",
        image_url: "/products/gorra.png",
      },
    ],
  },

  {
    id: 9,
    name: "Riñonera Urbana",
    price: 16900,
    description:
      "Riñonera de nylon resistente con cierre y correa ajustable. Práctica y liviana.",
    category: "Accesorios",
    sizes: ["Único"],
    variants: [
      {
        color: "Negro",
        image_url: "/products/rinonera.png",
      },
      {
        color: "Gris",
        image_url: "/products/rinonera.png",
      },
    ],
  },

  {
    id: 10,
    name: "Lentes de Sol",
    price: 14500,
    description:
      "Lentes con protección UV400 y marco liviano. Estilo moderno para cualquier outfit.",
    category: "Accesorios",
    sizes: ["Único"],
    variants: [
      {
        color: "Negro",
        image_url: "/products/lentes.png",
      },
      {
        color: "Tortuga",
        image_url: "/products/lentes.png",
      },
    ],
  },
]

export const CATEGORIES = Array.from(
  new Set(PRODUCTS.map((p) => p.category))
) as Category[]


export function formatPrice(value: number): string {
  return `${SHOP_CONFIG.currency}${value.toLocaleString("es-AR")}`
}