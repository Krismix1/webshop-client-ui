import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartDashbordComponent } from './cart/cart-dashbord/cart-dashbord.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { LoginComponent } from './auth/login/login.component';
import { AccountComponent } from './user/account/account.component';
import { AuthGuard } from './auth/auth-guard';
import { AnonymousGuard } from './anonymous-guard';
// info page
import { InformationComponent } from './info/information/information.component';
import { ContactComponent } from './info/contact/contact.component';
import { FAQComponent } from './info/faq/faq.component';
// 404 page
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "cart",
    component: CartDashbordComponent
  },
  {
    path: "product/:id",
    component: ProductDetailsComponent
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [AnonymousGuard]
  },
  {
    path: "account",
    component: AccountComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'info',
    component: InformationComponent,
    children: [
      {
        path: 'contact',
        component: ContactComponent
      },
      {
        path: 'faq',
        component: FAQComponent
      }
    ]
  },
  {
    path: "**",
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
