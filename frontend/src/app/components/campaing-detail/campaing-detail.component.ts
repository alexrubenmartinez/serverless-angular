import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message, ShippingStatus } from '../../models/message';
import { MessageService } from '../../services/message/message.service';
import { Campaign } from '../../models/campaign';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-campaing-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './campaing-detail.component.html',
  styleUrl: './campaing-detail.component.css',
})
export class CampaingDetailComponent implements OnInit {
  campaignId!: number;
  messages: Message[] = [];
  loading = true;
  campaignDetail: Campaign | undefined = undefined;
  displayedColumns: string[] = ['Id', 'Número celular', 'Mensaje', 'Estado'];

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.campaignId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadAllMessages();
  }

  loadAllMessages(): void {
    this.loading = true;
    this.messageService.getMessages(this.campaignId).subscribe({
      next: (data: { campaignDetails: Campaign; messages: Message[] }) => {
        this.messages = data.messages;
        this.campaignDetail = data.campaignDetails;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error fetching messages and campaign detail:', err);
        this.loading = false;
      },
    });
  }

  getStatusText(status: number): string {
    switch (status) {
      case ShippingStatus.Pendiente:
        return 'Pendiente';
      case ShippingStatus.Enviado:
        return 'Enviado';
      case ShippingStatus.Error:
        return 'Error';
      default:
        return 'Unknown';
    }
  }

  validateCampaignStatus(): void {
    if (this.campaignDetail) {
      this.messageService
        .validateCampaignStatus(this.campaignDetail.id)
        .subscribe({
          next: () => {
            this.snackBar.open(
              'Estado de campaña validado correctamente',
              'Cerrar',
              { duration: 3000 }
            );
            this.loadAllMessages();
          },
          error: (err: any) => {
            console.error('Error validating campaign status:', err);
            this.snackBar.open(
              'Error al validar el estado de la campaña',
              'Cerrar',
              { duration: 3000 }
            );
          },
        });
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
