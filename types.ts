
export interface Product {
  id: string;
  name: string;
  originalPrice: number;
  discountPrice: number;
  discountPercent: number;
  imageUrl: string;
  soldCount: number;
  totalStock: number;
}

export interface NavLink {
  label: string;
  href: string;
}
