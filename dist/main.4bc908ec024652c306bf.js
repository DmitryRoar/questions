!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){},function(e,t,n){"use strict";function o(e){return e.length>=10}function r(e,t){const n=document.createElement("div");n.classList.add("modal"),n.innerHTML=`\n    <h1>${e}</h1>\n    <div class="modal-content">${t}</div>\n    `,mui.overlay("on",n)}n.r(t);const i="https://podcast-5d41f.firebaseio.com";class a{static create(e){return fetch(i+"/questions.json",{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}}).then(e=>e.json()).then(t=>(e.id=t.name,e)).then(s).then(a.renderList)}static renderList(){const e=u(),t=e.length?e.map(l).join(" "):'<div class="mui--text-headline">you have not asked anything yet</div>';document.querySelector("#list").innerHTML=t}static fetch(e){return e?fetch(`${i}/questions.json?auth=${e}`).then(e=>e.json()).then(e=>e&&e.error?`<p class="error">${e.error}</p>`:e?Object.keys(e).map(t=>({...e[t],id:t})):[]):Promise.resolve('<p class="error">You haven\'t token</p>')}static listToHTML(e){return e.length?`<ol>${e.map(e=>`<li>${e.text}</li>`).join("")}</ol>`:"<p>Questions not found</p>"}}function s(e){const t=u();t.push(e),localStorage.setItem("questions",JSON.stringify(t))}function u(){return JSON.parse(localStorage.getItem("questions")||"[]")}function l(e){return`\n<div class="mui--text-headline">\n${new Date(e.date).toLocaleDateString()}\n${new Date(e.date).toLocaleTimeString()}\n</div>\n<div>${e.text}</div>\n<br>`}n(0);const d=document.querySelector("#form"),c=d.querySelector("#question-inp"),f=d.querySelector("#submit"),m=document.querySelector("#modalBtn");function p(e){e.preventDefault();const t=e.target.querySelector("button");t.disabled=!0;(function(e,t){return fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyALoBfqIU1MkqEI_p7B-KHmYMW4Wptxgdw",{method:"POST",body:JSON.stringify({email:e,password:t,returnSecureToken:!0}),headers:{"Content-Type":"application/json"}}).then(e=>e.json()).then(e=>e.idToken)})(e.target.querySelector("#email").value,e.target.querySelector("#password").value).then(a.fetch).then(y).then(()=>t.disabled=!1)}function y(e){"string"==typeof e?r("Error!",e):r("List questions",a.listToHTML(e))}d.addEventListener("submit",(function(e){if(e.preventDefault(),o(c.value)){const e={text:c.value.trim(),date:(new Date).toJSON()};f.disabled=!0,a.create(e).then(()=>{c.value="",c.className="",f.disabled=!1})}})),c.addEventListener("input",()=>{f.disabled=!o(c.value)}),window.addEventListener("load",a.renderList),m.addEventListener("click",(function(){r("Authorize",'\n    <form class="mui-form" id="auth-form">\n        <div class="mui-textfield mui-textfield--float-label">\n            <input type="email" id="email" required>\n            <label for="email">Email</label>\n        </div>\n        <div class="mui-textfield mui-textfield--float-label">\n            <input type="password" id="password" required>\n            <label for="password">Password</label>\n        </div>\n        <button\n                type="submit"\n                class="mui-btn mui-btn--raised mui-btn--primary"\n        >\n            Submit\n        </button>\n            </form>\n'),document.querySelector("#auth-form").addEventListener("submit",p,{once:!0})}))}]);