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
export interface MvInfo {
  mainsi: string;
  vcode: string;
  unit_name: string;
  merek: string;
}
export interface MvValidator {
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
  mainsi: any;
}
export interface MvRisk {
  risk_number: string;
  risk_code: string;
  main_risk_number: string;
  risk_description_id: string;
  risk_description_en: any;
  risk_long_desc: string;
  risk_long_desc_en: any;
  category: string;
  type: string;
  private_si_flags: string;
}
export interface RESPONSE_RISK {
  r_status: boolean;
  r_data: MvRisk[];
  r_code: number;
  r_message: string;
}
export const initialState: CarInsuranceState = {
  ctype: '',
  license: '',
  license_region: '',
  vfunction: '',
  vtype: '',
  vyear: 0,
  vcode: '',
  vmodel: '',
  vbrand: '',
  year_period: '1',
  mainsi: 0,
  accesories_si: 0,
  accesories_detail: [],
  mainrisk: '',
  reg_no: '',
  addrisk: [],
  sortby: '',
  total_passenger: '',
  addrisk_all: [],
  addsi_all: [],
  addsi: [],
};
export const initialStateMvInfo: MvInfoDetail = {
  mainsi: '',
  vcode: '',
  unit_name: '',
  merek: '',
  unit_price_max: 0,
  unit_price: '',
  unit_price_min: 0,
};
