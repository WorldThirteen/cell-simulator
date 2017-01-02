export default class Evolver {

	constructor(params, population) {

		this.params = {
			...Evolver.DEFAULT_CONFIG,
			...params,
		}

		this.population = population;

	}

	static DEFAULT_CONFIG = {
		populationSize: 10,
		numberOfGenes: 10,
		numberOfWinners: 2,
		genesToMutate: 1,
		mutationRate: 0.05
	}

	initRandomPopulation() {

		const population = [];
		const { populationSize, numberOfGenes } = this.params;

		for (let unit = 0; unit < populationSize; unit++) {

			const genes = [];

			for (let gen = 0; gen < numberOfGenes; gen++) {

				genes.push(Math.random());

			}

			population.push(genes);

		}

		this.population = population;

	}

	cross(genome1, genome2) {

		const genomes = [genome1, genome2];
		const child = [];

		for (let i = 0; i < this.params.numberOfGenes; i++) {
			child.push(genomes[ Math.round(Math.random()) ][ i ]);
		}
		return child;

	}

	select(marks) {

		const marked = this.population.map((unit, key) => ({ unit, mark: marks[ key ] }));
		marked.sort((a, b) => {

			if (a.mark > b.mark) {
				return -1;
			}
			if (a.mark < b.mark) {
				return 1;
			}

			return 0;

		});

		return marked.slice(0, this.params.numberOfWinners);

	}

	crossing(parents) {
		
		parents = parents.map(obj => obj.unit);
		const res = parents;
		let counter = 1;
		const _l = parents.length;
		while (res.length < this.params.populationSize) {

			const parent1 = parents[ _l - counter % _l - 1];
			const parent2 = parents[ _l - (counter + 1) % _l - 1];
			const child = this.cross(parent1, parent2);
			res.push(child);
			counter++;

		}
		return res;
		
	}
	
	mutate(prepopulation) {
		
		return prepopulation.map(genome => {

			for (let i = 0; i < this.params.genesToMutate; i++) {

				const at = Math.round(Math.random() * genome.length - 1);
				genome[ at ]
					+= this.params.mutationRate * (Math.random() > 0.5 ? 1 : -1);

			}

			return genome;

		});
		
	}

	evolve(marks) {

		this.population = this
			.mutate(
				this.crossing(
					this.select(marks)
				)
			);

		return this.population;

	}

}