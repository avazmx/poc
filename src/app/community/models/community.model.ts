import { CommunityType } from './community-type.model';
import { GeoService } from './geo-services.model';
import { ManageMember } from '../../shared/models/manage-member.model';
import { Governance } from './governance.model';

export class Community {
        public communityId: number;
        public communityType: CommunityType;
        public name: string;
        public description: string;
        public geoServices?: GeoService[];
        public members: ManageMember[];
        public governance: Governance[];
        public attributes?: any;
        public activeTab?: number;
        public activeRow?: number;
        public gridValidator?: any[];
}
