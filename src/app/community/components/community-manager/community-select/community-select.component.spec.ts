import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunitySelectComponent } from './community-select.component';

describe('CommunitySelectComponent', () => {
  let component: CommunitySelectComponent;
  let fixture: ComponentFixture<CommunitySelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunitySelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunitySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
