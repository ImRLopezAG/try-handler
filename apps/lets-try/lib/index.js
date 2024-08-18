/* eslint-disable */
var n=async t=>{try{return [await t(),null]}catch(r){return [null,r instanceof Error?r.message:String(r)]}},s=t=>{try{return [t(),null]}catch(r){return [null,r instanceof Error?r.message:String(r)]}};

export { n as tryAsync, s as tryCatch };
