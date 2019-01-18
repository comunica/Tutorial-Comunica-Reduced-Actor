const { ActorQueryOperationTypedMediated } = require('@comunica/bus-query-operation');

/**
 * A naive comunica Reduced Query Operation Actor.
 */
class ActorQueryOperationMyReduced extends ActorQueryOperationTypedMediated {

  constructor(args) {
    super(args, 'reduced');
  }

  async testOperation(pattern, context) {
    return true;
  }

  async runOperation(pattern, context) {
    console.log('Hello world!');
    return null; // TODO: implement me
  }
}

module.exports = ActorQueryOperationMyReduced;
