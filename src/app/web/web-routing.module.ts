import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebMainComponent } from './web-main/web-main.component';


// const redirectLogin = () =>  redirectUnauthorizedTo(['login']);

const routes: Routes = [{
  path: '',
  component: WebMainComponent,
  // ...canActivate(redirectLogin),


  children: [
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full'
    },
    {
      path: 'dashboard',
      loadChildren: () => import('../web/dashboard/deshboard.module').then(m => m.DeshboardModule)
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebRoutingModule { }
