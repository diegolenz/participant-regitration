import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParticipantSearchComponent } from './participant-search/participant-search.component';
import { ParticipantManagerComponent } from './participant-manager/participant-manager.component';

export const participantRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'search', pathMatch: 'full' },
      { path: 'search', component: ParticipantSearchComponent },
      { path: 'manager', component: ParticipantManagerComponent }
    ]
  },

]

@NgModule({
  imports: [RouterModule.forChild(participantRoutes)],
  exports: [RouterModule]
})
export class ParticipantRoutingModule { }
