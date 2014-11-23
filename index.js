var supportedLang=["fr","en","ar"],
	varSession;

module.exports = function(req) {
	varSession = require("varsession")(req);
	return {define:addQamoos, get:getQamoos, lang:setLang};
}

function addQamoos( name ){
	if (!global['qamoos']) global['qamoos']={};
	if (!global['qamoos'][name]) {
		global['qamoos'][name]={
			type:'Qamoos',
			data:{}
		}
	}
	return getQamoos( name );
}

function getQamoos(name){
	if (!global['qamoos']) global['qamoos']={};

	var qamoos = global['qamoos'][name];
	if (!qamoos) return null;
	return {set:setMsg.bind(qamoos), get:getMsg.bind(qamoos), getErr:getMsgAsErr.bind(qamoos), lang:setLang};
}

function setMsg(index, translations, code){
	var qamoos=this, entry=qamoos.data[index];

	if (!qamoos) return null;
	if (!qamoos.data[index]) qamoos.data[index]={};
	for(var lang in translations) {
		if (supportedLang.indexOf(lang)<0) continue;
		qamoos.data[index][lang] = translations[lang]; 
	}
	if (typeof code == "number") qamoos.data[index].code = code;
	return true;
}

function getMsg(index){
	var qamoos=this, entry=qamoos.data[index],
		lang = varSession.get("qamoosLang","en");

	if (!entry) return null;
	if (entry[lang]) return entry[lang];
	for(lang in entry) if (typeof entry[lang]=="string") return entry[lang];  
	return "";
}

function getMsgAsErr(index){
	var qamoos=this, entry=qamoos.data[index],
		code,
		lang = varSession.get("qamoosLang","en");

	if (!entry) return null;
	code=(typeof entry.code !== "undefined") ? entry.code:0;

	if (entry[lang]) return {err: code, msg:entry[lang]};
	for(lang in entry) if (typeof entry[lang]=="string") return {err:code, msg:entry[lang]};
	return {err:code, msg:""};
}


function setLang(lang){
 if (supportedLang.indexOf(lang)>=0) {varSession.set("qamoosLang",lang); return true}
 return null;
}