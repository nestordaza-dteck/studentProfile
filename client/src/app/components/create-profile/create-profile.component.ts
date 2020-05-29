import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent implements OnInit {

  createProfileForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.createProfileForm = this.formBuilder.group({
      studentId: [''],
      firstName: [''],
      lastName: [''],
      email: [''],
      dob: [''],
      gender: [''],
      address: [''],
      description: ['']
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

}
