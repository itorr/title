const canvas = document.createElement('canvas');



const width = 1920;
const height = 1080;


canvas.width = width;
canvas.height = height;

const fontFamily = '腾祥嘉丽粗圆简';


const ctx = canvas.getContext('2d');

const generateTextCanvas = config=>{
	const { text, size, color, borderColor, borderScale } = config;
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	const fontSize = size;
	const border = borderScale * fontSize / 100;
	const borderSize = border * 2;


	ctx.font = `${fontSize}px/${fontSize} ${fontFamily}`;

	canvas.style.cssText = `line-height: ${fontSize}px;`;
	const textWidth = ctx.measureText(text).width;
	const textHeight = fontSize;
	canvas.width = textWidth + borderSize;
	canvas.height = textHeight + borderSize;
	ctx.font = `${fontSize}px/${fontSize} ${fontFamily}`;
	ctx.fillStyle = color;
	ctx.strokeStyle = borderColor;
	ctx.lineWidth = borderSize;
	ctx.lineCap = 'round';
	ctx.lineJoin = 'round';
	ctx.textBaseline = 'top';

	if(borderScale){
		ctx.strokeText(text, border, border);
	}

	ctx.fillText(text, border, border);

	
	return canvas;

}
const generateTitleImage = (config)=>{
	ctx.save();


	ctx.clearRect(0, 0, width, height);

	const { margin } = config;

	ctx.transform(1, 0, 0, 1, margin, margin);

	let textsY = 0;


	// let index = config.texts.length;

	// while(index--){

	let drawTextCanvasCaches = [];

	for(let index = 0; index < config.texts.length; index++ ){
		const text = config.texts[index];
		const textCanvas = generateTextCanvas(text);
		const textY = textsY + text.yShift;
		// ctx.drawImage(textCanvas, 0, textY);
		drawTextCanvasCaches.push([
			textCanvas,
			0,
			textY
		]);
		textsY += textY +  + textCanvas.height;
	}

	let index = drawTextCanvasCaches.length;
	while(index--){
		const [textCanvas, x, y] = drawTextCanvasCaches[index];
		ctx.drawImage(textCanvas, x, y);
	}
	ctx.restore();
	return canvas.toDataURL();
}