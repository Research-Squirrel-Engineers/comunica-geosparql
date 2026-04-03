import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  GeoSparqlExtOperator,
  bool,
} from '@comunica/utils-expression-evaluator';

import { parseGeometry } from '@comunica/utils-expression-evaluator/lib/util/Parsing';
import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/isTriangle
 */
export class TermFunctionIsRectangle extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlExtOperator.ISRECTANGLE,
      overloads: declare(GeoSparqlExtOperator.ISRECTANGLE).onLiteral1(
        () => (term) => {
          const thegeom = parseGeometry(term)[0];
          if (thegeom.type === 'Polygon') {
            return bool(turf.area(turf.bboxPolygon(turf.bbox(thegeom))) === turf.area(thegeom));
          }
          return bool(false);
        },
      ).collect(),
    });
  }
}
