import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityAttributesComponent } from './community-attributes.component';

describe('CommunityAttributesComponent', () => {
  let component: CommunityAttributesComponent;
  let fixture: ComponentFixture<CommunityAttributesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityAttributesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
