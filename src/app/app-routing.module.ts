import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PasswordStrengthMeterComponent } from "./password-strength-meter/password-strength-meter.component";

const routes: Routes = [
  {path: '', component: PasswordStrengthMeterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
