import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Item } from '../../types/item';
import { ItemService } from '../../services/items.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';

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
  isInCart = false;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private userService: UsersService,
    private location: Location,
    private router: Router
  ) { }

  get isLoggedIn():boolean {
    return this.userService.isLoggedIn;
  }

  get isOwner():boolean {
    return this.userService.isOwner(this.item._ownerId)
  }
  
  get userId(): string {
    return this.userService.user?._id || '';
  }
  isInCartCheck() {
    // this.itemService.getSingleCartItem(this.userId, this.itemId)
    // .subscribe((item) => {
    //   )
    // });
  }

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

  addToCart() {
      this.itemService.addToCart(this.userId, this.itemId).subscribe({
        next: () => console.log("success"),
        error: (err) => console.error(err)
      })
  }


  ngOnInit(): void {
    const id = this.route.snapshot.params["id"];
    this.itemId = id;

    this.itemService.getSingleItem(id).subscribe((item) => {
      this.item = item;
      this.isInCartCheck();
    })
    console.log(this.isInCart)
  }
}
