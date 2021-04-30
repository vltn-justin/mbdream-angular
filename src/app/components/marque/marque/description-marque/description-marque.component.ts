import {Component, OnInit} from '@angular/core';
import {MarqueForm, MarqueModel} from '../../../../models/marque-model';
import {MarqueService} from '../../../../services/marque.service';
import {AbstractControl, FormBuilder, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-description-marque',
  templateUrl: './description-marque.component.html',
  styleUrls: ['./description-marque.component.sass']
})
export class DescriptionMarqueComponent implements OnInit {

  marque: MarqueModel;

  errorMsg: string;
  successMsg: string;

  onEdit = false;
  firstEdit = true;

  descriptionForm = this.formBuilder.group({
    descriptionMoto: new FormControl('', [Validators.required]),
    dateCreation: new FormControl('', [Validators.required])
  });

  constructor(private marqueService: MarqueService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.marque = this.marqueService.getSavedMarque();
  }

  /**
   * Method to show editor to edit desc or not
   */
  setEditorDesc(): void {
    this.onEdit = !this.onEdit;

    if (this.firstEdit) {
      this.descriptionMoto.setValue(this.marque.descriptionMarque);
      this.dateCreation.setValue(this.marque.dateCreation);
      this.firstEdit = false;
    }
  }

  /**
   * Save new desc
   */
  saveDesc(): void {
    const updatedMarque = new MarqueForm(
      this.marque.nomMarque,
      this.descriptionMoto.value,
      this.dateCreation.value,
      this.marque.logoMarque,
      this.marque.slugMarque
    );

    this.marqueService.updateMarque(updatedMarque).subscribe(res => {
      this.successMsg = res;
    }, err => {
      this.errorMsg = err;
    });
  }

  get descriptionMoto(): AbstractControl { return this.descriptionForm.get('descriptionMoto'); }
  get dateCreation(): AbstractControl { return this.descriptionForm.get('dateCreation'); }
}
