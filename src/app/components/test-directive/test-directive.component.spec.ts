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
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have version equal to VERSION.full', () => {
    const fixture = TestBed.createComponent(TestDirectiveComponent);
    const component = fixture.componentInstance;
    expect(component.version).toBe(VERSION.full);
  });

  it('should render a div with data-testid containing the version string', async () => {
    const fixture = TestBed.createComponent(TestDirectiveComponent);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const div = compiled.querySelector('div[data-testid="angular-version-directive"]');
    expect(div).toBeTruthy();
    expect(div!.textContent).toContain(VERSION.full);
  });

  it('should call console.info with initialization message in constructor', () => {
    const spy = vi.spyOn(console, 'info');
    TestBed.createComponent(TestDirectiveComponent);
    expect(spy).toHaveBeenCalledWith('test-directive initialized...');
    spy.mockRestore();
  });
});
