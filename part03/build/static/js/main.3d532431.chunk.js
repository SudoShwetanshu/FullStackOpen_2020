(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},19:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(13),c=t.n(u),o=(t(19),t(2)),l=function(e){return r.a.createElement("div",null,r.a.createElement("form",{onSubmit:e.onSubmit},r.a.createElement("div",null,"name: ",r.a.createElement("input",{type:"text",value:e.value,onChange:e.onChange,required:!0})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{type:"text",value:e.numbervalue,onChange:e.onChangeNumber,required:!0})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add"))))},i=function(e){var n=e.persons,t=e.deletePerson;return r.a.createElement("div",null,r.a.createElement("div",null," ",r.a.createElement("h2",null," Numbers ")," "),n.map((function(e){return r.a.createElement("li",{className:"numbers",key:e.id},"  ",e.name+"           "+e.number," \xa0",r.a.createElement("button",{className:"btn",onClick:function(){return t(e)}}," Delete "))})))},m=function(e){var n=e.value,t=e.onChange;return r.a.createElement("div",null,r.a.createElement("p",{className:"filterText"},"Filter shown with \xa0",r.a.createElement("input",{value:n,onChange:t})))},f=function(e){var n=e.notification;return null===n?null:r.a.createElement("div",{className:"notification"},n)},s=function(e){var n=e.error;return null===n?null:r.a.createElement("div",{className:"error"},n)},d=t(3),b=t.n(d),h="/api/persons",p=function(){return b.a.get(h)},E=function(e){return b.a.post(h,e)},v=function(e){return b.a.delete("".concat(h,"/").concat(e))},w=function(e,n){return b.a.put("".concat(h,"/").concat(e),n)},g=function(e){return r.a.createElement("div",null," ",r.a.createElement("h1",{id:"h1"},e.text)," ",r.a.createElement("p",null," A basic  REST API by ",r.a.createElement("a",{href:"https://www.github.com/SudoShwetanshu"},"SudoShwetanshu")," , subject to open and free use for all purposes/boiler-plating."))},S=function(){var e=Object(a.useState)([]),n=Object(o.a)(e,2),t=n[0],u=n[1],c=Object(a.useState)(""),d=Object(o.a)(c,2),b=d[0],h=d[1],S=Object(a.useState)(""),O=Object(o.a)(S,2),j=O[0],N=O[1],C=Object(a.useState)(""),y=Object(o.a)(C,2),T=y[0],k=y[1],x=Object(a.useState)(null),A=Object(o.a)(x,2),R=A[0],D=A[1],P=Object(a.useState)(null),q=Object(o.a)(P,2),J=q[0],F=q[1];Object(a.useEffect)((function(){p().then((function(e){u(e.data),D(null)}))}),[]);var I=t.filter((function(e){return e.name.toLowerCase().includes(b.toLowerCase())}));return r.a.createElement("div",{className:"container"},r.a.createElement(f,{notification:R}),r.a.createElement(s,{error:J}),r.a.createElement(g,{text:"Phonebook"}),r.a.createElement(m,{value:b,onChange:function(e){h(e.target.value)}}),r.a.createElement("h2",null,"Add a new person"),r.a.createElement(l,{value:T,onChange:function(e){k(e.target.value)},onSubmit:function(e){e.preventDefault();var n={name:T,number:j};if(t.filter((function(e){return e.name===n.name})).length>0){if(window.confirm("Update ".concat(n.name," with the new number ").concat(n.number," ?"))){var a=t.find((function(e){return e.name===n.name}));w(a.id,n).then((function(e){return u(t.map((function(n){return n.id!==a.id?n:e.data})))})).then((function(){D("".concat(n.name,' was updated with the new Number "').concat(n.number,'"')),setTimeout((function(){D(null)}),5e3)})).catch((function(e){F("The information for ".concat(n.name," has already been deleted from server")),u(t.filter((function(e){return e.id!==a.id}))),setTimeout((function(){F(null)}),5e3)}))}}else E(n).then((function(e){u(t.concat(e.data)),D("Added ".concat(n.name," with number ").concat(n.number," to phonebook!")),N(""),k(""),setTimeout((function(){D(null)}),5e3)})).catch((function(e){console.log(" FRONTEND ERROR MSG ".concat(e)),F("".concat(JSON.stringify(e.response.data))),setTimeout((function(){F(null)}),5e3)}));Array.from(document.querySelectorAll("input")).forEach((function(e){return e.value=""})),k("")},numberValue:j,onChangeNumber:function(e){N(e.target.value)}}),r.a.createElement(i,{persons:I,deletePerson:function(e){window.confirm("Delete?")&&v(e.id).then(u(t.filter((function(n){return n.id!==e.id})))).catch((function(n){F('The person "'.concat(e.name,'" was already deleted from server')),u(t.filter((function(n){return n.id!==e.id}))),setTimeout((function(){F(null)}),5e3)}))}}))};c.a.render(r.a.createElement(S,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.3d532431.chunk.js.map