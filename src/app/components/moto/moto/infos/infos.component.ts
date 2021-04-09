import {Component, OnInit} from '@angular/core';
import {MotoModel} from '../../../../models/moto-model';
import {MotoService} from '../../../../services/moto.service';
import {InfoService} from '../../../../services/info.service';
import {InfoModel} from '../../../../models/info-model';

@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.sass']
})
export class InfosComponent implements OnInit {

  moto: MotoModel;
  info: InfoModel;

  constructor(private motoService: MotoService, private infoService: InfoService) {
  }

  ngOnInit(): void {
    this.moto = this.motoService.getSavedMoto();

    if (this.moto.idInfo !== null) {
      this.infoService.getInfoMoto(this.moto.idInfo).subscribe(res => {
        this.info = res;
      });
    }
  }
}
