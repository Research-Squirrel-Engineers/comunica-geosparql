import { TermFunctionBase } from '@comunica/bus-function-factory';
import type {
  StringLiteral,
} from '@comunica/utils-expression-evaluator';
import {
  declare,
  double,
  GeoSparqlOperator,
  InvalidArgumentTypes,
} from '@comunica/utils-expression-evaluator';

import { parseGeometry } from '@comunica/utils-expression-evaluator/lib/util/Parsing';
import * as turf from '@turf/turf';
import type * as GJ from 'geojson';

/**
 * http://www.opengis.net/def/function/geosparql/maxX
 */
export class TermFunctionMaxX extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlOperator.MAXX,
      overloads: declare(GeoSparqlOperator.MAXX).onTerm1(() => (term) => {
        if (term.termType === 'literal') {
          return double(this.calculate(parseGeometry(<StringLiteral>term)[0]));
        }
        throw new InvalidArgumentTypes([ term ], GeoSparqlOperator.MAXX);
      }).onLiteral1(() => literal => double(this.calculate(parseGeometry(literal)[0]))).collect(),
    });
  }

  private calculate(thegeom: GJ.Geometry): number {
    let maxX = Number.MIN_VALUE;
    turf.coordEach(thegeom, (
      currentCoord,
      _cordIndex,
      _featureIndex,
      _multiFeatureIndex,
      _geometryIndex,
    ) => {
      if (currentCoord[0] > maxX) {
        maxX = currentCoord[0];
      }
    });
    return maxX;
  }
}
