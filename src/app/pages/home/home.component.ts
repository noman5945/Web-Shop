import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ProductHeaderComponent } from './Home-Components/product-header/product-header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatSidenavModule, ProductHeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
