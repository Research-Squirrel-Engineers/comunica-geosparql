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
export class TermFunctionIsTriangle extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlExtOperator.ISTRIANGLE,
      overloads: declare(GeoSparqlExtOperator.ISTRIANGLE).onLiteral1(
        () => (term) => {
          const thegeom = parseGeometry(term)[0];
          if (thegeom.type === 'Polygon') {
            const thecoords = turf.getCoords(thegeom);
            return bool(thecoords.length === 4 && thecoords[0] === thecoords.at(-1));
          }
          return bool(false);
        },
      ).collect(),
    });
  }
}
