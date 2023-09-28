import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "@src/environments/environment";

export interface ResponseDataPlat {
  r_status: boolean;
  r_data: DataPlat[];
  r_code: number;
  r_message: string;
}

export interface DataPlat {
  license_code: string;
  region_code: string;
  license_description: string;
}

export interface ResponseDataMerek {
  r_status: boolean;
  r_data: DataMerek[];
  r_code: number;
  r_message: string;
}

export interface DataMerek {
  merk_code: string;
  name: string;
  type: string;
}

export interface ResponseDataMerekKendaraan {
  r_status: boolean;
  r_data: DataMerekKendaraan[];
  r_code: number;
  r_message: string;
}

export interface DataMerekKendaraan {
  merk: string;
  model: MerekModel[];
}

export interface MerekModel {
  model_number: string;
  merk_code: string;
  unit_name: string;
  unit_year: string;
  unit_price: string;
  unit_type: string;
}

@Injectable({
  providedIn: 'root'
})

export class DataServiceKendaraan{
  headers = new HttpHeaders({'asri-api-key':environment.asri_api_key});
  endpoint = '/API_STAGE_1/v01/mv/license/listLicense';
  endpoint_2 = '/API_STAGE_1/v01/mv/merk/listByVehicleType';
  endpoint_3 = '/API_STAGE_1/v01/mv/model_type/listModelTypeByMerk';


  constructor(private httpClient: HttpClient) { }

  public getListLicense(){
    return this.httpClient.get<ResponseDataPlat>(this.endpoint,{headers: this.headers});
  }

  public getMerekModelKendaraan(params: any){
    return this.httpClient.get<ResponseDataMerek>(this.endpoint_2,{headers: this.headers, params:params});
  }

  public getMerekModelKendaraanV2(params: any){
    return this.httpClient.get<ResponseDataMerekKendaraan>(this.endpoint_3,{headers: this.headers, params:params});
  }


}
