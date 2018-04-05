import { Component, OnInit, Input } from '@angular/core';
import { Category } from './../../entities/category';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from './../../store/store';

@Component({
  selector: 'app-category-list-item',
  templateUrl: './category-list-item.component.html',
  styleUrls: ['./category-list-item.component.scss']
})
export class CategoryListItemComponent implements OnInit {

  @Input() category: Category;
  isSelected: boolean = false;

  constructor(private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    this.ngRedux.select(state => state.category)
      .subscribe(categoriesState => {
        this.isSelected = categoriesState.currentCategory && this.category.name === categoriesState.currentCategory.name;
      });
  }

}
