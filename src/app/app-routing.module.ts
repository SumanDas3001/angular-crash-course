import { LoginComponent } from './login/login.component';
import { RoomsBookingComponent } from './rooms/rooms-booking/rooms-booking.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RoomsComponent } from './rooms/rooms.component';
import { EmployeeComponent } from './employee/employee.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomsAddComponent } from './rooms/rooms-add/rooms-add.component';

const routes: Routes = [
  { path: 'employee', component: EmployeeComponent },
  { path: 'rooms', component: RoomsComponent },
  { path: 'rooms/add', component: RoomsAddComponent },
  // { path: 'login', component: LoginComponent },
  { path: 'rooms/:id', component: RoomsBookingComponent },
  { path: '', redirectTo: '/rooms', pathMatch: 'full' },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
