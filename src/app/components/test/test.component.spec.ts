import { TestBed } from '@angular/core/testing';
import { VERSION } from '@angular/core';
import { TestComponent } from './test.component';

describe('TestComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(TestComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should expose the full Angular version', () => {
    const fixture = TestBed.createComponent(TestComponent);
    expect(fixture.componentInstance.version).toBe(VERSION.full);
  });

  it('should render the Angular version in the template', () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const versionEl = el.querySelector('[data-testid="angular-version"]');
    expect(versionEl?.textContent).toContain('Angular Version:');
    expect(versionEl?.textContent).toContain(VERSION.full);
  });

  it('should log an info message on init', () => {
    const spy = vi.spyOn(console, 'info').mockImplementation(() => undefined);
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith('test-component initialized...');
    spy.mockRestore();
  });
});
