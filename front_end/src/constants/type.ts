export type ProductType = {
  _id: string;
  category: string;
  description: string;
  image: string;
  isShow: boolean;
  price: number;
  rating: number;
  title: string;
  createdAt: string;
  updatedAt: string;
};

export type Category = {
  _id: string;
  name: string;
  description: string;
};

export type ProductFormParams = {
  title: string;
  price: number;
  image: string;
  description: string;
  categoryId: Category;
  isShow: boolean;
};
