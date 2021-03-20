import {Component, OnInit} from '@angular/core';
import {MotoModel} from '../../../../models/moto-model';
import {MotoService} from '../../../../services/moto.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.sass']
})
export class DescriptionComponent implements OnInit {

  moto: MotoModel;

  constructor(private motoService: MotoService) {
  }

  ngOnInit(): void {
    this.moto = this.motoService.getSavedMoto();
  }
}
