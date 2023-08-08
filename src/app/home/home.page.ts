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
import { GlobalService } from '../services/utils/global.service';
import { Banner } from '../interfaces/global/banner';
import { MediaPartner } from '../interfaces/global/media-partner';
import { Articles } from '../interfaces/global/articles';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

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
    const st = this.swiperRef?.nativeElement.swiper.activeIndex;
    this.activeSlide = st;
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
      this.saveImage(image);
    } else {
      //  console.log('Failed Select Image From Gallery');
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
        //  console.log('ERROR : Camera Closed');
      }
    });
    if (image) {
      this.saveImage(image);
    }
  }

  // save image
  async saveImage(photo: Photo) {
    const base64Data = await this.readAsBase64(photo);
    //  console.log('BASE64', base64Data);

    const fileName = new Date().getTime() + '.jpg';
    await Filesystem.writeFile({
      directory: Directory.Data,
      path: `${IMAGE_DIR}/${fileName}`,
      data: base64Data,
    });
    //  console.log('SAVED :', savedFile);
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
          //  console.log('RESULT', result);
          this.loadImageFilesData(result.files);
        },
        async (err) => {
          //  console.log('ERROR LOAD FILE', err);
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
    //  console.log(file);
  }

  async deleteImage(file: LocalFile) {
    //  console.log('IMAGE DELETE :', file);
    await Filesystem.deleteFile({
      directory: Directory.Data,
      path: file.path,
    });
    this.loadImageFiles();
  }

  async deletePdf(file: LocalFile) {
    //  console.log('FILE DELETE :', file);
    await Filesystem.deleteFile({
      directory: Directory.Data,
      path: file.path,
    });
    this.loadPdfFiles();
  }

  async openFile(file: LocalFile) {
    //  console.log('TAP OPEN FILE:', file);
    const filePath = await Filesystem.getUri({
      directory: Directory.Data,
      path: file.path,
    });
    //  console.log('FILE PATH', filePath);
    this.fileOpener
      .showOpenWithDialog(filePath.uri, 'application/pdf')
      .then(() => console.log('File is opened'))
      .catch(async (e) => {
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
    loading.present();
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
              loading.present();
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
          //  console.log(result);
        },
        async (err) => {
          //  console.log('ERROR LOAD FILE PDF', err);
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
    //  console.log('File Names', fileNames);
    for (let f of fileNames) {
      const filePath = `${PDF_DIR}/${f.name}`;
      const readFile = await Filesystem.readFile({
        directory: Directory.Data,
        path: filePath,
      });

      //  console.log("PDF FILE : ", readFile);
      //  console.log('PDF FILE : ', filePath);
      this.documents.push({
        name: f.name,
        path: filePath,
        data: `data:application/pdf;base64,${readFile.data}`,
      });
    }
  }

  constructor(
    private platform: Platform,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private http: HttpClient,
    private fileOpener: FileOpener,
    private globalService: GlobalService,
    private store: Store
  ) {}

  async ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loadImageFiles();
    this.loadPdfFiles();
    this.activeSlide = 0;

    this.globalService
      .getBanner({ category: 'slider' })
      .subscribe((data: Banner) => {
        this.bannerArray = data.r_data;
        console.log('DATA BANNER IMAGE', this.bannerArray);
      });

    this.globalService
      .getPartnerMedia({ category: 'partner' })
      .subscribe((data: MediaPartner) => {
        this.mediaPartnerArray = data.r_data;
        console.log('DATA PARTNER', this.mediaPartnerArray);
      });

    this.globalService
      .getDataArticles({ limit: 'unlimited', category: 9 })
      .subscribe((data: Articles) => {
        this.articlesArray = data.r_data;
        console.log('DATA ARTICLES', this.articlesArray);
      });

    this.globalService
      .getDataArticles({ limit: 5 })
      .subscribe((data: Articles) => {
        this.articlesNewArray = data.r_data;
        console.log('DATA NEW ARTICLES', this.articlesNewArray);
      });
  }
}
