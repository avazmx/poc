import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommunityManagerComponent } from './components/community-manager/community-manager.component';
import { CommunitySavedComponent } from './components/community-saved/community-saved.component';

const routes: Routes = [
  { path: 'create', component: CommunityManagerComponent },
  { path: 'communities', component: CommunitySavedComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CommunityRoutingModule { }
