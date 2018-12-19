import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; 
import { AgGridModule } from 'ag-grid-angular';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { HttpAuthInterceptor } from '../../../../shared/interceptors/http-auth-interceptor';
import { HttpErrorInterceptor } from '../../../../shared/interceptors/http-error-interceptor';
import { CommunityManageMembersComponent } from './community-manage-members.component';
import { CommunityEffects } from '../../../store/effects/community-effects';
import { communityReducer } from '../../../store/reducers/community-attributes.reducers';
import { reducers } from '../../../../store/reducers/app.reducers';

import { CommunitySelectComponent } from '../../../components/community-manager/community-select/community-select.component';
import { CountrySelectComponent } from '../../../../shared/components/country-select/country-select.component';
import { DistrictSelectComponent } from '../../../../shared/components/district-select/district-select.component';
import { StateSelectComponent } from '../../../../shared/components/state-select/state-select.component';

describe('ManageMembersComponent', () => {
  let component: CommunityManageMembersComponent;
  let fixture: ComponentFixture<CommunityManageMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CommunityManageMembersComponent,
        CommunitySelectComponent,
        CountrySelectComponent,
        DistrictSelectComponent,
        StateSelectComponent
      ],
      imports: [
        AngularFontAwesomeModule,
        HttpClientModule,
        AgGridModule.withComponents([
          CommunitySelectComponent,
          CountrySelectComponent,
          DistrictSelectComponent,
          StateSelectComponent
        ]),
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

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityManageMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('title should be equal to East Region Small Package Community - Manage Members', () => {
    expect(component.title).toEqual('East Region Small Package Community - Manage Members');
  });

  it('ag-grid should not be empty', () => {
    expect(component.aggrid.api.getRenderedNodes().length).toBeGreaterThanOrEqual(1);
  });

  it('should have headers rendered corrected', () => {
    const columnsDef = component.aggrid.columnDefs;
    expect(columnsDef[0].headerName === 'Member Name' &&
    columnsDef[1].headerName === 'Access Level' &&
    columnsDef[2].headerName === 'Country' &&
    columnsDef[3].headerName === 'District' &&
    columnsDef[4].headerName === 'State/Province' &&
    columnsDef[5].headerName === 'SLIC Range Low' &&
    columnsDef[6].headerName === 'SLIC Range High').toBeTruthy();
  });

  it('lblAddRow should be equal to Add Row', () => {
    expect(component.lblAddRow).toEqual('Add Row');
  });

  it('btnAddRow click event should add a row', () => {
    const previosrowlength = component.aggrid.api.getRenderedNodes().length;
    component.btnAddRow.nativeElement.click();
    fixture.detectChanges();
    const newrowslength = component.aggrid.api.getRenderedNodes().length;
    expect(newrowslength).toBeGreaterThan(previosrowlength);
  });

});
