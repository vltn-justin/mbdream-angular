import {Component, OnInit} from '@angular/core';
import {MotoModel} from '../../../../models/moto-model';
import {MotoService} from '../../../../services/moto.service';

@Component({
  selector: 'app-commentaires',
  templateUrl: './commentaires.component.html',
  styleUrls: ['./commentaires.component.sass']
})
export class CommentairesComponent implements OnInit {

  moto: MotoModel;

  constructor(private motoService: MotoService) {
  }

  ngOnInit(): void {
    this.moto = this.motoService.getSavedMoto();
  }

}
