export interface MotoList {
  count: number;
  haveNext: boolean;
  results: Result[];
}

export interface Result {
  slugMoto: string;
  nomMoto: string;
  backgroundImgMoto: string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toMotoList(json: string): MotoList {
    return JSON.parse(json);
  }

  public static motoListToJson(value: MotoList): string {
    return JSON.stringify(value);
  }
}
