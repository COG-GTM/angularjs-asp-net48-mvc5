import { VERSION } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { TestDirectiveComponent } from "./test-directive.component";

describe("TestDirectiveComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestDirectiveComponent],
    }).compileComponents();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should create the component", () => {
    const fixture = TestBed.createComponent(TestDirectiveComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it("should set version to the full Angular version", () => {
    const fixture = TestBed.createComponent(TestDirectiveComponent);
    expect(fixture.componentInstance.version).toBe(VERSION.full);
  });

  it("should render the Angular version", async () => {
    const fixture = TestBed.createComponent(TestDirectiveComponent);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const versionElement = compiled.querySelector(
      '[data-testid="angular-version-directive"]'
    );
    expect(versionElement?.textContent).toContain("Angular Version:");
    expect(versionElement?.textContent).toContain(VERSION.full);
  });

  it("should log on construction", () => {
    const consoleInfoSpy = vi
      .spyOn(console, "info")
      .mockImplementation(() => {});
    TestBed.createComponent(TestDirectiveComponent);
    expect(consoleInfoSpy).toHaveBeenCalledWith(
      "test-directive initialized..."
    );
  });
});
