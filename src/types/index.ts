export interface ProductOptions {
  size: string;
  amount: number;
}

export interface Product {
  id: number;
  name: string;
  options: ProductOptions;
  active: boolean;
  createdAt: string;
}

export interface PricePlan {
  id: number;
  description: string;
  active: boolean;
  createdAt: string;
  removedAt: string;
}

export interface Page {
  id: number;
  title: string;
  active: boolean;
  updatedAt: string;
  publishedAt: string;
}

export interface ApiResponse {
  products: Product[];
  pricesplans: PricePlan[];
  pages: Page[];
}

export interface Country {
  id: string;
  countryName: string;
  text: string;
  active: boolean;
  createdAt: string;
  population: number;
}

export interface CountriesApiResponse {
  countries: Country[];
}
