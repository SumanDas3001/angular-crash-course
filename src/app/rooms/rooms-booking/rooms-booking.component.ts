import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rooms-booking',
  templateUrl: './rooms-booking.component.html',
  styleUrls: ['./rooms-booking.component.scss']
})
export class RoomsBookingComponent implements OnInit {
  constructor(private router: ActivatedRoute){}

  // id$!: Observable<number>;
  id$ = this.router.paramMap.pipe(map(params => params.get('id')))

  ngOnInit(): void {
    // this.router.params.subscribe((params) => {
    //   console.log(params);
    //   this.id$ = params['id'];
    // })

    // this.router.params.pipe(map(params => this.id$ = params['id']))
  }
}
