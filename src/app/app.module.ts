import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { NgRedux, NgReduxModule, DevToolsExtension } from '@angular-redux/store';
import { NgReduxRouterModule, NgReduxRouter } from '@angular-redux/router';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductService } from './services/product.service';
import { CategoryService } from './services/category.service';
import { StorageService } from './services/storage.service';
import { ProductCardComponent } from './product/product-card/product-card.component';
import { CategoryListItemComponent } from './category/category-list-item/category-list-item.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryActions } from './category/category.actions';
import { rootReducer, IAppState } from './store/store';
import { ProductActions } from './product/product.actions';
// cart
import { CartActions } from './cart/cart.actions';
import { CartDashbordComponent } from './cart/cart-dashbord/cart-dashbord.component';
import { CartDashbordItemComponent } from './cart/cart-dashbord-item/cart-dashbord-item.component';
import { CartEpic } from './epics/cart.epic';
// auth
import { AuthService } from './services/auth.service';
// epic
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { createLogger } from 'redux-logger';
import { LoginComponent } from './auth/login/login.component';
import { AccountComponent } from './user/account/account.component';
// guards
import { AuthGuard } from './auth/auth-guard';
import { AnonymousGuard } from './anonymous-guard';
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
    CategoryListComponent,
    CartDashbordComponent,
    CartDashbordItemComponent,
    LoginComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgReduxModule,
    NgReduxRouterModule.forRoot(),
    HttpClientModule,
    AngularFontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AnonymousGuard, AuthGuard, ProductService, CategoryService, StorageService, AuthService, CategoryActions, ProductActions, CartActions, CartEpic],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private ngRedux: NgRedux<IAppState>,
    private devTools: DevToolsExtension,
    private ngReduxRouter: NgReduxRouter,
    private cartEpic: CartEpic) {

    let enhancers = [];
    // ... add whatever other enhancers are needed.

    // You probably only want to expose this tool in devMode.
    const __DEVMODE__ = true; // FIXME: Can't find where __DEVMODE__ is declared..., this is just a work around
    if (__DEVMODE__ && devTools.isEnabled()) {
      enhancers = [...enhancers, devTools.enhancer()];
    }

    const rootEpic = combineEpics(
      this.cartEpic.getItems, this.cartEpic.saveItems
    );
    // Middleware
    // http://redux.js.org/docs/advanced/Middleware.html
    // https://github.com/angular-redux/store/blob/master/articles/epics.md
    // const epicMiddleware = createEpicMiddleware(rootEpic);
    const middleware = [
      createEpicMiddleware(rootEpic), createLogger({ level: 'info', collapsed: true })
    ];
    // this.ngRedux.configureStore(rootReducer, {}, middleware);


    this.ngRedux.configureStore(rootReducer, {}, middleware, enhancers);

    ngReduxRouter.initialize(/* args */);
  }

}
