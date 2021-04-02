import {Component, OnInit} from '@angular/core';
import {MotoService} from '../../../services/moto.service';
import {MotoModel} from '../../../models/moto-model';

@Component({
  selector: 'app-moto-list',
  templateUrl: './moto-list.component.html',
  styleUrls: ['./moto-list.component.sass']
})
export class MotoListComponent implements OnInit {

  motoList: MotoModel[];

  constructor(private service: MotoService) { }

  ngOnInit(): void {
    this.service.getAllMoto().subscribe(res => {
      this.motoList = res;
    });
  }

  /**
   * Method to save one moto into service
   * @param moto Moto to save
   */
  saveMoto(moto: MotoModel): void {
    this.service.saveOneMoto(moto);
  }
}
