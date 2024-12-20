import { Injectable } from "@angular/core";
import { Item } from "../types/item";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
  })
  export class ItemService {
  
    constructor(private http: HttpClient) { }
  
    getAllItems() {
      let url = '/url/data/items';
      return this.http.get<Item[]>(url);
    }

    getItemsByCategory(categoryParams: string) {
      let url = `/url/data/items?where=category%3D%22${categoryParams}%22`
      return this.http.get<Item[]>(url);
    }

    getSingleItem(id: string) {
      let url = `/url/data/items/${id}`;
      return this.http.get<Item>(url);
    }

    sellItem(item: object) {
      let url = '/url/data/items';
      return this.http.post<Item>(url, item);
    }

    updateItem(item: object, id: string) {
      let url = `/url/data/items/${id}`;
      return this.http.put<Item>(url, item);
    }

    deleteItem(id: string) {
      let url = `/url/data/items/${id}`;
      return this.http.delete<Item>(url);
    }

    addToCart(userId: string, itemId: string) {
      let url = `/url/data/cart/`;
      return this.http.post(url, {userId: userId, itemId: itemId});
    }

    getSingleCartItem(userId: string, itemId: string) {
      let url = `/url/data/cart?where=userId%3D%22${userId}%22%20AND%20itemId%3D%22${itemId}%22`;
      return this.http.get(url);
    }
  }
  