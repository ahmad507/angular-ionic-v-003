import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {MvAccessoriesInputComponent} from './mv-accessories-input.component';

describe('MvAccessoriesInputComponent', () => {
  let component: MvAccessoriesInputComponent;
  let fixture: ComponentFixture<MvAccessoriesInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MvAccessoriesInputComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MvAccessoriesInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
