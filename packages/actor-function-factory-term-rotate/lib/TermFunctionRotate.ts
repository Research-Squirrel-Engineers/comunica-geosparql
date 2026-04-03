import { TermFunctionBase } from '@comunica/bus-function-factory';
import {declare, GeoSparqlExtOperator, StringLiteral} from '@comunica/utils-expression-evaluator';

/**
 * http://www.opengis.net/def/function/geosparql/scale
 */
export class TermFunctionRotate extends TermFunctionBase {
  public constructor() {
    super({
      arity: 2,
      operator: GeoSparqlExtOperator.ROTATE,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlExtOperator.ROTATE).onTerm3(() => (_term1, _term2, _term3) => {
        return new StringLiteral('');
        //return serializeGeometry(turf.transformRotate(parseGeometry(<StringLiteral>term1)[0], Number.parseFloat(<StringLiteral>term2.str().toString()), Number.parseFloat(<StringLiteral>term3.toString())), term1.termType);
      }).collect(),
    });
  }
}
