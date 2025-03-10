import { products } from '@prisma/client';

export class UpdateProductDto {
  id: string;
  token_id?: string;
  name?: string;
  status: string;
  price?: number;
  image?: string;
  quantity?: number;
  type?: string = 'NFT';
  creator?: string;
  description?: string;
}

export class ProductDto {
  id: string;
  token_id?: string;
  name?: string;
  status: string;
  price?: number;
  image?: string;
  quantity?: number;
  type?: string = 'NFT';
  creator?: string;
  description?: string;
}

export interface SearchingProduct {
  search?: string
  sort?: string
}

export interface ProductResponseType {
  data: products[]
}


export interface GetDetailProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  token_id: string;
  imageUrl?: string;
}

