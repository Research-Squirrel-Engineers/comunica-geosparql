import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  double,
  GeoSparqlExtOperator,
} from '@comunica/utils-expression-evaluator';

import { parseGeometry } from '@comunica/utils-expression-evaluator/lib/util/Parsing';
import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/Z
 */
export class TermFunctionZ extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlExtOperator.Z,
      overloads: declare(GeoSparqlExtOperator.Z).onLiteral1(() => (term) => {
        const thegeom = parseGeometry(term)[0];
        if (thegeom.type === 'Point') {
          return double(turf.getCoord(thegeom)[2]);
        }
        return double(turf.getCoord(turf.centroid(thegeom))[2]);
      }).collect(),
    });
  }
}
