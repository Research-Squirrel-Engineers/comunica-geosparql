import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
    declare,
    double,
    GeoSparqlOperator,
} from '@comunica/utils-expression-evaluator';

import { parseGeometry } from '@comunica/utils-expression-evaluator/lib/util/Parsing';
import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/maxY
 */
export class TermFunctionMaxY extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlOperator.MAXY,
      overloads: declare(GeoSparqlOperator.MAXY).onLiteral1(() => (term) => {
        const thegeom = parseGeometry(term)[0];
        let maxY = Number.MIN_VALUE;
        turf.coordEach(thegeom, (
          currentCoord,
          _coordIndex,
          _featureIndex,
          _multiFeatureIndex,
          _geometryIndex,
        ) => {
          if (currentCoord[1] > maxY) {
            maxY = currentCoord[1];
          }
        });
        return double(maxY);
      }).collect(),
    });
  }
}
