import { Component, OnInit } from '@angular/core';
import { Item } from '../../types/item';
import { ItemService } from '../../services/items.service';
import { ItemPreviewComponent } from './item-preview/item-preview.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-item-catalog',
  standalone: true,
  imports: [ItemPreviewComponent, RouterLink],
  templateUrl: './item-catalog.component.html',
  styleUrl: './item-catalog.component.css'
})
export class ItemCatalogComponent implements OnInit {
  items: Item[] = [];
  constructor(private itemService: ItemService, private route: ActivatedRoute, private router: Router) {}

  getItems(category: string) {
    if (category === "all") {
      this.itemService.getAllItems().subscribe((items) => {
        this.items = items;
      })
    } else {
      let categoryParams = "";

                switch (category) {
                    case "clothing":
                        categoryParams = "Clothing"
                        break
                    case "electronics":
                        categoryParams = "Electronics"
                        break
                    case "entertainment":
                        categoryParams = "Entertainment"
                        break
                    case "home-and-garden":
                        categoryParams = "Home%20%26%20Garden"
                        break
                    case "sports":
                        categoryParams = "Sports"
                        break
                }

                this.itemService.getItemsByCategory(categoryParams).subscribe((items) => {
                  this.items = items;
                })
    }
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => { this.getItems(params["category"]); }); 
    
    this.getItems(this.route.snapshot.params["category"]);
  }
}