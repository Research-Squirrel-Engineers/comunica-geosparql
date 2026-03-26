import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  GeoSparqlOperator,
  bool,
} from '@comunica/utils-expression-evaluator';

import { parseGeometry } from '@comunica/utils-expression-evaluator/lib/util/Parsing';
import * as turf from '@turf/turf';
import type * as GJ from 'geojson';

/**
 * http://www.opengis.net/def/function/geosparql/isClosed
 */
export class TermFunctionIsClosed extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlOperator.ISCLOSED,
      overloads: declare(GeoSparqlOperator.ISCLOSED).onLiteral1(
        () => (term) => {
          const thegeom = parseGeometry(term)[0];
          if (thegeom.type.includes('Polygon')) {
            return bool(true);
          }
          // @ts-ignore
          /*  if (thegeom.type === 'LineString' &&
              thegeom.coordinates[0][0] === (<GJ.LineString>thegeom).coordinates.at(-1)[0] &&
              thegeom.coordinates[0][1] === (<GJ.LineString>thegeom).coordinates.at(-1)[1]) {
            return bool(true);
          }*/
          return bool(false);
        },
      ).collect(),
    });
  }
}
