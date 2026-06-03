import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AppModule } from './app.module';
import { App } from './app';
import { TestComponent } from './components/test/test.component';
import { TestDirectiveComponent } from './components/test-directive/test-directive.component';
import { routes } from './app.routes';

describe('AppModule', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents();
  });

  it('should compile without errors', () => {
    const module = TestBed.inject(AppModule);
    expect(module).toBeTruthy();
  });

  it('should have App in declarations', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeInstanceOf(App);
  });

  it('should import TestComponent and TestDirectiveComponent', () => {
    const testFixture = TestBed.createComponent(TestComponent);
    expect(testFixture.componentInstance).toBeInstanceOf(TestComponent);

    const directiveFixture = TestBed.createComponent(TestDirectiveComponent);
    expect(directiveFixture.componentInstance).toBeInstanceOf(TestDirectiveComponent);
  });

  it('should configure RouterModule.forRoot(routes)', () => {
    const router = TestBed.inject(Router);
    expect(router).toBeTruthy();
    expect(router.config).toEqual(routes);
  });
});
