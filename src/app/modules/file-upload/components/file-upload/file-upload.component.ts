import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { combineLatest, forkJoin, merge, Observable } from 'rxjs';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  constructor(private renderer: Renderer2) { }
  @ViewChild('fileInput', { read: ElementRef }) fileInput: ElementRef;

  @HostListener('click')
  onClick() {
    if (this.accept) this.renderer.setAttribute(this.fileInput.nativeElement, 'accept', this.accept.toString())
    this.fileInput.nativeElement.click();
  }

  @Input() validators: Array<(file: File) => string | null>;
  @Input() asyncValidators: Array<(file: File) => Observable<boolean>>;
  @Input() accept: Array<string>;
  // @Input() uploadApiFunction: (file: File) => Observable<string>;

  @Output() error = new EventEmitter<string>();
  @Output() file = new EventEmitter<File>();
  @Output() url = new EventEmitter<string>();

  initiateFileUpload() {
    this.fileInput.nativeElement.click();
  }

  onFileChanged(event) {

    let fileToUpload = event.target.files[0];
    if (fileToUpload) {
      if (this.validators) {
        for (let i = 0; i < this.validators.length; i++) {
          const validation = this.validators[i](fileToUpload);
          if (validation) {
            this.error.emit(validation)
            return;
          }
        }
      }

      if (this.asyncValidators && this.asyncValidators.length > 0) {
        console.log('constructing async validators,', this.asyncValidators.map(v => v(fileToUpload)), fileToUpload);
        forkJoin(this.asyncValidators.map(v => v(fileToUpload))).subscribe(
          (res) => this.file.emit(fileToUpload),
          (res) => this.error.emit(res)
        )
      } else {
        this.file.emit(fileToUpload);
      }

      // if (this.uploadApiFunction) {
      //   this.uploadApiFunction(fileToUpload).subscribe(
      //     (url) => this.url.emit(url)
      //   )
      // }
      // else this.file.emit(fileToUpload);
      // this.fileInput.nativeElement.value = '';
    }
    //   if (fileUptoLoad) {
    //     if (!this.dataService.validateFileExtension(this.fileUptoLoad.name)) {
    //     //   this.alertservice.showNotification('Selected file format is not supported', 'error')
    //     //   return false;
    //     // }
    //     // if (!this.dataService.validateFileSize(this.fileUptoLoad.size)) {
    //     //   this.alertservice.showNotification('File to be uploaded should be less than 5MB', 'error');
    //     //   return false;
    //     // }
    //     let reader = new FileReader();
    //     reader.readAsDataURL(this.fileUptoLoad);

    //     reader.onload = (e: any) => {
    //       var img = new Image();
    //       img.src = e.target.result;
    //       img.onload = () => {
    //         if (img.width < 500 || img.height < 500) {
    //           this.alertservice.showNotification('Minimum size 500*500 pixel', 'error')
    //           return false;
    //         }
    //         let form_data = new FormData();
    //         form_data.append('store_image', this.fileUptoLoad);
    //         this.alertservice.showLoader();
    //         this.restApiservice.pushSaveFileToStorageWithFormdata(form_data, 'store/logo', (response) => {
    //           if (response && response['success']) {
    //             this.alertservice.hideLoader();
    //             this.imageUrl = response['data'];
    //           } else if (response && !response['success']) {
    //             this.imageUrl = null;
    //             this.alertservice.hideLoader();
    //             this.alertservice.showNotification(response['message'], 'error');
    //           } else {
    //             this.imageUrl = null;
    //             this.alertservice.hideLoader();
    //             this.alertservice.showNotification('Something went wrong, Please try again', 'error');
    //           }
    //         }
    //           , err => this.imageUrl = null);
    //       };
    //     }


    //   } else {
    //     this.alertservice.showNotification('No file selected', 'error');
    //   }
    // }

  }

}
