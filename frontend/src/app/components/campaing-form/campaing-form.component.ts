import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CampaignService } from '../../services/campaign/campaign.service';
import { Campaign, ProcessStatus } from '../../models/campaign';

@Component({
  selector: 'app-campaing-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './campaing-form.component.html',
  styleUrl: './campaing-form.component.css',
})
export class CampaingFormComponent {
  private campaignService = inject(CampaignService);
  @ViewChild('filterModal') modal!: ElementRef<HTMLDialogElement>;

  openModal() {
    if (this.modal?.nativeElement instanceof HTMLDialogElement) {
      this.modal.nativeElement.showModal();
    } else {
      console.error('❌ Error: this.modal.nativeElement no es un <dialog>');
    }
  }

  closeModal() {
    if (this.modal?.nativeElement instanceof HTMLDialogElement) {
      this.modal.nativeElement.close();
    } else {
      console.error('❌ Error: this.modal.nativeElement no es un <dialog>');
    }
  }

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    phoneList: new FormControl('', Validators.required),
    messageText: new FormControl('', Validators.required),
  });

  onSubmit() {
    if (this.form.invalid) {
      console.log('Formulario inválido');
      return;
    }

    const campaignPayload: Omit<Campaign, 'id'> = {
      userId: 1,
      name: this.form.value.name!,
      processDate: new Date().toISOString().split('T')[0],
      processHour: new Date().toLocaleTimeString('es-ES', { hour12: false }),
      processStatus: ProcessStatus.Pendiente,
      phoneList: this.form.value.phoneList!,
      messageText: this.form.value.messageText!,
    };

    this.campaignService.createCampaign(campaignPayload).subscribe({
      next: (response) => {
        console.log('✅ Campaña creada:', response);
        this.form.reset();
        this.closeModal();
        window.location.reload();
      },
      error: (error) => console.error('❌ Error al crear campaña:', error),
    });
  }
}
