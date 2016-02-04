function ValidateINN(input) {
	var inn = String(input);
	var validStrChars = ['0','1','2','3','4','5','6','7','8','9'];

	var coeff10 = [2,4,10,3,5,9,4,6,8,0];
	var coeffOne12 = [7,2,4,10,3,5,9,4,6,8,0];
	var coeffTwo12 = [3,7,2,4,10,3,5,9,4,6,8,0];

	var controlSumm10 = 0;
	var controlSummOne12 = 0;
	var controlSummTwo12 = 0;

	var coeff10Summ = 0;
	var coeff12Summ_one = 0;
	var coeff12Summ_two = 0;

	function getControllNumber(input_summ) {
		var summ = input_summ % 11;
		if (summ > 9) return summ % 10;
		return summ;
	}


	if (!inn) return {
		result: false,
		msg:"INN should be an String and not empty"
	};

	for (var i = 0; i < inn.length; i++) {
		if (validStrChars.indexOf(inn.charAt(i))===-1) return {
			result: false,
			msg: "INN should be only numeric"
		};
	}

	if ([10,12].indexOf(inn.length) == -1) return {
		result: false,
		msg:"INN should have 10 or 12 symbols"
	};

	if (inn.length === 10) {
		// 10 symbols INN
		for (var i = 0; i < coeff10.length; i++) {
			coeff10Summ+=coeff10[i]*parseInt(inn.charAt(i),10);
		}

		controlSumm10 = String(getControllNumber(coeff10Summ));

		if (inn.charAt(9) === controlSumm10) {
			if (validStrChars.indexOf(inn.charAt(i))===-1) return {
				result: true,
				msg: "INN valid"
			};
		} else {
			return {
				result: false,
				msg: "INN control summ incorrect "+ controlSumm10
			};
		}
	} else {
		// 12 symbols INN
		for (var i = 0; i < coeffOne12.length; i++) {
			coeff12Summ_one+=coeffOne12[i]*parseInt(inn.charAt(i),10);
		}

		for (var i = 0; i < coeffTwo12.length; i++) {
			coeff12Summ_two+=coeffTwo12[i]*parseInt(inn.charAt(i),10);
		}

		controlSummOne12 = String(getControllNumber(coeff12Summ_one));
		controlSummTwo12 = String(getControllNumber(coeff12Summ_two));

		if (inn.charAt(10) === controlSummOne12 && inn.charAt(11) === controlSummTwo12) {
			return {
				result: true,
				msg: "INN valid"
			};
		} else {
			return {
				result: false,
				msg: "INN control summ incorrect "+ controlSummOne12+" "+controlSummTwo12
			};
		}
	}
}
