import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Articles } from 'src/app/interfaces/global/articles';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss'],
})
export class ArticlesListComponent  implements OnInit {

  @Input() articles: Articles['r_data'] = [];
  // @Input() books: ReadonlyArray = [];

  constructor() { }

  ngOnInit() {
    console.table(this.articles);
  }

}
