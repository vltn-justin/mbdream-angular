import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, Validators} from '@angular/forms';
import {MotoService} from '../../../services/moto.service';
import {MotoForm} from '../../../models/moto-model';
import {MarqueService} from '../../../services/marque.service';
import {MarqueModel} from '../../../models/marque-model';
import {CategorieService} from '../../../services/categorie.service';
import {CategorieModel} from '../../../models/categorie-model';

@Component({
  selector: 'app-moto-add',
  templateUrl: './moto-add.component.html',
  styleUrls: ['./moto-add.component.sass']
})
export class MotoAddComponent implements OnInit {

  errorMsg: string;
  statusMsg: string[];

  marques: MarqueModel[];
  categories: CategorieModel[];

  addMotoForm = this.formBuilder.group({
    nomMoto: new FormControl('', [Validators.required]),
    descriptionMoto: new FormControl('', [Validators.required]),
    slugMarque: new FormControl('', [Validators.required]),
    slugCategorie: new FormControl('', [Validators.required]),
  });

  constructor(private formBuilder: FormBuilder,
              private serviceMoto: MotoService,
              private marqueService: MarqueService,
              private categorieService: CategorieService) { }

  ngOnInit(): void {
    // Get all marques for form
    this.marqueService.getAllMarques().subscribe(res => {
      this.marques = res;
    });

    // Get all categories
    this.categorieService.getAllCategories().subscribe(res => {
      this.categories = res;
    });
  }

  addingMoto(): void {
    // MotoForm declared inside MotoModel
    const newMoto = new MotoForm(this.addMotoForm.get('nomMoto').value,
      this.addMotoForm.get('descriptionMoto').value,
      false,
      this.addMotoForm.get('slugMarque').value,
      this.addMotoForm.get('slugCategorie').value);

    this.serviceMoto.addMoto(newMoto).subscribe(res => {
      this.statusMsg = res.split('- ');
    }, error => {
      this.errorMsg = error.error.text;
    });
  }

  // Can use nomMoto, ... inside view instead of this.addMotoForm.get()
  get nomMoto(): AbstractControl { return this.addMotoForm.get('nomMoto'); }
  get descriptionMoto(): AbstractControl { return this.addMotoForm.get('descriptionMoto'); }
  get slugMarque(): AbstractControl { return this.addMotoForm.get('slugMarque'); }
  get slugCategorie(): AbstractControl { return this.addMotoForm.get('slugCategorie'); }
}
