import sh from './bash';

export default function GenerateDocumentation() {

	sh('rm -rf documentation').then(() => {

		sh('esdoc -c ./scripts/utils/esdoc.json');

	});

}
