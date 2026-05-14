import { TestBed } from '@angular/core/testing';
import { VERSION } from '@angular/core';
import { TestDirectiveComponent } from './test-directive.component';

describe('TestDirectiveComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestDirectiveComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TestDirectiveComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should set version to the current Angular VERSION', () => {
    const fixture = TestBed.createComponent(TestDirectiveComponent);
    const component = fixture.componentInstance;
    expect(component.version).toBe(VERSION.full);
  });

  it('should log info message in constructor', () => {
    const spy = vi.spyOn(console, 'info').mockImplementation(() => {});
    TestBed.createComponent(TestDirectiveComponent);
    expect(spy).toHaveBeenCalledWith('test-directive initialized...');
    spy.mockRestore();
  });

  it('should render the Angular version in the template', async () => {
    const fixture = TestBed.createComponent(TestDirectiveComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const div = compiled.querySelector('[data-testid="angular-version-directive"]');
    expect(div).toBeTruthy();
    expect(div?.textContent).toContain(`Angular Version: ${VERSION.full}`);
  });

  it('should have the test-directive CSS class', async () => {
    const fixture = TestBed.createComponent(TestDirectiveComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const div = compiled.querySelector('.test-directive');
    expect(div).toBeTruthy();
  });

  it('should be a standalone component', () => {
    const fixture = TestBed.createComponent(TestDirectiveComponent);
    const component = fixture.componentInstance;
    expect(component).toBeInstanceOf(TestDirectiveComponent);
  });
});
