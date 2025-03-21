export interface Campaign {
  id: number;
  userId: number;
  name: string;
  processDate: string;
  processHour: string;
  processStatus: ProcessStatus;
  phoneList: string;
  messageText: string;
}

export enum ProcessStatus {
  Pendiente = 1,
  EnProceso = 2,
  Finalizado = 3,
}
