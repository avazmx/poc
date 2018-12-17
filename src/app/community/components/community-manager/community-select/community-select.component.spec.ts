import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http'; 
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { communityReducer } from '../../../store/reducers/community-attributes.reducers';
import { CommunityEffects } from '../../../store/effects/community-effects';
import { reducers } from '../../../../store/reducers/app.reducers';

import { CommunitySelectComponent } from './community-select.component';

describe('CommunitySelectComponent', () => {
  let component: CommunitySelectComponent;
  let fixture: ComponentFixture<CommunitySelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunitySelectComponent ],
      imports: [
        AngularFontAwesomeModule,
        HttpClientModule,
        StoreModule.forFeature('communityes', communityReducer),
        EffectsModule.forFeature([CommunityEffects]),
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([]),
      ]
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
