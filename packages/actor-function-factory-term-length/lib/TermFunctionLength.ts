import { TermFunctionBase } from '@comunica/bus-function-factory';
import { declare, GeoSparqlOperator } from '@comunica/utils-expression-evaluator';

import { parseGeometry } from '@comunica/utils-expression-evaluator/lib/util/Parsing';
import { serializeGeometry } from '@comunica/utils-expression-evaluator/lib/util/Serialization';
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
      overloads: declare(GeoSparqlOperator.LENGTH).onLiteral1(() => term => serializeGeometry(turf.centroid(parseGeometry(term)[0]).geometry, term.dataType)).collect(),
    });
  }
}
