import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MerekModelKendaraanComponent } from './merek-model-kendaraan.component';

describe('MerekModelKendaraanComponent', () => {
  let component: MerekModelKendaraanComponent;
  let fixture: ComponentFixture<MerekModelKendaraanComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MerekModelKendaraanComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MerekModelKendaraanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
