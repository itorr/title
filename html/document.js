
const defaultText = Object.freeze(
	{
		text: '小标题',
		size: 80,
		color: '#FFF',
		borderScale: 10,
		borderColor: '#000000',
		yShift: 0,
		shadow: 10,
		shadowColor: 'rgba(0,0,0,.3)',
	}
);

const defaultConfig = Object.freeze({
	margin: 10,
	texts: [
		Object.assign(
			{},
			defaultText,
			{
				text: '大标题',
				size: 140,
			}
		),
		Object.assign({},defaultText),
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
		removeByIndex(arr, index){
			arr.splice(index, 1);
		},
		removeItem(arr,item){
			const index = arr.indexOf(item);
			if(index == -1) return;

			this.removeByIndex(arr, index);
		},
		addOne(arr, item){
			arr.push(item);
		},
		addText(){
			this.addOne(this.config.texts, Object.assign({}, defaultText, {
				text: `新标题 ${this.config.texts.length + 1}`
			}));
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