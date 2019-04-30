import * as moment from 'moment';
import { isNull } from 'util';

import { ApiCallback, ApiContext, ApiEvent, ApiHandler } from '../../shared/api.interfaces';
import { ResponseBuilder } from '../../shared/response-builder';

import { EnergyBills } from './EnergyBillFunction.interface';
import { EnergyBillFunctionService } from './EnergyBillFunction.service';

export class EnergyBillFunctionController {
	public constructor(private readonly _service: EnergyBillFunctionService) {
	}
	public createBill: ApiHandler = async (event: ApiEvent, context: ApiContext, callback: ApiCallback) => {
		const response = JSON.parse(event.body);
		const endDate = moment.utc(response.startDate).endOf('month').toDate();
		const perdayBudget = response.budget / moment.utc(response.startDate).daysInMonth();
		const timeKey = moment.utc(response.startDate).format('YYYYMM');
		if (response.unitRate <= 0 || response.unitRate === undefined) {
			return ResponseBuilder.badRequest('401', 'Unit Rate must be greater than zero!', callback);
		} else if (response.budget <= 0 || response.budget === undefined) {
			return ResponseBuilder.badRequest('401', 'Budget must be greater than zero!', callback);
		} else if (response.name.length.toString() > 50 || response.name === undefined) {
			return ResponseBuilder.badRequest('401', 'Maximum characters allowed for name is 50!', callback);
		} else if (response.assetId === null || response.assetId === '' || isNull(response.assetId) || response.assetId === undefined) {
			return ResponseBuilder.badRequest('401', 'Asset Id is required!', callback);
		} else {
			const veriId = await this._service.verifyId(response.assetId, timeKey);
			if (Object.keys(veriId).length === 0) {
				const billData: EnergyBills = {
					name: response.name,
					assetId: response.assetId,
					accountId : response.accountId,
					startDate: response.startDate,
					endDate,
					budget: response.budget,
					unitRate : response.unitRate,
					perdayBudget,
					timeKey :  parseInt(timeKey, 10),
					deleted : false,
					deletedAt : moment().toDate(),
					createdAt : moment().toDate(),
					updatedAt : moment().toDate()
				};
				this._service.addBill(billData).then((result) => {
					console.log(result);
					return ResponseBuilder.ok('result', callback);
				 }).catch((errors) => {
					 console.log(errors);
					 return ResponseBuilder.badRequest('401', errors, callback);
				});
			} else {
				return ResponseBuilder.badRequest('401', 'Record Already Exists!', callback);
			}
		}

	}

	public getDetails: ApiHandler = async (event: ApiEvent, context: ApiContext, callback: ApiCallback) => {
		const response = JSON.parse(event.body);
		console.log(response);
		const assetId = response.assetId;
		const startDate = response.startDate;
		const endDate = response.endDate;
		const factType = response.factType;
		const StartDate = new Date(startDate);
		const EndDate = new Date(endDate);
		const billStartTimeKey = moment(startDate).format('YYYYMM');
		const billEndTimeKey = moment(endDate).format('YYYYMM');
		const etlStartTimeKey = moment(startDate).format('YYYYMMDD');
		const etlEndTimeKey = moment(endDate).format('YYYYMMDD');
		if (assetId === undefined || startDate === undefined || endDate === undefined || factType === undefined) {
			return ResponseBuilder.badRequest('401', 'Please provide all the required fields!', callback);
		} else if (EndDate <  StartDate) {
			return ResponseBuilder.badRequest('401', 'Invalid Duration Selected!', callback);
		} else {
			const etldata =  await this._service.etldata(assetId, parseInt(`${etlStartTimeKey}0000`, 10), parseInt(`${etlEndTimeKey}0000`, 10));
			// Const billdata =  await this._service.billdata(assetId, parseInt(billStartTimeKey, 10), parseInt(billEndTimeKey, 10));
			// Console.log(billdata);
			console.log(etldata);
		}
	}

	public softdel: ApiHandler = (event: ApiEvent, context: ApiContext, callback: ApiCallback) => {
		const response = JSON.parse(event.body);
		const billid = response.billId;
		this._service.softDel(billid).then((res) =>
			ResponseBuilder.ok(res, callback));
	}

	public updateData: ApiHandler = (event: ApiEvent, context: ApiContext, callback: ApiCallback) => {
		const response = JSON.parse(event.body);
		const billid = response.billId;
		const budget = response.budget;
		const unitRate = response.unitRate;
		this._service.updateData(billid, budget, unitRate).then((res) =>
			ResponseBuilder.ok(res, callback));
	}

}
