import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegistrationRequestPayload } from 'src/app/registration/registration-request.payload.ts';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
	selector: 'app-registration',
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

	signupRequestPayload: RegistrationRequestPayload;
	signupForm: FormGroup;

	constructor(private authService: AuthService, private router: Router,
		private toastr: ToastrService) {
		this.signupRequestPayload = {
			firstName: '',
			lastName: '',
			birthDate: '',
			phoneNumber: '',
			email: '',
			county: '',
			address1: '',
			address2: '',
			city: '',
			state: '',
			zipCode: ''
		};
	}

	ngOnInit() {
		this.signupForm = new FormGroup({
			firstName: new FormControl('', Validators.required),
			lastName: new FormControl('', Validators.required),
			birthDate: new FormControl('', Validators.required),
			phoneNumber: new FormControl('', Validators.required),
			email: new FormControl('', [Validators.required, Validators.email]),
			county: new FormControl('', Validators.required),
			address1: new FormControl('', Validators.required),
			address2: new FormControl('', Validators.required),
			city: new FormControl('', Validators.required),
			state: new FormControl('', Validators.required),
			zipCode: new FormControl('', Validators.required),
		});
	}

	signup() {
		this.signupRequestPayload.firstName = this.signupForm.get('firstName').value;
		this.signupRequestPayload.lastName = this.signupForm.get('lastName').value;
		this.signupRequestPayload.birthDate = this.signupForm.get('birthDate').value;
		this.signupRequestPayload.phoneNumber = this.signupForm.get('phoneNumber').value;
		this.signupRequestPayload.email = this.signupForm.get('email').value;
		this.signupRequestPayload.county = this.signupForm.get('county').value;
		this.signupRequestPayload.address1 = this.signupForm.get('address1').value;
		this.signupRequestPayload.address2 = this.signupForm.get('address2').value;
		this.signupRequestPayload.city = this.signupForm.get('city').value;
		this.signupRequestPayload.state = this.signupForm.get('state').value;
		this.signupRequestPayload.zipCode = this.signupForm.get('zipCode').value;

		this.authService.register(this.signupRequestPayload)
			.subscribe(data => {
				window.alert('Successfully Registered. Your Registration ID is : '+ data);
			}, error => {
				console.log(error);
				this.toastr.error('Registration Failed! Please try again');
			});
	}
}
