import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  double,
  GeoSparqlOperator, integer,
} from '@comunica/utils-expression-evaluator';

import { parseGeometry } from '@comunica/utils-expression-evaluator/lib/util/Parsing';
import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/minX
 */
export class TermFunctionNumPoints extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlOperator.MINX,
      overloads: declare(GeoSparqlOperator.MINX).onLiteral1(() => (term) => {
        const _thegeom = parseGeometry(term)[0];
        return integer(0);
        //return integer(turf.getCoords(thegeom).length);
      }).collect(),
    });
  }
}
