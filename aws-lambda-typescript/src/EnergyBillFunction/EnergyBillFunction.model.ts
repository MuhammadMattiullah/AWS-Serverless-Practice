import { DataSource, Entity, ModelDefinition } from 'data-access-object';

import { dataSource } from '../EnergyBillFunction/config/config';

export class EnergyBillFunctionModel extends Entity {
	public static dataSource: DataSource = dataSource;
	public static definition: ModelDefinition = new ModelDefinition({
		name : 'EnergyBill',
		properties: {
			name: String,
			assetId: String,
			accountId : String,
			startDate: Date,
			endDate: Date,
			budget: Number,
			unitRate : Number,
			perdayBudget : Number,
			timeKey : Number,
			deleted : Boolean,
			deletedAt : Date ,
			createdAt : Date,
			updatedAt : Date
		}
	});
	public constructor(data?: Partial<EnergyBillFunctionModel>) {
		super(data);
	}
}
