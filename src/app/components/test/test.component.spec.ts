import { TestBed } from '@angular/core/testing';
import { VERSION } from '@angular/core';
import { TestComponent } from './test.component';

describe('TestComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TestComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should set version to the current Angular VERSION', () => {
    const fixture = TestBed.createComponent(TestComponent);
    const component = fixture.componentInstance;
    expect(component.version).toBe(VERSION.full);
  });

  it('should log info message on init', () => {
    const spy = vi.spyOn(console, 'info').mockImplementation(() => {});
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith('test-component initialized...');
    spy.mockRestore();
  });

  it('should render the Angular version in the template', async () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const div = compiled.querySelector('[data-testid="angular-version"]');
    expect(div).toBeTruthy();
    expect(div?.textContent).toContain(`Angular Version: ${VERSION.full}`);
  });

  it('should have the test-component CSS class', async () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const div = compiled.querySelector('.test-component');
    expect(div).toBeTruthy();
  });

  it('should be a standalone component', () => {
    const fixture = TestBed.createComponent(TestComponent);
    const component = fixture.componentInstance;
    expect(component).toBeInstanceOf(TestComponent);
  });
});
