import { Component, OnInit } from '@angular/core'
import { Category } from './../../entities/category'
import { CategoryActions } from './../category.actions'
import { IAppState } from './../../store/store'
import { NgRedux } from '@angular-redux/store'
import { CategoryService } from './../../services/category.service'

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  categories: Category[]

  constructor (private categoryService: CategoryService, private categoryActions: CategoryActions, private ngRedux: NgRedux<IAppState>) { }

  ngOnInit () {
    this.ngRedux.select(state => state.category)
      .subscribe(categoriesState => { this.categories = categoriesState.categories })

    this.categoryService.fetchCategories()
      .subscribe(categories => this.categoryActions.setCategories(categories))
  }

  onCategoryClicked (category: Category) {
    this.categoryActions.setProductCategory(category)
  }
}
