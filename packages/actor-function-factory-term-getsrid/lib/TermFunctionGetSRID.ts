import { TermFunctionBase } from '@comunica/bus-function-factory';
import { declare, GeoSparqlOperator, StringLiteral} from '@comunica/utils-expression-evaluator';

import { parseGeometry } from '@comunica/utils-expression-evaluator/lib/util/Parsing';

/**
 * http://www.opengis.net/def/function/geosparql/geometryType
 */
export class TermFunctionGetSRID extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlOperator.GETSRID,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlOperator.GETSRID).onLiteral1(() => term => new StringLiteral(parseGeometry(term)[1], "http://www.w3.org/2001/XMLSchema#anyURI")).collect(),
    });
  }
}
