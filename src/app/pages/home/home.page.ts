import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { GlobalService } from '@src/app/services/utils/global.service';
import { Banner } from '@src/app/interfaces/global/banner';
import { MediaPartner } from '@src/app/interfaces/global/media-partner';
import { Articles } from '@src/app/interfaces/global/articles';

const IMAGE_DIR = 'stored-images';
const PDF_DIR = 'stored-pdf';

interface LocalFile {
  name: string;
  path: string;
  data: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('swiper') swiperRef: ElementRef | undefined;
  activeSlide: number = 0;
  btnBackground: string = 'light';
  lightTheme: boolean = true;
  images: LocalFile[] = [];
  pdfUrl: string =
    'https://www.asuransiku.id/produk-asuransi/mv-agen/beli_asuransi/dokumen/4145/525635F3FE485A5ED55E5333BF421694';
  pdfName: string = '';
  downloadProgress: number = 0;
  documents: LocalFile[] = [];
  toastIsOpen: boolean = false;
  bannerArray: Banner['r_data'] = [];
  mediaPartnerArray: MediaPartner['r_data'] = [];
  articlesArray: Articles['r_data'] = [];
  articlesNewArray: Articles['r_data'] = [];
  articlesNewArray2: Articles['r_data'] = [];
  optionsSlideBanner = {
    autoPlay: true,
  };

  toggleTheme() {
    this.lightTheme = !this.lightTheme;
    if (!this.lightTheme) {
      document.body.setAttribute('color-theme', 'dark');
      this.btnBackground = 'dark';
    } else {
      document.body.setAttribute('color-theme', 'light');
      this.btnBackground = 'light';
    }
  }

  onSlideChange() {
    this.activeSlide = this.swiperRef?.nativeElement.swiper.activeIndex;
  }

  // select image from local gallery
  async selectImageGallery() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
    });
    if (image) {
      await this.saveImage(image);
    } else {
    }
  }

  // select image from camera
  async selectImageCamera() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    }).catch((Error) => {
      if (Error) {
      }
    });
    if (image) {
      await this.saveImage(image);
    }
  }

  // save image
  async saveImage(photo: Photo) {
    const base64Data = await this.readAsBase64(photo);

    const fileName = new Date().getTime() + '.jpg';
    await Filesystem.writeFile({
      directory: Directory.Data,
      path: `${IMAGE_DIR}/${fileName}`,
      data: base64Data,
    });
    this.loadImageFiles();
    this.loadPdfFiles();
  }

  async loadImageFiles() {
    // throw new Error('Method not implemented.');
    this.images = [];
    const loading = await this.loadingCtrl.create({
      message: 'Loading Images...',
    });

    Filesystem.readdir({
      directory: Directory.Data,
      path: IMAGE_DIR,
    })
      .then(
        (result) => {
          this.loadImageFilesData(result.files);
        },
        async () => {
          await Filesystem.mkdir({
            directory: Directory.Data,
            path: IMAGE_DIR,
          });
        }
      )
      .finally(() => {
        loading.dismiss;
      });
  }

  async loadImageFilesData(fileNames: any[]) {
    for (let f of fileNames) {
      const filePath = `${IMAGE_DIR}/${f.name}`;
      const readFile = await Filesystem.readFile({
        directory: Directory.Data,
        path: filePath,
      });

      this.images.push({
        name: f.name,
        path: filePath,
        data: `data:image/jpg;base64,${readFile.data}`,
      });
    }
  }

  uploadImage(file: any) {
    console.log(file);
  }

  async deleteImage(file: LocalFile) {
    await Filesystem.deleteFile({
      directory: Directory.Data,
      path: file.path,
    });
    this.loadImageFiles();
  }

  async deletePdf(file: LocalFile) {
    await Filesystem.deleteFile({
      directory: Directory.Data,
      path: file.path,
    });
    this.loadPdfFiles();
  }

  async openFile(file: LocalFile) {
    const filePath = await Filesystem.getUri({
      directory: Directory.Data,
      path: file.path,
    });
    this.fileOpener
      .showOpenWithDialog(filePath.uri, 'application/pdf')
      .catch(async () => {
        const loading = await this.loadingCtrl.create({
          duration: 3000,
          message: 'Failed Open File...',
          spinner: 'circles',
        });
        loading.present();
      });
  }

  async readAsBase64(photo: Photo) {
    if (this.platform.is('hybrid')) {
      // Read the file into base64 format
      const file = await Filesystem.readFile({
        path: photo.path!,
      });
      return file.data;
    } else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath!);
      const blob = await response.blob();
      return (await this.convertBlobToBase64(blob)) as string;
    }
  }

  convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });

  async toast(param: any) {
    const toast = await this.toastCtrl.create({
      message: param.message,
      color: param.color,
      position: 'bottom',
      duration: 2000,
    });
    await toast.present();
  }

  async downloadPdfFile(pdfUrl: string) {
    const loading = await this.loadingCtrl.create({
      duration: 3000,
      message: 'Downloading...',
      spinner: 'circles',
    });
    await loading.present();
    this.http
      .get(pdfUrl, {
        responseType: 'blob',
        reportProgress: true,
        observe: 'events',
      })
      .subscribe(async (event) => {
        if (event.type === HttpEventType.DownloadProgress) {
          this.toastIsOpen = false;
        } else if (event.type === HttpEventType.Response) {
          const body = event.body;
          if (body !== null) {
            const base64 = (await this.convertBlobToBase64(body)) as string;
            if (base64) {
              this.toastIsOpen = true;
              this.savePdf(base64);
            } else {
              const loading = await this.loadingCtrl.create({
                duration: 1500,
                message: 'Failed Download File !',
                spinner: 'circles',
              });
              await loading.present();
            }
          }
        }
      });
  }

  setPdfFileName(url: string) {
    return (this.pdfName = url.substring(url.lastIndexOf('/') + 1));
  }

  async savePdf(base64: string) {
    // this.setPdfFileName(this.pdfUrl);
    const pdfName = this.pdfUrl.substring(this.pdfUrl.lastIndexOf('/') + 1);
    const name = new Date().getTime() + 'INSURANCE' + pdfName + '.pdf';
    await Filesystem.writeFile({
      directory: Directory.Data,
      path: `${PDF_DIR}/${name}`,
      data: base64,
    });
    this.loadImageFiles();
    this.loadPdfFiles();
  }

  async loadPdfFiles() {
    this.documents = [];
    const loading = await this.loadingCtrl.create({
      message: 'Loading Files...',
    });

    Filesystem.readdir({
      directory: Directory.Data,
      path: PDF_DIR,
    })
      .then(
        (result) => {
          this.loadPdfFilesData(result.files);
        },
        async () => {
          await Filesystem.mkdir({
            directory: Directory.Data,
            path: PDF_DIR,
          });
        }
      )
      .finally(() => {
        loading.dismiss;
      });
  }

  async loadPdfFilesData(fileNames: any[]) {
    for (let f of fileNames) {
      const filePath = `${PDF_DIR}/${f.name}`;
      const readFile = await Filesystem.readFile({
        directory: Directory.Data,
        path: filePath,
      });
      this.documents.push({
        name: f.name,
        path: filePath,
        data: `data:application/pdf;base64,${readFile.data}`,
      });
    }
  }

  menuList = [
    { id: 1, icon: 'car_icon', name: 'Kendaraan', route: '/kendaraan' },
    { id: 2, icon: 'home_icon', name: 'Properti', route: '/properti' },
    { id: 3, icon: 'health_icon', name: 'Kesehatan', route: '/kesehatan' },
    { id: 4, icon: 'hearth_icon', name: 'Jiwa', route: '/jiwa' },
    {
      id: 5,
      icon: 'medical_icon',
      name: 'Penyakit Kritis',
      route: '/penyakit-kritis',
    },
    {
      id: 6,
      icon: 'virus_icon',
      name: 'Penyakit Tropis',
      route: '/penyakit-tropis',
    },
    { id: 7, icon: 'travel_icon', name: 'Perjalanan', route: '/perjalanan' },
    { id: 8, icon: 'santunan_icon', name: 'Santunan', route: '/santunan' },
    {
      id: 9,
      icon: 'pet_icon',
      name: 'Hewan Peliharaan',
      route: '/hewan-peliharaan',
    },
    {
      id: 10,
      icon: 'company_icon',
      name: 'Produk Perusahaan',
      route: '/produk-perusahaan',
    },
    {
      id: 11,
      icon: 'micro_icon',
      name: 'Asuransi Mikro',
      route: '/asuransi-mikro',
    },
    { id: 12, icon: 'more', name: 'Lainya', route: '/lainnya' },
  ];

  constructor(
    private platform: Platform,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private http: HttpClient,
    private fileOpener: FileOpener,
    private globalService: GlobalService
  ) {}

  ngAfterViewInit(): void {
    this.activeSlide = 0;
    this.swiperRef?.nativeElement.swiper.autoplay.start();
  }

  ionViewWillEnter() {
    this.activeSlide = 0;
    this.swiperRef?.nativeElement.swiper.autoplay.start();
  }

  async ngOnInit() {
    await this.loadImageFiles();
    await this.loadPdfFiles();
    this.swiperRef?.nativeElement.swiper.autoplay.start();
    this.activeSlide = 0;

    this.globalService
      .getBanner({ category: 'slider' })
      .subscribe((data: Banner) => {
        this.bannerArray = data.r_data;
      });

    this.globalService
      .getPartnerMedia({ category: 'partner' })
      .subscribe((data: MediaPartner) => {
        this.mediaPartnerArray = data.r_data;
      });

    this.globalService
      .getDataArticles({ limit: 'unlimited', category: 9 })
      .subscribe((data: Articles) => {
        this.articlesArray = data.r_data;
      });

    this.globalService
      .getDataArticles({ limit: 5 })
      .subscribe((data: Articles) => {
        this.articlesNewArray = data.r_data;
      });
  }
}
