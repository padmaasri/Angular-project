import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output, Pipe, PipeTransform, ViewChild, computed, effect, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { ToastrService } from 'ngx-toastr';
import { pipe } from 'rxjs';
export function fileSize(sizeInMB: number) {
  return sizeInMB * 1024 * 1024;
}
export function imageSizeValidator(maxSize: number) {
  return (control) => {
    const file = control.value;
    if (file) {
      const sizeInBytes = file.size;
      if (sizeInBytes > maxSize) {
        return { imageSizeExceeded: true };
      }
    }
    return null;
  };
}
export function imageFormatValidator(control: AbstractControl): ValidationErrors | null {
  const file = control.value as File;

  if (!file) {
    return null; // No file selected, no validation error
  }

  const allowedFormats = ['image/png',];
  const isValidFormat = allowedFormats.includes(file.type);

  return isValidFormat ? null : { invalidImageFormat: true };
}
@Component({
  selector: 'app-signal-concept',
  templateUrl: './signal-concept.component.html',
  styleUrls: ['./signal-concept.component.css']
})

export class SignalConceptComponent {
  // @HostListener('click') click() {
  //   alert("heloo"); alert("welcoommme");[1, 2]
  // }

  @Output() userNameEvent = new EventEmitter<string>();

  userName = '';



  setUserName(): void {
    this.userNameEvent.emit(this.userName);
  }
  @HostBinding('style.border') border: string;

  url = 'https://ionicframework.com/docs/img/demos/avatar.svg'
  isValidImageFormat(file: File): boolean {
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    return validImageTypes.includes(file.type);
  }
  registrationForm: FormGroup
  selectedFile: File | null = null;
  public loading = false;
  imageUrl: any = this.url;
  @ViewChild('fileInput') el: ElementRef;


  form: FormGroup
  submitted: boolean;
  shareOnTwitter(imageUrl: string) {
    const tweetText = 'Check out this image!';
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(imageUrl)}`;

    window.open(tweetUrl, 'Twitter Share', 'width=600,height=300');
  }
  selectedImage: string = '';

  constructor(private fb: FormBuilder,
    private router: Router, private postmethod: ServiceService, private cd: ChangeDetectorRef,
    private toastr: ToastrService) {
    this.form = this.fb.group({
      Username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
    this.registrationForm = this.fb.group({
      file: [null, Validators.required, imageFormatValidator]
    })

  }


  mypromise: any = 'hello'

  ngOnInit() {

    //this.onSubmit()
    // this.mypromise.then((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve("successfily")
    //   }, 100)
    // }).catch((error) => {
    //   console.log(error, "err")
    // })
  }

  errorMessage: string = ''
  submit() {
    if (this.form.valid) {
      let signdata = this.form.value
      let formdata = new FormData()
      formdata.append('username', signdata.Username);
      formdata.append('password', signdata.password);
      console.log(formdata, "value..")
      this.postmethod.postlogin(formdata).subscribe((res) => {
        console.log(res)
        this.toastr.success('This is a success message', 'Success');
        this.router.navigate(['/'])
      }

      )

    }

  }
  @HostListener('ngSubmit') onSubmit() {
    console.log("hitt")
    if (this.registrationForm.valid) {
      const image = this.registrationForm.value
      const formData = new FormData();
      formData.append('file', image.file);
      console.log(formData, 'image')
      this.postmethod.uploadImage(formData).subscribe((response: any) => {
        console.log(response, 'response')
      });
    }
  }
  @HostListener('change') uploadFile(event) {
    console.log("hitt value...>")
    const maxSizeBytes = 720 * 50;
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    console.log(file, "file")
    const validSize = file.size;
    if (maxSizeBytes > file.size) {
      if (file && this.isValidImageFormat(file)) {
        if (event.target.files && event.target.files[0]) {
          this.loading = true
          setTimeout(() => {
            reader.readAsDataURL(file);
            this.toastr.success("Image Uploader Successfully.")
            this.loading = false
            reader.onload = () => {
              this.imageUrl = reader.result;
              this.registrationForm.patchValue({
                file: reader.result
              });
            }
            this.cd.markForCheck();
          }, 500)
        }
      } else {
        this.toastr.warning("'Please select a valid image file (e.g., JPG, PNG).'.")
      }


    }
    else {
      this.toastr.warning("'File size should be 720 x 50.")
    }


  }
  removeImage(imageUrlToRemove: string | null): void {
    if (imageUrlToRemove === this.imageUrl) {
      this.toastr.error("Deleted Successfully.")
      this.imageUrl = this.url;
    }
  }
}
