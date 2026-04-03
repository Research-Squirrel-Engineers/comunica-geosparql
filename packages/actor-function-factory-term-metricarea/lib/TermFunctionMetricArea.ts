import { TermFunctionBase } from '@comunica/bus-function-factory';
import {declare, double, GeoSparqlOperator} from '@comunica/utils-expression-evaluator';

import { parseGeometry } from '@comunica/utils-expression-evaluator/lib/util/Parsing';
import * as turf from '@turf/turf';


/**
 * http://www.opengis.net/def/function/geosparql/metricarea
 */
export class TermFunctionMetricArea extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlOperator.CENTROID,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlOperator.CENTROID).onLiteral1(() => term => double(turf.area(parseGeometry(term)[0]))).collect(),
    });
  }
}
