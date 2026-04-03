import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  GeoSparqlExtOperator,
} from '@comunica/utils-expression-evaluator';

import { parseGeometry } from '@comunica/utils-expression-evaluator/lib/util/Parsing';
import { serializeGeometry } from '@comunica/utils-expression-evaluator/lib/util/Serialization';
import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/maxZ
 */
export class TermFunctionStartPoint extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlExtOperator.STARTPOINT,
      overloads: declare(GeoSparqlExtOperator.STARTPOINT).onLiteral1(() => (term) => {
        const thegeom = parseGeometry(term)[0];
        return serializeGeometry(turf.findPoint(thegeom).geometry, term.dataType);
      }).collect(),
    });
  }
}
