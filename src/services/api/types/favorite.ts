export interface Favorite {
  _id: string;
  asset: string;
  type: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CreateFavorite {
  type: string;
  asset: string;
  userId: string;
}