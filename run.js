const newEngineDynamic = require('@comunica/actor-init-sparql').newEngineDynamic;

const query = `
SELECT REDUCED * {
    {
        SELECT * {
            SELECT * {
                ?s ?p <http://dbpedia.org/resource/Belgium>.
                ?s ?p ?o.
            } LIMIT 10
        } ORDER By ?s
    } UNION {
        SELECT * {
            SELECT * {
                ?s ?p <http://dbpedia.org/resource/Belgium>.
                ?s ?p ?o.
            } LIMIT 10
        } ORDER By ?o
    }
}
`;

newEngineDynamic({ configResourceUrl: __dirname + '/config/config.json', mainModulePath: __dirname }).then(myEngine => {
  myEngine.query(query,
    { sources: [ { type: 'hypermedia', value: 'http://fragments.dbpedia.org/2015/en' } ] })
    .then(function (result) {
      result.bindingsStream.on('data', function (data) {
        console.log(`S: ${data.get('?s').value}; P: ${data.get('?p').value}; O: ${data.get('?o').value}`);
      });
    });
});
