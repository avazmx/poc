import { Component, OnInit, Input } from '@angular/core';
import { CommunityService } from 'src/app/community/services/community.service';

@Component({
  selector: 'ups-communities-details',
  templateUrl: './communities-details.component.html',
  styleUrls: ['./communities-details.component.scss']
})
export class CommunitiesDetailsComponent implements OnInit {
  @Input() communityId: string;
  communityDetails;

  constructor(private communitiesService: CommunityService) { }

  ngOnInit() {
    this.communitiesService.getCommunityDetail(this.communityId)
      .subscribe(data => {
        this.communityDetails = data;
        // console.log(this.communityDetails);
      });
  }

}
