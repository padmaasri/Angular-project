import { Component, OnInit, } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AppLoaderService } from "app/core/services/app-loader.service";
import { ErrorMessageV2Service } from "app/core/services/error-message-v2.service";
import { TgsstoasterService } from "app/core/services/tgsstoaster.service";
import { UsageLimitService } from "./service/usage-limit.service";

@Component({
  selector: 'app-set-usage-limit',
  templateUrl: './set-usage-limit.component.html',
  styleUrls: ['./set-usage-limit.component.css']
})

export class SetUsageLimitComponent {

  usageLimitForm: FormGroup;
  errorMessagelabels: any[] = [
    { name: 'rolename', label: 'role name', type: 'provide' }
  ]
  constructor(private formBuilder: FormBuilder,
    private service: UsageLimitService,
    private loader: AppLoaderService,
    private toaster: TgsstoasterService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private invalidservice: ErrorMessageV2Service,) { }

  ngOnInit() {
    this.usageLimitForm = this.formBuilder.group({
      duration: new FormControl('', [Validators.required]),
    });
  }

  update() {
    if (this.usageLimitForm.valid) {
      var form = this.usageLimitForm.value
      let obj =
      {

        'duration': form?.duration
      }
      console.log(obj, "obj")
      this.loader.open();
      this.service.update(obj).subscribe((res: any) => {
        if (res.status == true) {
          this.loader.close();
          this.toaster.successToaster(res.message);
        } else {
          this.loader.close();
          this.toaster.errorToaster(res.message);
        }
      }, error => {
        this.toaster.errorToaster(error?.message ? error?.message : 'Try again.');
      });
    } else {
      let invalidControl: any;
      invalidControl = this.invalidservice.invalidControls(this.usageLimitForm);
      if (invalidControl.length > 0) {
        this.invalidservice.throwErrorMessage(this.usageLimitForm, invalidControl, this.errorMessagelabels);
      }
    }
  }
}
