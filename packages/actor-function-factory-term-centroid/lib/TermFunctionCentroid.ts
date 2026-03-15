import { TermFunctionBase } from '@comunica/bus-function-factory';
import { declare, GeoSparqlOperator, StringLiteral } from '@comunica/utils-expression-evaluator';

import { parseGeometry } from '@comunica/utils-expression-evaluator/lib/util/Parsing';
import { serializeGeometry } from '@comunica/utils-expression-evaluator/lib/util/Serialization';
import * as turf from '@turf/turf';
import * as GJ from 'geojson';

/**
 * http://www.opengis.net/def/function/geosparql/azimuth
 */
export class TermFunctionCentroid extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlOperator.CENTROID,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlOperator.CENTROID).onLiteral1(() => term => serializeGeometry(turf.centroid(parseGeometry(term)).geometry, term.dataType)).collect(),
    });
  }
}
