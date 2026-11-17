import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, angular-app');
  });

  it('should render the legacy page title and migrated components', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('[data-testid="title"]')?.textContent).toBe(
      'XLTS for AngularJS with .NET Framework'
    );
    expect(compiled.querySelector('app-test [data-testid="angular-version"]')).toBeTruthy();
    expect(compiled.querySelector('app-test-directive [data-testid="angular-version-directive"]')).toBeTruthy();
  });
});
