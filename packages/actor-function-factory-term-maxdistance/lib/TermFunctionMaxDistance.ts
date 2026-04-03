import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  GeoSparqlExtOperator,
  StringLiteral,
} from '@comunica/utils-expression-evaluator';

import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/maxX
 */
export class TermFunctionMaxDistance extends TermFunctionBase {
  public constructor() {
    super({
      arity: 2,
      operator: GeoSparqlExtOperator.MAXDISTANCE,
      overloads: declare(GeoSparqlExtOperator.MAXDISTANCE).geometryFunc(() => (left, _leftCRS, right, _rightCRS) => {
        let maxDistance = Number.MIN_VALUE;
        turf.coordEach(left, (currentCoord, _coordIndex) => {
          turf.coordEach(right, (currentCoord1, _coordIndex1) => {
            const curdist = turf.distance(currentCoord, currentCoord1);
            if (curdist > maxDistance) {
              maxDistance = curdist;
            }
          });
        });
        return new StringLiteral(maxDistance.toString(), 'http://www.w3.org/2001/XMLSchema#double');
      }).collect(),
    });
  }
}
