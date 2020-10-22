import { AfterContentInit, Component, ContentChild, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { PasswordInputDirective } from '../directives/password-input.directive';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements AfterContentInit, OnDestroy {
  @ContentChild(PasswordInputDirective) passwordInput: PasswordInputDirective;

  @Input() showHint: boolean

  showPasswordHelp: boolean = false;
  _focusUnListner;
  _blurUnListner;

  constructor(private renderer: Renderer2) { }

  inputHtmlElement: HTMLInputElement;

  ngAfterContentInit(): void {
    this.inputHtmlElement = this.passwordInput.input.nativeElement as HTMLInputElement;

    if (this.showHint) {
      this._focusUnListner = this.renderer.listen(this.inputHtmlElement, 'focus', () => { this.showPasswordHelp = true });
      this._blurUnListner = this.renderer.listen(this.inputHtmlElement, 'blur', () => { this.showPasswordHelp = false })
    }
  }

  ngOnInit(): void {
  }

  togglePasswordVisisbility() {
    this.inputHtmlElement.type === 'password' ? this.inputHtmlElement.type = 'text' : this.inputHtmlElement.type = 'password';
  }

  //validation functions
  validateLength() {
    return this.inputHtmlElement.value.length > 5
  }
  validateLowerCase() {
    return this.inputHtmlElement.value.match(/[a-z]/);
  }
  validateUpperCase() {
    return this.inputHtmlElement.value.match(/[A-Z]/);
  }

  ngOnDestroy(): void {
    this._focusUnListner();
    this._blurUnListner();
  }

  debug() {
    console.log('clickced');
  }

}
