import { Component, signal, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { LucideAngularModule, Menu, X, ShoppingCart, User, Search,LogOut } from 'lucide-angular';
import { CartService } from '../../../features/user/cart/services/cart.service';
import { CartPage } from '../../../features/user/cart/pages/cart-page/cart-page';
import { AuthService } from '../../../core/auth/auth.service';
import { LayoutService } from '../../../core/services/layout.service';

@Component({
  selector: 'app-header',
  imports: [LucideAngularModule, RouterLink, RouterLinkActive, CartPage],

  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  readonly MenuIcon = Menu;
  readonly XIcon = X;
  readonly ShoppingCartIcon = ShoppingCart;
  readonly UserIcon = User;
  readonly SearchIcon = Search;
    readonly LogOutIcon = LogOut;
  cartService = inject(CartService);
   //inject obtiene instancia del authService para poder acceder a sus metodos y propiedades y lo asigna a la variable authService
  private authService = inject(AuthService);
  //inject obtiene instancia del layoutService para poder acceder a sus metodos y propiedades y lo asigna a la variable layoutService
  layoutService = inject(LayoutService);
  //currentUser es una variable que obtiene el usuario actual
  currentUser = this.authService.currentUser;

  showCartModal = signal(false);

  isMenuOpen = signal(false);
  isSearchOpen = signal(false);
  cartCount = this.cartService.cartCount;

  navLinks = [
    { path: '/shop/home', label: 'Inicio' },
    { path: '/shop/catalog', label: 'Catalogo' },
  ];

  openCart() {
    this.showCartModal.set(true);
  }

  closeCart() {
    this.showCartModal.set(false);
  }

  toggleMenu() {
    this.isMenuOpen.update((value) => !value);
    if (this.isMenuOpen()) {
      this.isSearchOpen.set(false);
    }
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }

  toggleSearch() {
    this.isSearchOpen.update((value) => !value);
    if (this.isSearchOpen()) {
      this.isMenuOpen.set(false);
    }
  }

  logout() {
    this.authService.logout().subscribe();
  }
}
