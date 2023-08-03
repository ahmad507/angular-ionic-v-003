import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take, tap } from 'rxjs';
import apiConfig from 'src/config/apiConfig';
import { Banner } from 'src/app/interfaces/global/banner';
import { MediaPartner } from 'src/app/interfaces/global/media-partner';
import { Articles } from 'src/app/interfaces/global/articles';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  headers = new HttpHeaders({ 'asri-api-key': apiConfig.apiKey.asri_api_key });
  endPointMedia = '/API_STAGE_1/v01/general/artikel/getAllMedia';
  endPointArticles = '/API_STAGE_1/v01/general/artikel';

  // Get Banner Data
  getBanner(options: any): Observable<Banner> {
    return this.http
      .get<Banner>(this.endPointMedia, {
        headers: this.headers,
        params: options,
      })
      .pipe(
        take(1),
        tap((res) => res.r_data)
      );
  }

  //  Get Data Media Partner
  getPartnerMedia(options: any): Observable<MediaPartner> {
    return this.http
      .get<MediaPartner>(this.endPointMedia, {
        headers: this.headers,
        params: options,
      })
      .pipe(
        take(1),
        tap((res) => res.r_data)
      );
  }

  // Get Data Articles
  getDataArticles(options: any): Observable<Articles> {
    console.log(options);
    return this.http
      .get<Articles>(this.endPointArticles, {
        headers: this.headers,
        params: options,
      })
      .pipe(
        take(1),
        tap((res) => res.r_data)
      );
  }

  constructor(private http: HttpClient) {}
}
