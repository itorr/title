
const defaultConfig = Object.freeze({
	margin: 10,
	texts: [
		{
			text: '大标题',
			size: 140,
			color: '#FFF',
			borderScale: 10,
			borderColor: '#000000',
			yShift: 0,
		},
		{
			text: '小标题',
			size: 80,
			color: '#FFF',
			borderScale: 10,
			borderColor: '#000000',
			yShift: 0,
		},
	]
});


const sesionKey = 'title-image-config';
const savedConfig = JSON.parse(sessionStorage.getItem(sesionKey)||'{}');

const config = Object.assign({}, defaultConfig, savedConfig);



const app = new Vue({
	el: '.app',
	data: {
		outputImageURL: null,
		config,
		currentBackground: 'white',
		backgrounds: [
			'white',
			'transparent',
			'black',
			'gray',
		],
		timer: null
	},
	watch: {
		config: {
			handler: '_generate',
			deep: true
		}
	},
	methods: {
		generate(){
			this.saveConfig();
			const url = generateTitleImage(this.config);
			this.outputImageURL = url;
		},
		_generate(){
			clearTimeout(this.timer);
			this.timer = setTimeout(()=>{
				this.generate();
			}, 100);
		},
		saveConfig(){
			sessionStorage.setItem(sesionKey, JSON.stringify(this.config));
		},
		resetConfig(){
			this.config = structuredClone(defaultConfig);
		}
	}
});



const font = new FontFace(
	'腾祥嘉丽粗圆简',
	'url(TENGXIANGJIALICUYUANJIAN-1.woff2)'
);

document.fonts.add(font);

font.load().then(()=>{
	app.generate();
});