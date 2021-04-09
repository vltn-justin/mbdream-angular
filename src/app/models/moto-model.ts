export interface MotoModel {
  idMoto: number;
  slugMoto: string;
  nomMoto: string;
  prixMoto: number;
  descriptionMoto: string;
  backgroundImgMoto: string;
  marque: Marque;
  categorie: Categorie;
  dateAjout: Date;
  isFeatured: boolean;
  nbImages: number;
  nbVideos: number;
  idInfo: number;
}

export interface Categorie {
  nomCategorie: string;
  slugCategorie: string;
}

export interface Marque {
  nomMarque: string;
  slugMarque: string;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toMotoModel(json: string): MotoModel {
    return cast(JSON.parse(json), r('MotoModel'));
  }

  public static motoModelToJson(value: MotoModel): string {
    return JSON.stringify(uncast(value, r('MotoModel')), null, 2);
  }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
  if (key) {
    throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
  }
  throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`,);
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => map[p.json] = {key: p.js, typ: p.typ});
    typ.jsonToJS = map;
  }
  return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => map[p.js] = {key: p.json, typ: p.typ});
    typ.jsToJSON = map;
  }
  return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
  function transformPrimitive(typ: string, val: any): any {
    if (typeof typ === typeof val) {
      return val;
    }
    return invalidValue(typ, val, key);
  }

  function transformUnion(typs: any[], val: any): any {
    // val must validate against one typ in typs
    const l = typs.length;
    for (let i = 0; i < l; i++) {
      const typ = typs[i];
      try {
        return transform(val, typ, getProps);
      } catch (_) {
      }
    }
    return invalidValue(typs, val);
  }

  function transformEnum(cases: string[], val: any): any {
    if (cases.indexOf(val) !== -1) {
      return val;
    }
    return invalidValue(cases, val);
  }

  function transformArray(typ: any, val: any): any {
    // val must be an array with no invalid elements
    if (!Array.isArray(val)) {
      return invalidValue('array', val);
    }
    return val.map(el => transform(el, typ, getProps));
  }

  function transformDate(val: any): any {
    if (val === null) {
      return null;
    }
    const d = new Date(val);
    if (isNaN(d.valueOf())) {
      return invalidValue('Date', val);
    }
    return d;
  }

  function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
    if (val === null || typeof val !== 'object' || Array.isArray(val)) {
      return invalidValue('object', val);
    }
    const result: any = {};
    Object.getOwnPropertyNames(props).forEach(key => {
      const prop = props[key];
      const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
      result[prop.key] = transform(v, prop.typ, getProps, prop.key);
    });
    Object.getOwnPropertyNames(val).forEach(key => {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps, key);
      }
    });
    return result;
  }

  if (typ === 'any') {
    return val;
  }
  if (typ === null) {
    if (val === null) {
      return val;
    }
    return invalidValue(typ, val);
  }
  if (typ === false) {
    return invalidValue(typ, val);
  }
  while (typeof typ === 'object' && typ.ref !== undefined) {
    typ = typeMap[typ.ref];
  }
  if (Array.isArray(typ)) {
    return transformEnum(typ, val);
  }
  if (typeof typ === 'object') {
    return typ.hasOwnProperty('unionMembers') ? transformUnion(typ.unionMembers, val)
      : typ.hasOwnProperty('arrayItems') ? transformArray(typ.arrayItems, val)
        : typ.hasOwnProperty('props') ? transformObject(getProps(typ), typ.additional, val)
          : invalidValue(typ, val);
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== 'number') {
    return transformDate(val);
  }
  return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
  return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
  return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
  return {arrayItems: typ};
}

function u(...typs: any[]) {
  return {unionMembers: typs};
}

function o(props: any[], additional: any) {
  return {props, additional};
}

function m(additional: any) {
  return {props: [], additional};
}

function r(name: string) {
  return {ref: name};
}

const typeMap: any = {
  'MotoModel': o([
    {json: 'idMoto', js: 'idMoto', typ: 0},
    {json: 'slugMoto', js: 'slugMoto', typ: ''},
    {json: 'nomMoto', js: 'nomMoto', typ: ''},
    {json: 'prixMoto', js: 'prixMoto', typ: 0},
    {json: 'descriptionMoto', js: 'descriptionMoto', typ: ''},
    {json: 'backgroundImgMoto', js: 'backgroundImgMoto', typ: ''},
    {json: 'marque', js: 'marque', typ: r('Marque')},
    {json: 'categorie', js: 'categorie', typ: r('Categorie')},
    {json: 'dateAjout', js: 'dateAjout', typ: Date},
    {json: 'isFeatured', js: 'isFeatured', typ: true},
    {json: 'nbImages', js: 'nbImages', typ: 0},
    {json: 'nbVideos', js: 'nbVideos', typ: 0},
    {json: 'idInfo', js: 'idInfo', typ: 0},
  ], false),
  'Categorie': o([
    {json: 'nomCategorie', js: 'nomCategorie', typ: ''},
    {json: 'slugCategorie', js: 'slugCategorie', typ: ''},
  ], false),
  'Marque': o([
    {json: 'nomMarque', js: 'nomMarque', typ: ""},
    {json: "slugMarque", js: "slugMarque", typ: ""},
  ], false),
};
