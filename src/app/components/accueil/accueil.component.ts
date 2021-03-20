import {Component, OnInit} from '@angular/core';
import {MotoService} from '../../services/moto.service';
import {MarqueService} from '../../services/marque.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.sass']
})
export class AccueilComponent implements OnInit {

  cptMoto: number;
  cptMarque: number;

  constructor(private motoService: MotoService, private marqueService: MarqueService) {
  }

  ngOnInit(): void {
    this.motoService.countAllMoto().subscribe(res => {
      this.cptMoto = res;
    });
    this.marqueService.countAllMarque().subscribe(res => {
      this.cptMarque = res;
    });
  }

}
