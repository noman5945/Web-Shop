import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { HeaderComponent } from './components/header/header.component';
import { CartService } from './services/cart.service';
import { Cart } from './models/cart.model';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatGridListModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    MatToolbarModule,
    MatTableModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatListModule,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'estore';
  cart: Cart = { items: [] };
  constructor(
    private _cartService: CartService,
    private _authService: AuthService
  ) {}
  ngOnInit(): void {
    this._cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
    });
    this._authService.user$.subscribe((_user) => {
      if (_user) {
        //logged in user found
        this._authService.currentUserSignal.set({
          username: _user.displayName!,
          email: _user.email!,
        });
      } else {
        //No logged In user
        this._authService.currentUserSignal.set(null);
      }
      //console.log(this._authService.currentUserSignal());
    });
  }
}
