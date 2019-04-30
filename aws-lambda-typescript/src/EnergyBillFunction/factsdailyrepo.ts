import { DefaultCrudRepository } from 'data-access-object';

import { EtlModel } from './factsdailymodel';
export class EtlRepo extends DefaultCrudRepository<EtlModel>  {
	public constructor() {
		super(EtlModel);
	}
}
