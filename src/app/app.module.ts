import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { NgRedux, NgReduxModule, DevToolsExtension } from '@angular-redux/store';
import { NgReduxRouterModule, NgReduxRouter } from '@angular-redux/router';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductService } from './services/product.service';
import { CategoryService } from './services/category.service';
import { ProductCardComponent } from './product/product-card/product-card.component';
import { CategoryListItemComponent } from './category/category-list-item/category-list-item.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryActions } from './category/category.actions';
import { rootReducer, IAppState } from './store/store';
import { ProductActions } from './product/product.actions';
import { CartActions } from './cart/cart.actions';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SearchComponent,
    ProductDetailsComponent,
    ProductListComponent,
    ProductCardComponent,
    CategoryListItemComponent,
    CategoryListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgReduxModule,
    NgReduxRouterModule.forRoot(),
    HttpClientModule,
    AngularFontAwesomeModule
  ],
  providers: [ProductService, CategoryService, CategoryActions, ProductActions, CartActions],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private ngRedux: NgRedux<IAppState>,
    private devTools: DevToolsExtension,
    private ngReduxRouter: NgReduxRouter, ) {

    let enhancers = [];
    // ... add whatever other enhancers are needed.

    // You probably only want to expose this tool in devMode.
    const __DEVMODE__ = true; // FIXME: Can't find where __DEVMODE__ is declared..., this is just a work around
    if (__DEVMODE__ && devTools.isEnabled()) {
      enhancers = [...enhancers, devTools.enhancer()];
    }

    this.ngRedux.configureStore(
      rootReducer, {}, [], enhancers);

    ngReduxRouter.initialize(/* args */);
  }

}
