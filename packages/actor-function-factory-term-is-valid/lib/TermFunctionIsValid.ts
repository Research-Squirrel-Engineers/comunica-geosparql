import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  GeoSparqlExtOperator,
  bool,
} from '@comunica/utils-expression-evaluator';

import { parseGeometry } from '@comunica/utils-expression-evaluator/lib/util/Parsing';
import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/isValid
 */
export class TermFunctionIsValid extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlExtOperator.ISVALID,
      overloads: declare(GeoSparqlExtOperator.ISVALID).onLiteral1(
        () => (term) => {
          const thegeom = parseGeometry(term)[0];
          return bool(turf.booleanValid(thegeom));
        },
      ).collect(),
    });
  }
}
