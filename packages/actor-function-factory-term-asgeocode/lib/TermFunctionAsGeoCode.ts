import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  GeoSparqlExtOperator,
} from '@comunica/utils-expression-evaluator';

import { parseGeometry } from '@comunica/utils-expression-evaluator/lib/util/Parsing';
import { serializeGeometry } from '@comunica/utils-expression-evaluator/lib/util/Serialization';

/**
 * http://www.opengis.net/def/function/geosparql/asGeoCode
 */
export class TermFunctionAsGeoCode extends TermFunctionBase {
  public constructor() {
    super({
      arity: 2,
      operator: GeoSparqlExtOperator.ASGEOCODE,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlExtOperator.ASGEOCODE).onLiteral2(() => (term1, term2) => serializeGeometry(parseGeometry(term1)[0], term2.str())).collect(),
    });
  }
}
