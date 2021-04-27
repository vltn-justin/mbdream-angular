import { Component, OnInit } from '@angular/core';
import {MarqueService} from '../../../services/marque.service';
import {MarqueModel} from '../../../models/marque-model';

@Component({
  selector: 'app-marque-list',
  templateUrl: './marque-list.component.html',
  styleUrls: ['./marque-list.component.sass']
})
export class MarqueListComponent implements OnInit {

  marqueList: MarqueModel[];
  pageNumber = 0;

  constructor(private marqueService: MarqueService) { }

  ngOnInit(): void {
    this.marqueService.getAllMarquesPage(this.pageNumber).subscribe(res => {
      this.marqueList = res;
    });
  }

}
