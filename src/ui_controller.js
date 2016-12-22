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
		this.putPopulationNum(obj.populationNum);

	}

	setCallback(func) {

		this.callback = func;

	}

	setStyle(node, style) {

		for (let i in style) {

			node.style[ i ] = style[ i ];

		}

	}
	
	update({ units, visible, highlight, populationNum }) {

		const cont = document.querySelector('#buttons_cont');
		const pop = document.querySelector('#num');
		if (cont) {
			units.map((o, key) => {
				const c = cont.children[key];
				const life = Math.max(Math.min(o.life, 100), 0);
				const btn = c.children[ 0 ];
				const graph = c.children[ 1 ];
				const color = `rgb(${
					Math.round(255 - (life / 100 * 255))
					}, ${Math.round(life / 100 * 255)}, 0)`;
				btn.style.color = visible === key + 1 ? 'green' : 'black';
				btn.style.fontWeight = visible === key + 1 ? 'bold' : 'normal';
				btn.style.backgroundColor = highlight === key ? 'lightblue' : 'transparent';
				graph.style.height = `${life / 2}px`;
				graph.style.backgroundColor = color;
				graph.innerHTML = o.score;
			});
		}
		if (pop) {
			pop.innerHTML = `Population: ${populationNum}`;
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

	putPopulationNum(num) {

		const inf = document.createElement('div');
		inf.id = 'num';
		inf.innerHTML = `Population: ${num}`;
		this.setStyle(inf, {
			width: '100px',
			margin: '20px auto',
		});

		document.body.appendChild(inf);

	}

}

export default new UIController();