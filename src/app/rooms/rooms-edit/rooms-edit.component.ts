import {Component, OnInit} from '@angular/core';
import {Room} from '../../model/Room';
import {RoomsService} from '../../services/rooms.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-rooms-edit',
  templateUrl: './rooms-edit.component.html',
  styleUrls: ['./rooms-edit.component.css']
})
export class RoomsEditComponent implements OnInit {

  public room: Room;

  name: string;

  error: string;

  constructor(private route: ActivatedRoute, private router: Router, private roomsService: RoomsService) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(next => {
          this.roomsService.fetchById(next.id)
            .then(room => {
              this.room = room;
              this.name = room.name
            })
            .catch(e => {
              console.error(e);
            });
        },
        err => console.error(err));
  }

  edit() {
    if(!this.name) {
      this.error = 'Please fill in a name';
      return;
    }
    this.roomsService.edit(this.room.id, this.name)
      .then(() => {
        this.router.navigateByUrl('rooms/' + this.room.id);
      })
      .catch(e => {
        this.error = e.error.message;
        console.error(e);
      });
  }

}
