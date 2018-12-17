import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AgGridModule } from 'ag-grid-angular';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { HttpAuthInterceptor } from '../../../../shared/interceptors/http-auth-interceptor';
import { HttpErrorInterceptor } from '../../../../shared/interceptors/http-error-interceptor';
import { CommunityAttributesComponent } from './community-attributes.component';
import { CommunityEffects } from '../../../store/effects/community-effects';
import { communityReducer } from '../../../store/reducers/community-attributes.reducers';
import { reducers } from '../../../../store/reducers/app.reducers';

import { CommunitySelectComponent } from '../../../components/community-manager/community-select/community-select.component';
import { CountrySelectComponent } from '../../../../shared/components/country-select/country-select.component';
import { DistrictSelectComponent } from '../../../../shared/components/district-select/district-select.component';
import { StateSelectComponent } from '../../../../shared/components/state-select/state-select.component';
/**
 * this functions acts as a object having function properties like beforeEach and it
 */
describe('CommunityAttributesComponent', () => {
  let component: CommunityAttributesComponent;
  let fixture: ComponentFixture<CommunityAttributesComponent>;
  /**
   * this method execute before every it configuring the testing module testbed
   */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CommunityAttributesComponent,
        CommunitySelectComponent,
        CountrySelectComponent,
        DistrictSelectComponent,
        StateSelectComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        AgGridModule.withComponents([
          CommunitySelectComponent,
          CountrySelectComponent,
          DistrictSelectComponent,
          StateSelectComponent
        ]),
        AngularFontAwesomeModule,
        HttpClientModule,
        StoreModule.forFeature('communityes', communityReducer),
        EffectsModule.forFeature([CommunityEffects]),
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([]),
      ],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
      ],
    })
      .compileComponents();
  }));

  beforeEach((done: DoneFn) => {
    console.log('waiting');
    setTimeout(() => {
      fixture = TestBed.createComponent(CommunityAttributesComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      done();
    }, 5000);
    
  });
  /**
   * this method receives 2 params a string as the description for the unit test and a callback that is executed
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
