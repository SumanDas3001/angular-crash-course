import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective implements OnInit {

  color: string = 'red';

  constructor(private element: ElementRef, private render: Renderer2) {
    console.log(this.element.nativeElement);
  }

  ngOnInit(): void {
    this.element.nativeElement.style.backgroundColor = this.color;
  }

  /* HostListener will listen to any which happening on the component where this perticular directive is applied */

  @HostListener('mouseenter') onMouseenter(){
    this.render.setStyle(
      this.element.nativeElement,
      'backgroundColor',
      'green'
    )
  }

  @HostListener('mouseleave') onMouseLeave(){
    this.render.setStyle(
      this.element.nativeElement,
      'backgroundColor',
      'white'
    )
  }

}
