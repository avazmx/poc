import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberNameSelectComponent } from './member-name-select.component';
import { CommunityModule } from 'src/app/community/community.module';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducers } from 'src/app/store/reducers/app.reducers';

describe('MemberNameSelectComponent', () => {
  let component: MemberNameSelectComponent;
  let fixture: ComponentFixture<MemberNameSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([]),
        HttpClientModule,
        CommunityModule
      ]
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
