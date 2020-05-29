import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent implements OnInit {

  createProfileForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
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

}
