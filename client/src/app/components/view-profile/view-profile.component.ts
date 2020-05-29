import { Component, OnInit } from '@angular/core';
import { Profile } from '../../model/profile';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {
  params: string;
  profilePicture: string = "";
  letterURL: string = "../../../assets/images/Letters/Letter";
  profile: Profile;
  constructor(private activatedRoute: ActivatedRoute, private profileService: ProfileService, private route: Router) { }

  // On Page Load
  ngOnInit() {
    this.activatedRoute.params.subscribe(data => {
      this.params = data['studentId'];
      this.getProfileDetails(this.params);
    })
  }

  // Get Individual Profile Details
  getProfileDetails(id) {
    this.profileService.getProfileDetails(id).subscribe(res => {
      let data = res[0];
      if (data) {
        let profile = res[0].firstName.charAt(0).toUpperCase()
        // Maps the image based on the first letter of first name
        this.profilePicture = `${this.letterURL + profile}.jpg`;
        this.profile = data;
      }
      // Accessing unavailable profile, routes back to create-profile page
      else {
        this.route.navigate(['create-profile']);
      }
    })
  }
}
