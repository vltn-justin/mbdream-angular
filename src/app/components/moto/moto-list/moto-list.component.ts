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
  pageNumber = 0;

  constructor(private service: MotoService) { }

  ngOnInit(): void {
    this.service.getAllMoto(this.pageNumber).subscribe(res => {
      this.motoList = res;
    });
  }
}
