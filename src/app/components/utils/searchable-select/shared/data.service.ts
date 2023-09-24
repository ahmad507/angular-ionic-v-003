import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "@src/environments/environment";
import {map, Observable} from "rxjs";

export interface ResponseData {
  r_status: boolean
  r_data: DataPlat[]
  r_code: number
  r_message: string
}

export interface DataPlat {
  license_code: string
  region_code: string
  license_description: string
}

@Injectable({
  providedIn: 'root'
})

export class DataServiceKendaraan{
  headers = new HttpHeaders({'asri-api-key':environment.asri_api_key});
  endpoint = '/API_STAGE_1/v01/mv/license/listLicense';

  constructor(private httpClient: HttpClient) { }

  public getListLicense(){
    return this.httpClient.get<ResponseData>(this.endpoint,{headers: this.headers});
  }


}
