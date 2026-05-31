import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  double,
  GeoSparqlOperator,
} from '@comunica/utils-expression-evaluator';

import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/metriclength
 */
export class TermFunctionMetricLength extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlOperator.METRICLENGTH,
      overloads: declare(GeoSparqlOperator.METRICLENGTH).onFeature1(() => term => double(turf.length(term))).collect(),
    });
  }
}
