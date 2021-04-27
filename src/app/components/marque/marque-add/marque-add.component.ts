import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, Validators} from '@angular/forms';
import {MarqueService} from '../../../services/marque.service';
import {MarqueForm} from '../../../models/marque-model';
import {imgValidator} from '../../../validator/img-validator';

@Component({
  selector: 'app-marque-add',
  templateUrl: './marque-add.component.html',
  styleUrls: ['./marque-add.component.sass']
})
export class MarqueAddComponent implements OnInit {

  errorMsg: string;
  statusMsg: string[];

  addMarqueForm = this.formBuilder.group({
    nomMarque: new FormControl('', [Validators.required]),
    descriptionMarque: new FormControl('', [Validators.required]),
    dateMarque: new FormControl('', [Validators.required]),
    logoMarque: new FormControl('', [Validators.required])
  });

  constructor(private formBuilder: FormBuilder, private marqueService: MarqueService) {
  }

  ngOnInit(): void {
  }

  /**
   * Method to add a Marque
   */
  addingMarque(): void {
    if (imgValidator(this.logoMarque.value)) {
      const newMarque = new MarqueForm(
        this.nomMarque.value,
        this.descriptionMarque.value,
        this.dateMarque.value,
        this.logoMarque.value
      );

      this.marqueService.addMarque(newMarque).subscribe(res => {
        this.statusMsg = res.split('- ');
      }, error => {
        this.errorMsg = error.error.text;
      });
    } else {
      this.logoMarque.setErrors({format: true});
    }
  }

  // Can use nomMoto, ... inside view instead of this.addMarqueForm.get()
  get nomMarque(): AbstractControl {
    return this.addMarqueForm.get('nomMarque');
  }

  get descriptionMarque(): AbstractControl {
    return this.addMarqueForm.get('descriptionMarque');
  }

  get dateMarque(): AbstractControl {
    return this.addMarqueForm.get('dateMarque');
  }

  get logoMarque(): AbstractControl {
    return this.addMarqueForm.get('logoMarque');
  }
}
