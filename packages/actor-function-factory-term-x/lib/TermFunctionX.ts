import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  double,
  GeoSparqlExtOperator,
} from '@comunica/utils-expression-evaluator';

import { parseGeometry } from '@comunica/utils-expression-evaluator/lib/util/Parsing';
import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/X
 */
export class TermFunctionX extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlExtOperator.X,
      overloads: declare(GeoSparqlExtOperator.X).onLiteral1(() => (term) => {
        const thegeom = parseGeometry(term)[0];
        if (thegeom.type === 'Point') {
          return double(turf.getCoord(thegeom)[0]);
        }
        return double(turf.getCoord(turf.centroid(thegeom))[0]);
      }).collect(),
    });
  }
}
