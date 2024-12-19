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
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    price: new FormControl(0, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
    category: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required, Validators.minLength(40)]),
    imageUrl: new FormControl('')
  })

  get titleErrorCheck() {
    return this.itemSellForm.get("title")?.touched && this.itemSellForm.get("title")?.errors?.['required'] ||
    this.itemSellForm.get("title")?.touched && this.itemSellForm.get("title")?.errors?.['minlength']
  }

  get priceErrorCheck() {
    return this.itemSellForm.get("price")?.touched && this.itemSellForm.get("price")?.errors?.['required'] ||
    this.itemSellForm.get("price")?.touched && this.itemSellForm.get("price")?.errors?.['pattern']
  }

  get descriptionErrorCheck() {
    return this.itemSellForm.get("description")?.touched && this.itemSellForm.get("description")?.errors?.['required'] ||
    this.itemSellForm.get("description")?.touched && this.itemSellForm.get("description")?.errors?.['minlength']
  }

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
