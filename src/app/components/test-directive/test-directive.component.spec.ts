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
    expect(fixture.componentInstance).toBeTruthy();
  });

  it("should expose the full Angular version", () => {
    const fixture = TestBed.createComponent(TestDirectiveComponent);
    expect(fixture.componentInstance.version).toBe(VERSION.full);
  });

  it("should render the Angular version in the template", async () => {
    const fixture = TestBed.createComponent(TestDirectiveComponent);
    await fixture.whenStable();
    const el = fixture.nativeElement.querySelector(
      '[data-testid="angular-version-directive"]'
    );
    expect(el).toBeTruthy();
    expect(el.textContent).toContain(`Angular Version: ${VERSION.full}`);
  });

  it("should apply the test-directive css class", async () => {
    const fixture = TestBed.createComponent(TestDirectiveComponent);
    await fixture.whenStable();
    const el = fixture.nativeElement.querySelector(".test-directive");
    expect(el).toBeTruthy();
  });

  it("should log an info message on construction", () => {
    const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});
    TestBed.createComponent(TestDirectiveComponent);
    expect(infoSpy).toHaveBeenCalledWith("test-directive initialized...");
    infoSpy.mockRestore();
  });
});
