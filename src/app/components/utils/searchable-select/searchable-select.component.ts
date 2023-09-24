import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {IonicModule, ModalController} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {CarInsuranceState} from "../../../pages/kendaraan/store-kendaraan/kendaraan.state";
import {updateKendaraanData} from "../../../pages/kendaraan/store-kendaraan/kendaraan.actions";
import {Store} from "@ngrx/store";

@Component({
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ],
  selector: 'app-searchable-select',
  templateUrl: './searchable-select.component.html',
  styleUrls: ['./searchable-select.component.scss'],
})
export class SearchableSelectComponent  implements OnChanges {
  @Input() modal_id: string = '';
  @Input() modal_title: string = '';

  @Output() tipeNasabahSelected = new EventEmitter<string>(); // Event emitter untuk tipe nasabah
  @Output() tipePenggunaSelected = new EventEmitter<string>(); // Event emitter untuk tipe pengguna
  @Output() tipeKendaraanSelected = new EventEmitter<string>(); // Event emitter untuk tipe pengguna
  @Output() tahunKendaraanSelected = new EventEmitter<string>(); // Event emitter untuk tahun pengguna

  listTahun: any = [];
  listNasabah: any = [];
  listPenggunaan: any = [];
  listTipeKendaraan: any = [];
  listTahunKendaraan: any = [];

  TIPE_NASABAH_SELECTED: string = '';
  PENGGUNAAN_KENDARAAN_SELECTED: string = '';
  TIPE_KENDARAAN_SELECTED: string = '';
  TAHUN_KENDARAAN_SELECTED: string = '';

  constructor(
    private modalController : ModalController,
    private store : Store
  ) {  }

  dismissModal() {
    this.modalController.dismiss(null, 'cancel');
  }


  initialData(){
    console.log(this.modal_id);
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    switch (this.modal_id) {
      case 'open-nasabah':
        this.callApiForNasabah();
        break;
      case 'open-penggunaan':
        this.callApiForPenggunaan();
        break;
      case 'open-tipe-kendaraan':
        this.callApiForTipeKendaraan();
        break;
      case 'open-tahun-kendaraan':
        this.callApiForTahunKendaraan();
        break;
      case 'open-merek-model-kendaraan':
        this.callApiForMerekModelKendaraan();
        break;
      case 'open-kode-plat-kendaraan':
        this.callApiForKodePlatKendaraan();
        break;
      default:
        break;
    }
  }

  public getTahunKendaraan(){
  }

  ionViewWillEnter() {
  }


  private callApiForNasabah() {
    const tipeNasabah = [
      {
        id: '1',
        text: 'Perorangan',
        checked: false,
      },
      {
        id: '2',
        text: 'Perusahaan',
        checked: false,
      },
    ];
    this.listNasabah = tipeNasabah;
  }

  private callApiForPenggunaan() {
    // console.log('DATA UNTUK', this.modal_id);
    const tipePengguna = [
      {
        id: 'P',
        text: 'Pribadi / Dinas (Non-Komersil)',
        checked: false,
      },
      {
        id: 'S',
        text: 'Disewakan (Komersil)',
        checked: false,
      },
    ];
    this.listPenggunaan = tipePengguna;
  }

  private callApiForTahunKendaraan() {
    let dateNow = new Date();
    let yearNow = dateNow.getFullYear();
    let arrData = [];
    for(var i = yearNow; i >= (yearNow - 15); i--){
      arrData.push({id:i, text:i, checked:false});
    }
    this.listTahunKendaraan = arrData;
  }

  private callApiForTipeKendaraan() {
    const jenisKendaraan = [
      {
        id: 'A',
        text: 'Sedan, Minibus, Jeep, City Car',
        checked: false,
      },
      {
        id: 'B',
        text: 'Bus',
        checked: false,
      },
      {
        id: 'D',
        text: 'Sepeda Motor',
        checked: false,
      },
    ];
    this.listTipeKendaraan = jenisKendaraan;
  }

  private callApiForMerekModelKendaraan() {
  }

  private callApiForKodePlatKendaraan() {
  }

  updateKendaraanPayload(property: string, value: any) {
    const newData: Partial<CarInsuranceState> = {
      accesories_detail: [],
      accesories_si: 0,
      addrisk: [],
      addrisk_all: [],
      addsi: [],
      addsi_all: [],
      ctype: "",
      license: "",
      mainrisk: "",
      mainsi: 0,
      reg_no: "",
      sortby: "",
      total_passenger: "",
      vcode: "",
      vfunction: "",
      vtype: "",
      vyear: 0,
      year_period: "",
      [property]: value };

    console.log('DATA PAYLOAD TO CALL API MEREK MODEL', newData);
    this.store.dispatch(updateKendaraanData({ newData }));
  }

  handleTipeNasabagChange(selectedItem:any) {
    this.listNasabah.forEach((item:any) => {
      if (item.id !== selectedItem.id) {
        item.checked = false;
        this.dismissModal();
      }
    });
    this.TIPE_NASABAH_SELECTED = selectedItem.id;
    this.tipeNasabahSelected.emit(this.TIPE_NASABAH_SELECTED);
    this.updateKendaraanPayload('ctype', this.TIPE_NASABAH_SELECTED);
    // console.log('TIPE NASABAH', this.TIPE_NASABAH_SELECTED);
  }

  handlePenggunaanKendaraanChange(selectedItem:any) {
    this.listPenggunaan.forEach((item:any) => {
      if (item.id !== selectedItem.id) {
        item.checked = false;
        this.dismissModal();
      }
    });
    this.PENGGUNAAN_KENDARAAN_SELECTED = selectedItem.id;
    this.tipePenggunaSelected.emit(this.PENGGUNAAN_KENDARAAN_SELECTED);
    this.updateKendaraanPayload('vfunction', this.PENGGUNAAN_KENDARAAN_SELECTED);
    // console.log('PENGGUNAAN KENDARAAN', this.PENGGUNAAN_KENDARAAN_SELECTED);
  }

  handleTipeKendaraanChange(selectedItem:any) {
    this.listTipeKendaraan.forEach((item:any) => {
      if (item.id !== selectedItem.id) {
        item.checked = false;
        this.dismissModal();
      }
    });
    this.TIPE_KENDARAAN_SELECTED = selectedItem.id;
    this.tipeKendaraanSelected.emit(this.TIPE_KENDARAAN_SELECTED);
    this.updateKendaraanPayload('vtype', this.TIPE_KENDARAAN_SELECTED);
    // console.log('TIPE KENDARAAN', this.TIPE_KENDARAAN_SELECTED);
  }

  handleTahunProduksiChange(selectedItem:any) {
    this.listTahunKendaraan.forEach((item:any) => {
      if (item.id !== selectedItem.id) {
        item.checked = false;
        this.dismissModal();
      }
    });
    this.TAHUN_KENDARAAN_SELECTED = selectedItem.id;
    this.tahunKendaraanSelected.emit(this.TAHUN_KENDARAAN_SELECTED);
    this.updateKendaraanPayload('vyear', this.TAHUN_KENDARAAN_SELECTED);
    // console.log('TAHUN KENDARAAN', this.TAHUN_KENDARAAN_SELECTED);
  }



  private getMerekModelKendaraan() {
    if(this.TIPE_KENDARAAN_SELECTED === '' && this.TAHUN_KENDARAAN_SELECTED === ''){
      console.log('NO CALL API');
      console.log({
        tipe: this.TIPE_KENDARAAN_SELECTED,
        tahun: this.TAHUN_KENDARAAN_SELECTED
      })
    }else {
      console.log('CALL API');
      console.log({
        tipe: this.TIPE_KENDARAAN_SELECTED,
        tahun: this.TAHUN_KENDARAAN_SELECTED
      })
    }
  }
}
