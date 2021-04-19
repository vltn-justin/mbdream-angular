import {Component, OnInit} from '@angular/core';
import {MotoModel} from '../../../../models/moto-model';
import {MotoService} from '../../../../services/moto.service';
import {InfoService} from '../../../../services/info.service';
import {InfoForm, InfoModel} from '../../../../models/info-model';
import {AbstractControl, FormBuilder, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.sass']
})
export class InfosComponent implements OnInit {

  moto: MotoModel;
  info: InfoModel;

  errorMsg: string;
  successMsg: string;

  onEdit = false;

  addUpdateInfos = this.formBuilder.group({
    prix: new FormControl('', [Validators.required]),
    architectureMoteur: new FormControl('', [Validators.required]),
    cylindre: new FormControl('', [Validators.required]),
    puissance: new FormControl('', [Validators.required]),
    couple: new FormControl('', [Validators.required]),
    poid: new FormControl('', [Validators.required]),
    capaciteReservoir: new FormControl('', [Validators.required]),
    consommation: new FormControl('', [Validators.required]),
  });

  constructor(private formBuilder: FormBuilder, private motoService: MotoService, private infoService: InfoService) {
  }

  ngOnInit(): void {
    this.moto = this.motoService.getSavedMoto();

    this.infoService.getInfoMoto(this.moto.slugMoto).subscribe(res => {
      this.info = res;
    }, err => {
      this.errorMsg = err.error;
    });
  }

  /**
   * Set form for update or add infos, with input value with info get if they exist
   */
  setFormInfos(): void {
    this.errorMsg = '';
    this.onEdit = !this.onEdit;

    if (this.info !== undefined) {
      this.prix.setValue(this.info.prix);
      this.architectureMoteur.setValue(this.info.architectureMoteur);
      this.cylindre.setValue(this.info.cylindre);
      this.puissance.setValue(this.info.puissance);
      this.couple.setValue(this.info.couple);
      this.poid.setValue(this.info.poid);
      this.capaciteReservoir.setValue(this.info.capaciteReservoir);
      this.consommation.setValue(this.info.consommation);
    }
  }

  /**
   * Method to save all info into db
   */
  addingUpdatingInfos(): void {
    const newInfos = new InfoForm(
      this.moto.slugMoto,
      this.prix.value,
      this.architectureMoteur.value,
      this.cylindre.value,
      this.puissance.value,
      this.couple.value,
      this.poid.value,
      this.capaciteReservoir.value,
      this.consommation.value
    );

    // If no info we add
    if (this.info === undefined) {
      this.infoService.addInfo(newInfos).subscribe(res => {
        this.successMsg = res;
      }, error => {
        this.errorMsg = error.error.text;
      });
    } else {
      this.infoService.updateInfo(newInfos).subscribe(res => {
        this.successMsg = res;
      }, error => {
        this.errorMsg = error.error.text;
      });
    }

  }

  // Can use prix, ... inside view instead of this.addUpdateInfos.get('prix') ...
  get prix(): AbstractControl {
    return this.addUpdateInfos.get('prix');
  }

  get architectureMoteur(): AbstractControl {
    return this.addUpdateInfos.get('architectureMoteur');
  }

  get cylindre(): AbstractControl {
    return this.addUpdateInfos.get('cylindre');
  }

  get puissance(): AbstractControl {
    return this.addUpdateInfos.get('puissance');
  }

  get couple(): AbstractControl {
    return this.addUpdateInfos.get('couple');
  }

  get poid(): AbstractControl {
    return this.addUpdateInfos.get('poid');
  }

  get capaciteReservoir(): AbstractControl {
    return this.addUpdateInfos.get('capaciteReservoir');
  }

  get consommation(): AbstractControl {
    return this.addUpdateInfos.get('consommation');
  }
}
