import { TestBed } from '@angular/core/testing';
import { TestComponent } from './test.component';
import { VERSION } from '@angular/core';

describe('testComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent]
    }).compileComponents();
  });

  it('should initialize with Angular version', () => {
    const fixture = TestBed.createComponent(TestComponent);
    const ctrl = fixture.componentInstance;
    ctrl.ngOnInit();
    expect(ctrl.version).toBeDefined();
    expect(ctrl.version).toBe(VERSION.full);
  });

  it('should log initialization message', () => {
    const fixture = TestBed.createComponent(TestComponent);
    const ctrl = fixture.componentInstance;
    const spy = vi.spyOn(console, 'info').mockImplementation(() => {});
    ctrl.ngOnInit();
    expect(spy).toHaveBeenCalledWith('test-component initialized...');
    spy.mockRestore();
  });

  it('should have correct component instance', () => {
    const fixture = TestBed.createComponent(TestComponent);
    const ctrl = fixture.componentInstance;
    expect(ctrl).toBeDefined();
  });
});
