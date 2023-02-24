
import { slidingWindow } from "../utils";
import { Change as defaultOptions } from "./defaultOptionsForComputation";

export default function() {
	let options = defaultOptions;

	function calculator(data) {
		const { sourcePath } = options;

		const algo = slidingWindow()
			.windowSize(2)
			.accumulator(([prev, curr]) => {
				let obv = 0;
				if(curr.close > prev.close){
					obv = (prev.obv || 0) +  (curr.volume || 0);
				}
				if(curr.close < prev.close){
					obv = (prev.obv || 0) -  (curr.volume || 0);
				}

				if(curr.close == prev.close){
					obv = (prev.obv || 0) ;
				}
				return obv;
			});

		const newData = algo(data);

		return newData;
	}
	calculator.undefinedLength = function() {
		return 1;
	};
	calculator.options = function(x) {
		if (!arguments.length) {
			return options;
		}
		options = { ...defaultOptions, ...x };
		return calculator;
	};

	return calculator;
}
