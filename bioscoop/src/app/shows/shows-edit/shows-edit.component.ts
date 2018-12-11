import {Component, OnInit} from '@angular/core';
import {Show} from '../../model/Show';
import {ShowsService} from '../../services/shows.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Movie} from '../../model/Movie';
import {Room} from '../../model/Room';

@Component({
  selector: 'app-shows-edit',
  templateUrl: './shows-edit.component.html',
  styleUrls: ['./shows-edit.component.css']
})
export class ShowsEditComponent implements OnInit {

  public show: Show;
  public movies: Movie[];
  public rooms: Room[];

  responseError: string;

  constructor(private route: ActivatedRoute, private router: Router, private showsService: ShowsService) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(next => {
          this.showsService.fetchById(next.id)
            .then(show => {
              this.show = show;
            })
            .catch(e => {
              console.error(e);
            });
        },
        err => console.error(err));
  }

  edit() {
    /*this.showsService.edit(this.show.id, this.name)
      .then(() => {
        this.router.navigateByUrl('shows/' + this.show.id);
      })
      .catch(e => {
        this.responseError = e.error.message;
        console.error(e);
      });*/
  }

}
