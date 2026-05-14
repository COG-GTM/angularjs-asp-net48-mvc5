import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AppModule } from './app.module';
import { App } from './app';

describe('AppModule', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents();
  });

  it('should create the module', () => {
    const module = TestBed.inject(AppModule);
    expect(module).toBeTruthy();
  });

  it('should bootstrap the App component', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeInstanceOf(App);
  });

  it('should import RouterModule', () => {
    const router = TestBed.inject(RouterModule);
    expect(router).toBeTruthy();
  });
});
