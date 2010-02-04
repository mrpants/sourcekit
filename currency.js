dojo.provide("dojo.currency");

dojo.require("dojo.number");
dojo.require("dojo.i18n");
dojo.requireLocalization("dojo.cldr", "currency");
dojo.require("dojo.cldr.monetary");

/*=====
dojo.currency = {
	// summary: localized formatting and parsing routines for currencies
}
=====*/

dojo.currency._mixInDefaults = function(options){
	options = options || {};
	options.type = "currency";

	// Get locale-dependent currency data, like the symbol
	var bundle = dojo.i18n.getLocalization("dojo.cldr", "currency", options.locale) || {};

	// Mixin locale-independent currency data, like # of places
	var iso = options.currency;
	var data = dojo.cldr.monetary.getData(iso);

	dojo.forEach(["displayName","symbol","group","decimal"], function(prop){
		data[prop] = bundle[iso+"_"+prop];
	});

	data.fractional = [true, false];

	// Mixin with provided options
	return dojo.mixin(data, options);
}

/*=====
dojo.declare("dojo.currency.__FormatOptions", [dojo.number.__FormatOptions], {
	//	type: String?
	//		Should not be set.  Value is assumed to be 'currency'.
	//	currency: String?
	//		an [ISO4217](http://en.wikipedia.org/wiki/ISO_4217) currency code, a three letter sequence like "USD".
	//		For use with dojo.currency only.
	//	symbol: String?
	//		localized currency symbol. The default will be looked up in table of supported currencies in `dojo.cldr`
	//		A [ISO4217](http://en.wikipedia.org/wiki/ISO_4217) currency code will be used if not found.
	//	places: Number?
	//		number of decimal places to show.  Default is defined based on which currency is used.
	type: "",
	symbol: "",
	places: "",
});
=====*/

dojo.currency.format = function(/*Number*/value, /*dojo.currency.__FormatOptions?*/options){
// summary:
//		Format a Number as a currency, using locale-specific settings
//
// description:
//		Create a string from a Number using a known, localized pattern.
//		[Formatting patterns](http://www.unicode.org/reports/tr35/#Number_Elements)
//		appropriate to the locale are chosen from the [CLDR](http://unicode.org/cldr)
//		as well as the appropriate symbols and delimiters and number of decimal places.
//
// value:
//		the number to be formatted.

	return dojo.number.format(value, dojo.currency._mixInDefaults(options));
}

dojo.currency.regexp = function(/*dojo.number.__RegexpOptions?*/options){
//
// summary:
//		Builds the regular needed to parse a currency value
//
// description:
//		Returns regular expression with positive and negative match, group and decimal separators
//		Note: the options.places default, the number of decimal places to accept, is defined by the currency type.
	return dojo.number.regexp(dojo.currency._mixInDefaults(options)); // String
}

/*=====
dojo.declare("dojo.currency.__ParseOptions", [dojo.number.__ParseOptions], {
	//	type: String?
	//		Should not be set.  Value is assumed to be currency.
	//	currency: String?
	//		an [ISO4217](http://en.wikipedia.org/wiki/ISO_4217) currency code, a three letter sequence like "USD".
	//		For use with dojo.currency only.
	//	symbol: String?
	//		localized currency symbol. The default will be looked up in table of supported currencies in `dojo.cldr`
	//		A [ISO4217](http://en.wikipedia.org/wiki/ISO_4217) currency code will be used if not found.
	//	places: Number?
	//		fixed number of decimal places to accept.  The default is determined based on which currency is used.
	//	fractional: Boolean?|Array?
	//		Whether to include the fractional portion, where the number of decimal places are implied by the currency
	//		or explicit 'places' parameter.  The value [true,false] makes the fractional portion optional.
	//		By default for currencies, it the fractional portion is optional.
	type: "",
	symbol: "",
	places: "",
	fractional: ""
});
=====*/

dojo.currency.parse = function(/*String*/expression, /*dojo.currency.__ParseOptions?*/options){
	//
	// summary:
	//		Convert a properly formatted currency string to a primitive Number,
	//		using locale-specific settings.
	//
	// description:
	//		Create a Number from a string using a known, localized pattern.
	//		[Formatting patterns](http://www.unicode.org/reports/tr35/#Number_Format_Patterns)
	//		are chosen appropriate to the locale, as well as the appropriate symbols and delimiters
	//		and number of decimal places.
	//
	// expression: A string representation of a Number

	return dojo.number.parse(expression, dojo.currency._mixInDefaults(options));
}
