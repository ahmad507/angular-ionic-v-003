export interface CarInsuranceState {
  ctype: string;
  license: string;
  license_region: string;
  vfunction: string;
  vtype: string;
  vyear: number;
  vcode: string;
  vmodel: string;
  vbrand: string;
  year_period: string;
  mainsi: number;
  accesories_si: number;
  accesories_detail: any[];
  mainrisk: string;
  reg_no: string;
  addrisk: any[];
  sortby: string;
  total_passenger: string;
  addrisk_all: string[];
  addsi_all: any[];
  addsi: any[];
}

export interface MvInfoDetail {
  mainsi: string;
  vcode: string;
  unit_name: string;
  merek: string;
  unit_price_max: number;
  unit_price: string;
  unit_price_min: number;
}
