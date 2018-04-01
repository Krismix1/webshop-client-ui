import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from './../../store/store';
import { Product } from './../../entities/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[];

  constructor(private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    this.ngRedux.select(state => state.product)
      .subscribe(categoryState => this.products = categoryState.visibleProducts);
  }
}
