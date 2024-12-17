import { Component, OnInit } from '@angular/core';
import { Item } from '../../types/item';
import { ItemService } from '../services/items.service';
import { ItemPreviewComponent } from './item-preview/item-preview.component';

@Component({
  selector: 'app-item-catalog',
  standalone: true,
  imports: [ItemPreviewComponent],
  templateUrl: './item-catalog.component.html',
  styleUrl: './item-catalog.component.css'
})
export class ItemCatalogComponent implements OnInit {
  items: Item[] = [];
  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.itemService.getAllItems().subscribe((items) => {
      this.items = items;
    })
  }
}