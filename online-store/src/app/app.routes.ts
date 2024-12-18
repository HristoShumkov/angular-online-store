import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { ItemCatalogComponent } from './components/item-catalog/item-catalog.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { ItemSellComponent } from './components/item-sell/item-sell.component';
import { ItemEditComponent } from './components/item-edit/item-edit.component';
import { UserCartComponent } from './components/user-cart/user-cart.component';

export const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "login", component: LoginComponent},
    {path: "register", component: RegisterComponent},
    { path: "items/:category", component: ItemCatalogComponent },
    { path: "user", component: UserDetailsComponent },
    { path: "item/:id", component: ItemDetailsComponent },
    { path: "sell-item", component: ItemSellComponent},
    { path: "edit/:id", component: ItemEditComponent},
    { path: "user/cart", component: UserCartComponent},
    { path: '**', component: ErrorPageComponent },
];
