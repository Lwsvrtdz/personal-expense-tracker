import{u as m,_ as p}from"./AppLayout-9n7Ga_TU.js";import{c as y,w as c,o as a,a as t,t as o,u as d,e as i,h as g,F as x,q as n,g as h}from"./app-Cr8VFrN5.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const u={class:"py-12"},f={class:"max-w-7xl mx-auto sm:px-6 lg:px-8"},b={class:"grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"},w={class:"bg-white overflow-hidden shadow-xl sm:rounded-lg p-6"},_={class:"text-3xl font-bold text-indigo-600"},v={class:"bg-white overflow-hidden shadow-xl sm:rounded-lg p-6"},k={class:"text-3xl font-bold text-indigo-600"},E={class:"bg-white overflow-hidden shadow-xl sm:rounded-lg p-6 mb-6"},D={class:"overflow-x-auto"},C={class:"min-w-full divide-y divide-gray-200"},S={class:"bg-white divide-y divide-gray-200"},T={class:"px-6 py-4 whitespace-nowrap text-sm text-gray-900"},B={class:"px-6 py-4 whitespace-nowrap text-sm text-gray-900"},N={class:"px-6 py-4 whitespace-nowrap text-sm text-gray-900"},A={class:"inline-flex items-center"},F={class:"px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right"},L={class:"bg-white overflow-hidden shadow-xl sm:rounded-lg p-6"},V={class:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"},q={class:"font-medium text-gray-900"},j={__name:"Dashboard",props:{totalExpenses:Number,monthlyExpenses:Number,recentExpenses:Array,categoryTotals:Array},setup(r){const l=m();return(z,e)=>(a(),y(p,{title:"Dashboard"},{header:c(()=>e[0]||(e[0]=[t("h2",{class:"font-semibold text-xl text-gray-800 leading-tight"}," Dashboard ",-1)])),default:c(()=>[t("div",u,[t("div",f,[t("div",b,[t("div",w,[e[1]||(e[1]=t("h3",{class:"text-lg font-semibold text-gray-900 mb-2"},"Total Expenses",-1)),t("p",_,o(d(l).formatter.format(r.totalExpenses)),1)]),t("div",v,[e[2]||(e[2]=t("h3",{class:"text-lg font-semibold text-gray-900 mb-2"},"Monthly Expenses",-1)),t("p",k,o(d(l).formatter.format(r.monthlyExpenses)),1)])]),t("div",E,[e[4]||(e[4]=t("h3",{class:"text-lg font-semibold text-gray-900 mb-4"},"Recent Transactions",-1)),t("div",D,[t("table",C,[e[3]||(e[3]=t("thead",null,[t("tr",null,[t("th",{class:"px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"},"Date"),t("th",{class:"px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"},"Description"),t("th",{class:"px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"},"Category"),t("th",{class:"px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"},"Amount")])],-1)),t("tbody",S,[(a(!0),i(x,null,g(r.recentExpenses,s=>(a(),i("tr",{key:s.id},[t("td",T,o(new Date(s.date).toLocaleDateString()),1),t("td",B,o(s.description),1),t("td",N,[t("span",A,[t("span",{class:"w-3 h-3 rounded-full mr-2",style:n({backgroundColor:s.category.color})},null,4),h(" "+o(s.category.name),1)])]),t("td",F,o(d(l).formatter.format(s.amount)),1)]))),128))])])])]),t("div",L,[e[5]||(e[5]=t("h3",{class:"text-lg font-semibold text-gray-900 mb-4"},"Category Summary",-1)),t("div",V,[(a(!0),i(x,null,g(r.categoryTotals,s=>(a(),i("div",{key:s.category.id,class:"p-4 rounded-lg",style:n({backgroundColor:s.category.color+"10"})},[t("h4",q,o(s.category.name),1),t("p",{class:"text-2xl font-semibold mt-2",style:n({color:s.category.color})},o(d(l).formatter.format(s.total)),5)],4))),128))])])])])]),_:1}))}};export{j as default};
