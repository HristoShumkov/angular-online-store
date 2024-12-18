import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Item } from '../../types/item';
import { ItemService } from '../../services/items.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.css'
})
export class ItemDetailsComponent implements OnInit {
  faShoppingCart = faShoppingCart;
  item = {} as Item;
  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private location: Location,
    private router: Router
  ) { }

  itemId = '';

  toPreviousPage() {
    this.location.back();
  }

  deleteItem(id: string) {
    if (confirm("Are you sure you wish to delete this Item?")) {
      this.itemService.deleteItem(id).subscribe(() => this.router.navigate(["/items/all"]))
    } else {
      return;
    }
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params["id"];
    this.itemId = id;

    this.itemService.getSingleItem(id).subscribe((item) => {
      this.item = item;
    })
  }
}
