import { Injectable } from '@angular/core';
import { fromEvent, Observable, Subject, Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HidScannerService {

    private keyEventSubscription?: Subscription;

    private chunk: string = '';

    private lastTimestamp: number = 0;

    private readonly result: Subject<string> = new Subject<string>();

    public onScan(threshold: number = 99): Observable<string> {
        this.keyEventSubscription = fromEvent<KeyboardEvent>(document, 'keypress').subscribe({
            next: event => {
                if (this.lastTimestamp == 0 || event.timeStamp - this.lastTimestamp < threshold) {
                    if (event.key == 'Enter') {
                        event.preventDefault();
                        this.result.next(this.chunk);
                        this.chunk = '';
                        this.lastTimestamp = 0;
                    } else {
                        this.chunk += event.key;
                        this.lastTimestamp = event.timeStamp;
                    }
                } else if (event.timeStamp - this.lastTimestamp > threshold) {
                    this.chunk = event.key;
                    this.lastTimestamp = event.timeStamp;
                }
            },
        });
        return this.result.asObservable();
    }

    public dispose(): void {
        this.chunk = '';
        this.lastTimestamp = 0;
        this.keyEventSubscription?.unsubscribe();
    }

}
