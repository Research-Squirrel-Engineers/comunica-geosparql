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
export class TermFunctionAsGML extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlOperator.ASGML,
      overloads: declare(GeoSparqlOperator.ASGML).onLiteral1(() => term => serializeGeometry(parseGeometry(term), 'http://www.opengis.net/ont/geosparql#gmlLiteral')).collect(),
    });
  }
}
