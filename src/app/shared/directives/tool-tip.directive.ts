import { Directive, ElementRef, HostListener, Input, OnDestroy } from '@angular/core';

// <input appToolTip [tooltip]="'tooltip'" theme="theme" position="position"/>

@Directive({
    selector: '[appToolTip]'
})
export class ToolTipDirective implements OnDestroy {

    @Input() tooltip = '';                        // ToolTip Text
    @Input() delay?= 190;                         // Optional Delay Input
    @Input() theme: string | null = 'white';      // Color Theme ('dark' // 'white' // null)
    @Input() position: string | null = 'bottom';  // Positions ('top' // 'bottom' // 'left' // 'right')

    private toolTipContent: any;
    private timer: any;

    constructor(private el: ElementRef) { }

    ngOnDestroy(): void {
        if (this.toolTipContent) { this.toolTipContent.remove() }
    }

    @HostListener('mouseenter') onMouseEnter() {
        this.timer = setTimeout(() => {
            let x = this.el.nativeElement.getBoundingClientRect().left;
            let y = this.el.nativeElement.getBoundingClientRect().top;

            switch (this.position) {
                case 'top':
                    break;

                case 'bottom':
                    break;

                case 'left':
                    break;

                case 'right':
                    break;

                default:
                    return;
            }

            this.createTooltipPopup(x, y, this.theme);
        }, this.delay)
    }

    @HostListener('mouseleave') onMouseLeave() {
        if (this.timer) clearTimeout(this.timer);
        if (this.toolTipContent) { this.toolTipContent.remove() }
    }

    private createTooltipPopup(x: number, y: number, theme: string | null) {
        let toolTip = document.createElement('div');

        toolTip.innerHTML = this.tooltip;
        toolTip.setAttribute("class", `tooltip-container theme-${theme}`);
        toolTip.style.top = y.toString() + "px";
        toolTip.style.left = x.toString() + "px";
        document.body.appendChild(toolTip);

        this.toolTipContent = toolTip;
    }
}


/*
TIMEOUT FOR REMOVE AUTOMATICALY TOOLTIP

setTimeout(() => {
    if (this.myPopup) this.myPopup.remove();
}, 1200);
*/
