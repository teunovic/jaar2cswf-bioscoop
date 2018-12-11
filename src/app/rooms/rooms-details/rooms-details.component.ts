import {Component, OnInit} from '@angular/core';
import {Room} from '../../model/Room';
import {RoomsService} from '../../services/rooms.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../../user.service';

@Component({
  selector: 'app-rooms-details',
  templateUrl: './rooms-details.component.html',
  styleUrls: ['./rooms-details.component.css']
})
export class RoomsDetailsComponent implements OnInit {

  public room: Room;

  constructor(public userService: UserService, private route: ActivatedRoute, private router: Router, private roomsService: RoomsService, public modals: NgbModal) { }

  ngOnInit() {
    this.route.params
      .subscribe(next => {
          this.roomsService.fetchById(next.id)
            .then(room => {
              this.room = room;
            })
            .catch(e => console.error(e));
        },
        err => {
          console.error(err);
        });
  }

  delete() {
    this.roomsService.delete(this.room.id)
      .then(() => {
        this.modals.dismissAll();
        this.router.navigateByUrl('/rooms');
      })
  }

  openDeleteDialog(content) {
    this.modals.open(content).result.then((result) => {
      console.log('yeet')
    }, (reason) => {
      console.log(reason);
    });
  }

}
