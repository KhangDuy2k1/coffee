import { CrudService } from "./common/interfaces/base.service.interface";
import { Repository } from "./common/interfaces/base.repository.interface";
import { Types } from "mongoose";
type Id = Types.ObjectId;
export abstract class BaseService<M, R extends Repository<M>> implements CrudService<M> { 
        constructor(private readonly repository: R){}
        async findAll(conditions?: any): Promise<M[]> {
            return this.repository.findAll(conditions);
        }
        async create(instance: any ): Promise<M> {
            return this.repository.create(instance);
        }
        async findById(id: Id): Promise<M> {
            return this.repository.findById(id);
        }
        async update(id: Id, data: any): Promise<any> {
            return this.repository.update(id, data);    
        }
        async delete(id: Id): Promise<any> {
            return this.repository.delete(id);
        }
}