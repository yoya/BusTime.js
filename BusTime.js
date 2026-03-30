"use strict";

console.log("BusTime.js");

main();

async function main() {
    const focusPoint = getHashParam("fp")
    console.log({focusPoint})
    const fp_url = "data/fp_"+focusPoint+".json";
    const fp_json = await (await fetch(fp_url)).text();
    const fp = JSON.parse(fp_json);
    const busstop_list = fp.busstop;
    for (const busstop of busstop_list) {
	const bs_url = "data/bs_"+busstop.bs+".json";
	const bs_json = await (await fetch(bs_url)).text();
	const bs = JSON.parse(bs_json);
	console.log({bs});
    }
}
