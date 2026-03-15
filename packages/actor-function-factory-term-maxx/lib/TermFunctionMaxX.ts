import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  double,
  GeoSparqlOperator,
} from '@comunica/utils-expression-evaluator';

import { parseGeometry } from '@comunica/utils-expression-evaluator/lib/util/Parsing';
import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/maxX
 */
export class TermFunctionMaxX extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlOperator.MAXX,
      overloads: declare(GeoSparqlOperator.MAXX).onLiteral1(() => (term) => {
        const thegeom = parseGeometry(term);
        let maxX = Number.MIN_VALUE;
        turf.coordEach(thegeom, (
          currentCoord,
          _coordIndex,
          _featureIndex,
          _multiFeatureIndex,
          _geometryIndex,
        ) => {
          if (currentCoord[0] > maxX) {
            maxX = currentCoord[0];
          }
        });
        return double(maxX);
      }).collect(),
    });
  }
}
