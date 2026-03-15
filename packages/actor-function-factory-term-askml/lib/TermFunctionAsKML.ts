import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  GeoSparqlOperator,
} from '@comunica/utils-expression-evaluator';

import { parseGeometry } from '@comunica/utils-expression-evaluator/lib/util/Parsing';
import { serializeGeometry } from '@comunica/utils-expression-evaluator/lib/util/Serialization';

/**
 * http://www.opengis.net/def/function/geosparql/asKML
 */
export class TermFunctionAsKML extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlOperator.ASKML,
      overloads: declare(GeoSparqlOperator.ASKML).onLiteral1(() => term => serializeGeometry(parseGeometry(term), 'http://www.opengis.net/ont/geosparql#kmlLiteral')).collect(),
    });
  }
}
