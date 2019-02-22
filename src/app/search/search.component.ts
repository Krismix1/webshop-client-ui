import { Component, OnInit } from '@angular/core'
import { NgRedux } from '@angular-redux/store'
import { Product } from './../entities/product'
import { IAppState } from './../store/store'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  private products: Product[]
  constructor (private ngRedux: NgRedux<IAppState>) { }

  ngOnInit () {
    this.ngRedux.select(state => state.product).subscribe(productState => this.products = productState.products)
    console.log('Filter products', this.products.length)
  }

}
