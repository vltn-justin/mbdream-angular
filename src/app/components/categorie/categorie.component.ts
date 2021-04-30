import {Component, OnInit} from '@angular/core';
import {CategorieService} from '../../services/categorie.service';
import {CategorieModel} from '../../models/categorie-model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.sass']
})
export class CategorieComponent implements OnInit {

  categorie: CategorieModel;
  allCategorie: CategorieModel[];
  selectedCate: string;

  constructor(private categoryService: CategorieService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    // Path Variable; Slug
    this.selectedCate = this.route.snapshot.params.slug;

    this.categoryService.getAllCategories().subscribe(res => {
      this.allCategorie = res;

      if (this.selectedCate === undefined) {
        // Permet d'afficher la 1ere catégorie par defaut
        this.selectedCate = this.allCategorie[0].slugCategorie;
      }
      this.changeCate();
    });
  }

  changeCate(): void {
    this.categoryService.getCategorie(this.selectedCate).subscribe(res => {
      this.categorie = res;
    });
  }
}
