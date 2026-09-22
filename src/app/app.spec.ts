import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

import { App } from './app';
import { AppModule } from './app.module';

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    element = fixture.nativeElement as HTMLElement;
    await fixture.whenStable();
  });

  it('should create the app', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have "angular-app" as the default title', () => {
    const app = fixture.componentInstance as unknown as { title: () => string };
    expect(app.title()).toBe('angular-app');
  });

  it('should render the greeting with the title', () => {
    expect(element.querySelector('h1')?.textContent).toContain('Hello, angular-app');
  });

  it('should render the congratulations paragraph', () => {
    expect(element.querySelector('.left-side p')?.textContent).toContain(
      'Congratulations! Your app is running.'
    );
  });

  it('should contain a router outlet', () => {
    expect(fixture.debugElement.query(By.directive(RouterOutlet))).toBeTruthy();
  });
});
