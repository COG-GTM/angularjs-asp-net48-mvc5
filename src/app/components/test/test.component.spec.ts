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

  it('should have version equal to VERSION.full', () => {
    const fixture = TestBed.createComponent(TestComponent);
    const component = fixture.componentInstance;
    expect(component.version).toEqual(VERSION.full);
  });

  it('should render the version in the template', () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const versionDiv = compiled.querySelector('[data-testid="angular-version"]');
    expect(versionDiv).toBeTruthy();
    expect(versionDiv?.textContent).toContain(VERSION.full);
  });

  it('should call console.info on init', () => {
    const consoleSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    expect(consoleSpy).toHaveBeenCalledWith('test-component initialized...');
    consoleSpy.mockRestore();
  });
});
