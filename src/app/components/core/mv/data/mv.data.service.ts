import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "@src/environments/environment";
import {
  ResponseDataMerek,
  ResponseDataMerekKendaraan,
  ResponseDataPlat
} from "@src/app/components/core/mv/data/mv.data.interface";

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
