export default function toMatrix(data, row) {

	const matrix = [];
	for (let i = 0; i < data.length; i += row) {
		matrix.push(data.slice(i, i + row));
	}
	return matrix;

}