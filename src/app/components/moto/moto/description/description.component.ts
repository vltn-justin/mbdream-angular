import {Component, Input, OnInit} from '@angular/core';
import {MotoForm, MotoModel} from '../../../../models/moto-model';
import {MotoService} from '../../../../services/moto.service';
import {QuillModule} from 'ngx-quill';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.sass']
})
export class DescriptionComponent implements OnInit {

  moto: MotoModel;

  onEdit = false;
  @Input() control: FormControl;

  errorMsg: string;
  statusMsg: string;

  constructor(private motoService: MotoService) {
  }

  ngOnInit(): void {
    this.moto = this.motoService.getSavedMoto();
    this.control = this.control ?? new FormControl(this.moto.descriptionMoto, [Validators.required]);
  }

  /**
   * Method to show editor to edit desc or not
   */
  setEditorDesc(): void {
    this.onEdit = !this.onEdit;
  }

  /**
   * Save new desc
   */
  saveDesc(): void {
    const updatedMoto = new MotoForm(this.moto.nomMoto,
      this.control.value,
      false,
      this.moto.marque.slugMarque,
      this.moto.categorie.slugCategorie,
      this.moto.slugMoto);

    this.motoService.updateMoto(updatedMoto).subscribe(res => {
      this.statusMsg = res;
    }, error => {
      this.errorMsg = error.error.text;
    });
  }
}
