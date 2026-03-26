import { TermFunctionBase } from '@comunica/bus-function-factory';
import { declare, GeoSparqlOperator, StringLiteral} from '@comunica/utils-expression-evaluator';

import { parseGeometry } from '@comunica/utils-expression-evaluator/lib/util/Parsing';
import * as turf from '@turf/turf';


/**
 * http://www.opengis.net/def/function/geosparql/geometryType
 */
export class TermFunctionGeometryType extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlOperator.GEOMETRYTYPE,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlOperator.GEOMETRYTYPE).onLiteral1(() => term => new StringLiteral(turf.getType(parseGeometry(term)[0]))).collect(),
    });
  }
}
