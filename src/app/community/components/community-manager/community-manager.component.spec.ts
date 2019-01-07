import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CommunityManagerComponent } from './community-manager.component';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpAuthInterceptor } from '../../../shared/interceptors/http-auth-interceptor';
import { HttpErrorInterceptor } from '../../../shared/interceptors/http-error-interceptor';

import { reducers } from '../../../store/reducers/app.reducers';

import { CountrySelectComponent } from '../../../shared/components/country-select/country-select.component';
import { DistrictSelectComponent } from '../../../shared/components/district-select/district-select.component';
import { StateSelectComponent } from '../../../shared/components/state-select/state-select.component';
import { BusinessUnitSelectComponent } from '../../../shared/components/business-unit-select/business-unit-select.component';

import { CommunityTypeService } from '../../services/community-type.service';

import { CommunityModule } from './../../community.module';
import { CountryService } from 'src/app/shared/services/country.service';
import { GroundSelectComponent } from 'src/app/shared/components/ground-select/ground-select.component';
import { DistrictService } from 'src/app/shared/services/district.service';
import { StateService } from 'src/app/shared/services/state.service';
import { BusinessUnitService } from 'src/app/shared/services/business-unit.service';
import { CommunityRoutingModule } from '../../community-routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { MemberNameSelectComponent } from 'src/app/shared/components/member-name-select/member-name-select.component';
import { MemberNameService } from 'src/app/shared/services/member-name.service';
import { AccessLevelSelectComponent } from 'src/app/shared/components/access-level-select/access-level-select.component';
import { AccessLevelService } from 'src/app/shared/services/access-level.service';

describe('CommunityManagerComponent', () => {
  let component: CommunityManagerComponent;
  let fixture: ComponentFixture<CommunityManagerComponent>;
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 180000;

  let memberNameTypeService: MemberNameService;
  let accessLevelTypeService: AccessLevelService;
  let communityTypeService: CommunityTypeService;
  let countryService: CountryService;
  let districtService: DistrictService;
  let stateService: StateService;
  let BUService: BusinessUnitService;

  beforeEach(async (done: DoneFn) => {
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
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(CommunityManagerComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      memberNameTypeService = fixture.debugElement.injector.get(MemberNameService);
      accessLevelTypeService = fixture.debugElement.injector.get(AccessLevelService);
      communityTypeService = fixture.debugElement.injector.get(CommunityTypeService);
      countryService = fixture.debugElement.injector.get(CountryService);
      districtService = fixture.debugElement.injector.get(DistrictService);
      stateService = fixture.debugElement.injector.get(StateService);
      BUService = fixture.debugElement.injector.get(BusinessUnitService);

      done();
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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

  const validateStep1 = async () => {
    return new Promise((resolve, reject) => {

      component.attributeComponent.communityTypes = communityTypeService.getHardCodedCommunityTypes();
      component.attributeComponent.loading = false;
      component.attributeComponent.ngSelect.open();
      fixture.detectChanges();
      
      component.attributeComponent.ngSelect.select(component.attributeComponent.ngSelect.itemsList.items[0]);
      component.attributeComponent.ngSelect.detectChanges();
      component.attributeComponent.ngSelect.changeEvent.emit("change");
      
      fixture.detectChanges();
      const inpName = fixture.debugElement.query(By.css('#inpName'));
        inpName.nativeElement.value = "a";
        inpName.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      const inpDescription = fixture.debugElement.query(By.css('#inpDescription'));
        inpDescription.nativeElement.value = "a";
        inpDescription.nativeElement.dispatchEvent(new Event('input'));
      component.attributeComponent.form.updateValueAndValidity();
      fixture.detectChanges();
      
      window.setTimeout(() => {
        const node0 = component.attributeComponent.agGrid.api.getRenderedNodes()[0];
        
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
            stateSelect.selectedIndex = 1;
            stateSelect.dispatchEvent(new Event('change'));
            fixture.detectChanges();
        const BUInstance: any = component.attributeComponent.agGrid.api.getCellRendererInstances({ columns: ['businessUnit'], rowNodes: [node0] });
        const frameworkBUInstance: BusinessUnitSelectComponent = BUInstance[0].getFrameworkComponentInstance();
          frameworkBUInstance.businessUnits = BUService.getHardCodedBusinessUnits();
          fixture.detectChanges();
          const BUSelect: HTMLSelectElement = frameworkBUInstance.elementRef.nativeElement.querySelector('select');
            BUSelect.selectedIndex = 1;
            BUSelect.dispatchEvent(new Event('change'));
            fixture.detectChanges();

        node0.setSelected(true);
        component.attributeComponent.agGrid.api.dispatchEvent(new Event('selectionChanged'));

        window.setTimeout(() => {
          let btnNextStep1 = fixture.debugElement.query(By.css('.menu-btns.step1 .btn.btn-primary'));
          btnNextStep1.nativeElement.click();
          fixture.detectChanges();

          resolve('finished');
        }, 1000);
        
      }, 1000);
    });
    
  };
  
  it('should let you pass to step 2', async (done: DoneFn) => {
    await validateStep1();
    expect(component.attributeComponent.form.valid && component.canExitAgGrid && component.canExitAttributesComponent
      && component.gridValidator.tab1BusinessUnit && component.gridValidator.tab1Country && component.gridValidator.tab1District
      && component.gridValidator.tab1State).toBeTruthy();

    done();
  });

  const validateStep2 = async () => {
    return new Promise((resolve, reject) => {
      const node0 = component.manageMembersComponent.agGrid.api.getRenderedNodes()[0];
      const node1 = component.manageMembersComponent.agGrid.api.getRenderedNodes()[1];

      node0.setSelected(true);
      node1.setSelected(true);
      component.manageMembersComponent.agGrid.api.dispatchEvent(new Event('selectionChanged'));

      component.manageMembersComponent.agGrid.api.addEventListener('selectionChanged', () => {
        const accessLevelInstance: any = component.manageMembersComponent.agGrid.api.getCellRendererInstances({ columns: ['accessLevel'], rowNodes: [node0] });
        if(accessLevelInstance.length > 0){
          const frameworkAccessLevelInstance: AccessLevelSelectComponent = accessLevelInstance[0].getFrameworkComponentInstance();
          frameworkAccessLevelInstance.accessLevels = accessLevelTypeService.getHardCodedAccessLevels();
          fixture.detectChanges();
          const accessLevelSelect: HTMLSelectElement = frameworkAccessLevelInstance.elementRef.nativeElement.querySelector('select');
            accessLevelSelect.selectedIndex = 1;
            accessLevelSelect.dispatchEvent(new Event('change'));
            fixture.detectChanges();
        }
        
        const countryInstance: any = component.manageMembersComponent.agGrid.api.getCellRendererInstances({ columns: ['country'], rowNodes: [node0] });
        let frameworkCountryInstance: CountrySelectComponent;
        if(countryInstance.length > 0){
          frameworkCountryInstance = countryInstance[0].getFrameworkComponentInstance();
          frameworkCountryInstance.countries = countryService.getHardCodedCountries();
          fixture.detectChanges();
          const countrySelect: HTMLSelectElement = frameworkCountryInstance.elementRef.nativeElement.querySelector('select');
            countrySelect.selectedIndex = 1;
            countrySelect.dispatchEvent(new Event('change'));
            fixture.detectChanges();
        }
        
        const districtInstance: any = component.manageMembersComponent.agGrid.api.getCellRendererInstances({ columns: ['district'], rowNodes: [node0] });
        let frameworkDistrictInstance: DistrictSelectComponent;
        if(districtInstance.length > 0){
          frameworkDistrictInstance = districtInstance[0].getFrameworkComponentInstance();
          frameworkDistrictInstance.districts = districtService.getHardCodedDistricts(frameworkCountryInstance.selectedCountry.id);
          fixture.detectChanges();
          const districtSelect: HTMLSelectElement = frameworkDistrictInstance.elementRef.nativeElement.querySelector('select');
            districtSelect.selectedIndex = 0;
            districtSelect.dispatchEvent(new Event('change'));
            fixture.detectChanges();
        }
        
        const stateInstance: any = component.manageMembersComponent.agGrid.api.getCellRendererInstances({ columns: ['state'], rowNodes: [node0] });
        if(stateInstance.length > 0){
          const frameworkStateInstance: StateSelectComponent = stateInstance[0].getFrameworkComponentInstance();
          frameworkStateInstance.states = stateService.getHardCodedStates(frameworkDistrictInstance.selectedDistrict.id);
          fixture.detectChanges();
          const stateSelect: HTMLSelectElement = frameworkStateInstance.elementRef.nativeElement.querySelector('select');
            stateSelect.selectedIndex = 0;
            stateSelect.dispatchEvent(new Event('change'));
            fixture.detectChanges();
        }

        const accessLevelInstance2: any = component.manageMembersComponent.agGrid.api.getCellRendererInstances({ columns: ['accessLevel'], rowNodes: [node1] });
        if(accessLevelInstance2.length > 0){
          const frameworkAccessLevelInstance: AccessLevelSelectComponent = accessLevelInstance2[0].getFrameworkComponentInstance();
          frameworkAccessLevelInstance.accessLevels = accessLevelTypeService.getHardCodedAccessLevels();
          fixture.detectChanges();
          const accessLevelSelect: HTMLSelectElement = frameworkAccessLevelInstance.elementRef.nativeElement.querySelector('select');
            accessLevelSelect.selectedIndex = 1;
            accessLevelSelect.dispatchEvent(new Event('change'));
            fixture.detectChanges();
        }
        
        const countryInstance2: any = component.manageMembersComponent.agGrid.api.getCellRendererInstances({ columns: ['country'], rowNodes: [node1] });
        if(countryInstance2.length > 0){
          const frameworkCountryInstance: CountrySelectComponent = countryInstance2[0].getFrameworkComponentInstance();
          frameworkCountryInstance.countries = countryService.getHardCodedCountries();
          fixture.detectChanges();
          const countrySelect: HTMLSelectElement = frameworkCountryInstance.elementRef.nativeElement.querySelector('select');
            countrySelect.selectedIndex = 1;
            countrySelect.dispatchEvent(new Event('change'));
            fixture.detectChanges();
        }
        
        const districtInstance2: any = component.manageMembersComponent.agGrid.api.getCellRendererInstances({ columns: ['district'], rowNodes: [node1] });
        if(districtInstance2.length > 0){
          const frameworkDistrictInstance: DistrictSelectComponent = districtInstance2[0].getFrameworkComponentInstance();
          frameworkDistrictInstance.districts = districtService.getHardCodedDistricts(frameworkCountryInstance.selectedCountry.id);
          fixture.detectChanges();
          const districtSelect: HTMLSelectElement = frameworkDistrictInstance.elementRef.nativeElement.querySelector('select');
            districtSelect.selectedIndex = 0;
            districtSelect.dispatchEvent(new Event('change'));
            fixture.detectChanges();
        }
        
        const stateInstance2: any = component.manageMembersComponent.agGrid.api.getCellRendererInstances({ columns: ['state'], rowNodes: [node1] });
        if(stateInstance2.length > 0){
          const frameworkStateInstance: StateSelectComponent = stateInstance2[0].getFrameworkComponentInstance();
          frameworkStateInstance.states = stateService.getHardCodedStates(frameworkDistrictInstance.selectedDistrict.id);
          fixture.detectChanges();
          const stateSelect: HTMLSelectElement = frameworkStateInstance.elementRef.nativeElement.querySelector('select');
            stateSelect.selectedIndex = 0;
            stateSelect.dispatchEvent(new Event('change'));
            fixture.detectChanges();
        }

        if(accessLevelInstance.length > 0 && countryInstance.length > 0 && districtInstance.length > 0 &&
          stateInstance.length > 0 && accessLevelInstance2.length > 0 && countryInstance2.length > 0 &&
          districtInstance2.length > 0 && stateInstance2.length > 0){
              let btnNextStep2 = fixture.debugElement.query(By.css('.menu-btns.step2 .btn.btn-primary'));
              btnNextStep2.nativeElement.click();
              fixture.detectChanges();
    
              resolve('finished');
        }
      });
      
      const memberNameInstance: any = component.manageMembersComponent.agGrid.api.getCellRendererInstances({ columns: ['memberName'], rowNodes: [node0] });
      const frameworkMemberNameInstance: MemberNameSelectComponent = memberNameInstance[0].getFrameworkComponentInstance();
      frameworkMemberNameInstance.memberNames = memberNameTypeService.getHardCodedMemberNames();
      fixture.detectChanges();
      const memberNameSelect: HTMLSelectElement = frameworkMemberNameInstance.elementRef.nativeElement.querySelector('select');
        memberNameSelect.selectedIndex = 0;
        memberNameSelect.dispatchEvent(new Event('change'));
        fixture.detectChanges();

      const memberNameInstance2: any = component.manageMembersComponent.agGrid.api.getCellRendererInstances({ columns: ['memberName'], rowNodes: [node1] });
      const frameworkMemberNameInstance2: MemberNameSelectComponent = memberNameInstance2[0].getFrameworkComponentInstance();
      frameworkMemberNameInstance2.memberNames = memberNameTypeService.getHardCodedMemberNames();
      fixture.detectChanges();
      const memberNameSelect2: HTMLSelectElement = frameworkMemberNameInstance2.elementRef.nativeElement.querySelector('select');
        memberNameSelect2.selectedIndex = 0;
        memberNameSelect2.dispatchEvent(new Event('change'));
        fixture.detectChanges();

      component.manageMembersComponent.agGrid.api.dispatchEvent(new Event('selectionChanged'));
    });
  };

  it('should let you pass to step 3', async (done: DoneFn) => {
    await validateStep1();

    window.setTimeout(async () => {
      await validateStep2();

      expect(component.canExitAgGridMembers).toBe(true);
      done();

    }, 1000);
    
  });

  it('Once in step 3 should have more than 1 element in the transfer component', async (done: DoneFn) => {
    await validateStep1();

    window.setTimeout(async () => {
      await validateStep2();

      expect(component.governanceComponent.upsMultiSelect.list.length).toBeGreaterThan(0);
      done();

    }, 1000);
  });
  
});
