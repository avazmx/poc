import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberNameSelectComponent } from './member-name-select.component';

describe('MemberNameSelectComponent', () => {
  let component: MemberNameSelectComponent;
  let fixture: ComponentFixture<MemberNameSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberNameSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberNameSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
