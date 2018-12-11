import {Component, OnInit} from '@angular/core';
import {Room} from '../../model/Room';
import {RoomsService} from '../../services/rooms.service';
import {UserService} from '../../user.service';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.css']
})
export class RoomsListComponent implements OnInit {

  private _rooms: Room[];
  public rooms: Room[];

  searchQuery: string;

  constructor(public userService: UserService, private roomsService: RoomsService) {
  }

  ngOnInit() {
    this.roomsService.fetchAll()
      .then(rooms => {
        console.log(rooms);
        this._rooms = rooms;
        this.rooms = rooms;
      })
      .catch(err => {
        console.error(err);
      });
  }

  onChange(newValue) {
    if (!newValue) {
      this.rooms = this._rooms;
      return;
    }
    newValue = newValue.toLowerCase();
    this.rooms = this._rooms.filter(m => m.name.toLowerCase().includes(newValue));
  }


}
