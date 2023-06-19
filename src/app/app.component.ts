import { RoomsComponent } from './rooms/rooms.component';
import { localStorageToken } from './localstorage.token';
import {
  Component,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
  AfterViewInit,
  ElementRef,
  OnInit,
  Optional,
  Inject,
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  /* Inline html template */

  // template: `<h1>Hello world</h1>
  // <p>Angular is awesome</p>
  // `,
  styleUrls: ['./app.component.scss'],
  // styles: [`h1 {color: red;}`] /* Inline style */
})
export class AppComponent implements OnInit {
  title = 'hotelinventoryapp';
  role = 'Admin';

  @ViewChild('name', {static: true}) name!: ElementRef;

  constructor(@Inject(localStorageToken) private localStorage: Storage ){

  }

  ngOnInit(): void {
    this.name.nativeElement.innerText = "Hilton Hotel";
    this.localStorage.setItem('name', 'Hilton Hotel');
  }

  // @ViewChild('rooms', { read: ViewContainerRef }) vcr!: ViewContainerRef;
  // ngAfterViewInit(): void {
  //   const componentRef = this.vcr.createComponent(RoomsComponent);
  //   componentRef.instance.numberOfRooms = 50;
  // }
}
