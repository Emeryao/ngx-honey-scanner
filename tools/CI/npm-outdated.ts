// tslint:disable: no-console

let json: string = process.argv[2];

if (!json) {
    process.exit(0);
}

interface OutputRes { current: string; wanted: string; latest: string; location: string; }

try {
    let output: { [key: string]: OutputRes } = JSON.parse(json) as { [key: string]: OutputRes };

    let outdated: Array<OutputRes> = new Array<OutputRes>();

    for (const key in output) {
        if (output.hasOwnProperty(key)) {
            const res: OutputRes = output[key];
            if (res.current != res.wanted) {
                outdated.push(res);
            }
        }
    }

    if (outdated.length > 0) {
        console.log('💀 outdated dependencies detected:');
        console.log(json);
        process.exit(1);
    } else {
        console.log('🎉 all dependencies are up to date');
    }
} catch (error) {
    console.log(error);
    process.exit(0);
}
