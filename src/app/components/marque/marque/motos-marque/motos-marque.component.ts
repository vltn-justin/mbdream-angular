import {Component, OnInit} from '@angular/core';
import {MarqueService} from '../../../../services/marque.service';
import {MarqueModel} from '../../../../models/marque-model';
import {faEye} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-motos-marque',
  templateUrl: './motos-marque.component.html',
  styleUrls: ['./motos-marque.component.sass']
})
export class MotosMarqueComponent implements OnInit {

  marque: MarqueModel;

  faSee = faEye;

  constructor(private marqueService: MarqueService) {
  }

  ngOnInit(): void {
    this.marque = this.marqueService.getSavedMarque();
  }

}
