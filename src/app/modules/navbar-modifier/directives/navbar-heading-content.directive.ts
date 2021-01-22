import { Directive, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { NavbarService } from '../../navbar/services/navbar.service';

@Directive({
  selector: '[appNavbarHeadingContent]'
})
export class NavbarHeadingContentDirective implements OnInit, OnDestroy {

  constructor(
    private navBarService: NavbarService,
    private host: TemplateRef<any>) { }
  ngOnInit(): void {
    this.navBarService.setTemplate(this.host)
  }

  ngOnDestroy(): void {
    this.navBarService.setTemplate(null)
  }

  setTemplate() {
    this.navBarService.setTemplate(this.host)
  }

  removeTemplate() {
    this.navBarService.setTemplate(null);

  }

}
