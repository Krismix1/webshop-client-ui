import { Component, OnInit, Input } from '@angular/core';
import { Category } from './../../entities/category';

@Component({
  selector: 'app-category-list-item',
  templateUrl: './category-list-item.component.html',
  styleUrls: ['./category-list-item.component.scss']
})
export class CategoryListItemComponent implements OnInit {

  @Input() category: Category;

  constructor() { }

  ngOnInit() {
  }

}
