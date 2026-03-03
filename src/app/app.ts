import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestComponent } from './components/test/test.component';
import { TestDirectiveComponent } from './components/test-directive/test-directive.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TestComponent, TestDirectiveComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-app');
}
