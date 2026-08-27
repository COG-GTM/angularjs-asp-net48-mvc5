import { vi } from 'vitest';
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

  it('should expose the Angular version', () => {
    const fixture = TestBed.createComponent(TestComponent);
    expect(fixture.componentInstance.version).toBe(VERSION.full);
  });

  it('should render the Angular version', async () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const el = fixture.nativeElement.querySelector('[data-testid="angular-version"]');
    expect(el?.textContent).toContain(`Angular Version: ${VERSION.full}`);
  });

  it('should log on init', () => {
    const infoSpy = vi.spyOn(console, 'info').mockImplementation(() => undefined);
    const fixture = TestBed.createComponent(TestComponent);
    fixture.componentInstance.ngOnInit();
    expect(infoSpy).toHaveBeenCalledWith('test-component initialized...');
  });
});
