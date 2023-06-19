import { RoomsService } from './service/rooms.service';
import { HeaderComponent } from './../header/header.component';
import {
  AfterViewInit,
  Component,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Room, RoomList } from './rooms';
import { Observable, Subscription } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit, AfterViewInit {
  hotelName = 'Marriott';
  numberOfRooms = 12;
  hideRooms = true;
  title = 'Room List';

  room: Room = {
    totalRooms: 20,
    availableRooms: 15,
    bookedRooms: 5,
  };

  roomList: RoomList[] = [];

  /*
  Observable instance will check every time the new data is comming or not, so when new value will push then observer will call the next method internally
  so whoever has subscribe to it gets the new value, in case of error get error.  */
  stream = new Observable((observer) => {
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.complete();
  });

  selectedRoom!: RoomList;

  // @ViewChild(HeaderComponent, {static: true}) headerComponent!: HeaderComponent;
  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  /* @ViewChild is a decorator and we use this to import headerComponent here and creating a instance of it inside room component, so
  now we can access any property and method of headerComponent inside AfterViewInit only. */

  /* this is header children component, that I will use to genete instance of header component */
  @ViewChildren(HeaderComponent)
  headerChildrenComponent!: QueryList<HeaderComponent>;
  /* What Does The Static Property On ViewChild Do?: https://upmostly.com/angular/what-does-the-static-property-on-viewchild-do */

  // roomService = new RoomsService; /* creating RoomsService instance */

  // constructor => This is invoked when Angular creates a component or directive by calling new on the class.
  constructor(private roomsService: RoomsService) {
    /*
    roomsService instance can't be public, I am limiting this instance to this templete only. So this instance will not be lick to html template.
    Now, roomService instance is a global instance and it is not specific to this component only, so we will not use @Self() method, we use @SkipSelf() decoretor method here
    that will skip check roomsService.
    */
    // this.roomList = this.roomsService.getRooms(); /* Now rooms data comming from services not from this component itself */
  }

  // ngOnInit => Invoked when given component has been initialized.
  // Lifecycle Hooks => https://codecraft.tv/courses/angular/components/lifecycle-hooks/

  error: string = '';
  totalBytes = 0;
  subscription !: Subscription

  ngOnInit(): void {

    this.roomsService.getPhotos().subscribe((event) => {
      switch (event.type){
        case HttpEventType.Sent: {
          console.log('Request has been made');
          break;
        }
        case HttpEventType.ResponseHeader: {
          console.log('Request success');
          break;
        }
        case HttpEventType.DownloadProgress: {
          this.totalBytes += event.loaded;
          break;
        }
        case HttpEventType.Response: {
          console.log('Request completed');
          console.log(event.body);
        }
      }
    })

    // console.log(this.headerComponent); /* we can only get this value if we will mension headerComponent is static true */
    this.stream.subscribe({
      // console.log(data)
      next: (value) => console.log(value),
      complete: () => console.log('complete'),
      error: (err) => console.log(err),
    });
    this.roomsService.getRooms$.subscribe((rooms) => {
      this.roomList = rooms;
    });
  }

  ngAfterViewInit(): void {
    this.headerComponent.title = 'Rooms View';
    console.log(this.headerChildrenComponent);
    this.headerChildrenComponent.last.title = 'Last Title';
  }

  toggle() {
    this.hideRooms = !this.hideRooms;
    this.title = 'Rooms List';
  }

  selectRoom(room: RoomList) {
    this.selectedRoom = room;
  }

  addRoom() {
    let room: RoomList = {
      roomNumber: '4',
      roomType: 'Private Suite',
      amenities: 'Air conditionar, Free Wi-Fi, TV, Bathroom, Kitchen',
      price: 1500,
      photos: 'https://unsplash.com/photos/paydk0JcIOQ',
      checkInTime: new Date('03-05-2023'),
      checkOutTime: new Date('04-05-2023'),
      rating: 3.6,
    };

    // this.roomList.push(room); /* push is only modify the RoomList with new property, it actually muted the exusting object.*/
    // this.roomList = [...this.roomList, room] /* spread operator. It will merge the new property with existing data.  */

    this.subscription = this.roomsService.addRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }

  editRoom() {
    let room: RoomList = {
      roomNumber: '3',
      roomType: 'Private Suite',
      amenities: 'Air conditionar, Free Wi-Fi, TV, Bathroom, Kitchen',
      price: 400,
      photos: 'https://unsplash.com/photos/paydk0JcIOQ',
      checkInTime: new Date('03-05-2023'),
      checkOutTime: new Date('04-05-2023'),
      rating: 3.46,
    };

    this.roomsService.editRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }

  deleteRoom(){
    this.roomsService.deleteRoom("3").subscribe((data) => {
      this.roomList = data;
    });
  }

  /* why ngOnDestroy? => Whenever this component gets destroyed just go ahead and destroy the
  subscription also because we don't need it to be available in the memory */


  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}

/* Pull architecture */
// getData -> addData -> getData

/* Push architecture */
// getData -> continous stream of data -> adddata
