import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Campaign } from '../../models/campaign';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  private apiUrl = `${environment.apiUrl}/api/campaigns`;

  constructor(private http: HttpClient) {}

  filterCampaigns(startDate: string, endDate: string): Observable<Campaign[]> {
    let url = `${this.apiUrl}/listBeetweenDates`;
    if (startDate || endDate) {
      url += '?';
      if (startDate) {
        url += `startDate=${startDate}`;
      }
      if (endDate) {
        url += `&endDate=${endDate}`;
      }
    }
    return this.http.get<Campaign[]>(url);
  }
  /*
  createCampaign(campaign: Campaign): Observable<Campaign> {
    return this.http.post<Campaign>(this.apiUrl, campaign);
  } */

  listAllCampaigns(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(`${this.apiUrl}/listAll`);
  }

  createCampaign(campaign: Omit<Campaign, 'id'>): Observable<Campaign> {
    return this.http.post<Campaign>(`${this.apiUrl}/create`, campaign);
  }

  getCampaignById(campaignId: number): Observable<Campaign> {
    return this.http.get<Campaign>(`${this.apiUrl}/get/${campaignId}`);
  }
}
