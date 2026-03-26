import { TermFunctionBase } from '@comunica/bus-function-factory';
import {declare, GeoSparqlExtOperator, StringLiteral} from '@comunica/utils-expression-evaluator';

import { parseGeometry } from '@comunica/utils-expression-evaluator/lib/util/Parsing';
import { serializeGeometry } from '@comunica/utils-expression-evaluator/lib/util/Serialization';
import * as turf from '@turf/turf';


/**
 * http://www.opengis.net/def/function/geosparql/reverse
 */
export class TermFunctionReverse extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlExtOperator.REVERSE,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlExtOperator.REVERSE).onLiteral1(() => term => {
        return new StringLiteral('false');
        //serializeGeometry(turf.rewind(parseGeometry(term)), term.dataType)
      }).collect(),
    });
  }
}
