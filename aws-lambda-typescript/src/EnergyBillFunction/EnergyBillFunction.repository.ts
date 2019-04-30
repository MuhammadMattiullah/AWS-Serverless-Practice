import { DefaultCrudRepository } from 'data-access-object';
import { EnergyBillFunctionModel } from './EnergyBillFunction.model';
export class EnergyBillFunctionRepository extends DefaultCrudRepository<EnergyBillFunctionModel>  {
	public constructor() {
		super(EnergyBillFunctionModel);
	} 
}