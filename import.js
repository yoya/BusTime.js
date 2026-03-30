var HTMLParser = require('node-html-parser');

// こちらのサイトを取り込むスクリプト
// https://transfer.navitime.biz/sotetsu/pc/map/Top

// 綾瀬車庫 綾41	 ＜小園団地経由＞ 海老名駅ゆき 
const url = 'https://transfer.navitime.biz/sotetsu/pc/diagram/BusDiagram?orvCode=00140277&course=0003400148&stopNo=9&date=2026-03-27'

const fs = require('fs');

main();

// 改行までの文字を抜き出す
function get_first_word(node) {
    const text = node.textContent.trim();
    const word = text.substr(0, text.indexOf('\n'));
    return word;
}
    
function get_mm_values(node) {
    const values = [];
    const table = node.querySelectorAll(".mm");
    for (entry of table) {
	const value = entry.textContent.trim();
	values.push(parseInt(value, 10));
    }
    return values;
}

function main() {
    const jsonObject = {};
    const text = fs.readFileSync("diagram.html", {encoding: 'utf-8'});
    // const text = await (await fetch(url)).text();
    const root =  HTMLParser.parse(text);
    const area = root.querySelector("#subject-area");
    const area_name = get_first_word(area);
    const course = root.querySelector("#course-label-table");
    const course_name = get_first_word(course);
    const destination = root.querySelector(".td-destination");
    const destination_name = get_first_word(destination);
    // console.log({area_name, course_name, destination_name});
    jsonObject.area = area_name;
    jsonObject.course = course_name;
    jsonObject.destination = destination_name;
    //
    const timeTable_weekday = [];
    const timeTable_saturday = [];
    const timeTable_sunday = [];
    const diagram = root.querySelector(".diagram-table");
    const table = diagram.querySelectorAll(".l2");
    for (entry of table) {
	const hour = entry.querySelector(".hour");
	const wkd = entry.querySelector(".wkd");
	const std = entry.querySelector(".std");
	const snd = entry.querySelector(".snd");
	// console.log({hour,wkd,std,snd});
	const hour_value = hour.textContent.trim();
	const weekday_values = get_mm_values(wkd);
	const saturday_values = get_mm_values(std);
	const sunday_values = get_mm_values(snd);
	// console.log(hour_value, weekday_values, saturday_values, sunday_values);
	timeTable_weekday.push([hour_value, weekday_values]);
	timeTable_saturday.push([hour_value, saturday_values]);
	timeTable_sunday.push([hour_value, sunday_values]);
    }
    jsonObject.timeTable = { weekday: timeTable_weekday,
			     saturday: timeTable_saturday,
			     sunday: timeTable_sunday };
    let json = JSON.stringify(jsonObject, null, 2);
    let sb_depth = 0; // square brackets depth
    json = json.split('').map((c) => {
	if (c=='[') sb_depth++;
	if (c==']') sb_depth--;
	return (sb_depth > 1)? c.replace(/\s/g, ''): c;
    }).join('');
    json = json.replaceAll(/,([^,]+)/g, ', $1');
    console.log(json);
}

