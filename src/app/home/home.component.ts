import { Component, OnInit } from '@angular/core'
import { NgRedux } from '@angular-redux/store'
import { IAppState } from '../store/store'
import { CategoryActions } from '../category/category.actions'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  displayCategoryList = true

  constructor (private ngRedux: NgRedux<IAppState>, private categoryActions: CategoryActions) { }

  ngOnInit () {
    this.ngRedux.select(state => state.category)
      .subscribe(state => this.displayCategoryList = state.displayList)
  }

  toggleList () {
    this.categoryActions.toggleCategoryList()
  }
}
