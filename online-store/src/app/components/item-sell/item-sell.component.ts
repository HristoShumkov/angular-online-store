import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItemService } from '../../services/items.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-sell',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './item-sell.component.html',
  styleUrl: './item-sell.component.css'
})
export class ItemSellComponent {
  constructor(private itemService: ItemService, private router: Router) { }

  itemSellForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required]),
    category: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    imageUrl: new FormControl('')
  })

  SellItem() {
    if (this.itemSellForm.invalid) {
      return;
    }
    const {
      title,
      price,
      category,
      description,
      imageUrl
    } = this.itemSellForm.value as {
      title: string,
      price: number,
      category: string,
      description: string,
      imageUrl: string,
    };

    this.itemService.sellItem({
      title,
      price,
      category,
      description,
      imageUrl
    }).subscribe(() => {
      this.router.navigate(["/items/all"]);
    });
  }
}
