import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-item-preview',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './item-preview.component.html',
  styleUrl: './item-preview.component.css'
})
export class ItemPreviewComponent {
  @Input() _id: string = '';
  @Input() imageUrl: string = '';
  @Input() title: string = '';
  @Input() price: number = 0;
}
