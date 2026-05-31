import { TermFunctionBase } from '@comunica/bus-function-factory';
import { declare, GeoSparqlExtOperator } from '@comunica/utils-expression-evaluator';

import { serializeGeometry } from '@comunica/utils-expression-evaluator/lib/util/Serialization';
import * as turf from '@turf/turf';


/**
 * http://www.opengis.net/def/function/geosparql/centroid
 */
export class TermFunctionForce2D extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlExtOperator.FORCE2D,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlExtOperator.FORCE2D).onGeometryTup1(() => term => serializeGeometry(turf.centroid(term[0]).geometry, term[2])).collect(),
    });
  }
}
