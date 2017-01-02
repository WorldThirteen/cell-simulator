export default class History {

  constructor(initial) {

    this.items = initial || [];

  }

  push(i) {

    this.items.push(i);

  }

  get() {

    if (arguments.length) {

      return this.items.map(item => {

        if (arguments.length === 1) {

          return item[arguments[0]];

        }

        let result = {};

        for (let i = 0; i < arguments.length; i++) {

          let k = arguments[ i ];

          if (item[ k ] !== undefined) {

            result[ k ] = item[ k ];

          }

        }

        return result;

      });

    }

    return this.items;

  }

  set(data) {

    this.items = data;

  }

}