export interface Articles {
  r_status: boolean
  r_data: data[]
  r_code: number
  r_message: string
}

export interface data {
  id: string
  menu_id: string
  en_title: string
  title: string
  url: string
  status: string
  meta_properties: any
  id_article: string
  title_url: string
  title_article: string
  image: string
  image_thumbnail: string
  publish_date: string
  content: string
  viewed: string
}
