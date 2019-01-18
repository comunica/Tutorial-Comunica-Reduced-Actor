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
    // Delegate resolving the input operation to the mediator.
    const output = await this.mediatorQueryOperation.mediate({ operation: pattern.input, context });

    // Get the logger for debugging
    const logger = context.get('@comunica/core:log');

    // Log on 'debug' level, with a message and optional JSON data
    logger.debug('Hello world!', { some: 'data' });

    // TODO: filter the bindingsStream
    const bindingsStream = output.bindingsStream;

    return { type: 'bindings', bindingsStream, metadata: output.metadata, variables: output.variables };
  }
}

module.exports = ActorQueryOperationMyReduced;
