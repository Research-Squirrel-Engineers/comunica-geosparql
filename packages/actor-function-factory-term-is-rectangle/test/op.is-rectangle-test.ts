import {
  ActorFunctionFactoryExpressionBnode,
} from '@comunica/actor-function-factory-expression-bnode';
import { runFuncTestTable } from '@comunica/bus-function-factory/test/util';
import { bool } from '@comunica/utils-expression-evaluator/test/util/Aliases';
import { Notation } from '@comunica/utils-expression-evaluator/test/util/TestTable';
import { ActorFunctionFactoryTermIsRectangle } from '../lib';

describe('like \'isRectangle\' receiving', () => {
  runFuncTestTable({
    registeredActors: [
      args => new ActorFunctionFactoryTermIsRectangle(args),
      args => new ActorFunctionFactoryExpressionBnode(args),
    ],
    arity: 1,
    aliases: bool,
    notation: Notation.Function,
    operation: 'isRectangle',
    testTable: `
        "POINT(1.0 1.0)"^^<http://www.opengis.net/ont/geosparql#wktLiteral> = false
        "POINT(1.0 1.0 1.0)"^^<http://www.opengis.net/ont/geosparql#wktLiteral> = true
      `,
  });
});
