import { Component, OnInit } from '@angular/core';
import { Category } from './../../entities/category';
import { CategoryActions } from './../category.actions';
import { IAppState } from './../../store/store';
import { NgRedux } from '@angular-redux/store';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  categories: Category[];

  constructor(private categoryActions: CategoryActions, private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    this.ngRedux.select(state => state.category)
      .subscribe(categoriesState => { this.setCategories(categoriesState.categories); });

    // fill initial data only during development time
    this.addCategory("Category A");
    this.addCategory("Category B");
  }

  private addCategory(name: string) {
    let category = { name: name };
    this.categoryActions.addCategory(category);
  }

  getCategories(): Category[] {
    return this.categories;
  }

  private setCategories(data) {
    this.categories = data;
  }
}
