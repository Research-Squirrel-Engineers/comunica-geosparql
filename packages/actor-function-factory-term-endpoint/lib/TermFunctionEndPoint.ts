import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  GeoSparqlExtOperator,
} from '@comunica/utils-expression-evaluator';

import { parseGeometry } from '@comunica/utils-expression-evaluator/lib/util/Parsing';
import { serializeGeometry } from '@comunica/utils-expression-evaluator/lib/util/Serialization';
import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/endPoint
 */
export class TermFunctionEndPoint extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlExtOperator.ENDPOINT,
      overloads: declare(GeoSparqlExtOperator.ENDPOINT).onLiteral1(() => (term) => {
        const thegeom = parseGeometry(term)[0];
        if (thegeom.type === 'Point') {
          return serializeGeometry(thegeom, term.dataType);
        }
        return serializeGeometry(turf.findPoint(thegeom, { coordIndex: -1 }).geometry, term.dataType);
      }).collect(),
    });
  }
}
