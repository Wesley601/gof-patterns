import { expect, test } from "bun:test";
import { FormRepository } from "./FormRepository";
import { Form } from "./Form";
import { CopyForm } from "./CopyForm";

test("should copy a form", async function () {
  const formRepository = new FormRepositoryMemory();

  const f1 = new Form("1", "Marketing", "leads v1");
  f1.addField("text", "name");
  f1.addField("text", "email");
  formRepository.save(f1);

  const copyForm = new CopyForm(formRepository);
  const input = {
    fromFormId: "1",
    newFormId: "2",
    newCategory: "Marketing",
    newDescription: "Leads v2",
  };

  await copyForm.execute(input);

  const newForm = await formRepository.getById("2");
  expect(newForm.category).toBe("Marketing");
  expect(newForm.description).toBe("Leads v2");
  expect(newForm.fields).toHaveLength(2);
  expect(newForm.fields.at(0)?.title).toBe("name");
  expect(newForm.fields.at(1)?.title).toBe("email");
});

class FormRepositoryMemory implements FormRepository {
  forms: Form[];

  constructor() {
    this.forms = [];
  }

  async getById(id: string): Promise<Form> {
    const form = this.forms.find((f) => f.id === id);
    if (!form) throw new Error("Form not found");

    return form;
  }

  async save(form: Form): Promise<void> {
    this.forms.push(form);
  }
}
