var supportedLang=["fr","en","ar"],
	currentLang="en";

module.exports = {define:addQamoos, get:getQamoos, lang:setLang}

function addQamoos( name ){
	if (typeof global['qamoos'][name] == "undefined") {
		global['qamoos'][name]={
			type:'Qamoos',
			data:{}
		}
	}
	return getQamoos( name );
}

function getQamoos(name){
	var qamoos = global['qamoos'][name];
	if (!qamoos || qamoos.type != "Qamoos") return null;
	return {set:setMsg.bind(qamoos), get:getMsg.bind(qamoos), getErr:getMsgAsErr.bind(qamoos)};
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
	var qamoos=this, entry=qamoos.data[index];

	if (!entry) return null;
	if (entry[currentLang]) return entry[currentLang];
	for(var lang in entry) if (typeof entry[lang]=="string") return entry[lang];  
	return "";
}

function getMsgAsErr(index){
	var qamoos=this, entry=qamoos.data[index];

	if (!entry) return null;
	if (entry[currentLang]) return {err:entry.code || -1, msg:entry[currentLang]};
	for(var lang in entry) if (typeof entry[lang]=="string") return {err:entry.code || -1, msg:entry[lang]};
	return {err:entry.code || -1, msg:""};
}


function setLang(lang){
 if ((typeof lang == 'string')&&(supportedLang.indexOf(lang)>=0)) {currentLang=lang;return true;}
 return null;
}