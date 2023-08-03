export interface MediaPartner {
  r_status: boolean;
  r_data: data[];
  r_code: number;
  r_message: string;
}

export interface data {
  code: string;
  title: string;
  image_en?: string;
  image: string;
  description_en?: string;
  description: string;
  publish_date: string;
  drop_date: string;
  category: string;
}
