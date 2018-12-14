import { State } from 'src/app/shared/models/state.model';
import { BussinesUnit } from './bussines-unit.model';

export class GeoService {
    public id: number;
    public state: State;
    public slicRangeLow: number;
    public slicRangeHigh: number;
    public bussinesUnit: BussinesUnit;
    public ground: number;
    public treeDs: number;
    public twoDs: number;
    public oneDs: number;
}
