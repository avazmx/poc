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

        /**
         *
         */
        constructor() {
                this.communityId = 0;
                this.communityType = null;
                this.name = '';
                this.description = '';
                this.geoServices = null;
                this.members = null;
                this.governance = null;
                this.attributes = null;
                this.activeTab = 1;
                this.activeRow = -1;
                this.gridValidator = [];
        }
}
