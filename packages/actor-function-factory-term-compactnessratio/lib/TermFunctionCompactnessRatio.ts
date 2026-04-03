import { TermFunctionBase } from '@comunica/bus-function-factory';
import { declare, double, GeoSparqlExtOperator } from '@comunica/utils-expression-evaluator';

import { parseGeometry } from '@comunica/utils-expression-evaluator/lib/util/Parsing';
import * as turf from '@turf/turf';


/**
 * http://www.opengis.net/def/function/geosparql/compactnessRatio
 */
export class TermFunctionCompactnessRatio extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlExtOperator.COMPACTNESSRATIO,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlExtOperator.COMPACTNESSRATIO).onLiteral1(() => (term) => {
        const thegeom = parseGeometry(term)[0];
        const length = 0; //turf.length(turf.geometryCollection([ thegeom ]));
        const area = turf.area(thegeom);
        return double(1 / (length / (2 * Math.PI * Math.sqrt(area / Math.PI))));
      }).collect(),
    });
  }
}
