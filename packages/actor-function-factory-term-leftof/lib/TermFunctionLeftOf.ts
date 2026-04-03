import { TermFunctionBase } from '@comunica/bus-function-factory';
import { declare, GeoSparqlExtOperator } from '@comunica/utils-expression-evaluator';

import { rangeOverlaps } from '@comunica/utils-expression-evaluator/lib/functions/Helpers';
import * as turf from '@turf/turf';

/**
 * http://www.opengis.net/def/function/geosparql/leftOf
 */
export class TermFunctionLeftOf extends TermFunctionBase {
  public constructor() {
    super({
      arity: 2,
      operator: GeoSparqlExtOperator.LEFTOF,
      overloads: declare(GeoSparqlExtOperator.LEFTOF).geometryTest(() => (left, right) => {
        const leftbbox = turf.bbox(left);
        const rightbbox = turf.bbox(right);
        // eslint-disable-next-line max-len
        const yoverlap = rangeOverlaps(<number>leftbbox.at(1), <number>leftbbox.at(3), <number>rightbbox.at(1), <number>rightbbox.at(3));
        const leftmaxX = <number>leftbbox.at(2);
        const rightminX = <number>rightbbox.at(0);
        return yoverlap && leftmaxX < rightminX;
      }).collect(),
    });
  }
}
