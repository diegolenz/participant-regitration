import { provideRouter } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticipantManagerComponent } from './participant-manager/participant-manager.component';
import { ParticipantSearchComponent } from './participant-search/participant-search.component';
import { ParticipantRoutingModule, participantRoutes } from './participant-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import { MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox'
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { ParticipantService } from '../services/participant-service';
import {MatTabsModule} from '@angular/material/tabs'
/* import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; */

@NgModule({
  declarations: [
    ParticipantManagerComponent,
    ParticipantSearchComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule, 
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule, 
    MatCardModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatOptionModule,
    MatSelectModule,
    HttpClientModule,
    MatTabsModule
  ],
  providers: [provideRouter(participantRoutes), ParticipantService],
})
export class ParticipantModule { }
