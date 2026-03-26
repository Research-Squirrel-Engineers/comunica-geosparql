import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  GeoSparqlExtOperator,
  bool,
} from '@comunica/utils-expression-evaluator';

import { parseGeometry } from '@comunica/utils-expression-evaluator/lib/util/Parsing';
import * as turf from '@turf/turf';
import type * as GJ from 'geojson';

/**
 * http://www.opengis.net/def/function/geosparql/isCW
 */
export class TermFunctionIsCW extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlExtOperator.ISCW,
      overloads: declare(GeoSparqlExtOperator.ISCW).onLiteral1(
        () => term => bool(turf.booleanClockwise(<GJ.LineString>parseGeometry(term)[0])),
      ).collect(),
    });
  }
}
