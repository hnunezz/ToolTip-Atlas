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
        console.log(this.tooltip)

        this.timer = setTimeout(() => {
            let x = this.el.nativeElement.getBoundingClientRect().left;
            let y = this.el.nativeElement.getBoundingClientRect().top;

            switch (this.position) {
                case 'top':
                    x = this.el.nativeElement.getBoundingClientRect().left + (this.el.nativeElement.offsetWidth / 2);
                    y = this.el.nativeElement.getBoundingClientRect().top - (this.calculateHeightByLetters() + 6);
                    break;

                case 'bottom':
                    x = this.el.nativeElement.getBoundingClientRect().left + (this.el.nativeElement.offsetWidth / 2);
                    y = this.el.nativeElement.getBoundingClientRect().top + (this.el.nativeElement.offsetHeight + 6);
                    break;

                case 'left':
                    break;

                case 'right':
                    x = this.el.nativeElement.getBoundingClientRect().right ;
                    y = this.el.nativeElement.getBoundingClientRect().top + (this.el.nativeElement.offsetHeight / 8);
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

        toolTip.innerHTML = `<p>${this.tooltip}</p>`
        toolTip.setAttribute("class", `tooltip-container theme-${theme}`);
        toolTip.style.top = y.toString() + "px";
        toolTip.style.left = x.toString() + "px";

        document.body.appendChild(toolTip);

        this.toolTipContent = toolTip;
    }

    private calculateHeightByLetters(): number {
        let lines = Math.round(this.tooltip.length / 32);

        if (lines == 0) return 26;

        let heights = (lines * 16) + 12;

        return heights;
    }

    private calculateWidthByLetters(): number {
        let p = document.createElement('p');
        p.innerHTML = this.tooltip;

        let width = p.clientWidth;

        if (width > 130) {
            return 148.458;
        } else {
            return width + 24;
        }
    }
}


/*
TIMEOUT FOR REMOVE AUTOMATICALY TOOLTIP

setTimeout(() => {
    if (this.myPopup) this.myPopup.remove();
}, 1200);
*/
