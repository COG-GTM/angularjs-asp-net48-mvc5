import { TestBed } from "@angular/core/testing";
import { RouterModule } from "@angular/router";
import { AppModule } from "./app.module";
import { App } from "./app";
import { TestComponent } from "./components/test/test.component";
import { TestDirectiveComponent } from "./components/test-directive/test-directive.component";

describe("AppModule", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents();
  });

  it("should compile successfully", () => {
    expect(TestBed.inject(AppModule)).toBeTruthy();
  });

  it("should bootstrap and render App, TestComponent, and TestDirectiveComponent", () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    // App component renders
    expect(compiled.querySelector("h1")?.textContent).toContain(
      "Hello, angular-app"
    );

    // TestComponent renders via router-outlet or direct inclusion
    // Since TestComponent and TestDirectiveComponent are standalone imports in AppModule,
    // verify they can be created
    const testFixture = TestBed.createComponent(TestComponent);
    testFixture.detectChanges();
    expect(
      testFixture.nativeElement.querySelector('[data-testid="angular-version"]')
    ).toBeTruthy();

    const directiveFixture = TestBed.createComponent(TestDirectiveComponent);
    directiveFixture.detectChanges();
    expect(
      directiveFixture.nativeElement.querySelector(
        '[data-testid="angular-version-directive"]'
      )
    ).toBeTruthy();
  });
});
