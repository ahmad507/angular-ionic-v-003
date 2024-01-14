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
export class ButtonComponent {
  @Input() ButtonText: string = '';
  @Input() ButtonBlock: boolean = false;
  @Input() ButtonType: string = 'primary'
  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  getButtonClasses(): string {
    if(this.ButtonBlock){
      return `block`;
    } else{
      return `w-auto`;
    }
  }

  getType(BlockType:any){
    return this.ButtonBlock = BlockType;
  }

   getButtonColor(): string {
    switch (this.ButtonType) {
      case 'primary':
        return `bg-blue-600 p-2 w-full h-[46px] rounded-[8px] ${this.ButtonBlock ? 'block' : 'w-auto'}`;
        // return 'blue-600';
      case 'success':
        return `bg-green-600 p-2 w-full h-[46px] rounded-[8px] ${this.ButtonBlock ? 'block' : 'w-auto'}`;
        // return 'green-600';
      case 'danger':
        return `bg-red-600 p-2 w-full h-[46px] rounded-[8px] ${this.ButtonBlock ? 'block' : 'w-auto'}`;
        // return 'red-600';
      case 'warning':
        return `bg-yellow-600 p-2 w-full h-[46px] rounded-[8px] ${this.ButtonBlock ? 'block' : 'w-auto'}`;
        // return 'yellow-600';
      default:
        return `bg-blue-600 p-2 w-full h-[46px] rounded-[8px] ${this.ButtonBlock ? 'block' : 'w-auto'}`;
        // return 'blue-600';
    }
  }

  onButtonClick(): void {
    this.buttonClick.emit();
  }
}
