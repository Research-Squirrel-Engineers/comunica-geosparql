import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  GeoSparqlOperator,
  StringLiteral,
} from '@comunica/utils-expression-evaluator';

import { parseGeometry } from '@comunica/utils-expression-evaluator/lib/util/Parsing';
import { serializeGeometry } from '@comunica/utils-expression-evaluator/lib/util/Serialization';

/**
 * http://www.opengis.net/def/function/geosparql/asWKT
 */
export class TermFunctionAsWKT extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlOperator.ASWKT,
      overloads: declare(GeoSparqlOperator.ASWKT).onLiteral1(() => term => serializeGeometry(parseGeometry(term), 'http://www.opengis.net/ont/geosparql#wktLiteral')).collect(),
    });
  }
}
