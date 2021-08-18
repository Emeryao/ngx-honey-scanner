# HID Scanner 🐝  
a service to get the string from a HID scanner device like Honeywell `HH450`  

## Installation

```sh
$ npm install @ng-all/hid-scanner
```

## Usage

```typescript
@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnDestroy {

    private scannerSubscription?: Subscription;

    public constructor(
        // provided in a *tank* module
        private scanner: HoneyScannerService,
    ) {
        
        // adjust the threshold of milliseconds for different sanner devices default is 99
        let threshold:number = 99;

        this.scannerSubscription = this.scanner.onScan(threshold).subscribe({
            next: e => {
                // scan result here
                console.log(e);
            },
        });
    }

    // for plain Angular project
    public ngOnDestroy(): void {
        if (this.scannerSubscription) {
            this.scanner.dispose();
            this.scannerSubscription.unsubscribe();
        }
    }

    // for Ionic project
    public ionViewWillLeave(): void {
        if (this.scannerSubscription) {
            this.scanner.dispose();
            this.scannerSubscription.unsubscribe();
        }
    }

}
```

## Tips
* the service will not working if a component is navigated by a `a[routerLink]` since the ***enter*** key from the scanner is missing after a `a[routerLink]` navigation so try to use a `div[routerLink]` instead  
* it is recommended to provide the service in a component instead of a module
* do not forget to `unsubscribe` and `dispose`
