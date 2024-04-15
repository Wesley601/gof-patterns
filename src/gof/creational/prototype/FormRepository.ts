import { Form } from "./Form";

export interface FormRepository {
  getById(id: string): Promise<Form>;
  save(form: Form): Promise<void>;
}
