import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  GeoSparqlOperator,
  integer,
} from '@comunica/utils-expression-evaluator';

import { parseGeometry } from '@comunica/utils-expression-evaluator/lib/util/Parsing';
import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/coordinateDimension
 */
export class TermFunctionDimension extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlOperator.DIMENSION,
      overloads: declare(GeoSparqlOperator.DIMENSION).onLiteral1(() => (term) => {
        const thegeom = parseGeometry(term)[0];
        let coordinator = 0;
        turf.coordEach(thegeom, (currentCoord) => {
          if (currentCoord.length > coordinator) {
            coordinator = currentCoord.length;
          }
        });
        return integer(coordinator);
      }).collect(),
    });
  }
}
