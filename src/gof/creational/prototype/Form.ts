import { Field } from "./Field";
import { Prototype } from "./Prototype";

export class Form implements Prototype {
  fields: Field[];

  constructor(
    public id: string,
    public category: string,
    public description: string
  ) {
    this.fields = [];
  }

  addField(type: string, title: string) {
    this.fields.push(Field.create(type, title));
  }

  clone() {
    const newForm = new Form(this.id, this.category, this.description);
    newForm.fields = this.fields.map((f) => f.clone());

    return newForm;
  }
}
