import { TestBed } from '@angular/core/testing';
import { VERSION } from '@angular/core';
import { TestDirectiveComponent } from './test-directive.component';

describe('TestDirectiveComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestDirectiveComponent],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(TestDirectiveComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should expose the Angular version', () => {
    const fixture = TestBed.createComponent(TestDirectiveComponent);
    expect(fixture.componentInstance.version).toBe(VERSION.full);
  });

  it('should render the Angular version', async () => {
    const fixture = TestBed.createComponent(TestDirectiveComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const el = fixture.nativeElement.querySelector('[data-testid="angular-version-directive"]');
    expect(el?.textContent).toContain(`Angular Version: ${VERSION.full}`);
  });
});
