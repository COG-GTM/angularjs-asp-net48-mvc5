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
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should set version to VERSION.full', () => {
    const fixture = TestBed.createComponent(TestComponent);
    const component = fixture.componentInstance;
    expect(component.version).toBe(VERSION.full);
  });

  it('should render the Angular version in the template', async () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const versionEl = compiled.querySelector('[data-testid="angular-version"]');
    expect(versionEl?.textContent).toContain(`Angular Version: ${VERSION.full}`);
  });

  it('should log initialization message on ngOnInit', () => {
    const fixture = TestBed.createComponent(TestComponent);
    const consoleSpy = vi.spyOn(console, 'info');
    fixture.detectChanges();
    expect(consoleSpy).toHaveBeenCalledWith('test-component initialized...');
  });
});
