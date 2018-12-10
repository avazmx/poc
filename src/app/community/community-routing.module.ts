import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommunityManagerComponent } from './components/community-manager/community-manager.component';

const routes: Routes = [
  { path: 'create', component: CommunityManagerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CommunityRoutingModule { }
