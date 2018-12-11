import {Component, OnInit} from '@angular/core';
import {Show} from '../../model/Show';
import {ShowsService} from '../../services/shows.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-shows-details',
  templateUrl: './shows-details.component.html',
  styleUrls: ['./shows-details.component.css']
})
export class ShowsDetailsComponent implements OnInit {

  public show: Show;

  constructor(private route: ActivatedRoute, private router: Router, private showsService: ShowsService, public modals: NgbModal) { }

  ngOnInit() {
    this.route.params
      .subscribe(next => {
          this.showsService.fetchById(next.id)
            .then(show => {
              this.show = show;
            })
            .catch(e => console.error(e));
        },
        err => {
          console.error(err);
        });
  }

  delete() {
    this.showsService.delete(this.show.id)
      .then(() => {
        this.modals.dismissAll();
        this.router.navigateByUrl('/shows');
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
