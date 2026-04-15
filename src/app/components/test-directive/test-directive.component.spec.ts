import { TestBed } from "@angular/core/testing";
import { VERSION } from "@angular/core";
import { TestDirectiveComponent } from "./test-directive.component";

describe("TestDirectiveComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestDirectiveComponent],
    }).compileComponents();
  });

  it("should create the component", () => {
    const fixture = TestBed.createComponent(TestDirectiveComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it("should have version equal to VERSION.full", () => {
    const fixture = TestBed.createComponent(TestDirectiveComponent);
    const component = fixture.componentInstance;
    expect(component.version).toBe(VERSION.full);
  });

  it('should render Angular version inside [data-testid="angular-version-directive"]', () => {
    const fixture = TestBed.createComponent(TestDirectiveComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const el = compiled.querySelector(
      '[data-testid="angular-version-directive"]'
    );
    expect(el).toBeTruthy();
    expect(el!.textContent).toContain(`Angular Version: ${VERSION.full}`);
  });

  it("should call console.info in constructor", () => {
    const spy = vi.spyOn(console, "info").mockImplementation(() => {});
    TestBed.createComponent(TestDirectiveComponent);
    expect(spy).toHaveBeenCalledWith("test-directive initialized...");
    spy.mockRestore();
  });
});
