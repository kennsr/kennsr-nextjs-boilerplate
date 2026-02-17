export type Category = "all" | "new" | "apparel" | "footwear" | "accessories";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  icon: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}
