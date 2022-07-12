import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'ToolTip-Atlas';

    public Dynamic: string = 'Dynamic tooltip';
    public textDynamic: string = "This tooltip is Dynamic and does Not have a Theme defined by default, its default color being White";
}
