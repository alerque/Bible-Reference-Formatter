"use strict";

/* global require, module */

const OsisFormatter = require("./osisFormatter");
const osisFormatter = new OsisFormatter();
let currentStyle = "";

const styles = Object.freeze({
	"yc-long": {
		options: {
			".": " ",
			",": "; ",
			"b,c": "; $chapters ",
			"b,v": "; $b ",
			"c,v": "; $c:",
			"v,c": "; $chapters ",
			"v,cv": "; ",
			"v,v": ",",
			"$chapters": ["böl.", "böl."],
			"$verses": ["a.", "a."],
			"singleChapterFormat": "b",
			"-": "—",
			"b-c": "—$chapters ",
			"b-v": "—$b ",
			"c-v": "—$c:",
			"v-c": "—$chapters ",
			"v-cv": "—",
			"v-v": "–",
			"^c": "$chapters ",
			"b1^v": "$verses ",
			"^v": "$verses "
		},
    books: {
      "Gen": [ "Yaratılış" ],
      "Exod": [ "Mısır’dan Çıkış" ],
      "Lev": [ "Levililer" ],
      "Num": [ "Çölde Sayım" ],
      "Deut": [ "Yasa’nın Tekrarı" ],
      "Josh": [ "Yeşu" ],
      "Judg": [ "Hakimler" ],
      "Ruth": [ "Rut" ],
      "1Sam": [ "1. Samuel" ],
      "2Sam": [ "2. Samuel" ],
      "1Kgs": [ "1. Krallar" ],
      "2Kgs": [ "2. Krallar" ],
      "1Chr": [ "1. Tarihler" ],
      "2Chr": [ "2. Tarihler" ],
      "Ezra": [ "Ezra" ],
      "Neh": [ "Nehemya" ],
      "Esth": [ "Ester" ],
      "Job": [ "Eyüp" ],
      "Ps": [ "Mezmur", "Mezmur", "Mezmurlar" ],
      "Prov": [ "Süleyman’ın Özdeyişleri" ],
      "Eccl": [ "Vaiz" ],
      "Song": [ "Ezgiler Ezgisi" ],
      "Isa": [ "Yeşaya" ],
      "Jer": [ "Yeremya" ],
      "Lam": [ "Ağıtlar" ],
      "Ezek": [ "Hezekiel" ],
      "Dan": [ "Daniel" ],
      "Hos": [ "Hoşea" ],
      "Joel": [ "Yoel" ],
      "Amos": [ "Amos" ],
      "Obad": [ "Ovadya" ],
      "Jonah": [ "Yunus" ],
      "Mic": [ "Mika" ],
      "Nah": [ "Nahum" ],
      "Hab": [ "Habakkuk" ],
      "Zeph": [ "Sefanya" ],
      "Hag": [ "Hagay" ],
      "Zech": [ "Zekeriya" ],
      "Mal": [ "Malaki" ],
      "Matt": [ "Matta" ],
      "Mark": [ "Markos" ],
      "Luke": [ "Luka" ],
      "John": [ "Yuhanna" ],
      "Acts": [ "Elçilerin İşleri" ],
      "Rom": [ "Romalılar" ],
      "1Cor": [ "1. Korintliler" ],
      "2Cor": [ "2. Korintliler" ],
      "Gal": [ "Galatyalılar" ],
      "Eph": [ "Efesliler" ],
      "Phil": [ "Filipililer" ],
      "Col": [ "Koloseliler" ],
      "1Thess": [ "1. Selanikliler" ],
      "2Thess": [ "2. Selanikliler" ],
      "1Tim": [ "1. Timoteos" ],
      "2Tim": [ "2. Timoteos" ],
      "Titus": [ "Titus" ],
      "Phlm": [ "Filimon" ],
      "Heb": [ "İbraniler" ],
      "Jas": [ "Yakup" ],
      "1Pet": [ "1. Petrus" ],
      "2Pet": [ "2. Petrus" ],
      "1John": [ "1. Yuhanna" ],
      "2John": [ "2. Yuhanna" ],
      "3John": [ "3. Yuhanna" ],
      "Jude": [ "Yahuda" ],
      "Rev": [ "Vahiy" ],
      "Tob": ["Tobit"],
      "Jdt": ["Yudit"],
      "Wis": ["Bilgelik"],
      "Sir": ["Sirak"],
      "Bar": ["Baruk"],
      "EpJer": ["Yeremya'nın Mektubu"],
      "PrAzar": ["Azarya'nın Duası"],
      "Sus": ["Suzanna"],
      "Bel": ["Bel ve Ejderha"],
      "1Macc": ["1. Makabeler"],
      "2Macc": ["2. Makabeler"],
      "3Macc": ["3. Makabeler"],
      "4Macc": ["4. Makabeler"],
      "PrMan": ["Manaşşe'nin Duası"],
      "Ps151": ["151. Mezmur"],
      "AddPs": ["151. Mezmur"]
    },
  },
	"yc-short": {
		options: {
			".": ".",
			",": "; ",
			"b,c": "; $chapters ",
			"b,v": "; $b ",
			"c,v": "; $c:",
			"v,c": "; $chapters ",
			"v,cv": "; ",
			"v,v": ",",
			"$chapters": ["böl.", "böl."],
			"$verses": ["a.", "aa."],
			"singleChapterFormat": "b",
			"-": "—",
			"b-c": "—$chapters ",
			"b-v": "—$b ",
			"c-v": "—$c:",
			"v-c": "—$chapters ",
			"v-cv": "—",
			"v-v": "–",
			"^c": "$chapters ",
			"b1^v": "$verses ",
			"^v": "$verses "
		},
    books: {
      "Gen": [ "Yar" ],
      "Exod": [ "Çık" ],
      "Lev": [ "Lev" ],
      "Num": [ "Say" ],
      "Deut": [ "Yas" ],
      "Josh": [ "Yşu" ],
      "Judg": [ "Hak" ],
      "Ruth": [ "Rut" ],
      "1Sam": [ "1Sa" ],
      "2Sam": [ "2Sa" ],
      "1Kgs": [ "1Kr" ],
      "2Kgs": [ "2Kr" ],
      "1Chr": [ "1Ta" ],
      "2Chr": [ "2Ta" ],
      "Ezra": [ "Ezr" ],
      "Neh": [ "Neh" ],
      "Esth": [ "Est" ],
      "Job": [ "Eyü" ],
      "Ps": [ "Mez" ],
      "Prov": [ "Özd" ],
      "Eccl": [ "Vai" ],
      "Song": [ "Ezg" ],
      "Isa": [ "Yşa" ],
      "Jer": [ "Yer" ],
      "Lam": [ "Ağı" ],
      "Ezek": [ "Hez" ],
      "Dan": [ "Dan" ],
      "Hos": [ "Hoş" ],
      "Joel": [ "Yoe" ],
      "Amos": [ "Amo" ],
      "Obad": [ "Ova" ],
      "Jonah": [ "Yun" ],
      "Mic": [ "Mik" ],
      "Nah": [ "Nah" ],
      "Hab": [ "Hab" ],
      "Zeph": [ "Sef" ],
      "Hag": [ "Hag" ],
      "Zech": [ "Zek" ],
      "Mal": [ "Mal" ],
      "Matt": [ "Mat" ],
      "Mark": [ "Mar" ],
      "Luke": [ "Luk" ],
      "John": [ "Yu" ],
      "Acts": [ "Elç" ],
      "Rom": [ "Rom" ],
      "1Cor": [ "1Ko" ],
      "2Cor": [ "2Ko" ],
      "Gal": [ "Gal" ],
      "Eph": [ "Ef" ],
      "Phil": [ "Flp" ],
      "Col": [ "Kol" ],
      "1Thess": [ "1Se" ],
      "2Thess": [ "2Se" ],
      "1Tim": [ "1Ti" ],
      "2Tim": [ "2Ti" ],
      "Titus": [ "Tit" ],
      "Phlm": [ "Flm" ],
      "Heb": [ "İbr" ],
      "Jas": [ "Yak" ],
      "1Pet": [ "1Pe" ],
      "2Pet": [ "2Pe" ],
      "1John": [ "1Yu" ],
      "2John": [ "2Yu" ],
      "3John": [ "3Yu" ],
      "Jude": [ "Yah" ],
      "Rev": [ "Va" ],
      "Tob": ["Tob"],
      "Jdt": ["Yud"],
      "Wis": ["Bil"],
      "Sir": ["Sir"],
      "Bar": ["Bar"],
      "EpJer": ["Yerme"],
      "PrAzar": ["Azar"],
      "Sus": ["Suz"],
      "Bel": ["Bel"],
      "1Macc": ["1Mak"],
      "2Macc": ["2Mak"],
      "3Macc": ["3Mak"],
      "4Macc": ["4Mak"],
      "PrMan": ["Man"],
      "Ps151": ["151Mez"],
      "AddPs": ["151Mez"]
    },
	}
});

function formatOsis(style, osis, context) {
	if (style !== currentStyle) {
		setStyle(style);
	}
	return osisFormatter.format(osis, context);
}

function setStyle(style) {
	if (typeof styles[style] === "undefined") {
		throw `Unknown style: ${ style }. Please choose: ${ Object.keys(styles).join(", ") }`;
	}
	osisFormatter.setBooks(styles[style].books);
	osisFormatter.setOptions(styles[style].options);
	currentStyle = style;
}

module.exports = formatOsis;
