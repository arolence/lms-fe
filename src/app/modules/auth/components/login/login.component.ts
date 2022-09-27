import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreConfigService } from '@core/services/config.service';
import { AuthenticationService } from 'app/auth/service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { AuthService } from '../../service/auth.service';
import { VerificationService } from '../../service/verification.service';
import { SharedDataService } from '@core/services/shared-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  //  Public
  public coreConfig: any;
  public loginForm: UntypedFormGroup;
  public loading = false;
  public submitted = false;
  public returnUrl: string;
  public error = '';
  public verificationError = '';

  public loadingUaePass = false;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   */
  constructor(
    private _coreConfigService: CoreConfigService,
    private _formBuilder: UntypedFormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private _sharedDataService: SharedDataService,
    private _verificationService: VerificationService
  ) {
    // redirect to home if already logged in
    // if (this._authenticationService.currentUserValue) {
    //   this._router.navigate(['/']);
    // }

    this._unsubscribeAll = new Subject();

    // Configure the layout
    this._coreConfigService.config = {
      layout: {
        navbar: {
          hidden: true,
        },
        menu: {
          hidden: true,
        },
        footer: {
          hidden: true,
        },
        customizer: false,
        enableLocalStorage: false,
      },
    };
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this._sharedDataService.registerData.prevPage = 'login';
    this._sharedDataService.registerData.mobile = this.f.mobile.value;
    // this.sendOtp(this.f.mobile.value);
    this._router.navigate(['/auth/home/verify']);
    return;
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.initForms();

    // get return url from route parameters or default to '/'
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';

    // Subscribe to config changes
    this._coreConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config) => {
        this.coreConfig = config;
      });
  }

  initForms() {
    this.loginForm = this._formBuilder.group({
      mobile: ['', [Validators.required]],
    });
  }

  /**
   * Login With UAE Pass
   */
  loginUAE_Pass() {
    this.loadingUaePass = true;
    window.location.href = `https://stg-id.uaepass.ae/idshub/authorize?redirect_uri=${environment.currentUrl}/auth/home/sign-in-uae-pass&client_id=sandbox_stage&response_type=code&state=ShNP22hyl1jUU2RGjTRkpg==&scope=urn:uae:digitalid:profile:general&acr_values=urn:safelayer:tws:policies:authentication:level:low&ui_locales=en`;
  }

  sendOtp(mobileNumber: string) {
    this._verificationService.sendOtp(mobileNumber).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
