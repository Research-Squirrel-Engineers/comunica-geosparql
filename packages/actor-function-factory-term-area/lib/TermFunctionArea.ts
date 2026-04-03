import { TermFunctionBase } from '@comunica/bus-function-factory';
import { declare, double, GeoSparqlOperator } from '@comunica/utils-expression-evaluator';

import { parseGeometry } from '@comunica/utils-expression-evaluator/lib/util/Parsing';
import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/centroid
 */
export class TermFunctionArea extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlOperator.AREA,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlOperator.AREA).onLiteral1(() => term => double(turf.area(parseGeometry(term)[0]))).collect(),
    });
  }
}
