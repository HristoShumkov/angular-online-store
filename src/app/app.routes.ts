import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ItemCatalogComponent } from './item-catalog/item-catalog.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { ItemSellComponent } from './item-sell/item-sell.component';
import { ItemEditComponent } from './item-edit/item-edit.component';
import { UserCartComponent } from './user-cart/user-cart.component';

export const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "login", component: LoginComponent},
    {path: "register", component: RegisterComponent},
    { path: "items/all", component: ItemCatalogComponent },
    { path: "user", component: UserDetailsComponent },
    { path: "item/details/:id", component: ItemDetailsComponent },
    { path: "sell-item", component: ItemSellComponent},
    { path: "edit-item", component: ItemEditComponent},
    { path: "user/cart", component: UserCartComponent},
    { path: '**', component: ErrorPageComponent },
];
