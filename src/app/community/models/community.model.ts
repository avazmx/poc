import { CommunityType } from './community-type.model';
import { GeoService } from './geo-services.model';
import { GovernanceLevel } from './governance-level.model';
import { Member } from '../../shared/models/member.model';

export class Community {
        public communityId: number;
        public communityType: CommunityType;
        public name: string;
        public description: string;
        public geoServices?: GeoService[];
        public members: Member[];
        public governance: GovernanceLevel[];
        public attributes?: any;
        public activeTab?: number;
        public activeRow?: number;
}
