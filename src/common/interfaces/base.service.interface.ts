import { Types } from "mongoose";

type Id = Types.ObjectId;
export interface CrudService<M> { 
    findById(id: Id): Promise<M>;
    create(m?: M) : Promise<any>;
    update(id: Id, data: any): Promise<any>;
    delete(id: Id): Promise<any>;
}