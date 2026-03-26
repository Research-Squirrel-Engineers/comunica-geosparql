import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  declare,
  GeoSparqlOperator, StringLiteral,
} from '@comunica/utils-expression-evaluator';

import {serializeGeometry} from "@comunica/utils-expression-evaluator/lib/util/Serialization";
import * as turf from '@turf/turf';
import type * as GJ from 'geojson';

/**
 * http://www.opengis.net/def/function/geosparql/intersects
 */
export class TermFunctionDifference extends TermFunctionBase {
  public constructor() {
    super({
      arity: 2,
      operator: GeoSparqlOperator.DIFFERENCE,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlOperator.DIFFERENCE).geometryFunc(() => (left, lefttype, right, _righttype) => {
        // serializeGeometry(turf.difference(turf.featureCollection([<GJ.Polygon>left,<GJ.Polygon>right])),lefttype)
        return new StringLiteral('false');
      }).collect(),
    });
  }
}
