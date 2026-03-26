import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  bool,
  declare,
  GeoSparqlOperator,
} from '@comunica/utils-expression-evaluator';

import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/within
 */
export class TermFunctionWithin extends TermFunctionBase {
  public constructor() {
    super({
      arity: 2,
      operator: GeoSparqlOperator.SFWITHIN,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlOperator.SFWITHIN).geometryTest(() => (left, right) => bool(turf.booleanWithin(left, right))).collect(),
    });
  }
}
