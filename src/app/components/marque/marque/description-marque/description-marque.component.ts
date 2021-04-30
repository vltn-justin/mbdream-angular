import {Component, OnInit} from '@angular/core';
import {MarqueModel} from '../../../../models/marque-model';
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
  });

  constructor(private marqueService: MarqueService, private formBuilder: FormBuilder,) { }

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
      this.firstEdit = false;
    }
  }

  /**
   * Save new desc
   */
  saveDesc(): void {

  }

  get descriptionMoto(): AbstractControl { return this.descriptionForm.get('descriptionMoto'); }
}
