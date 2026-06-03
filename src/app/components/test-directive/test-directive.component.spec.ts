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

  it('should expose the full Angular version', () => {
    const fixture = TestBed.createComponent(TestDirectiveComponent);
    expect(fixture.componentInstance.version).toBe(VERSION.full);
  });

  it('should render the Angular version in the template', () => {
    const fixture = TestBed.createComponent(TestDirectiveComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const versionEl = el.querySelector('[data-testid="angular-version-directive"]');
    expect(versionEl?.textContent).toContain('Angular Version:');
    expect(versionEl?.textContent).toContain(VERSION.full);
  });

  it('should log an info message on construction', () => {
    const spy = vi.spyOn(console, 'info').mockImplementation(() => undefined);
    TestBed.createComponent(TestDirectiveComponent);
    expect(spy).toHaveBeenCalledWith('test-directive initialized...');
    spy.mockRestore();
  });
});
