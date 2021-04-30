import {Component, OnInit} from '@angular/core';
import {MotoForm, MotoModel} from '../../../../models/moto-model';
import {MotoService} from '../../../../services/moto.service';
import {AbstractControl, FormBuilder, FormControl, Validators} from '@angular/forms';
import {MarqueService} from '../../../../services/marque.service';
import {CategorieService} from '../../../../services/categorie.service';
import {MarqueModel} from '../../../../models/marque-model';
import {CategorieModel} from '../../../../models/categorie-model';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.sass']
})
export class DescriptionComponent implements OnInit {

  moto: MotoModel;
  marques: MarqueModel[];
  categories: CategorieModel[];

  onEdit = false;
  firstEdit = true;

  descriptionForm = this.formBuilder.group({
    descriptionMoto: new FormControl('', [Validators.required]),
    slugMarque: new FormControl('', [Validators.required]),
    slugCategorie: new FormControl('', [Validators.required]),
  });

  errorMsg: string;
  successMsg: string;

  constructor(private formBuilder: FormBuilder,
              private motoService: MotoService,
              private marqueService: MarqueService,
              private categoryService: CategorieService) {
  }

  ngOnInit(): void {
    this.moto = this.motoService.getSavedMoto();
  }

  /**
   * Method to show editor to edit desc or not
   */
  setEditorDesc(): void {
    this.onEdit = !this.onEdit;

    // If it's first edit we get marque & categories
    if (this.firstEdit) {
      this.marqueService.getAllMarques().subscribe(res => {
        this.marques = res;
      });

      this.categoryService.getAllCategories().subscribe(res => {
        this.categories = res;
      });

      this.descriptionMoto.setValue(this.moto.descriptionMoto);
      this.slugCategorie.setValue(this.moto.categorie.slugCategorie);
      this.slugMarque.setValue(this.moto.marque.slugMarque);

      this.firstEdit = false;
    }
  }

  /**
   * Save new desc
   */
  saveDesc(): void {
    const updatedMoto = new MotoForm(this.moto.nomMoto,
      this.descriptionMoto.value,
      false,
      this.slugMarque.value,
      this.slugCategorie.value,
      this.moto.slugMoto);

    this.motoService.updateMoto(updatedMoto).subscribe(res => {
      this.successMsg = res;
      this.onEdit = false;
    }, error => {
      this.errorMsg = error.error.text;
    });
  }

  get descriptionMoto(): AbstractControl { return this.descriptionForm.get('descriptionMoto'); }
  get slugMarque(): AbstractControl { return this.descriptionForm.get('slugMarque'); }
  get slugCategorie(): AbstractControl { return this.descriptionForm.get('slugCategorie'); }
}
