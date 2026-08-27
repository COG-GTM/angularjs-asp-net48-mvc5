import { TestBed } from "@angular/core/testing";
import { VERSION } from "@angular/core";
import { TestComponent } from "./test.component";

describe("TestComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
    }).compileComponents();
  });

  it("should create the component", () => {
    const fixture = TestBed.createComponent(TestComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it("should expose the full Angular version", () => {
    const fixture = TestBed.createComponent(TestComponent);
    expect(fixture.componentInstance.version).toBe(VERSION.full);
  });

  it("should render the Angular version in the template", async () => {
    const fixture = TestBed.createComponent(TestComponent);
    await fixture.whenStable();
    const el = fixture.nativeElement.querySelector(
      '[data-testid="angular-version"]'
    );
    expect(el).toBeTruthy();
    expect(el.textContent).toContain(`Angular Version: ${VERSION.full}`);
  });

  it("should apply the test-component css class", async () => {
    const fixture = TestBed.createComponent(TestComponent);
    await fixture.whenStable();
    const el = fixture.nativeElement.querySelector(".test-component");
    expect(el).toBeTruthy();
  });

  it("should log an info message on init", () => {
    const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});
    const fixture = TestBed.createComponent(TestComponent);
    fixture.componentInstance.ngOnInit();
    expect(infoSpy).toHaveBeenCalledWith("test-component initialized...");
    infoSpy.mockRestore();
  });
});
