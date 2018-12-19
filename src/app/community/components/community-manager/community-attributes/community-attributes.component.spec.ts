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

import { CommunityService } from '../../../services/community.service';

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

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  /**
   * this method receives 2 params a string as the description for the unit test and a callback that is executed
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('h3Title should be rendered at a h3 tag', () => {
    expect(component.h3Title.nativeElement.tagName).toEqual('H3');
  });

  it('h3Title innerText shoud be equal to Community Structure', () => {
    expect(component.h3Title.nativeElement.innerText).toEqual('Community Structure');
  });

  it('lblCommunityType should be rendered at a label tag', () => {
    expect(component.lblCommunityType.nativeElement.tagName).toEqual('LABEL');
  });

  it('lblCommunityType innerText should be equal to COMMUNITY TYPE*', () => {
    expect(component.lblCommunityType.nativeElement.innerText).toEqual('COMMUNITY TYPE*');
  });

  it('ng-select class should be equal to custom', () => {
    expect(component.ngselect.classes).toEqual('custom');
  });

  it('ng-select placeholder should be equal to Select a type', () => {
    expect(component.ngselect.placeholder).toEqual('Select a type');
  });

  it('communityTypes should be the ones form the server', (done: DoneFn) => {
    const service: CommunityService = TestBed.get(CommunityService);
    service.getCommunityTypes().subscribe(value => {
      expect(component.communityTypes).toEqual(value);
      done();
    });
  });

  it('should pass the community types to the ng-select', () => {
    expect(component.ngselect.items).toBe(component.communityTypes);
  });

  it('ag-grid should not be empty', () => {
    expect(component.aggrid.api.getRenderedNodes().length).toBeGreaterThanOrEqual(1);
  });

  it('should have headers rendered corrected', () => {
    const columnsDef = component.aggrid.columnDefs;
    expect(columnsDef[0].headerName === 'Country' &&
    columnsDef[1].headerName === 'District' &&
    columnsDef[2].headerName === 'State/Province' &&
    columnsDef[3].headerName === 'SLIC Range Low' &&
    columnsDef[4].headerName === 'SLIC Range High' &&
    columnsDef[5].headerName === 'Business Unit' &&
    columnsDef[6].headerName === 'GND' &&
    columnsDef[7].headerName === '3DS' &&
    columnsDef[8].headerName === '2DS' &&
    columnsDef[9].headerName === '1DA').toBeTruthy();
  });

  it('btnAddRow click event should add a row', () => {
    const previosrowlength = component.aggrid.api.getRenderedNodes().length;
    component.btnAddRow.nativeElement.click();
    fixture.detectChanges();
    const newrowslength = component.aggrid.api.getRenderedNodes().length;
    expect(newrowslength).toBeGreaterThan(previosrowlength);
  });

});