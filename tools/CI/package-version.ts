// tslint:disable:no-console

import * as fs from 'fs';

let packageFile: string = 'package.json';

let pipelineId: string = process.argv[2];

let packageContent: string = fs.readFileSync(packageFile, { encoding: 'utf8' });

let packageObj: { version: string } = JSON.parse(packageContent) as { version: string };

if (packageObj && packageObj.version) {
    let versionList: Array<string> = packageObj.version.split('.');
    if (versionList && versionList.length == 3) {
        versionList[2] = pipelineId;
        console.log(versionList.join('.'));
    }
}
