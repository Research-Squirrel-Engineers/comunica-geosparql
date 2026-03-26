import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  bool,
  declare,
  GeoSparqlOperator, StringLiteral,
} from '@comunica/utils-expression-evaluator';

import * as turf from '@turf/turf';
import {serializeGeometry} from "@comunica/utils-expression-evaluator/lib/util/Serialization";
import type * as GJ from 'geojson';

/**
 * http://www.opengis.net/def/function/geosparql/intersects
 */
export class TermFunctionIntersection extends TermFunctionBase {
  public constructor() {
    super({
      arity: 2,
      operator: GeoSparqlOperator.INTERSECTION,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlOperator.INTERSECTION).geometryFunc(() => (left,lefttype, right, _righttype) => {
        return new StringLiteral('false');
        //serializeGeometry(turf.intersect(turf.featureCollection([<GJ.Polygon>left,<GJ.Polygon>right])), lefttype)
      }).collect(),
    });
  }
}
