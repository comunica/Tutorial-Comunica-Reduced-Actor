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

    // Filter duplicates
    const cache = {};
    const bindingsStream = output.bindingsStream.filter((binding) => {
      const hash = JSON.stringify(binding.toObject());
      if (!cache[hash]) {
        // The bindings do not exist yet in the cache,
        // so let's add it.
        logger.debug('Cache miss', { hash });

        // Mark the hash in the cache
        cache[hash] = true;
        return true;
      } else {
        // The bindings already exist in the cache,
        // so we filter it out.
        logger.debug('Cache hit', { hash });
        return false;
      }
    });

    return { type: 'bindings', bindingsStream, metadata: output.metadata, variables: output.variables };
  }
}

module.exports = ActorQueryOperationMyReduced;
