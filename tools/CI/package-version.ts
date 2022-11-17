/* eslint-disable no-console */

import * as fs from 'node:fs';

const packageFile: string = 'package.json';

const pipelineId: string = process.argv[2];

const packageContent: string = fs.readFileSync(packageFile, { encoding: 'utf8' });

const packageObj: { version: string } = JSON.parse(packageContent) as { version: string };

if (packageObj?.version) {
    const versionList: Array<string> = packageObj.version.split('.');
    if (Array.isArray(versionList) && versionList.length == 3) {
        versionList[2] = pipelineId;
        console.log(versionList.join('.'));
    }
}
