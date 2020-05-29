import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ProfileService } from 'src/app/services/profile.service';
import { ToastrService } from 'ngx-toastr';
import { Profile } from 'src/app/model/profile';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent implements OnInit {

  createProfileForm: FormGroup;

  @ViewChild('closeButton', {
    static: false
  }) closeButton;

  profiles: Profile[];

  constructor(private formBuilder: FormBuilder, private profileService: ProfileService, private toastr: ToastrService) {
    //Model driven reactive form
    this.createProfileForm = this.formBuilder.group({
      studentId: ['', [Validators.required, Validators.maxLength(8)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.getProfiles();
  }

  // Get form controls for validation
  get formControls() {
    return this.createProfileForm.controls;
  }

  resetForm() {
    this.createProfileForm.reset();
    this.createProfileForm.get('gender').setValue("");
  }

  addProfile() {
    let profileData = {};
    
    //Creating an array of form control objects
    let controls = Object.keys(this.createProfileForm.controls);

    //Converting form values into object
    for (let control of controls) {
      profileData[control] = this.createProfileForm.get(control).value;
    }

    this.profileService.addProfile(profileData).subscribe(res => {
      if (res) {
        this.toastr.success("New Profile Created");
        this.createProfileForm.reset();
        this.getProfiles();
      }
    }, err => {
      if (err.includes('409'))
        this.toastr.error("Student ID is already present");
      else
        console.log(err);
    });
  }

  // Method to close the Modal popup
  close() {
    this.closeButton.nativeElement.click();
  }

  getProfiles() {
    this.profileService.getProfiles().subscribe(res => {
      this.profiles = res;
    }, error => console.log(error));
  }
}
