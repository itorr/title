const canvas = document.createElement('canvas');



const width = 1920;
const height = 1080;


canvas.width = width;
canvas.height = height;

const fontFamily = '腾祥嘉丽粗圆简';


const ctx = canvas.getContext('2d');



const textCanvasDrawPadding = 20;
const generateTextCanvas = config=>{
	const { text, size, color, borderColor, borderScale } = config;
	const fontSize = size;
	const border = borderScale * fontSize / 100;
	const borderSize = border * 2;


	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	ctx.font = `${fontSize}px/${fontSize} ${fontFamily}`;

	canvas.style.cssText = `line-height: ${fontSize}px;`;
	const textWidth = ctx.measureText(text).width;
	const textHeight = fontSize;
	canvas.width = textWidth + borderSize + textCanvasDrawPadding * 2;
	canvas.height = textHeight + borderSize + textCanvasDrawPadding * 2;
	ctx.font = `${fontSize}px/${fontSize} ${fontFamily}`;
	ctx.fillStyle = color;
	ctx.strokeStyle = borderColor;
	ctx.lineWidth = borderSize;
	ctx.lineCap = 'round';
	ctx.lineJoin = 'round';
	ctx.textBaseline = 'top';

	ctx.save();
	const { shadow, shadowColor } = config;
	if(shadow){
		ctx.shadowColor = shadowColor;
		ctx.shadowBlur = shadow;
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 2;
	}

	const padding = textCanvasDrawPadding + border;
	if(borderScale){
		ctx.strokeText(text, padding, padding);
	}
	ctx.restore();

	ctx.fillText(text, padding, padding);

	
	return canvas;

}

const getMojiHeight = (config)=>{
	const { text, size, color, borderColor, borderScale } = config;
	const fontSize = size;
	const border = borderScale * fontSize / 100;
	const borderSize = border * 2;

	return textHeight + borderSize;
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
		textsY = textY + textCanvas.height - textCanvasDrawPadding * 2;
	}

	let index = drawTextCanvasCaches.length;
	while(index--){
		const [textCanvas, x, y] = drawTextCanvasCaches[index];
		ctx.drawImage(
			textCanvas, 
			x - textCanvasDrawPadding, 
			y - textCanvasDrawPadding
		);
	}
	ctx.restore();
	return canvas.toDataURL();
}