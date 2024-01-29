(function(n,i){typeof exports=="object"&&typeof module<"u"?i(exports):typeof define=="function"&&define.amd?define(["exports"],i):(n=typeof globalThis<"u"?globalThis:n||self,i(n["@scalar/snippetz-core"]={}))})(this,function(n){"use strict";function i(f){return f.reduce((o,r)=>(o[r.name]=r.value,o),{})}function $(f){return/\s|-/.test(f)}function l(f,o=0){let r=[],y=" ".repeat(o),s=" ".repeat(o+2);for(const[p,e]of Object.entries(f)){let a=$(p)?`'${p}'`:p;if(Array.isArray(e)){const u=e.map(t=>typeof t=="string"?`'${t}'`:t&&typeof t=="object"?l(t,o+2):t).join(`, ${s}`);r.push(`${s}${a}: [${u}]`)}else if(e&&typeof e=="object")r.push(`${s}${a}: ${l(e,o+2)}`);else if(typeof e=="string"){let u=`${e}`;if(e.startsWith("JSON.stringify")){const t=e.split(`
`);t.length>1&&(u=t.map((c,d)=>d===0?c:`${s}${c}`).join(`
`))}else u=`'${e}'`;r.push(`${s}${a}: ${u}`)}else r.push(`${s}${a}: ${e}`)}return`{
${r.join(`,
`)}
${y}}`}n.arrayToObject=i,n.isKeyNeedsQuotes=$,n.objectToString=l,Object.defineProperty(n,Symbol.toStringTag,{value:"Module"})});
