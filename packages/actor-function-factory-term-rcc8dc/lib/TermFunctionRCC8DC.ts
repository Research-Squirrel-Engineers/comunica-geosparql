import { TermFunctionBase } from '@comunica/bus-function-factory';
import {bool, declare, GeoSparqlOperator} from '@comunica/utils-expression-evaluator';

import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/rcc8dc
 */
export class TermFunctionRCC8DC extends TermFunctionBase {
  public constructor() {
    super({
      arity: 2,
      operator: GeoSparqlOperator.RCC8DC,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlOperator.RCC8DC).geometryTest(() => (left, right) => turf.booleanDisjoint(left, right)).collect(),
    });
  }
}
