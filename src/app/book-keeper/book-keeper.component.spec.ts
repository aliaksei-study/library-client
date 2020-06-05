import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookKeeperComponent } from './book-keeper.component';

describe('BookKeeperComponent', () => {
  let component: BookKeeperComponent;
  let fixture: ComponentFixture<BookKeeperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookKeeperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookKeeperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
