export interface Article {
  id?: String;
  name: String;
  description: String;
  image: string;
  price: Number;
}

export interface Category {
  name: String;
  selected: Boolean;
}
