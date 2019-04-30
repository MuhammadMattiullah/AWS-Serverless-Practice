import moment = require('moment');

import { EnergyBills } from './EnergyBillFunction.interface';
import { EnergyBillFunctionRepository } from './EnergyBillFunction.repository';
import { EtlRepo } from './factsdailyrepo';
export class EnergyBillFunctionService {
	public constructor(private readonly _repo: EnergyBillFunctionRepository , private readonly _etl: EtlRepo) {
	}
	public addBill = (billdata: EnergyBills) =>
		new Promise((resolve, reject) => {
			this._repo.Create(billdata).then((res) => { resolve(res); }).catch((err) => {reject(err); });
			})
	public billdata = (assetid: string , billstart: number , billend: number) =>
			new Promise((resolve, reject) => {
				this._repo.Find({ where : { $and: [ {assetId: assetid }, {timeKey: {$lte : billend} }  , { timeKey: {$gte: billstart} } ]}, order: 'timeKey ASC'}).then((res) => { resolve(res); resolve(res); }).catch((err) => { reject(err); });
				})

	public etldata = (assetid: string , eltstarts: number , etlend: number) =>
			new Promise((resolve, reject) => {
				console.log(eltstarts);
				console.log(etlend);
				// This._etl.Find({limit : 10}).then((res) => console.log(res));
				this._etl.Find({ where: { timeKey: 201805310000 } }).then((res) => {console.log(res); });
				// This._etl.Find({ where : { $and: [ {assetId: assetid }, {timeKey: {$lte : etlend} }  , { timeKey: {$gte: eltstarts} } ]}, order: 'timeKey ASC'}).then((res) => { console.log(res); resolve(res); }).catch((err) => { reject(err); });
				})

	public softDel = (billsid: string) =>
		new Promise((resolve, reject) => {
			console.log('service id', billsid);
			this._repo.Find({where : {id: billsid}}).then((res) => {
				console.log(res);
				const result = res[0];
				const newData: EnergyBills = {
					_id : result.id,
					name: result.name,
					assetId: result.assetId,
					accountId : result.accountId,
					startDate: result.startDate,
					endDate: result.endDate,
					budget: result.budget,
					unitRate : result.unitRate,
					perdayBudget : result.perdayBudget,
					timeKey : result.timeKey,
					deleted : true,
					deletedAt : moment().toDate(),
					createdAt : result.createdAt,
					updatedAt : moment().toDate()
				};
				this._repo.UpdateById(newData).then((res) => {resolve(res); });
			 });
		})

	public updateData = (billsid: string , budget: number , unitRate: number) =>
		new Promise((resolve, reject) => {
			console.log('service id', billsid);
			this._repo.Find({where : {id: billsid}}).then((res) => {
				let newbbudget, newunitrate, perdayBudget;
				console.log(res);
				const result = res[0];
				if (budget === undefined) {
					newbbudget = result.budget;
					perdayBudget = result.perdayBudget;
				} else {
					newbbudget = budget ;
					perdayBudget = budget / moment.utc(result.startDate).daysInMonth();
				}
				if (unitRate === undefined) {
					newunitrate = result.unitRate;
				} else {
					newunitrate = unitRate ;
				}
				const newData: EnergyBills = {
					_id : result.id,
					name: result.name,
					assetId: result.assetId,
					accountId : result.accountId,
					startDate: result.startDate,
					endDate: result.endDate,
					budget: newbbudget,
					unitRate : newunitrate,
					perdayBudget,
					timeKey : result.timeKey,
					deleted : result.deleted,
					deletedAt : result.deletedAt,
					createdAt : result.createdAt,
					updatedAt : moment().toDate()
				};
				this._repo.UpdateById(newData).then((res) => {resolve(res); });
			 });

		})

	public verifyId = (id: string , key: string) =>
		new Promise((resolve, reject) => {
			const timekey = parseInt(key, 10);
			console.log(timekey);
			console.log(key);
			this._repo.Find({ where : { $and: [ {assetId: id }, {timeKey: timekey }  , { deleted: false } ]}  }).then((res) => { resolve(res); }).catch((err) => { reject(err); });
			})
}
