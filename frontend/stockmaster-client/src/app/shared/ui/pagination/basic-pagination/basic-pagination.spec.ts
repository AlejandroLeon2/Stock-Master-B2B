import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicPagination } from './basic-pagination';

describe('BasicPagination', () => {
  let component: BasicPagination;
  let fixture: ComponentFixture<BasicPagination>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicPagination]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicPagination);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
