import { Component } from '@angular/core';
import { ItemService } from '../../services/items.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Item } from '../../types/item';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-item-edit',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './item-edit.component.html',
  styleUrl: './item-edit.component.css'
})
export class ItemEditComponent {
  constructor(private route: ActivatedRoute, private itemService: ItemService, private userService: UsersService, private router: Router) { }

  itemId = ''
  itemOwnerId = '';

  get isOwner():boolean {
    return this.userService.isOwner(this.itemOwnerId);
  } 

  itemEditForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required]),
    category: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    imageUrl: new FormControl('')
  })

  ngOnInit(): void {
    const id = this.route.snapshot.params["id"];

    this.itemId = id;

    this.itemService.getSingleItem(id).subscribe((item) => {
      this.itemEditForm.patchValue({
        title: item.title,
        price: item.price,
        category: item.category,
        description: item.description,
        imageUrl: item?.imageUrl
      });
      this.itemOwnerId = item._ownerId;
    })
  }

  editItem() {
    if (this.itemEditForm.invalid) {
      return;
    }
    const {
      title,
      price,
      category,
      description,
      imageUrl
    } = this.itemEditForm.value as {
      title: string,
      price: number,
      category: string,
      description: string,
      imageUrl: string,
    };

    this.itemService.updateItem({
      title,
      price,
      category,
      description,
      imageUrl
    }, this.itemId).subscribe(() => {
      this.router.navigate([`/item/${this.itemId}`]);
    });
  }
}
