import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CommunityManagerComponent } from './community-manager.component';
import { CommunityAttributesComponent } from './community-attributes/community-attributes.component';
import { CommunityManageMembersComponent } from './community-manage-members/community-manage-members.component';
import { CommunityGovernanceComponent } from './community-governance/community-governance.component';
import { MultiSelectComponent } from './community-governance/multi-select/multi-select.component';

import { ArchwizardModule, PreviousStepDirective } from 'angular-archwizard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AgGridModule } from 'ag-grid-angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpAuthInterceptor } from '../../../shared/interceptors/http-auth-interceptor';
import { HttpErrorInterceptor } from '../../../shared/interceptors/http-error-interceptor';

import * as fromCommunity from '../../store/reducers/community-attributes.reducers';
import { CommunityEffects } from '../../store/effects/community-effects';
import { reducers } from '../../../store/reducers/app.reducers';

import { CommunitySelectComponent } from '../../../shared/components/community-select/community-select.component';
import { CountrySelectComponent } from '../../../shared/components/country-select/country-select.component';
import { DistrictSelectComponent } from '../../../shared/components/district-select/district-select.component';
import { StateSelectComponent } from '../../../shared/components/state-select/state-select.component';
import { BusinessUnitSelectComponent } from '../../../shared/components/business-unit-select/business-unit-select.component';
import { MemberNameSelectComponent } from '../../../shared/components/member-name-select/member-name-select.component';
import { AccessLevelSelectComponent } from '../../../shared/components/access-level-select/access-level-select.component';

import { CommunityTypeService } from '../../services/community-type.service';

import { CommunityModule } from './../../community.module';
import { CountryService } from 'src/app/shared/services/country.service';
import { GroundSelectComponent } from 'src/app/shared/components/ground-select/ground-select.component';
import { DistrictService } from 'src/app/shared/services/district.service';
import { StateService } from 'src/app/shared/services/state.service';
import { BusinessUnitService } from 'src/app/shared/services/business-unit.service';
import { CommunityRoutingModule } from '../../community-routing.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('CommunityManagerComponent', () => {
  let component: CommunityManagerComponent;
  let fixture: ComponentFixture<CommunityManagerComponent>;
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([]),
        HttpClientModule,
        CommunityModule,
        CommunityRoutingModule,
        RouterTestingModule
      ],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('click next in step one with empty inputs should display info message', () => {
    let btnNextStep1 = fixture.debugElement.query(By.css('.menu-btns.step1 .btn.btn-primary'));
    btnNextStep1.nativeElement.click();
    fixture.detectChanges();
    expect(component.communityObject.activeTab).toBe(1);
  });

  it('should display communityType as required', () => {
    let communityTypeService = fixture.debugElement.injector.get(CommunityTypeService);
    component.attributeComponent.ngSelect.items = communityTypeService.getHardCodedCommunityTypes();
    fixture.detectChanges();
    component.attributeComponent.ngSelect.select(component.attributeComponent.ngSelect.items[0]);
    component.attributeComponent.ngSelect.unselect(component.attributeComponent.ngSelect.items[0]);
    fixture.detectChanges();
    let communityTypeRequired = fixture.debugElement.query(By.css('.custom.ng-select'));
    expect(communityTypeRequired).toBeDefined();
  });

  it('should display Name is required*', () => {
    let inpName = fixture.debugElement.query(By.css('#inpName'));
    inpName.nativeElement.click();
    fixture.detectChanges();
    fixture.nativeElement.click();
    fixture.detectChanges();
    let nameRequired = fixture.debugElement.query(By.css('.nameRequired'));
    expect(nameRequired).toBeDefined();
  });

  it('should display Description is required*', () => {
    let inpDescription = fixture.debugElement.query(By.css('#inpDescription'));
    inpDescription.nativeElement.click();
    fixture.detectChanges();
    fixture.nativeElement.click();
    fixture.detectChanges();
    let nameRequired = fixture.debugElement.query(By.css('.descriptionRequired'));
    expect(nameRequired).toBeDefined();
  });

  it('btnAddRow should add another row to the table', () => {
    let btnAddRow = fixture.debugElement.query(By.css('#btnAddRow'));
    let previousRows: number = component.attributeComponent.agGrid.api.getRenderedNodes().length;
    btnAddRow.nativeElement.click();
    fixture.detectChanges();
    let newRows: number = component.attributeComponent.agGrid.api.getRenderedNodes().length;
    expect(newRows).toBeGreaterThan(previousRows);
  });
  
  it('should let you pass to step 2', async (done: DoneFn) => {
    const communityTypeService: CommunityTypeService = fixture.debugElement.injector.get(CommunityTypeService);
    const countryService: CountryService = fixture.debugElement.injector.get(CountryService);
    const districtService: DistrictService = fixture.debugElement.injector.get(DistrictService);
    const stateService: StateService = fixture.debugElement.injector.get(StateService);
    const BUService: BusinessUnitService = fixture.debugElement.injector.get(BusinessUnitService);

    component.attributeComponent.ngSelect.items = communityTypeService.getHardCodedCommunityTypes();
    fixture.detectChanges();
    component.attributeComponent.ngSelect.select(component.attributeComponent.ngSelect.items[0]);
    fixture.detectChanges();
    const inpName = fixture.debugElement.query(By.css('#inpName'));
      inpName.nativeElement.setAttribute("value", "a");
    fixture.detectChanges();
    const inpDescription = fixture.debugElement.query(By.css('#inpDescription'));
      inpDescription.nativeElement.setAttribute("value", "a");
    fixture.detectChanges();
    const btnAddRow = fixture.debugElement.query(By.css('#btnAddRow'));
      btnAddRow.nativeElement.click();
    component.attributeComponent.agGrid.api.refreshCells();
    fixture.detectChanges();

    window.setTimeout(() => {
      const node0 = component.attributeComponent.agGrid.api.getRenderedNodes()[0];
      node0.setSelected(true);
      
      const countryInstance: any = component.attributeComponent.agGrid.api.getCellRendererInstances({ columns: ['country'], rowNodes: [node0] });
      const frameworkCountryInstance: CountrySelectComponent = countryInstance[0].getFrameworkComponentInstance();
        frameworkCountryInstance.countries = countryService.getHardCodedCountries();
        fixture.detectChanges();
        const countrySelect: HTMLSelectElement = frameworkCountryInstance.elementRef.nativeElement.querySelector('select');
          countrySelect.selectedIndex = 1;
          countrySelect.dispatchEvent(new Event('change'));
          fixture.detectChanges();
      const districtInstance: any = component.attributeComponent.agGrid.api.getCellRendererInstances({ columns: ['district'], rowNodes: [node0] });
      const frameworkDistrictInstance: DistrictSelectComponent = districtInstance[0].getFrameworkComponentInstance();
        frameworkDistrictInstance.districts = districtService.getHardCodedDistricts(frameworkCountryInstance.selectedCountry.id);
        fixture.detectChanges();
        const districtSelect: HTMLSelectElement = frameworkDistrictInstance.elementRef.nativeElement.querySelector('select');
          districtSelect.selectedIndex = 1;
          districtSelect.dispatchEvent(new Event('change'));
          fixture.detectChanges();
      const stateInstance: any = component.attributeComponent.agGrid.api.getCellRendererInstances({ columns: ['state'], rowNodes: [node0] });
      const frameworkStateInstance: StateSelectComponent = stateInstance[0].getFrameworkComponentInstance();
        frameworkStateInstance.states = stateService.getHardCodedStates(frameworkDistrictInstance.selectedDistrict.id);
        fixture.detectChanges();
        const stateSelect: HTMLSelectElement = frameworkStateInstance.elementRef.nativeElement.querySelector('select');
          stateSelect.selectedIndex = 0;
          stateSelect.dispatchEvent(new Event('change'));
          fixture.detectChanges();
          console.log(frameworkStateInstance);
      const BUInstance: any = component.attributeComponent.agGrid.api.getCellRendererInstances({ columns: ['businessUnit'], rowNodes: [node0] });
      const frameworkBUInstance: BusinessUnitSelectComponent = BUInstance[0].getFrameworkComponentInstance();
        frameworkBUInstance.businessUnits = BUService.getHardCodedBusinessUnits();
        fixture.detectChanges();
        const BUSelect: HTMLSelectElement = frameworkBUInstance.elementRef.nativeElement.querySelector('select');
          BUSelect.selectedIndex = 0;
          BUSelect.dispatchEvent(new Event('change'));
          fixture.detectChanges();
      let btnNextStep1 = fixture.debugElement.query(By.css('.menu-btns.step1 .btn.btn-primary'));
        btnNextStep1.nativeElement.click();
        fixture.detectChanges();
      expect(component.communityObject.activeTab).toBe(2);
      done();
    }, 100);
    
  });
  
});
