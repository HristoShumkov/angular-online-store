import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faComputer, faShirt, faFilm, faHouse, faDumbbell } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  categoryData = [
    {
        icon: faShirt,
        name: "Clothing",
        link: "/clothing"
    },
    {
        icon: faComputer,
        name: "Electronics",
        link: "/electronics"
    },
    {
        icon: faFilm,
        name: "Entertainment",
        link: "/entertainment"
    },
    {
        icon: faHouse,
        name: "Home & Garden",
        link: "/home-and-garden"
    },
    {
        icon: faDumbbell,
        name: "Sports",
        link: "/sports"
    }
]
}
