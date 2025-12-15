import { Component, input, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  imports: [ReactiveFormsModule],
  templateUrl: './search-input.html',
  styleUrls: ['./search-input.css'],
})
export class SearchInput {
  control = input.required<FormControl>();

  placeholder = input<string>();

  valueChange = output<string>();
}
