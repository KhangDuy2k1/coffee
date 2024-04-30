import { Types } from "mongoose";
type Id = Types.ObjectId;
export interface Repository<T> {
    findById(id: Id): Promise<T>;
    findAll(conditions?: any): Promise<T[]>;
    update(id: Id, data: any): Promise<void>;
    delete(id: Id): Promise<any>;
    create(data: any): Promise<any>
}
