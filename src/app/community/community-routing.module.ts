import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommunityManagerComponent } from './components/community-manager/community-manager.component';
import { CommunitiesComponent } from './components/communities/communities.component';

const routes: Routes = [
  { path: 'create', component: CommunityManagerComponent },
  { path: '', component: CommunitiesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CommunityRoutingModule { }
