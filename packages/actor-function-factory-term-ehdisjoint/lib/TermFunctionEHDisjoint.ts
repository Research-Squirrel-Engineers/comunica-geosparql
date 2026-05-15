import { TermFunctionBase } from '@comunica/bus-function-factory';
import {bool, declare, GeoSparqlOperator} from '@comunica/utils-expression-evaluator';

import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/ehDisjoint
 */
export class TermFunctionEHDisjoint extends TermFunctionBase {
  public constructor() {
    super({
      arity: 2,
      operator: GeoSparqlOperator.EHDISJOINT,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlOperator.EHDISJOINT).geometryTestNormalizedCRS(() => (left, right) => turf.booleanDisjoint(left, right)).collect(),
    });
  }
}
