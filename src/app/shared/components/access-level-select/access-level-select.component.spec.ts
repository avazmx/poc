import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessLevelSelectComponent } from './access-level-select.component';
import { CommunityModule } from 'src/app/community/community.module';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducers } from 'src/app/store/reducers/app.reducers';

describe('AccessLevelSelectComponent', () => {
  let component: AccessLevelSelectComponent;
  let fixture: ComponentFixture<AccessLevelSelectComponent>;

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
    fixture = TestBed.createComponent(AccessLevelSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
