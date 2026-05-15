import { TermFunctionBase } from '@comunica/bus-function-factory';
import {
  GeoSparqlExtOperator,
  declare, bool, string, StringLiteral,
} from '@comunica/utils-expression-evaluator';
import {serializeGeometry} from '@comunica/utils-expression-evaluator/lib/util/Serialization';
import * as turf from "@turf/turf";
import {Point} from "geojson";

/**
 * https://www.w3.org/TR/sparql11-query/#func-RDFterm-equal
 */
export class TermFunctionExplode extends TermFunctionBase {
  public constructor() {
    super({
      arity: 1,
      operator: GeoSparqlExtOperator.EXPLODE,
      // eslint-disable-next-line max-len
      overloads: declare(GeoSparqlExtOperator.EXPLODE).onGeometryTup1(() => term => {
        /*const fc = turf.explode(term[0]).features;
        const geoms: Point[] = [];
        turf.featureEach(fc, function (currentFeature, featureIndex) {
          geoms.push(currentFeature.geometry);
        });
        turf.geometryCollection(geoms);

         */
        return new StringLiteral('');
      }).collect(),
    });
  }
}
