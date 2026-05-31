import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  GeoSparqlOperator,
  bool,
} from '@comunica/utils-expression-evaluator';

import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/is3D
 */
export class TermFunctionIs3D extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlOperator.IS3D,
      overloads: declare(GeoSparqlOperator.IS3D).onGeometry1(
        () => (thegeom) => {
          if (thegeom.type === 'Point') {
            return bool(turf.getCoord(thegeom).length === 3);
          }
          return bool(false);
        },
      ).collect(),
    });
  }
}
