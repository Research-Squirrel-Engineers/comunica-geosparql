import { TermFunctionBase } from '@comunica/bus-function-factory';
import {declare, GeoSparqlOperator, StringLiteral} from '@comunica/utils-expression-evaluator';

import { parseGeometry } from '@comunica/utils-expression-evaluator/lib/util/Parsing';
import { serializeGeometry } from '@comunica/utils-expression-evaluator/lib/util/Serialization';
import * as turf from '@turf/turf';


/**
 * http://www.opengis.net/def/function/geosparql/buffer
 */
export class TermFunctionBuffer extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlOperator.BUFFER,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlOperator.BUFFER).onLiteral1(() => term => {
        const _thegeom = parseGeometry(term)[0];
        //turf.buffer(turf.geojsonType(thegeom,thegeom.type,"thegeom"));
        return new StringLiteral('test');
        //serializeGeometry(turf.buffer(parseGeometry(term)), term.dataType)
      }).collect(),
    });
  }
}
