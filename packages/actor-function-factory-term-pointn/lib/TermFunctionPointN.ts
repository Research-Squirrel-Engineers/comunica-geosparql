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
export class TermFunctionPointN extends TermFunctionBase {
  public constructor() {
    super({
      arity: 2,
      operator: GeoSparqlExtOperator.POINTN,
      overloads: declare(GeoSparqlExtOperator.POINTN).onLiteral1(() => (term) => {
        const thegeom = parseGeometry(term)[0];
        const _n = 0;
        return serializeGeometry(turf.findPoint(thegeom).geometry, term.dataType);
      }).collect(),
    });
  }
}
