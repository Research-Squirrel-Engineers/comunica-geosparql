import { TermFunctionBase } from '@comunica/bus-function-factory';
import { declare, double, GeoSparqlOperator, parseGeometryFeature } from '@comunica/utils-expression-evaluator';
import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/centroid
 */
export class TermFunctionLength extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlOperator.LENGTH,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlOperator.LENGTH).onFeature1(() => term => double(turf.length(term))).collect(),
    });
  }
}
