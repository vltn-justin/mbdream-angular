import {Component, OnInit} from '@angular/core';
import {MotoModel} from '../../../../models/moto-model';
import {MotoService} from '../../../../services/moto.service';

@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.sass']
})
export class InfosComponent implements OnInit {

  moto: MotoModel;

  constructor(private motoService: MotoService) {
  }

  ngOnInit(): void {
    this.moto = this.motoService.getSavedMoto();
  }
}
