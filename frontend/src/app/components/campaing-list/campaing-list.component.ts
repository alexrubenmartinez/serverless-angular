import { Component, OnInit } from '@angular/core';
import { Campaign, ProcessStatus } from '../../models/campaign';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { CampaignService } from '../../services/campaign/campaign.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { CampaingFormComponent } from '../campaing-form/campaing-form.component';
import { MessageService } from '../../services/message/message.service';

@Component({
  selector: 'app-campaing-list',
  imports: [ReactiveFormsModule, RouterModule, CampaingFormComponent],
  templateUrl: './campaing-list.component.html',
  styleUrl: './campaing-list.component.css',
})
export class CampaingListComponent implements OnInit {
  campaigns: Campaign[] = [];
  loading = true;
  filterForm: FormGroup;
  processStatusEnum = ProcessStatus;
  displayedColumns: string[] = [
    'Id',
    'Nombre',
    'Mensaje',
    'Estado',
    'Acciones',
  ];
  showModal = false;

  constructor(
    private campaignService: CampaignService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.filterForm = this.formBuilder.group({
      startDate: [''],
      endDate: [''],
    });
  }

  ngOnInit(): void {
    this.loadAllCampaigns();
  }

  loadAllCampaigns(): void {
    this.loading = true;
    this.campaignService.listAllCampaigns().subscribe({
      next: (data: Campaign[]) => {
        this.campaigns = data;
        this.loading = false;
      },
      error: (err: any) => {
        console.log(err);
        this.loading = false;
      },
    });
  }

  applyFilter(): void {
    const filters = this.filterForm.value;
    if (!filters.startDate && !filters.endDate) {
      this.snackBar.open(
        'Seleccione al menos una fecha para filtrar',
        'Cerrar',
        { duration: 3000 }
      );
      return;
    }
    this.loading = true;
    this.campaignService
      .filterCampaigns(filters.startDate, filters.endDate)
      .subscribe({
        next: (data: Campaign[]) => {
          this.campaigns = data;
          this.loading = false;
        },
        error: (err: any) => {
          console.log(err);
          this.loading = false;
        },
      });
  }

  resetFilter(): void {
    this.filterForm.reset();
    this.loadAllCampaigns();
  }

  sendMessages(campaignId: number, phoneList: string, text: string): void {
    this.messageService
      .launchMessagesByCampaignId(campaignId, phoneList, text)
      .subscribe({
        next: () => {
          this.snackBar.open('Inicio de envío de mensajes', 'Cerrar', {
            duration: 3000,
          });
          this.loadAllCampaigns();
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }

  createCampaign(): void {
    this.snackBar.open('Campaña creada exitosamente', 'Cerrar', {
      duration: 3000,
    });
    this.loadAllCampaigns();
  }

  getStatusText(status: number): string {
    switch (status) {
      case ProcessStatus.Pendiente:
        return 'Pendiente';
      case ProcessStatus.EnProceso:
        return 'En proceso';
      case ProcessStatus.Finalizado:
        return 'Finalizado';
      default:
        return 'Unknown';
    }
  }

  validateCampaignStatus(campaignId: number): void {
    this.messageService.validateCampaignStatus(campaignId).subscribe({
      next: () => {
        this.snackBar.open(
          'Estado de campaña validado correctamente',
          'Cerrar',
          { duration: 3000 }
        );
        this.loadAllCampaigns();
      },
      error: (err: any) => {
        console.log(err);
        this.snackBar.open(
          'Error al validar el estado de la campaña',
          'Cerrar',
          { duration: 3000 }
        );
      },
    });
  }
}
