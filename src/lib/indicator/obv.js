

import { rebind, merge } from "../utils";

import { obv } from "../calculator";

import baseIndicator from "./baseIndicator";

const ALGORITHM_TYPE = "Obv";

export default function() {

	const base = baseIndicator()
		.type(ALGORITHM_TYPE);

	const underlyingAlgorithm = obv();

	const mergedAlgorithm = merge()
		.algorithm(underlyingAlgorithm)
		.merge((datum, d) => {
			datum.obv = d;
		});

	const indicator = function(data, options = { merge: true }) {
		if (options.merge) {
			return mergedAlgorithm(data);
		}
		return underlyingAlgorithm(data);
	};
	rebind(indicator, base, "id", "accessor", "stroke", "fill", "echo", "type");
	rebind(indicator, underlyingAlgorithm, "options");
	rebind(indicator, mergedAlgorithm, "merge", "skipUndefined");

	return indicator;
}
