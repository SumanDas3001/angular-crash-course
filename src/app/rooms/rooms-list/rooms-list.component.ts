import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnChanges,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import { RoomList } from '../rooms';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsListComponent implements OnInit, OnChanges, OnDestroy {
  /* We can pass data between two components using input() and output() */

  @Input() rooms: RoomList[] = [];

  @Input() title: string = '';

  @Output() selectedRoom = new EventEmitter<RoomList>();

  selectRoom(room: RoomList) {
    // console.log(room);
    this.selectedRoom.emit(room);
  }

  constructor() {};

  /*
  Everytime when change the value or refresh the page you we will get data inside OnChange. For example if you want to update/add/modify the property after getting the new value
  then you can do it inside ngOnChanges.

  Note: ngOnChanges will only work in case you have input property and input property gets updated or you get a new value.
  So whenever you have a new value then you will get data inside ngOnChanges and based on that in case you want
  to write some logic or you want to logs this values you can.
  */
  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);
    if(changes['title']){
      this.title = changes['title'].currentValue.toLowerCase();
    }
  }

  ngOnInit(): void {};

  /*
    Whenever a component is gets removed from your DOME at that moment the components on destroy life cycle event will be called.
    For example, we can implement subscribe unsubscribe functionality using onDestroy.
  */
  ngOnDestroy(): void {
    console.log("On destroy is called")
  }

}
