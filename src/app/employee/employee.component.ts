import { RoomsService } from './../rooms/service/rooms.service';
import { Component, Self } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  providers: [RoomsService],

  /*
  Here I have added RoomsService to get new instance of it. Any service bydefault provide only single instance,
  so we can say service has singletone instance, but some case we need more than one isnatnce of a service that time
  we need to define the service to providers so we can get a local instance of this service.
  */
})
export class EmployeeComponent {
  empName: string = "Suman"

  constructor(@Self() private roomsService: RoomsService){
    /* When we are sure that this RoomsService is available on this component then we can use @Self */
  }
}
