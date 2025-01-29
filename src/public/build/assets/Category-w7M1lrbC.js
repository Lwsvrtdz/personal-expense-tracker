import{_ as h}from"./AppLayout-9n7Ga_TU.js";import{C as f,A as w,p as _,a as b,D as v}from"./index-CBKWzqxc.js";import{d as p,c as D,w as x,o as d,a as t,b as k,u as g,e as y,h as C,F as B,t as l,q as F,g as A}from"./app-Cr8VFrN5.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const E={class:"py-12"},N={class:"max-w-7xl mx-auto sm:px-6 lg:px-8"},S={class:"bg-white overflow-hidden shadow-xl sm:rounded-lg p-6"},$={class:"h-96"},R={class:"mt-8"},T={class:"overflow-x-auto"},V={class:"min-w-full divide-y divide-gray-200"},U={class:"bg-white divide-y divide-gray-200"},q={class:"px-6 py-4 whitespace-nowrap text-sm text-gray-900"},z={class:"flex items-center"},I={class:"px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right"},L={class:"px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right"},O={class:"px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 text-right"},J={__name:"Category",props:{categoryData:Array},setup(r){f.register(w,_,b);const i=r,n=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}),m=p({labels:i.categoryData.map(a=>a.category.name),datasets:[{data:i.categoryData.map(a=>a.total),backgroundColor:i.categoryData.map(a=>a.category.color)}]}),u=p({responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"right"},tooltip:{callbacks:{label:function(a){const e=a.dataset.data.reduce((o,c)=>o+c,0),s=(a.raw/e*100).toFixed(1);return`${a.label}: ${n.format(a.raw)} (${s}%)`}}}}});return(a,e)=>(d(),D(h,{title:"Category Report"},{header:x(()=>e[0]||(e[0]=[t("h2",{class:"font-semibold text-xl text-gray-800 leading-tight"}," Category Expense Report ",-1)])),default:x(()=>[t("div",E,[t("div",N,[t("div",S,[t("div",$,[k(g(v),{data:m.value,options:u.value},null,8,["data","options"])]),t("div",R,[e[4]||(e[4]=t("h3",{class:"text-lg font-semibold text-gray-900 mb-4"},"Category Breakdown",-1)),t("div",T,[t("table",V,[e[3]||(e[3]=t("thead",null,[t("tr",null,[t("th",{class:"px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"},"Category"),t("th",{class:"px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"},"Total Expenses"),t("th",{class:"px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"},"Percentage")])],-1)),t("tbody",U,[(d(!0),y(B,null,C(r.categoryData,s=>(d(),y("tr",{key:s.category_id},[t("td",q,[t("div",z,[t("span",{class:"w-3 h-3 rounded-full mr-2",style:F({backgroundColor:s.category.color})},null,4),A(" "+l(s.category.name),1)])]),t("td",I,l(g(n).format(s.total)),1),t("td",L,l((s.total/r.categoryData.reduce((o,c)=>o+c.total,0)*100).toFixed(1))+"% ",1)]))),128))]),t("tfoot",null,[t("tr",null,[e[1]||(e[1]=t("td",{class:"px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900"},"Total",-1)),t("td",O,l(g(n).format(r.categoryData.reduce((s,o)=>s+o.total,0))),1),e[2]||(e[2]=t("td",{class:"px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 text-right"},"100%",-1))])])])])])])])])]),_:1}))}};export{J as default};
