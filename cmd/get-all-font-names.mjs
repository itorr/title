import fontList from 'font-list';
import { writeFile, writeFileSync } from 'fs'

fontList.getFonts().then(fonts => {
	console.log(fonts);
	
	writeFileSync('font-list.json', JSON.stringify(fonts,0,'\t'));
});