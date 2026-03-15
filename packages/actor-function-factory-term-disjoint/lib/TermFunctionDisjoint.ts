import { TermFunctionBase } from '@comunica/bus-function-factory';
import {bool, declare, GeoSparqlOperator} from '@comunica/utils-expression-evaluator';

import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/azimuth
 */
export class TermFunctionDisjoint extends TermFunctionBase {
  public constructor() {
    super({
      arity: 2,
      operator: GeoSparqlOperator.SFDISJOINT,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlOperator.SFDISJOINT).geometryTest(() => (left, right) => bool(turf.booleanDisjoint(left, right))).collect(),
    });
  }
}
