const e=document.querySelector("[data-start]"),t=document.querySelector("[data-stop]"),d=document.querySelector("body");let a=null;function n(){const e=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,"0")}`;d.style.backgroundColor=e}e.disabled=!1,t.disabled=!0,e.addEventListener("click",(function(){e.disabled=!0,t.disabled=!1,n(),a=setInterval(n,1e3)})),t.addEventListener("click",(function(){e.disabled=!1,t.disabled=!0,clearInterval(a)}));
//# sourceMappingURL=01-color-switcher.e4966bae.js.map
