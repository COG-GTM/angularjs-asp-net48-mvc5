import { TestBed } from '@angular/core/testing';
import { AppModule } from './app.module';
import { App } from './app';
import { routes } from './app.routes';

describe('AppModule', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents();
  });

  it('should compile the module and create the root component', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });
});

describe('app.routes', () => {
  it('should define an empty route table', () => {
    expect(routes).toEqual([]);
  });
});
