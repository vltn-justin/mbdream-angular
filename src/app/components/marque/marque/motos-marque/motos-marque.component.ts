import {Component, OnInit} from '@angular/core';
import {MarqueService} from '../../../../services/marque.service';
import {MarqueModel} from '../../../../models/marque-model';

@Component({
  selector: 'app-motos-marque',
  templateUrl: './motos-marque.component.html',
  styleUrls: ['./motos-marque.component.sass']
})
export class MotosMarqueComponent implements OnInit {

  marque: MarqueModel;

  constructor(private marqueService: MarqueService) {
  }

  ngOnInit(): void {
    this.marque = this.marqueService.getSavedMarque();
  }

}
