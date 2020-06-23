export interface Article {
  id?: string;
  name: string;
  description?: string;
  category?: string;
  photo?: string;
  active: boolean;
  subarticles?: Subarticle[];
}

export interface Subarticle {
  name: string;
  price: number;
  active: boolean;
  disabled?: boolean;
  article?: string;
  id?: string;
}

export interface Category {
  id?: string;
  name: string;
  selected?: boolean;
}

export interface Transaction {
  id?: string;
  created_at?: FirebaseTimeStamp;
  active?: boolean;
  items: Item[];
}

export interface Item {
  quantity: number;
  subarticle: string;
  name: string;
}

export interface News {
  id?: string;
  img_desktop: string;
  img_mobile: string;
}

interface FirebaseTimeStamp {
  _seconds: number;
  _nanoseconds: number;
}
