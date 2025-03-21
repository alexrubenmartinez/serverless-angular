import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../../models/message';
import { environment } from '../../../environment/environment';
import { Campaign } from '../../models/campaign';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private apiUrl = `${environment.apiUrl}/api/messages/`;

  constructor(private http: HttpClient) {}

  launchMessagesByCampaignId(
    campaignId: number,
    phoneList: string,
    text: string
  ): Observable<any> {
    const body = { campaignId, phoneList, text };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let url = this.apiUrl;
    url += `createMessages`;
    return this.http.post<any>(url, body, { headers });
  }
  getMessages(
    campaignId: number
  ): Observable<{ campaignDetails: Campaign; messages: Message[] }> {
    let url = this.apiUrl;
    url += `list/${campaignId}`;
    return this.http.get<{ campaignDetails: Campaign; messages: Message[] }>(
      url
    );
  }

  validateCampaignStatus(campaignId: number): Observable<any> {
    let url = this.apiUrl;
    url += `updateCampaignStatus/${campaignId}`;
    return this.http.put<any>(url, {});
  }
}
