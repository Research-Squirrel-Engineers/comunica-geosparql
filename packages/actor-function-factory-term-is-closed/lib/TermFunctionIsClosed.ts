import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
    declare,
    GeoSparqlOperator,
    bool,
} from '@comunica/utils-expression-evaluator';

import { parseGeometry } from '@comunica/utils-expression-evaluator/lib/util/Parsing';

/**
 * http://www.opengis.net/def/function/geosparql/isClosed
 */
export class TermFunctionIsClosed extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlOperator.ISCLOSED,
      overloads: declare(GeoSparqlOperator.ISCLOSED).onLiteral1(
        () => (term) => {
          const _thegeom = parseGeometry(term);
          return bool(false);
        },
      ).collect(),
    });
  }
}
