import { Component } from '@angular/core';
import { HidScannerService } from 'hid-scanner';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [HidScannerService],
})
export class AppComponent {
    public title: string = 'hid-scanner';

    public scanResult?: string;

    public constructor(
        private scanner: HidScannerService,
    ) {
        this.scanner.onScan(90).subscribe({
            next: e => {
                this.scanResult = e;
                // tslint:disable-next-line: no-console
                console.log('SCAN RESULT: ', e);
            },
        });
    }

    public ngOnDestroy(): void {
        this.scanner.dispose();
    }
}
