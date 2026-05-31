import { TermFunctionBase } from '@comunica/bus-function-factory';
import {declare, GeoSparqlExtOperator, string} from '@comunica/utils-expression-evaluator';

import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/addPoint
 */
export class TermFunctionAddPoint extends TermFunctionBase {
  public constructor() {
    super({
      arity: 2,
      operator: GeoSparqlExtOperator.ADDPOINT,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlExtOperator.ADDPOINT).geometryFuncNormalizedCRS(() => (geom1, geom2) => {
        /*if (geom1.type === 'Polygon' && geom2.type === 'Point') {
          turf.getGeom(geom1).coordinates.push(<GJ.Position>geom2.coordinates.at(0));
        }else if (geom1.type === 'LineString' && geom2.type === 'Point') {
          return turf.getGeom(geom1).coordinates.push(turf.getGeom(geom2).coordinates.at(0));
        }*/
        return string('');
      }).collect(),
    });
  }
}
