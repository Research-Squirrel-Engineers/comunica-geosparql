import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  bool,
  declare,
  GeoSparqlOperator,
} from '@comunica/utils-expression-evaluator';

import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/overlaps
 */
export class TermFunctionOverlaps extends TermFunctionBase {
  public constructor() {
    super({
      arity: 2,
      operator: GeoSparqlOperator.SFOVERLAPS,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlOperator.SFOVERLAPS).geometryTest(() => (left, right) => bool(turf.booleanOverlap(left, right))).collect(),
    });
  }
}
