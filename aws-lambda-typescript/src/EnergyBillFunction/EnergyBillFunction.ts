import { ApiHandler } from '../../shared/api.interfaces';

import { EnergyBillFunctionController } from './EnergyBillFunction.controller';
import { EnergyBillFunctionRepository } from './EnergyBillFunction.repository';
import { EnergyBillFunctionService } from './EnergyBillFunction.service';
import { EtlRepo } from './factsdailyrepo';
const etl: EtlRepo = new EtlRepo();
const repo: EnergyBillFunctionRepository = new EnergyBillFunctionRepository();
const service: EnergyBillFunctionService = new EnergyBillFunctionService(repo, etl);
const controller: EnergyBillFunctionController = new EnergyBillFunctionController(service);

export const  createBill: ApiHandler = controller.createBill;
export const softdelete: ApiHandler = controller.softdel;
export const updatemodel: ApiHandler = controller.updateData;
export const billdetails: ApiHandler = controller.getDetails;
