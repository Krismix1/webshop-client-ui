import { Directive, Input } from '@angular/core'

// export for convenience.
export { RouterLink } from '@angular/router'

/* tslint:disable:directive-class-suffix */
// #docregion router-link
@Directive({
  selector: '[routerLink]', // tslint:disable-line:directive-selector
  host: { '(click)': 'onClick()' } // tslint:disable-line:use-host-property-decorator
})
export class RouterLinkDirectiveStub {
  @Input() routerLink: any
  navigatedTo: any = null

  onClick () {
    this.navigatedTo = this.routerLink
  }
}
// #enddocregion router-link
/// Dummy module to satisfy Angular Language service. Never used.
import { NgModule } from '@angular/core'

@NgModule({
  declarations: [
    RouterLinkDirectiveStub
  ]
})
export class RouterStubsModule {}
