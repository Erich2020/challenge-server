export interface Repository<T> {
  getAllDataProcess(): Promise<T[]>;
  updateData(id: string, data: Partial<T>, args?: any): Promise<T | null | any>;
  exist(id: string): Promise<T | null>;
}
