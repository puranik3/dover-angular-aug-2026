## Unit testing (Angular Testing Course)

1. `calculator.service.spec.ts`  
- Tests: 
    - should add two numbers
    - should subtract two numbers
- Concepts: describe(), it(), matchers, withContext(), test fixtures are recreated for every test to ensure tests run in isolation

2. `calculator.service.spec.ts`  
- Tests: 
    - should add two numbers
    - should subtract two numbers
- Concepts: spyOn(), jasmine.createSpyObj(), toHaveBeenCalledTimes(), xdescribe(), xit(), fdescribe(), fit()

3. `calculator.service.spec.ts`  
- Tests: 
    - should add two numbers
    - should subtract two numbers
- Concepts: beforeEach() for setup, afterEach() for teardown, beforeAll(), afterAll(), suite-scoped variables for sharing fixture references

4. `calculator.service.spec.ts`  
- Tests: 
    - should add two numbers
    - should subtract two numbers
- Concepts: using TestBed.configureTestingModule(), dependency injection (provide, useValue), inject()

5. `courses.service.spec.ts`
- Tests: 
    - should retrieve all courses
- Concepts: Set up TestBed with HttpTestingController and providers, test for "" with use of HttpTestingController#expectOne(), TestRequest#request, TestRequest#flush()

6. `courses.service.spec.ts`
- Tests: 
    - should find a course by id
- Concepts: afterEach(), HttpTestingController#verify()

7. `courses.service.spec.ts`
- Tests:
    - should save the course data (send and object with changed { titles: { description: "" } }, and rest of details the same to the backend, and test the "id" returned)
- Concepts: Testing for services that mutate data

8. `courses.service.spec.ts`
- Tests:
    - should give an error if save course fails
- Concepts: testing error scenario, using fail(), flushing error response

9. `courses.service.spec.ts`
- Tests:
    - should find a list of lessons
- Concepts: matching request based on HTTP request attributes like URL, params etc., testing query parameters passed during the HTTP request

10. `courses-card-list.component.spec.ts`
- Tests:
    - should create the component
- Concepts:
    - Testing Presentational Component (consumes data from parent but does not use other services, to fetch data for example).
    - TestBed setup for tests - since the CoursesModule has everything else we need for the component, this single import will do. The Course module does not have browser-specific modules like BrowserModule that will prevent the tests from running either.
    - Return the promise from beforeEach() so the test waits for operations to complete
    - TestBed.createComponent, ComponentFixture<>.debugElement, ComponentFixture<>.componentInstance

11. `courses-card-list.component.spec.ts`
- Tests:
    - should display the course list
- Concepts: ComponentFixture<>#detectChanges, DebugElement methods and properties - nativeElement, queryAll() vs query(), By.css()

12. `home.component.spec.ts`
- Tests:
    - should display the course list
- Concepts: NoopAnimationsModule, seting up return value of spy method

13. `home.component.spec.ts`
- Tests:
    - should display only beginner courses
    - should display only advanced courses
- Concepts: queryAll(), By.css()
- Hint: `By.css(".mat-mdc-tab")`

14. `home.component.spec.ts`
- Tests:
    - should segregate and show BEGINNER and ADVANCED courses
- Concepts:
    - how asynchronous updates from a component can be tricky to test
- Hint:
```ts
coursesServiceSpy.findAllCourses.and.returnValue(of(courses));

fixture.detectChanges();

const beginnerCards = fixtureDE.queryAll(
    By.css("mat-tab-body:nth-child(1) mat-card")
);

const tabs = fixtureDE.queryAll(By.css(".mat-mdc-tab"));
click(tabs[1]);
fixture.detectChanges();

// the advanced course cards get rendered only once the "Advanced" tab is clicked
const advancedCards = fixtureDE.queryAll(
    By.css("mat-tab-body:nth-child(2) mat-card")
);

// NOTE: These assertions will fail
const cardTitles = fixtureDE.queryAll(By.css(".mat-mdc-card-title"));
expect(cardTitles.length).toBeGreaterThan(
    0,
    "could not find card titles"
);
expect(cardTitles[0].nativeElement.textContent).toContain(
    "Angular Security Course"
);
```

15. `home.component.spec.ts`
- Tests:
    - should segregate and show BEGINNER and ADVANCED courses - using setTimeout() and done()
- Concepts:
    - how done() can help signal end of asnychronous operations and conclude test

16. `home.component.spec.ts`
- Tests:
    - should segregate and show BEGINNER and ADVANCED courses - Using fakeAsync() and flush()
- Concepts:
    - how done() can help signal end of asnychronous operations and conclude test

17. `home.component.spec.ts`
- Tests:
    - should segregate and show BEGINNER and ADVANCED courses - using waitForAsync() and fixture.whenStable()
- Concepts:
    - waitForAsync() provides a zone that is aware of asynchronous tasks being executed. But does not allow fine-grained access using flush(), flushMicrotasks(), tick() etc. Instead, it gives access to fixture.whenStable() method which pauses test execution till all kinds of task queues are flushed.
    - However waitForAsync() zone allows us to make actual HTTP request if fetch() is called in the test. fakeAsync() does not allow this. This makes waitForAsync() suitable for integration tests (which tests integration of service/component for example with a real backend)
- Hint:
```ts
fixture.whenStable().then(() => {
    // test code...
});
```
