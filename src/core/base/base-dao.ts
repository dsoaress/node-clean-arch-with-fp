export interface BaseDAO<Model> {
  findAll?(): Promise<Model[]>;
  findById?(id: string): Promise<Model | null>;
  create?(input: Model): Promise<void>;
  update?(id: string, input: Model): Promise<void>;
  delete?(id: string): Promise<void>;
}
