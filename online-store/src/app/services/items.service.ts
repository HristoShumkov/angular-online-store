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

    getSingleItem(id: string) {
      let url = `/url/data/items/${id}`;
      return this.http.get<Item>(url);
    }

    sellItem(item: object) {
      let url = '/url/data/items';
      return this.http.post<Item>(url, item);
    }
  }
  