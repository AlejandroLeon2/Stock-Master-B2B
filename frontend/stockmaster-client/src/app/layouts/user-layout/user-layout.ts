import { Component, inject } from '@angular/core';
import { Header } from "../../shared/ui/header/header";
import { RouterOutlet } from '@angular/router';
import { LayoutService } from '../../core/services/layout.service';
import { Modal } from '../../shared/ui/modal/modal';
import { Login } from '../../features/auth/components/login/login';
import { Register } from '../../features/auth/components/register/register';
import { FooterComponent } from "../../footer/footer";

@Component({
  selector: 'app-user-layout',
  imports: [Header, RouterOutlet, Modal, Login, Register, FooterComponent],
  templateUrl: './user-layout.html',
  styleUrls: ['./user-layout.css'],
})
export class UserLayout {
  //inject obtiene instancia del layoutService para poder acceder a sus metodos y propiedades y lo asigna a la variable layoutService
  layoutService = inject(LayoutService);
}
