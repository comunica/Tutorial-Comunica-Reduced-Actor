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
    // Get the logger for debugging
    const logger = context.get('@comunica/core:log');

    // Log on 'debug' level, with a message and optional JSON data
    logger.debug('Hello world!', { some: 'data' });

    return null; // TODO: implement me
  }
}

module.exports = ActorQueryOperationMyReduced;
