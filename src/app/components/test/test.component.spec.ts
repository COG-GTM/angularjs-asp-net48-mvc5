import { VERSION } from "@angular/core";
import { TestBed } from "@angular/core/testing";
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

  it("should set the version to the full Angular version", () => {
    const fixture = TestBed.createComponent(TestComponent);
    expect(fixture.componentInstance.version).toBe(VERSION.full);
  });

  it("should render the Angular version", async () => {
    const fixture = TestBed.createComponent(TestComponent);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const versionElement = compiled.querySelector(
      '[data-testid="angular-version"]'
    );
    expect(versionElement?.textContent).toContain("Angular Version:");
    expect(versionElement?.textContent).toContain(VERSION.full);
  });

  it("should log on initialization", async () => {
    const consoleInfoSpy = vi
      .spyOn(console, "info")
      .mockImplementation(() => {});
    const fixture = TestBed.createComponent(TestComponent);
    await fixture.whenStable();
    expect(consoleInfoSpy).toHaveBeenCalledWith(
      "test-component initialized..."
    );
    consoleInfoSpy.mockRestore();
  });
});
