import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { VERSION } from '@angular/core';
import { TestComponent } from './test.component';

describe('TestComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
    }).compileComponents();
  });

  // Scenario 1: Component initializes successfully
  it('should create the component', () => {
    const fixture = TestBed.createComponent(TestComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  // Scenario 2: Displays the Angular version
  it('should display the Angular version', async () => {
    const fixture = TestBed.createComponent(TestComponent);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const element = compiled.querySelector('[data-testid="angular-version"]');
    expect(element).toBeTruthy();
    expect(element?.textContent).toContain('Angular Version:');
    expect(element?.textContent).toContain(VERSION.full);
  });

  // Scenario 3: Applies the correct CSS class
  it('should apply the correct CSS class', async () => {
    const fixture = TestBed.createComponent(TestComponent);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const element = compiled.querySelector('[data-testid="angular-version"]');
    expect(element).toBeTruthy();
    expect(element?.classList.contains('test-component')).toBe(true);
  });

  // Scenario 4: Uses the correct selector
  it('should use the correct selector', async () => {
    @Component({
      standalone: true,
      imports: [TestComponent],
      template: `<app-test></app-test>`,
    })
    class TestHostComponent {}

    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(TestHostComponent);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const element = compiled.querySelector('[data-testid="angular-version"]');
    expect(element).toBeTruthy();
    expect(element?.textContent).toContain('Angular Version:');
  });

  // Scenario 5: Logs initialization message on init
  it('should log initialization message on init', async () => {
    const consoleSpy = vi.spyOn(console, 'info');
    const fixture = TestBed.createComponent(TestComponent);
    await fixture.whenStable();
    expect(consoleSpy).toHaveBeenCalledWith('test-component initialized...');
    consoleSpy.mockRestore();
  });
});
