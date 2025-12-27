import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Github, Send, ChevronRight } from 'lucide-angular';
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, LucideAngularModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
  // Iconos de Lucide
  readonly Mail = Mail;
  readonly Phone = Phone;
  readonly MapPin = MapPin;
  readonly Facebook = Facebook;
  readonly Twitter = Twitter;
  readonly Instagram = Instagram;
  readonly Linkedin = Linkedin;
  readonly Github = Github;
  readonly Send = Send;
  readonly ChevronRight = ChevronRight;

  currentYear = new Date().getFullYear();

  // Enlaces de navegación
  quickLinks = [
    { label: 'Inicio', route: '/' },
    { label: 'Productos', route: '/products' },
    { label: 'Servicios', route: '/services' },
    { label: 'Sobre Nosotros', route: '/about' },
    { label: 'Blog', route: '/blog' }
  ];

  legalLinks = [
    { label: 'Términos y Condiciones', route: '/terms' },
    { label: 'Política de Privacidad', route: '/privacy' },
    { label: 'Política de Cookies', route: '/cookies' },
    { label: 'FAQ', route: '/faq' }
  ];

  socialLinks = [
    { icon: this.Facebook, url: 'https://facebook.com', label: 'Facebook' },
    { icon: this.Twitter, url: 'https://twitter.com', label: 'Twitter' },
    { icon: this.Instagram, url: 'https://instagram.com', label: 'Instagram' },
    { icon: this.Linkedin, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: this.Github, url: 'https://github.com', label: 'GitHub' }
  ];

  contactInfo = [
    { icon: this.Mail, text: 'info@empresa.com', type: 'email' },
    { icon: this.Phone, text: '+1 (555) 123-4567', type: 'phone' },
    { icon: this.MapPin, text: '123 Calle Principal, Ciudad, País', type: 'address' }
  ];

  newsletterEmail = '';

  onSubmitNewsletter(event: Event) {
    event.preventDefault();
    if (this.newsletterEmail) {
      console.log('Suscripción:', this.newsletterEmail);
      // Aquí iría la lógica de suscripción
      this.newsletterEmail = '';
    }
  }
}
