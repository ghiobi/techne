import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'navigation',
    templateUrl: './navigation.component.html',
    styleUrls: [
        '../../../techne/components/navigation/nav/nav.scss'
    ]
})
export class NavigationComponent {
    mainOptions = [
        { label: 'Get Started', routerLink: 'get-started' },
        { label: 'Styles', routerLink: 'styles' },
        { label: 'Components', routerLink: 'components' },
        { label: 'Guides', routerLink: 'guides' },
        { label: 'Tutorials', routerLink: 'tutorials' }
    ];
}
