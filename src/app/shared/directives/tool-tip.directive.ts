import { Directive, ElementRef, HostListener, Input, OnDestroy, Renderer2 } from '@angular/core';

/*
    <Element appToolTip tooltip="tooltip" theme="theme" position="position" [delay]="10"><Element/>

        -- tooltip:   Text that will fill the tooltip.

        -- delay:     Delay to show content.

        -- theme:     Light or dark theme selector.
            |_ dark & white.

        -- position:  Tooltip position referring to the component.
            |_ top & bottom & left & right.


     CSS Recommended:
        .tooltip {
            width: auto;
            max-width: 250px;
            position: absolute;
            text-align: center;
            font-size: 14px;
            padding: 6px 10px;
            border-radius: 4px;
            line-height: initial;
            z-index: 1000;
            opacity: 0;
            animation: 0.18s ease-out;
            pointer-events: none;

                &-dark {
                    color: white;
                    background: #202124;
                }

                &-white {
                    color: #5e5e5e;
                    background: white;
                }
        }

        .tooltip-show {
            opacity: 1;
        }
*/

@Directive({
    selector: '[appToolTip]'
})
export class ToolTipDirective {

    @Input() tooltip: string = '';
    @Input() delay: number = 100;
    @Input() theme: string = 'white';
    @Input() position: string = 'bottom';

    private toolTipContent: any //HTMLElement
    private offset: number = 10;

    constructor(private el: ElementRef, private renderer: Renderer2) { }

    @HostListener('mouseenter') onMouseEnter() {
        if (!this.toolTipContent) {
            this.createToolTip();
            this.setPosition();
            this.renderer.addClass(this.toolTipContent, 'tooltip-show');
        }
    }

    @HostListener('mouseleave') onMouseLeave() {
        if (this.toolTipContent) {
            this.renderer.removeClass(this.toolTipContent, 'tooltip-show');

            window.setTimeout(() => {
                this.renderer.removeChild(document.body, this.toolTipContent);
                this.toolTipContent = null;
            }, this.delay);
        }
    }


    private createToolTip() {
        this.toolTipContent = this.renderer.createElement('span');

        this.renderer.appendChild(
            this.toolTipContent,
            this.renderer.createText(this.tooltip)
        );

        this.renderer.appendChild(document.body, this.toolTipContent);

        this.renderer.addClass(this.toolTipContent, 'tooltip');
        this.renderer.addClass(this.toolTipContent, `tooltip-${this.position}`);
        this.renderer.addClass(this.toolTipContent, `tooltip-${this.theme}`);
        this.renderer.setStyle(this.toolTipContent, 'transition', `opacity ${this.delay}ms`);
    }

    private setPosition() {
        const basePosition = this.el.nativeElement.getBoundingClientRect();
        const tooltipPosition = this.toolTipContent.getBoundingClientRect();

        const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

        let top, left;

        switch (this.position) {
            case 'top':
                top = basePosition.top - tooltipPosition.height - this.offset;
                left = basePosition.left + (basePosition.width - tooltipPosition.width) / 2;
                break;

            case 'bottom':
                top = basePosition.bottom + this.offset;
                left = basePosition.left + (basePosition.width - tooltipPosition.width) / 2;
                break;

            case 'left':
                top = basePosition.top + (basePosition.height - tooltipPosition.height) / 2;
                left = basePosition.left - tooltipPosition.width - this.offset;
                break;

            case 'right':
                top = basePosition.top + (basePosition.height - tooltipPosition.height) / 2;
                left = basePosition.right + this.offset;
                break;
        }

        this.renderer.setStyle(this.toolTipContent, 'top', `${top + scrollPos}px`);
        this.renderer.setStyle(this.toolTipContent, 'left', `${left}px`);
    }
}
