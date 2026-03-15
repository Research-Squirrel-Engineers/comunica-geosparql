import { TermFunctionBase } from '@comunica/bus-function-factory';
import { declare, GeoSparqlOperator } from '@comunica/utils-expression-evaluator';

import { parseGeometry } from '@comunica/utils-expression-evaluator/lib/util/Parsing';
import { serializeGeometry } from '@comunica/utils-expression-evaluator/lib/util/Serialization';
import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/envelope
 */
export class TermFunctionEnvelope extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlOperator.ENVELOPE,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlOperator.ENVELOPE).onLiteral1(() => term => serializeGeometry(turf.envelope(parseGeometry(term)).geometry, term.dataType)).collect(),
    });
  }
}
