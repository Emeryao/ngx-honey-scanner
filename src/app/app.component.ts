import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { HidScannerService } from 'hid-scanner';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [HidScannerService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnDestroy {

    public title: string = 'hid-scanner';

    public scanResult?: string;

    public constructor(
        private readonly scanner: HidScannerService,
    ) {
        this.scanner.onScan(90).subscribe({
            next: res => {
                this.scanResult = res;
                // eslint-disable-next-line no-console
                console.log('SCAN RESULT:', res);
            },
        });
    }

    public ngOnDestroy(): void {
        this.scanner.dispose();
    }

}
