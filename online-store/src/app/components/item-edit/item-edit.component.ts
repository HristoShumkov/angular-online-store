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
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    price: new FormControl(0, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
    category: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required, Validators.minLength(40)]),
    imageUrl: new FormControl('')
  })

  get titleErrorCheck() {
    return this.itemEditForm.get("title")?.touched && this.itemEditForm.get("title")?.errors?.['required'] ||
    this.itemEditForm.get("title")?.touched && this.itemEditForm.get("title")?.errors?.['minlength']
  }

  get priceErrorCheck() {
    return this.itemEditForm.get("price")?.touched && this.itemEditForm.get("price")?.errors?.['required'] ||
    this.itemEditForm.get("price")?.touched && this.itemEditForm.get("price")?.errors?.['pattern']
  }

  get descriptionErrorCheck() {
    return this.itemEditForm.get("description")?.touched && this.itemEditForm.get("description")?.errors?.['required'] ||
    this.itemEditForm.get("description")?.touched && this.itemEditForm.get("description")?.errors?.['minlength']
  }

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
      console.log(this.itemEditForm.errors)
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
