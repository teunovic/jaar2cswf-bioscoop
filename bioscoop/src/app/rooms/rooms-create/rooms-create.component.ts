import {Component, OnInit} from '@angular/core';
import {RoomsService} from '../../services/rooms.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-rooms-create',
  templateUrl: './rooms-create.component.html',
  styleUrls: ['./rooms-create.component.css']
})
export class RoomsCreateComponent implements OnInit {

  responseError: string;

  name: string;

  constructor(private roomsService: RoomsService, private router: Router) { }

  ngOnInit() {
  }

  create() {
    this.roomsService.create(this.name)
      .then(room => {
        console.log(room);
        this.router.navigateByUrl('rooms/' + room.id);
      })
      .catch(e => {
        this.responseError = e.error.message;
        console.error(e);
      });
  }

}
