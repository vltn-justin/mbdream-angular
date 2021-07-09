// Used for adding/updating moto
export class MotoForm {
  constructor(private nomMoto: string,
              private descriptionMoto: string,
              private isFeatured: boolean,
              private slugMarque: string,
              private slugCategorie: string,
              private slugMoto?: string) {
  }
}

export interface MotoModel {
  slugMoto: string;
  nomMoto: string;
  backgroundImage: string;
  prixMoto: number;
  descriptionMoto: string;
  marque: Marque;
  categorie: Categorie;
  nbMedia: number;
  idInfo: null;
}

export interface Categorie {
  nomCategorie: string;
  slugCategorie: string;
  nbMoto: number;
}

export interface Marque {
  nomMarque: string;
  slugMarque: string;
  nbMoto: number;
}
