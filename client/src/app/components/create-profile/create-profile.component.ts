import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ProfileService } from 'src/app/services/profile.service';
import { ToastrService } from 'ngx-toastr';

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
  
  constructor(private formBuilder: FormBuilder, private profileService: ProfileService, private toastr: ToastrService) {
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
  }

  // Get Form Controls for Validation
  get formControls() {
    return this.createProfileForm.controls;
  }

  resetForm() {
    this.createProfileForm.reset();
    this.createProfileForm.get('gender').setValue("");
  }

  addProfile() {
    let profileData = {};
    let controls = Object.keys(this.createProfileForm.controls);
    // converting form values into object
    for (let control of controls) {
      profileData[control] = this.createProfileForm.get(control).value;
    }

    this.profileService.addProfile(profileData).subscribe(res => {
      if (res) {
        this.toastr.success("New Profile Created");
        this.createProfileForm.reset();
      }
    }, err => {
      if (err.includes('409'))
        this.toastr.error("Student ID is already present");
      else
        console.log(err);
    });
  }

  close() {
    this.closeButton.nativeElement.click();
  }
}
