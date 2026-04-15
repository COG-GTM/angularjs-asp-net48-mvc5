import { TestBed } from "@angular/core/testing";
import { RouterModule } from "@angular/router";
import { App } from "./app";
import { TestComponent } from "./components/test/test.component";
import { TestDirectiveComponent } from "./components/test-directive/test-directive.component";

describe("App", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [App],
      imports: [
        RouterModule.forRoot([]),
        TestComponent,
        TestDirectiveComponent,
      ],
    }).compileComponents();
  });

  it("should create the app", () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it("should render title", async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector("h1")?.textContent).toContain(
      "Hello, angular-app"
    );
  });
});
