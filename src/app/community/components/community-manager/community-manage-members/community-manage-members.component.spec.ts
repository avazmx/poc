import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityManageMembersComponent } from './community-manage-members.component';

describe('ManageMembersComponent', () => {
  let component: CommunityManageMembersComponent;
  let fixture: ComponentFixture<CommunityManageMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityManageMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityManageMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
