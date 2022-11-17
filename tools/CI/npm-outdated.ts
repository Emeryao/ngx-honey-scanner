/* eslint-disable no-console */
const json: string = process.argv[2];

if (!json) {
    process.exit(0);
}

interface OutputRes { current: string; wanted: string; latest: string; location: string }

try {
    const output: Record<string, OutputRes> = JSON.parse(json) as Record<string, OutputRes>;

    const outdated: Array<OutputRes> = new Array<OutputRes>();

    for (const key in output) {
        if (Reflect.has(output, key)) {
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
} catch (error: unknown) {
    console.log(error);
    process.exit(0);
}
