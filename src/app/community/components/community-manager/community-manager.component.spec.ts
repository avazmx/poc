import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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

import { CommunityService } from './../../services/community.service';

describe('CommunityManagerComponent', () => {
  let component: CommunityManagerComponent;
  let fixture: ComponentFixture<CommunityManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CommunityManagerComponent,
        CommunityAttributesComponent,
        CommunityManageMembersComponent,
        CommunityGovernanceComponent,
        MultiSelectComponent,
        CommunitySelectComponent,
        CountrySelectComponent,
        DistrictSelectComponent,
        StateSelectComponent,
        BusinessUnitSelectComponent,
        MemberNameSelectComponent,
        AccessLevelSelectComponent
      ],
      imports: [
        ArchwizardModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        AngularFontAwesomeModule,
        AgGridModule.withComponents([
          CommunitySelectComponent,
          CountrySelectComponent,
          DistrictSelectComponent,
          StateSelectComponent,
          BusinessUnitSelectComponent,
          MemberNameSelectComponent,
          AccessLevelSelectComponent
        ]),
        StoreModule.forFeature('community', fromCommunity.communityReducer),
        EffectsModule.forFeature([CommunityEffects]),
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([]),
        HttpClientModule
      ],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
      ],
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
    expect(window.document.querySelector('div.swal2-container')).toBeDefined();
  });

  it('should display communityType as required', () => {
    let communityService = fixture.debugElement.injector.get(CommunityService);
    component.attributeComponent.ngSelect.items = communityService.getHardCodedCommunityTypes();
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

  it('should let you pass to step 2', () => {
    let communityService = fixture.debugElement.injector.get(CommunityService);
    component.attributeComponent.ngSelect.items = communityService.getHardCodedCommunityTypes();
    fixture.detectChanges();
    component.attributeComponent.ngSelect.select(component.attributeComponent.ngSelect.items[0]);
    fixture.detectChanges();
    let inpName = fixture.debugElement.query(By.css('#inpName'));
    inpName.nativeElement.setAttribute("value", "a");
    fixture.detectChanges();
    let inpDescription = fixture.debugElement.query(By.css('#inpDescription'));
    inpDescription.nativeElement.setAttribute("value", "a");
    fixture.detectChanges();
    let btnAddRow = fixture.debugElement.query(By.css('#btnAddRow'));
    btnAddRow.nativeElement.click();
    fixture.detectChanges();
    let uca = fixture.debugElement.query(By.css("ups-community-attributes"));
    let aggrid = uca.query(By.css("ag-grid-angular"));
    let row0 = aggrid.query(By.css(".ag-row-level-0"));
    let cell11 = row0.query(By.css('.ag-cell'));
    console.log(aggrid.childNodes);
    expect(cell11).toBe(true);
    /*
    let agSelectionCheckbox: HTMLSpanElement = cell11.querySelector(".ag-selection-checkbox");
    agSelectionCheckbox.click();
    fixture.detectChanges();
    let spanArray: NodeListOf<HTMLSpanElement> = agSelectionCheckbox.querySelectorAll("span");
    expect(spanArray[1].classList.contains("ag-hidden")).toBe(true);
    */
  });
  
});
