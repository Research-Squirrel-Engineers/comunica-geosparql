import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  GeoSparqlExtOperator,
} from '@comunica/utils-expression-evaluator';

import { parseGeometry } from '@comunica/utils-expression-evaluator/lib/util/Parsing';
import * as turf from '@turf/turf';
import {serializeGeometry} from "@comunica/utils-expression-evaluator/lib/util/Serialization";

/**
 * http://www.opengis.net/def/function/geosparql/maxZ
 */
export class TermFunctionSimplify extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlExtOperator.SIMPLIFY,
      overloads: declare(GeoSparqlExtOperator.SIMPLIFY).onLiteral1(() => (term) => {
        const thegeom = parseGeometry(term)[0];
        return serializeGeometry(turf.simplify(thegeom), term.dataType);
      }).collect(),
    });
  }
}
