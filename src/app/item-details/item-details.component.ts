import { Component, Input, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Item } from '../../types/item';
import { ItemService } from '../services/items.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.css'
})
export class ItemDetailsComponent implements OnInit {
  faShoppingCart = faShoppingCart;
  item = {} as Item;
  constructor(private route: ActivatedRoute, private itemService: ItemService) {}


  ngOnInit(): void {
    console.log(this.item)
    const id = this.route.snapshot.params["id"];

    this.itemService.getSingleItem(id).subscribe((item) => {
      this.item = item;
    })
  }
}
