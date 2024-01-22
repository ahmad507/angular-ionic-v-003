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
