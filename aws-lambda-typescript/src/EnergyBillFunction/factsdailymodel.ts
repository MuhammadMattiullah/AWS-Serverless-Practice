import { DataSource, Entity, ModelDefinition } from 'data-access-object';

import { etlsource } from './config/config';

export class EtlModel extends Entity {
	public static dataSource: DataSource = etlsource;
	public static definition: ModelDefinition = new ModelDefinition({
		name : 'FactsDaily',
		properties: {
			assetId: String,
			timeKey : Number,
			facts : Object
		}
	});
	public constructor(data?: Partial<EtlModel>) {
		super(data);
	}
}
