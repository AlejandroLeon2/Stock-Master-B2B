import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Footer } from './footer/footer';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, FormsModule, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('stockmaster-client');
}
