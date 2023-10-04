import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ],
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent  implements OnInit {
  @Input() ButtonText: string = '';
  @Input() ButtonBlock: boolean = false;
  @Input() ButtonType: string = 'primary'
  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {}

  getButtonClasses(): string {
    if(this.ButtonBlock){
      return `bg-${this.getButtonColor()} p-2 w-full h-[46px] rounded-[8px] block`;
    } else{
      return `bg-${this.getButtonColor()} p-0 w-[66px] h-[46px] rounded-[8px]`;
    }

  }

  private getButtonColor(): string {
    switch (this.ButtonType) {
      case 'primary':
        return 'blue-600';
      case 'success':
        return 'green-600';
      case 'warning':
        return 'red-600';
      case 'warning':
        return 'red-600';
      default:
        return 'blue-600';
    }
  }

  onButtonClick(): void {
    this.buttonClick.emit();
  }
}
