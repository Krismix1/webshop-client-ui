import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from './material.module'
import { NgRedux, NgReduxModule } from '@angular-redux/store'
import { NgReduxRouterModule, NgReduxRouter } from '@angular-redux/router'
import { HttpClientModule } from '@angular/common/http'
import { AngularFontAwesomeModule } from 'angular-font-awesome'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app-component/app.component'
import { HomeComponent } from './home/home.component'
import { NavbarComponent } from './navbar/navbar.component'
import { SearchComponent } from './search/search.component'
import { ProductDetailsComponent } from './product/product-details/product-details.component'
import { ProductListComponent } from './product/product-list/product-list.component'
import { ProductService } from './services/product.service'
import { CategoryService } from './services/category.service'
import { StorageService } from './services/storage.service'
import { ProductCardComponent } from './product/product-card/product-card.component'
import { CategoryListItemComponent } from './category/category-list-item/category-list-item.component'
import { CategoryListComponent } from './category/category-list/category-list.component'
import { CategoryActions } from './category/category.actions'
import { rootReducer, IAppState } from './store/store'
import { ProductActions } from './product/product.actions'
// cart
import { CartActions } from './cart/cart.actions'
import { CartDashbordComponent } from './cart/cart-dashbord/cart-dashbord.component'
import { CartDashbordItemComponent } from './cart/cart-dashbord-item/cart-dashbord-item.component'
import { CartEpic } from './epics/cart.epic'
// auth
import { AuthService } from './services/auth.service'
import { RegisterComponent } from './auth/register/register.component'
// http interceptors
import { httpInterceptorProviders } from './http-interceptors/index'
// epic
import { createEpicMiddleware, combineEpics } from 'redux-observable'
import { createLogger } from 'redux-logger'
import { LoginComponent } from './auth/login/login.component'
import { AccountComponent } from './user/account/account.component'
// guards
import { AuthGuard } from './auth/auth-guard'
import { AnonymousGuard } from './anonymous-guard'
import { TokenStorageService } from './auth/token-storage.service'
// info page
import { ContactComponent } from './info/contact/contact.component'
import { InformationComponent } from './info/information/information.component'
import { FAQComponent } from './info/faq/faq.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
// search
import { FilterProducts } from './filters/products.filter'
// errors
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material'
import { MismatchErrorStateMatcher } from './auth/register/register.component'
import { createStore, applyMiddleware } from 'redux'

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
    AccountComponent,
    ContactComponent,
    InformationComponent,
    FAQComponent,
    PageNotFoundComponent,
    FilterProducts,
    RegisterComponent
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
  providers: [AnonymousGuard, AuthGuard, ProductService, CategoryService,
    StorageService, AuthService, CategoryActions, ProductActions, CartActions,
    CartEpic, TokenStorageService, httpInterceptorProviders, { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
    MismatchErrorStateMatcher],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor (private ngRedux: NgRedux<IAppState>,
               ngReduxRouter: NgReduxRouter,
               private cartEpic: CartEpic) {

    // Middleware
    // http://redux.js.org/docs/advanced/Middleware.html
    // https://github.com/angular-redux/store/blob/master/articles/epics.md
    const epicMiddleware = createEpicMiddleware()
    const enhancers = [
      epicMiddleware,
      createLogger({ level: 'info', collapsed: true })
    ]
    const store = createStore(rootReducer, applyMiddleware(...enhancers))

    const rootEpic = combineEpics(
      this.cartEpic.getItems, this.cartEpic.saveItems
    )
    epicMiddleware.run(rootEpic)

    // const initialState = {}
    // this.ngRedux.configureStore(rootReducer, initialState, middleware, enhancers)
    this.ngRedux.provideStore(store)

    ngReduxRouter.initialize(/* args */)
  }

}
