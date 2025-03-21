import { Routes } from '@angular/router';
import { CampaingListComponent } from './components/campaing-list/campaing-list.component';
import { CampaingFormComponent } from './components/campaing-form/campaing-form.component';
import { CampaingDetailComponent } from './components/campaing-detail/campaing-detail.component';

export const routes: Routes = [
  { path: '', component: CampaingListComponent },
  { path: 'list', component: CampaingListComponent },
  { path: 'form', component: CampaingFormComponent },
  { path: 'campaign/:id', component: CampaingDetailComponent },
];
