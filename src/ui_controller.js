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
		this.setPopulationNum(obj.populationNum);
		this.putOptions(obj.evolver.params, obj.options);

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
		if (cont) {
			units.map((o, key) => {
				let c = cont.children[key];
				if (!c || key === cont.children.length - 1) {
					c = this.createElement(key + 1, visible === key);
					cont.insertBefore(c, cont.children[cont.children.length - 1]);
				}
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
			if (units.length < cont.children.length - 1) {
				for (let i = units.length; i < cont.children.length - 1; i++) {
					cont.children[ i ].remove();
				}
			}
		}
		this.setPopulationNum(populationNum);

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

		this.setStyle(cont, { textAlign: 'center' });

		const arr = new Array(num)
			.fill(null)
			.map((a, key) => key + 1);
		arr.push('HS');
		arr.map((i) => {

			const el = this.createElement(i, selected);
			cont.appendChild(el);

		});
		document.querySelector('#interactive_container').appendChild(cont);

	}

	putPlayPause() {

		document.querySelector('#play_btn').onclick = () => {
			this.callback('play');
		}

	}

	setPopulationNum(num) {

		document.querySelector('#population_num').innerHTML = `Population: ${num}`;

	}

	putOptions(options, root_opt) {

		const pop_size = document.querySelector('#pop_size');
		const num_win = document.querySelector('#num_win');
		const mut_num = document.querySelector('#mut_num');
		const mut_rate = document.querySelector('#mut_rate');
		const select_fps = document.querySelector('#select_fps');
		const speed = document.querySelector('#speed');
		pop_size.value = options.populationSize;
		num_win.value = options.numberOfWinners;
		mut_num.value = options.genesToMutate;
		mut_rate.value = options.mutationRate * 100;
		select_fps.value = root_opt.FPS;
		speed.value = root_opt.speed;
		speed.onchange = (e) => {
			this.callback('options', { speed: parseInt(e.target.value) });
		};
		select_fps.onchange = (e) => {
			this.callback('options', { FPS: parseInt(e.target.value) });
		};
		pop_size.onchange = (e) => {
			num_win.max = e.target.value;
			if (num_win.value > e.target.value) {
				num_win.value = e.target.value;
			}
			this.callback('form_options', { populationSize: e.target.value });
		};
		num_win.onchange = (e) => {
			this.callback('form_options', { numberOfWinners: e.target.value });
		};
		mut_num.onchange = (e) => {
			this.callback('form_options', { genesToMutate: e.target.value });
		};
		mut_rate.onchange = (e) => {
			this.callback('form_options', { mutationRate: e.target.value / 100 });
		};

	}

}

export default new UIController();