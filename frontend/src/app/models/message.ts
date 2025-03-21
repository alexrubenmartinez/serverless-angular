export interface Message {
  id: number;
  campaignId: number;
  phone: string;
  text: string;
  shippingStatus: number;
  processDate: Date;
  processHour: number;
}

export enum ShippingStatus {
  Pendiente = 1,
  Enviado = 2,
  Error = 3,
}
