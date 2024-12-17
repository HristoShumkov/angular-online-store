import { Injectable } from "@angular/core";
import { environment } from "../../enviroments/environment";
import { Item } from "../../types/item";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
  })
  export class ItemService {
  
    constructor(private http: HttpClient) { }
  
    getAllItems() {
      const { BASE_URL } = environment;
      let url = `${BASE_URL}/data/items`;
      return this.http.get<Item[]>(url);
    }

    getSingleItem(id: string) {
      const { BASE_URL } = environment;
      let url = `${BASE_URL}/data/items/${id}`;
      return this.http.get<Item>(url);
    }
  }
  