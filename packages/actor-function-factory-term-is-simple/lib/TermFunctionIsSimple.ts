import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  GeoSparqlOperator,
  bool,
} from '@comunica/utils-expression-evaluator';

import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/isSimple
 */
export class TermFunctionIsSimple extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlOperator.ISSIMPLE,
      overloads: declare(GeoSparqlOperator.ISSIMPLE).onGeometry1(
        () => (thegeom) => {
          return bool(turf.booleanValid(thegeom));
        },
      ).collect(),
    });
  }
}
