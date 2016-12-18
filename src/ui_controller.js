class UIController {

	constructor() {

		this.callback = () => {};

	}

	init(obj) {
		
		this.putButtons(
			obj.options.visibleUnit,
			obj.options.populationSize,
			obj.current.map(u => u.unit)
		);
		this.putPlayPause();

	}

	setCallback(func) {

		this.callback = func;

	}

	setStyle(node, style) {

		for (let i in style) {

			node.style[ i ] = style[ i ];

		}

	}
	
	update(obj, visible) {

		const cont = document.querySelector('#buttons_cont');
		if (cont) {
			obj.map((o, key) => {
				const c = cont.children[key];
				const life = Math.max(Math.min(o.life, 100), 0);
				c.children[ 0 ].style.color = visible === key + 1 ? 'green' : 'black';
				c.children[ 0 ].style.fontWeight = visible === key + 1 ? 'bold' : 'normal';
				c.children[ 1 ].style.height = `${life / 2}px`;
				const color = `rgb(${Math.round(255 - (life / 100 * 255))}, ${Math.round(life / 100 * 255)}, 0)`;
				c.children[ 1 ].style.backgroundColor = color;
				c.children[ 1 ].innerHTML = o.score;
			});
		}
		
	}

	createElement(i, selected) {

		const style = {
			border: '1px solid black',
			fontSize: '16px',
			width: '30px',
			height: '30px',
			color: 'black',
			lineHeight: '30px',
			cursor: 'pointer',
			fontWeight: 'normal'
		};

		const selStyle = {
			color: 'green',
			fontWeight: 'bold'
		}

		const cont = document.createElement('div');
		cont.id = i;
		this.setStyle(cont, {
			display: 'inline-block',
			marginLeft: '-1px',
		});
		const el = document.createElement('div');
		this.setStyle(el, Object.assign({}, style, selected === i ? selStyle : {}));
		el.innerText = i;
		el.onclick = () => {
			this.callback('options', { visibleUnit: i });
		};

		cont.appendChild(el);

		const score = document.createElement('div');
		score.innerHTML = 0;
		this.setStyle(score, {
			height: `50px`,
			width: '100%',
			backgroundColor: `green`
		});

		cont.appendChild(score);

		return cont;

	}

	putButtons(selected, num) {

		const cont = document.createElement('div');
		cont.id = 'buttons_cont';
		document.body.appendChild(cont);

		this.setStyle(cont, { textAlign: 'center' });

		const arr = new Array(num)
			.fill(null)
			.map((a, key) => key + 1);
		arr.push('HS');
		arr.map((i) => {

			const el = this.createElement(i, selected);
			cont.appendChild(el);

		});

	}

	putPlayPause() {

		const btn = document.createElement('div');
		btn.id = 'play';
		btn.innerHTML = 'Play/Pause';
		this.setStyle(btn, {
			width: '100px',
			margin: '20px auto',
			cursor: 'pointer'
		});
		btn.onclick = () => {
			this.callback('play');
		}

		document.body.appendChild(btn);

	}

}

export default new UIController();