import { TermFunctionBase } from '@comunica/bus-function-factory';
import {bool, declare, GeoSparqlExtOperator, StringLiteral} from '@comunica/utils-expression-evaluator';

import * as turf from '@turf/turf';
import {parseGeometry} from "@comunica/utils-expression-evaluator/lib/util/Parsing";
import {serializeGeometry} from "@comunica/utils-expression-evaluator/lib/util/Serialization";

/**
 * http://www.opengis.net/def/function/geosparql/translate
 */
export class TermFunctionTranslate extends TermFunctionBase {
  public constructor() {
    super({
      arity: 2,
      operator: GeoSparqlExtOperator.TRANSLATE,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlExtOperator.TRANSLATE).onTerm3(() => (term1, term2, term3) => serializeGeometry(turf.transformTranslate(parseGeometry(<StringLiteral>term1)[0], Number.parseFloat(term2.toString()), Number.parseFloat(term3.toString())), term1.termType)).collect(),
    });
  }
}
