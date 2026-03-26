import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  double,
  GeoSparqlOperator, StringLiteral,
} from '@comunica/utils-expression-evaluator';

import { parseGeometry } from '@comunica/utils-expression-evaluator/lib/util/Parsing';
import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/maxX
 */
export class TermFunctionDistance extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlOperator.DISTANCE,
      overloads: declare(GeoSparqlOperator.DISTANCE).geometryFunc(() => (left, leftType,right, rightType) => {
        return new StringLiteral('1', 'http://www.w3.org/2001/XMLSchema#double');
        //return double(turf.distance(left,right])));
      }).collect(),
    });
  }
}
