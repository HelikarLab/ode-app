(window["webpackJsonpode-app-client"]=window["webpackJsonpode-app-client"]||[]).push([[0],{295:function(e,t,a){e.exports=a(650)},458:function(e,t,a){},459:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB98DBg8SMBgGJhQAAAJcSURBVDjLrZO/alRREMa/mXPOvXf/BEmybhQiBDXamM7HECxU1AgW1mIlIgiClU+ghaSLElnBPICNL2Fh4b/KsKzsZt299557z5mxiFkT0UqnnOI33/fNDPCPRb83Tj162+W0eYNcetW65FzTMR/JzLt2wq/aCW++uLLy9Y+Akw/fELG5QC59SjZdbrba6LQsjrUtjs85NB2jjtqvRW+Pvbx+dvFEBAC7D1CJF4hND2wz12hpKzVYaBhaXUyxttTQo02DvJbu+4Hf+jyq1gH0AIABYOXe9lGIPAVxRmw0MUwtRzTfsDg5n+D0QkIr8wmd6WR6tpOaxPKT673PyzOA+PyGSlwGoGTdzFZqCJllZI7hmGAZlDlWx9QZe7k1A2isr0LCnpUYoaoQBfJasDMJ6E8Cdn3EsIjoTwKmVcS0itdmGWjt16QqwY1IkAAfFXkt+FZEfBp6AMBi08AHxcdhRTuTgLGX1RlAfM5gC60KiHEglyKvUgyme6pGpaDhCEGAQR4wmAaUQfBLQfDvJB+dj0mmlDRIfI6CGAAQVTEqAgwToih8VAyLiFhOPx5cYy/mu+f3w7NHuoAKCm2jDA6GCY4JtShCXWkYD0hr3zugoN5UiXfDbr8roVKtPZm5RXBVgoxDtA6VCqQqNYx2SKpyRMZsHLrEpSsPL0s5eamhNuRSNa15cNYmTpsAMaTKVfIxaazBSXbz6/P7m4cukYzbJpuuq+qTWHzvxOkQYAuinzOIiZNsRDa9I8DWX5+pe+nBstb+lkq8plWxCoDIpR+ITY9sutHffvwF/7N+AOa9Ka0q3oiBAAAAAElFTkSuQmCC"},460:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADkSURBVDhPlZGxDgFRFER3JXQ+gEKiEBIqrdYHqHW+jc4HSETtV4iGRhS79z53NvNYPJt9k0yx9s7MiU1UtWOeRHoMO+d6KJiJqstFskhrrrpKrKVhD0f8gKI6LsIiN8umKEiNYho6rLKtL4sCCBQicqhDwfX7KwyRYhgKhJw5t/gogEixDwW8uf7ALWNvkaIfCpZt6/OfdS9S7EL/BdevwXUvUnS/w974Wn/XvUixLVNw/VS57kWKdnkZNo3wjmfVwqFRrLkMn2uHIRybW37diAZRBRApNrZ+iQ5DpGjiq/wvSJInLsNx8D4f8OUAAAAASUVORK5CYII="},588:function(e,t,a){},646:function(e,t,a){},649:function(e,t,a){},650:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),c=a(11),l=a.n(c),o=a(10),i=a(74),s=a(62),m=a.n(s),u=a(41),d=a.n(u);function p(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}function f(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?p(a,!0).forEach(function(t){Object(i.a)(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):p(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}var E={modelMetadata:{},importSbml:Object(o.e)(function(e,t){var a=new FormData;return a.append("file",t,t.name),m()({method:"post",url:"".concat("/","api/uploadSbml"),data:a}).then(function(t){var a=JSON.parse(t.data);e.modelTab.setCurrentModel(a)}).then(function(){return e.initSimulation(),{error:!1}}).catch(function(e){return{message:"Something went wrong.",error:!0}})}),getModel:Object(o.e)(function(e,t){return m()({method:"get",url:"".concat("/","api/model/get/").concat(t)}).then(function(t){var a=t.data.jsonModel;e.modelTab.setCurrentModel(a),e.setModelMetadata({name:a.name,id:a.id,sbmlVersion:a.sbmlVersion,sbmlLevel:a.sbmlLevel})}).then(function(){return e.initSimulation(),{error:!1,message:"Successfully retrieved model."}}).catch(function(e){return console.log(e),{error:!0,message:"Something went wrong."}})}),initSimulation:Object(o.b)(function(e){e.simulationTab.reactions=e.modelTab.currentModel.reactions.map(function(e){return f({},e,{ratelaw:"",parameters:[],checked:!1})}),e.simulationTab.speciesFromModel=e.modelTab.currentModel.species.map(function(e){return f({},e,{initialConcentration:0})})}),setModelMetadata:Object(o.b)(function(e,t){e.modelMetadata={name:t.name,id:t.id,sbmlVersion:t.sbmlVersion,sbmlLevel:t.sbmlLevel}}),modelTab:{currentModel:{species:[],reactions:[],compartments:[]},saveModel:Object(o.e)(function(e,t,a){var n=(0,a.getStoreState)();return m()({method:"post",url:"".concat("/","api/model/add"),data:n.modelTab.currentModel}).then(function(e){return{message:"Successfully saved.",error:!1}}).catch(function(e){return{message:"Something went wrong.",error:!0}})}),setCurrentModel:Object(o.b)(function(e,t){e.currentModel=t})},simulationTab:{icmin:0,icmax:100,icstep:Object(o.c)(function(e){return(e.icmax-e.icmin)/100}),reactions:[],speciesFromModel:[],species:[],resultData:[],graphData:Object(o.c)(function(e){return e.resultData.filter(function(e){return!!e.checked})}),simulate:Object(o.e)(function(e,t,a){var n=(0,a.getStoreState)(),r=[];n.simulationTab.reactions.forEach(function(e){if(!0===e.checked){if(""===e.ratelaw)throw new Error("Ratelaw found empty for reaction: "+e.id);r.push(e)}});var c={time:t.time,dataPoints:t.dataPoints,reactions:r,species:n.simulationTab.species};return m()({method:"post",url:"".concat("/","api/simulation"),data:c}).then(function(t){var a=JSON.parse(t.data).concentrationData.map(function(e){return f({},e,{checked:!0})});return e.updateResult(a),{error:!1,message:"Simulation successful."}}).catch(function(e){return{message:"Something went wrong.",error:!0}})}),switchReaction:Object(o.e)(function(e,t,a){var n=(0,a.getStoreState)();n.simulationTab.reactions=n.simulationTab.reactions.map(function(e){return e.id===t.id?f({},e,{checked:!e.checked}):e}),e.updateSpecies()}),reset:Object(o.e)(function(e,t,a){var n=(0,a.getStoreState)().simulationTab;n.reactions=n.reactions.map(function(e){return f({},e,{checked:!1,ratelaw:"",parameters:[]})}),n.icmin=0,n.icmax=100,e.updateSpecies()}),setRatelaw:Object(o.b)(function(e,t){e.reactions=e.reactions.map(function(e){return t.id===e.id?"custom-rate"===t.ratelaw?e.reversible?f({},e,{ratelaw:t.ratelaw,rateForward:t.rateForward,rateBackward:t.rateBackward}):f({},e,{ratelaw:t.ratelaw,rate:t.rate}):f({},e,{ratelaw:t.ratelaw,parameters:t.parameters}):e})}),toggleSpecie:Object(o.b)(function(e,t){e.resultData=e.resultData.map(function(e){return e.name===t?f({},e,{checked:!e.checked}):e})}),updateResult:Object(o.b)(function(e,t){e.resultData=t}),setIcmin:Object(o.b)(function(e,t){e.icmin=t}),setIcmax:Object(o.b)(function(e,t){e.icmax=t}),updateIc:Object(o.b)(function(e,t){e.species.forEach(function(e){e.id===t.id&&(e.initialConcentration=t.initialConcentration)}),e.speciesFromModel.forEach(function(e){e.id===t.id&&(e.initialConcentration=t.initialConcentration)})}),updateSpecies:Object(o.b)(function(e,t){e.species=[],e.reactions.map(function(t){return!!t.checked&&(t.reactants.map(function(t){return e.speciesFromModel.map(function(a){return t.id===a.id&&(!d.a.includes(e.species,a)&&e.species.push(a))})}),t.products.map(function(t){return e.speciesFromModel.map(function(a){return t.id===a.id&&(!d.a.includes(e.species,a)&&e.species.push(a))})}))})})}},g=Object(o.d)(E),h=a(276),b=a(22),v=a(292),w=a(51),y=a(675),A=a(667),N=a(668),S=a(26),x=(a(320),a(651)),O=a(652),k=a(653),j=a(654),C=a(655),D=a(656),M=a(657),R=a(658),P=a(659),I=a(660),F=a(661);function T(e){var t=r.a.useState(!1),a=Object(b.a)(t,2),n=a[0],c=a[1];return r.a.createElement(x.a,{color:"dark",dark:!0,expand:"md"},r.a.createElement(O.a,{href:"/"},"ODE App"),r.a.createElement(k.a,{onClick:function(){c(function(e){return!e})}}),r.a.createElement(j.a,{isOpen:n,navbar:!0},r.a.createElement(C.a,{className:"ml-auto",navbar:!0},r.a.createElement(D.a,null,r.a.createElement(M.a,{href:"/#/model"},"Model")),r.a.createElement(D.a,null,r.a.createElement(M.a,{href:"/#/simulation"},"Simulation"))),r.a.createElement(C.a,{className:"ml-auto",navbar:!0},r.a.createElement(R.a,{nav:!0,inNavbar:!0},r.a.createElement(P.a,{nav:!0,caret:!0,"data-test":"options"},"Options"),r.a.createElement(I.a,{right:!0},r.a.createElement(F.a,{onClick:e.importModel,"data-test":"importOption"},"Import Model"),r.a.createElement(F.a,{onClick:e.savedModels},"Saved Models"))))))}T.defaultProps={importModel:function(){},savedModels:function(){}};var B=T,W=a(24),H=a.n(W),L=a(39),V=a(15),Y=a(662),K=a(663),U=a(664),q=a(279);function Q(e){var t=e.closeModal,a=Object(o.f)(function(e){return e.importSbml});return r.a.createElement(r.a.Fragment,null,r.a.createElement(V.c,{initialValues:{file:""},onSubmit:function(){var e=Object(L.a)(H.a.mark(function e(n,r){var c;return H.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!n.file){e.next=5;break}return e.next=3,a(n.file);case 3:(c=e.sent).error?S.a.error(c.message):t();case 5:case"end":return e.stop()}},e)}));return function(t,a){return e.apply(this,arguments)}}(),render:function(e){return r.a.createElement(Y.a,{onSubmit:e.handleSubmit},r.a.createElement(K.a,null,r.a.createElement("input",{required:!0,type:"file",name:"file",placeholder:"Upload",onChange:function(t){e.setFieldValue("file",t.currentTarget.files[0])}}),r.a.createElement(U.a,{color:"muted"},"Please upload a .sbml or .xml file which is formatted atleast in level 2 SBML for kinetic (ODE) models.")),r.a.createElement(q.a,{color:"primary",type:"submit","data-test":"import-submit-button"},"Submit"))}}))}Q.defaultProps={closeModal:function(){console.log("No function bound.")}};var z=Q,J=a(283),G=a(665),Z=a(666),X="/";var _=function(){var e=r.a.useState([]),t=Object(b.a)(e,2),a=t[0],n=t[1],c=Object(o.f)(function(e){return e.getModel});return r.a.useEffect(function(){m()({method:"get",url:"".concat(X,"api/model/get/all")}).then(function(e){return n(e.data)}).catch(function(e){return console.error(e)})},[]),a?r.a.createElement(G.a,{flush:!0},a.map(function(e){return r.a.createElement(Z.a,{tag:"button",action:!0,onClick:Object(L.a)(H.a.mark(function t(){var a;return H.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,c(e.id);case 2:(a=t.sent).error?S.a.error(a.message):S.a.success(a.message);case 4:case"end":return t.stop()}},t)})),key:e.id},e.name," -"," ",Object(J.format)(new Date(e.createdAt),"D MMMM YYYY - hh:mm:ss A"))})):r.a.createElement("div",null)},$=a(40),ee=a(284),te=a(285),ae=a(294),ne=a(286),re=a(293),ce=a(287),le=a.n(ce),oe=a(674),ie=a(169),se=a(119),me=a(120);var ue=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"flex"},r.a.createElement("div",{className:"circle-icon blue"}),"- Specie Nodes"),r.a.createElement("div",{className:"flex"},r.a.createElement("div",{className:"circle-icon red"}),"- Reaction Nodes"),r.a.createElement("div",{className:"flex"},r.a.createElement("div",{className:"circle-icon green"}),"- Reactant Edge"),r.a.createElement("div",{className:"flex"},r.a.createElement("div",{className:"circle-icon yellow"}),"- Product Edge"),r.a.createElement("div",{className:"flex"},"--\x3e - Reversible reactions"))},de=(a(458),function(e){function t(){var e,a;Object(ee.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(ae.a)(this,(e=Object(ne.a)(t)).call.apply(e,[this].concat(r)))).state={nodes:[],edges:[],compartments:[],currentCompartment:"all",dropdown:!1,canvasWidth:0},a.toggle=function(){a.setState({dropdown:!a.state.dropdown})},a.selectCompartment=function(e){a.setState({currentCompartment:e})},a.gen=function(){var e=a.props,t=e.reactions,n=e.species,r=e.compartments,c=a.state.currentCompartment;a.setState({compartments:r});try{if("all"===c){var l=a.generateReactionNodes(t),o=n.reduce(function(e,t){return e.push({label:t.id}),e},[]),i=d.a.concat(l,o),s=a.generateReactionEdges(t,i);a.setState({nodes:i,edges:s})}else{var m=t.filter(function(e){return!(!d.a.includes(e.compartments,c)||1!==e.compartments.length)}),u=a.generateReactionNodes(m),p=n.reduce(function(e,t){return t.compartment===c&&e.push({label:t.id}),e},[]),f=d.a.concat(u,p),E=a.generateReactionEdges(m,f);a.setState({nodes:f,edges:E})}}catch(g){}},a.generateReactionNodes=function(e){return e.map(function(e){return{label:e.id,style:"reactionNode"}})},a.findNode=function(e,t){var a;return t.filter(function(t,n){return t.label===e.label&&(a=n)}),a},a.generateReactionEdges=function(e,t){var n=[];return e.map(function(e){return e.reactants.map(function(r){return e.reversible?n.push({source:t[a.findNode({label:r.id},t)],target:t[a.findNode({label:e.id},t)],style:"reversibleReactantEdge"}):n.push({source:t[a.findNode({label:r.id},t)],target:t[a.findNode({label:e.id},t)],style:"reactantEdge"})}),e.products.map(function(r){return e.reversible?n.push({source:t[a.findNode({label:e.id},t)],target:t[a.findNode({label:r.id},t)],style:"reversibleProductEdge"}):n.push({source:t[a.findNode({label:e.id},t)],target:t[a.findNode({label:r.id},t)],style:"productEdge"})})}),n},a}return Object(re.a)(t,e),Object(te.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.setState({compartments:this.props.compartments}),this.graph=new le.a(document.getElementById("graph"),{styles:{background:{color:"rgb(255, 255, 255)"},node:{minSize:6,maxSize:16,color:"rgb(47, 109, 206)",texture:a(459),label:{color:"rgb(0, 0, 0)",hideSize:16}},edge:{width:1,color:"rgb(50, 50, 50)",arrow:{minSize:1,maxSize:16,aspect:1,texture:a(460),hideSize:1},type:"line"},reactionNode:{color:"rgb(200, 0, 0)",label:{hideSize:16}},reactantEdge:{color:"rgb(89, 249, 2)"},productEdge:{color:"rgb(255, 246, 0)"},reversibleReactantEdge:{color:"rgb(89, 249, 2)",type:"dashed"},reversibleProductEdge:{color:"rgb(255, 246, 0)",type:"dashed"}},onChangeViewport:function(e){},onLoad:function(){},getNodesCount:function(){},getEdgesCount:function(){},onDrag:function(e){},onZoom:function(e){},onClick:function(){return!1},onDblClick:function(){},passiveEvts:!0}),this.gen(),this.graph.set(this.state.nodes,this.state.edges,"force").then(function(){e.graph.draw()})}},{key:"componentDidUpdate",value:function(e,t){var a=this;e.reactions===this.props.reactions&&e.species===this.props.species||this.setState({currentCompartment:"all"}),e.reactions===this.props.reactions&&e.species===this.props.species&&t.currentCompartment===this.state.currentCompartment||this.gen(),t.nodes===this.state.nodes&&t.edges===this.state.edges||this.graph.set(this.state.nodes,this.state.edges,"force").then(function(){a.graph.draw()}),e.width!==this.props.width&&this.setState({canvasWidth:this.props.width})}},{key:"componentWillUnmount",value:function(){this.graph.remove()}},{key:"render",value:function(){var e=this,t=this.state,a=t.compartments,n=t.canvasWidth;return r.a.createElement("div",null,r.a.createElement("h4",{className:"text-muted"},"Graph"," ",r.a.createElement(se.Icon,{icon:me.infoCircle,id:"graph-legend-info"}),r.a.createElement(oe.a,{placement:"right",target:"graph-legend-info"},r.a.createElement(ue,null))),r.a.createElement(ie.a,{isOpen:this.state.dropdown,toggle:this.toggle},r.a.createElement(P.a,{"data-test":"compartment-button",color:"success"},"Compartments"),r.a.createElement(I.a,null,r.a.createElement(F.a,{onClick:function(){e.selectCompartment("all")}},"All"),a.map(function(t){return r.a.createElement(F.a,{key:t.id,onClick:function(){e.selectCompartment(t.id)}},t.name)}))),r.a.createElement("br",null),r.a.createElement("canvas",{id:"graph",width:n,height:"550",className:"nonDraggableArea"}))}}]),t}(r.a.Component));de.defaultProps={reactions:[],species:[],compartments:[]};var pe=Object($.WidthProvider)(de);function fe(e){return e.reactions?r.a.createElement("div",null,r.a.createElement("h4",{className:"text-muted"},"Reactions"),r.a.createElement(G.a,{flush:!0,style:{height:"250px",overflowY:"auto"},className:"nonDraggableArea","data-test":"reactions-list"},e.reactions.map(function(t){return r.a.createElement(Z.a,{key:t.id,tag:"button",action:!0,onClick:function(){e.setInfo(t),e.setType("reaction")}},t.id," - ",t.name)}))):r.a.createElement("div",null,"No data")}fe.defaultProps={reactions:[],setInfo:function(){},setType:function(){}};var Ee=fe;function ge(e){return e.species?r.a.createElement("div",null,r.a.createElement("h4",{className:"text-muted"},"Species"),r.a.createElement(G.a,{flush:!0,style:{height:"250px",overflowY:"auto"},"data-test":"species-list"},e.species.map(function(t){return r.a.createElement(Z.a,{key:t.id,tag:"button",action:!0,onClick:function(){e.setInfo(t),e.setType("specie")}},t.id," - ",t.name)}))):r.a.createElement("div",null,"No data")}ge.defaultProps={species:[],setInfo:function(){},setType:function(){}};var he=ge;function be(e,t){return t?e.map(function(a,n){return n===e.length-1?"".concat(a[t]):"".concat(a[t],", ")}):e.map(function(t,a){return a===e.length-1?"".concat(t):"".concat(t,", ")})}function ve(e){return"specie"===e.type?r.a.createElement("div",{"data-test":"info-panel"},r.a.createElement("dl",{className:"row nonDraggableArea"},r.a.createElement("dt",{className:"col-sm-5"},"Specie ID"),r.a.createElement("dd",{className:"col-sm-7"},e.data.id),r.a.createElement("dt",{className:"col-sm-5"},"Specie Name"),r.a.createElement("dd",{className:"col-sm-7"},e.data.name),r.a.createElement("dt",{className:"col-sm-5"},"Compartment"),r.a.createElement("dd",{className:"col-sm-7"},e.data.compartment),r.a.createElement("dt",{className:"col-sm-5"},"Initial Concentration"),r.a.createElement("dd",{className:"col-sm-7"},e.data.initialConcentration))):"reaction"===e.type?r.a.createElement("div",{"data-test":"info-panel"},r.a.createElement("dl",{className:"row nonDraggableArea"},r.a.createElement("dt",{className:"col-sm-4"},"Reaction ID"),r.a.createElement("dd",{className:"col-sm-8"},e.data.id),r.a.createElement("dt",{className:"col-sm-4"},"Reaction Name"),r.a.createElement("dd",{className:"col-sm-8"},e.data.name),r.a.createElement("dt",{className:"col-sm-4"},"Reversible"),r.a.createElement("dd",{className:"col-sm-8"},String(e.data.reversible)),r.a.createElement("dt",{className:"col-sm-4"},"Reaction"),r.a.createElement("dd",{className:"col-sm-8"},e.data.reactionString),r.a.createElement("dt",{className:"col-sm-4"},"Modifiers"),r.a.createElement("dd",{className:"col-sm-8"},be(e.data.modifiers)))):r.a.createElement(r.a.Fragment,null)}ve.defaultProps={type:"",data:{}};var we=ve,ye=Object($.WidthProvider)($.Responsive);var Ae=function(){var e=r.a.useState(""),t=Object(b.a)(e,2),a=t[0],n=t[1],c=r.a.useState({}),l=Object(b.a)(c,2),i=l[0],s=l[1],m=r.a.useState(!1),u=Object(b.a)(m,2),d=u[0],p=u[1],f=Object(o.g)(function(e){return e.modelTab.currentModel}),E=f.reactions,g=f.species,h=f.name,v=f.compartments,w=Object(o.f)(function(e){return e.modelTab.saveModel});return r.a.createElement(r.a.Fragment,null,r.a.createElement(y.a,{isOpen:d,toggle:function(){p(!d)}},r.a.createElement(A.a,{toggle:function(){p(!d)}},"Save your SBML Model"),r.a.createElement(N.a,null,"Are you sure?",r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement(q.a,{"data-test":"confirm-save-button",color:"primary",onClick:Object(L.a)(H.a.mark(function e(){var t;return H.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w();case 2:(t=e.sent).error?S.a.error(t.message):S.a.success(t.message),p(!d);case 5:case"end":return e.stop()}},e)}))},"Yes")," ",r.a.createElement(q.a,{color:"danger",onClick:function(){return p(!d)}},"Cancel"))),r.a.createElement(ye,{className:"layout",layouts:{lg:[{i:"graph",x:0,y:0,w:6,h:14,minW:5,minH:14,static:!0},{i:"reactions",x:6,y:0,w:3,h:7,minW:3,minH:7},{i:"species",x:9,y:0,w:3,h:7,minW:3,minH:7},{i:"info",x:6,y:7,w:6,h:5,minW:6,minH:5}]},breakpoints:{lg:1200,md:996,sm:768,xs:480,xxs:0},cols:{lg:12,md:10,sm:6,xs:4,xxs:2},rowHeight:40,items:4,onLayoutChange:function(){},draggableCancel:".nonDraggableArea"},r.a.createElement("div",{key:"graph"},r.a.createElement(pe,{reactions:E,species:g,compartments:v})),r.a.createElement("div",{key:"reactions"},r.a.createElement(Ee,{reactions:E,setInfo:s,setType:n})),r.a.createElement("div",{key:"species"},r.a.createElement(he,{species:g,setInfo:s,setType:n})),r.a.createElement("div",{key:"info"},r.a.createElement(we,{type:a,data:i}),r.a.createElement(q.a,{"data-test":"save-model-button",style:{float:"right"},outline:!0,color:"success",onClick:function(){return p(!d)},disabled:!h},"Save Model"))))},Ne=a(669),Se=a(670),xe=a(122),Oe=a(288),ke=a.n(Oe);a(588);function je(e){var t,a=e.className,n=e.curved,c=e.color,l=e.children,o=e.loading,i=e.onClick,s=e.type,m=e["data-test"],u=[];return u.push(a),n&&u.push("curved-button"),t=o?r.a.createElement(ke.a,{type:"bars",color:c,height:"30px",width:"30px",className:"button-loading-icon"}):l,r.a.createElement("button",{type:s,className:u.join(" "),disabled:o,onClick:i,"data-test":m},t)}je.defaultProps={loading:!1,curved:!1,type:"button",color:"white"};var Ce=je,De=xe.object().shape({time:xe.number().min(2).max(1e3).required("Required"),dataPoints:xe.number().min(2).max(5e3).required("Required")});var Me=function(){var e=Object(o.f)(function(e){return e.simulationTab}),t=e.simulate,a=e.setIcmin,n=e.setIcmax,c=e.reset;return r.a.createElement(r.a.Fragment,null,r.a.createElement("h4",{className:"text-muted",style:{marginBottom:20}},"Settings"),r.a.createElement(V.c,{initialValues:{time:10,dataPoints:500,icmin:0,icmax:100},validationSchema:De,onSubmit:function(){var e=Object(L.a)(H.a.mark(function e(a,n){var r;return H.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t({time:a.time,dataPoints:a.dataPoints});case 3:(r=e.sent).error?S.a.error(r.message):S.a.success(r.message),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),S.a.error(e.t0.message);case 10:n.setSubmitting(!1);case 11:case"end":return e.stop()}},e,null,[[0,7]])}));return function(t,a){return e.apply(this,arguments)}}(),render:function(e){var t=e.handleSubmit,l=e.isSubmitting,o=e.errors,i=e.setFieldValue,s=e.resetForm;return r.a.createElement(Y.a,{onSubmit:t,className:"nonDraggableArea"},r.a.createElement(K.a,{row:!0},r.a.createElement(Ne.a,{for:"time",sm:5},"Time:"),r.a.createElement(Se.a,{sm:7},r.a.createElement(V.a,{className:"form-control ".concat(o.time?"is-invalid":""),type:"number",name:"time"}))),r.a.createElement(K.a,{row:!0},r.a.createElement(Ne.a,{for:"dataPoints",sm:5},"Data Points:"),r.a.createElement(Se.a,{sm:7},r.a.createElement(V.a,{className:"form-control ".concat(o.dataPoints?"is-invalid":""),type:"number",name:"dataPoints"}))),r.a.createElement(K.a,{row:!0},r.a.createElement(Ne.a,{for:"icmin",sm:5},"IC Min:"),r.a.createElement(Se.a,{sm:7},r.a.createElement(V.a,{className:"form-control",type:"number",name:"icmin",onChange:function(e){i("icmin",e.target.value),a(Number(e.target.value))}}))),r.a.createElement(K.a,{row:!0},r.a.createElement(Ne.a,{for:"icmax",sm:5},"IC Max:"),r.a.createElement(Se.a,{sm:7},r.a.createElement(V.a,{className:"form-control",type:"number",name:"icmax",onChange:function(e){i("icmax",e.target.value),n(Number(e.target.value))}}))),r.a.createElement(Ce,{type:"submit",loading:l,className:"btn btn-success","data-test":"run-button"},"Run")," ",r.a.createElement(Ce,{className:"btn btn-warning",onClick:function(){c(),s()},"data-test":"reset-button"},"Reset"))}}))},Re=a(289),Pe=a.n(Re);function Ie(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}function Fe(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?Ie(a,!0).forEach(function(t){Object(i.a)(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):Ie(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}var Te=Object($.WidthProvider)(function(e){var t,a=Object(o.g)(function(e){return e.simulationTab}),n=Object(o.g)(function(e){return e.modelMetadata});return r.a.useEffect(function(){var e=[];a.reactions.forEach(function(t){!0===t.checked&&(""===t.ratelaw?e.push(Fe({},t,{ratelaw:a.globalRatelaw})):e.push(t))});var t=Fe({},n,{reactions:e,species:a.species}),r="data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(t)),c=document.getElementById("exportAnchorElement");c.setAttribute("href",r),c.setAttribute("download","model.json")}),r.a.useEffect(function(){t=35*e.width/100},[e.width]),a.graphData?r.a.createElement("div",null,r.a.createElement(Pe.a,{options:{chart:{id:"apexchart-example"},xaxis:{type:"numeric",tickAmount:10}},series:a.graphData,type:"line",width:t,height:600,className:"nonDraggableArea"}),r.a.createElement("a",{className:"btn btn-dark nonDraggableArea",style:{float:"right"},id:"exportAnchorElement",href:"/"},"Export Data")):r.a.createElement("div",null)}),Be=a(672),We=a(172),He=(a(645),a(671));function Le(e){var t=e.specieId,a=e.toggle,n=r.a.useState(!0),c=Object(b.a)(n,2),l=c[0],o=c[1];return r.a.createElement(He.a,{type:"switch",id:t,onChange:function(e){o(function(e){return!e}),a(t)},checked:l})}Le.defaultProps={specieId:"",toggle:function(){}};var Ve=Le,Ye=We.a.createSliderWithTooltip(We.a);var Ke=function(){var e=Object(o.g)(function(e){return e.simulationTab}),t=e.species,a=e.icstep,n=e.icmin,c=e.icmax,l=Object(o.f)(function(e){return e.simulationTab}),i=l.toggleSpecie,s=l.updateIc;return r.a.createElement(r.a.Fragment,null,r.a.createElement("h4",{className:"text-muted",style:{marginBottom:20}},"Species"),r.a.createElement("div",{style:{overflowY:"auto",height:"90%"},className:"nonDraggableArea shadow-inner"},r.a.createElement(Be.a,{borderless:!0,hover:!0,"data-test":"species-table"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"ID"),r.a.createElement("th",null,"Initial Concentration"),r.a.createElement("th",null,"Show in graph"))),r.a.createElement("tbody",null,t.map(function(e){return r.a.createElement("tr",{key:e.id},r.a.createElement("th",null,e.id),r.a.createElement("th",null,r.a.createElement(Ye,{style:{width:200},className:"specie-slider",step:a,min:n,max:c,onChange:function(t){s({id:e.id,initialConcentration:t})}})),r.a.createElement("th",null,r.a.createElement(Ve,{specieId:e.id,toggle:i})))})))))},Ue=a(673);function qe(e){var t,a=e.ratelaw,n=e.reaction,c=e.closeModal,l=Object(o.f)(function(e){return e.simulationTab}).setRatelaw;switch(a){case"mass-action":t=n.reversible?r.a.createElement(r.a.Fragment,null,r.a.createElement(Ne.a,null,"Forward Parameter (k1):"),r.a.createElement(V.a,{className:"form-control",name:"k1",type:"number"}),r.a.createElement(Ne.a,null,"Backward Parameter (k2):"),r.a.createElement(V.a,{className:"form-control",name:"k2",type:"number"})):r.a.createElement(r.a.Fragment,null,r.a.createElement(Ne.a,null,"Parameter (k1):"),r.a.createElement(V.a,{className:"form-control",name:"k1",type:"number"}));break;case"michaelis-menten":t=n.reversible?r.a.createElement(r.a.Fragment,null,r.a.createElement(Ne.a,null,"Vfmax:"),r.a.createElement(V.a,{className:"form-control",name:"k1",type:"number"}),r.a.createElement(Ne.a,null,"Vrmax:"),r.a.createElement(V.a,{className:"form-control",name:"k2",type:"number"}),r.a.createElement(Ne.a,null,"KSm:"),r.a.createElement(V.a,{className:"form-control",name:"k3",type:"number"}),r.a.createElement(Ne.a,null,"KPm:"),r.a.createElement(V.a,{className:"form-control",name:"k4",type:"number"})):r.a.createElement(r.a.Fragment,null,r.a.createElement(Ne.a,null,"Vmax:"),r.a.createElement(V.a,{className:"form-control",name:"k1",type:"number"}),r.a.createElement(Ne.a,null,"Km:"),r.a.createElement(V.a,{className:"form-control",name:"k2",type:"number"}));break;case"hill-equation":t=r.a.createElement(r.a.Fragment,null,r.a.createElement(Ne.a,null,"Vmax:"),r.a.createElement(V.a,{className:"form-control",name:"k1",type:"number"}),r.a.createElement(Ne.a,null,"K",r.a.createElement("sub",null,"0.5"),":"),r.a.createElement(V.a,{className:"form-control",name:"k2",type:"number"}),r.a.createElement(Ne.a,null,"Hill coefficient:"),r.a.createElement(V.a,{className:"form-control",name:"k3",type:"number"}));break;case"custom-rate":t=n.reversible?r.a.createElement(r.a.Fragment,null,r.a.createElement("div",null,"Species available:"," ",be(d.a.concat(n.reactants,n.products),"id")),r.a.createElement(Ne.a,null,"Custom Forward Rate:"),r.a.createElement(V.a,{className:"form-control",name:"rateForward",type:"text"}),r.a.createElement("p",null,"For example: 0.5 * some_specie"),r.a.createElement(Ne.a,null,"Custom Backward Rate:"),r.a.createElement(V.a,{className:"form-control",name:"rateBackward",type:"text"}),r.a.createElement("p",null,"For example: 0.5 * some_specie")):r.a.createElement(r.a.Fragment,null,r.a.createElement("div",null,"Species available:"," ",be(d.a.concat(n.reactants,n.products),"id")),r.a.createElement(Ne.a,null,"Custom Rate:"),r.a.createElement(V.a,{className:"form-control",name:"rate",type:"text"}),r.a.createElement("p",null,"For example: 0.5 * some_specie"))}return r.a.createElement("div",null,r.a.createElement(V.c,{initialValues:{k1:0,k2:0,k3:0,k4:0,rate:"",rateForward:"",rateBackward:""},onSubmit:function(){var e=Object(L.a)(H.a.mark(function e(t,r){var o,i,s;return H.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if("custom-rate"===a)n.reversible?l({id:n.id,ratelaw:a,rateForward:t.rateForward,rateBackward:t.rateBackward}):l({id:n.id,ratelaw:a,rate:t.rate});else{for(s in i=[],o=t)o.hasOwnProperty(s)&&i.push(o[s]);l({id:n.id,ratelaw:a,parameters:i})}c();case 2:case"end":return e.stop()}},e)}));return function(t,a){return e.apply(this,arguments)}}(),render:function(e){var a=e.handleSubmit;return r.a.createElement(V.b,{onSubmit:a,"data-test":"ratelaw-form"},t,r.a.createElement("br",null),r.a.createElement(q.a,{type:"submit",className:"btn btn-success","data-test":"ratelaw-submit-button"},"Submit"))}}))}qe.defaultProps={ratelaw:"",reaction:{},closeModal:function(){}};var Qe=qe;var ze=function(e){var t=e.reaction;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"flex"},"Name: ",t.name),r.a.createElement("div",{className:"flex"},"ID: ",t.id),r.a.createElement("div",{className:"flex"},"Reversible: ",String(t.reversible)),r.a.createElement("div",{className:"flex"},"Modifiers: ",be(t.modifiers)))};var Je=function(){var e=r.a.useState(!1),t=Object(b.a)(e,2),a=t[0],n=t[1],c=r.a.useState({}),l=Object(b.a)(c,2),i=l[0],s=l[1],m=r.a.useState(""),u=Object(b.a)(m,2),d=u[0],p=u[1],f=Object(o.g)(function(e){return e.simulationTab.reactions}),E=Object(o.f)(function(e){return e.simulationTab}).switchReaction;return r.a.createElement(r.a.Fragment,null,r.a.createElement(y.a,{isOpen:a,toggle:function(){n(!a)},className:"nonDraggableArea"},r.a.createElement(A.a,null,"Set Ratelaw"),r.a.createElement(N.a,null,r.a.createElement(Qe,{ratelaw:d,reaction:i,closeModal:function(){return n(!1)}}))),r.a.createElement("div",{style:{height:"90%"}},r.a.createElement("h4",{className:"text-muted",style:{marginBottom:20}},"Reactions"),r.a.createElement("div",{style:{overflowY:"auto",height:"85%"},className:"shadow-inner nonDraggableArea"},r.a.createElement(Be.a,{borderless:!0,hover:!0,"data-test":"reactions-table"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Toggle"),r.a.createElement("th",null,"Reaction String"),r.a.createElement("th",null,"Ratelaw"))),r.a.createElement("tbody",null,f.map(function(e){return r.a.createElement("tr",{key:e.id},r.a.createElement("th",null,r.a.createElement(He.a,{type:"switch",id:e.id,checked:e.checked,onChange:function(){E(e)}})),r.a.createElement("th",null,e.id,": ",e.reactionString," ",r.a.createElement(se.Icon,{icon:me.infoCircle,id:"".concat(e.id,"-info")}),r.a.createElement(oe.a,{placement:"right",target:"".concat(e.id,"-info")},r.a.createElement(ze,{reaction:e}))),r.a.createElement("th",null,r.a.createElement(Ue.a,{onChange:function(t){""!==t.target.value&&n(!a),p(t.target.value),s(e)},value:e.ratelaw,type:"select",id:"".concat(e.id,"-select")},r.a.createElement("option",{value:""},"Set a ratelaw!"),r.a.createElement("option",{value:"mass-action"},"Mass Action"),0===e.modifiers.length||e.reactants.length>1||e.products.length>1?r.a.createElement(r.a.Fragment,null):r.a.createElement("option",{value:"michaelis-menten"},"Michaelis Menten"),0===e.modifiers.length||e.reactants.length>1||e.products.length>1||e.reversible?r.a.createElement(r.a.Fragment,null):r.a.createElement("option",{value:"hill-equation"},"Hill Kinetics Equation"),r.a.createElement("option",{value:"custom-rate"},"Custom Rate"))))}))))))},Ge=(a(646),Object($.WidthProvider)($.Responsive));var Ze=function(){return r.a.createElement(Ge,{className:"layout",layouts:{lg:[{i:"settings",x:0,y:0,w:3,h:7,minW:3,minH:7},{i:"species",x:3,y:0,w:4,h:7,minW:4,minH:7},{i:"plot",x:7,y:0,w:5,h:14,minW:5,minH:14},{i:"reactions",x:0,y:8,w:7,h:6,minW:7,minH:6}],md:[{i:"settings",x:0,y:0,w:3,h:7,minW:3,minH:7},{i:"species",x:3,y:0,w:4,h:7,minW:4,minH:7},{i:"plot",x:7,y:0,w:5,h:15,minW:5,minH:14},{i:"reactions",x:0,y:8,w:7,h:6,minW:7,minH:6}],sm:[{i:"settings",x:0,y:0,w:3,h:7,minW:3,minH:7},{i:"species",x:3,y:0,w:4,h:7,minW:4,minH:7},{i:"plot",x:7,y:0,w:5,h:15,minW:5,minH:14},{i:"reactions",x:0,y:8,w:7,h:6,minW:7,minH:6}],xs:[{i:"settings",x:0,y:0,w:3,h:7,minW:3,minH:7},{i:"species",x:3,y:0,w:4,h:7,minW:4,minH:7},{i:"plot",x:7,y:0,w:5,h:15,minW:5,minH:14},{i:"reactions",x:0,y:8,w:7,h:6,minW:7,minH:6}]},breakpoints:{lg:1200,md:996,sm:768,xs:480},cols:{lg:12,md:10,sm:6,xs:4,xxs:2},rowHeight:40,items:4,draggableCancel:".nonDraggableArea"},r.a.createElement("div",{key:"settings"},r.a.createElement(Me,null)),r.a.createElement("div",{key:"species"},r.a.createElement(Ke,null)),r.a.createElement("div",{key:"plot"},r.a.createElement(Te,null)),r.a.createElement("div",{key:"reactions"},r.a.createElement(Je,null)))};S.a.configure({position:S.a.POSITION.BOTTOM_RIGHT,autoClose:2e3});var Xe=function(){var e=r.a.useState(!1),t=Object(b.a)(e,2),a=t[0],n=t[1],c=r.a.useState(!1),l=Object(b.a)(c,2),o=l[0],i=l[1];return r.a.createElement(r.a.Fragment,null,r.a.createElement(v.a,null,r.a.createElement(B,{importModel:function(){return n(!a)},savedModels:function(){return i(!a)}}),r.a.createElement(y.a,{isOpen:a,toggle:function(){return n(!a)}},r.a.createElement(A.a,{toggle:function(){return n(!a)}},"Import an existing SBML Model"),r.a.createElement(N.a,null,r.a.createElement(z,{closeModal:function(){return n(!a)}}))),r.a.createElement(y.a,{isOpen:o,toggle:function(){return i(!o)}},r.a.createElement(A.a,{toggle:function(){return i(!o)}},"Saved Models"),r.a.createElement(N.a,null,r.a.createElement(_,null))),r.a.createElement(w.c,null,r.a.createElement(w.a,{path:"/simulation",component:Ze}),r.a.createElement(w.a,{path:"/",component:Ae}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(648),a(649);l.a.render(r.a.createElement(o.a,{store:g},r.a.createElement(h.Helmet,null,r.a.createElement("meta",{charSet:"utf-8"}),r.a.createElement("title",null,"ODE-APP")),r.a.createElement(Xe,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[295,1,2]]]);
//# sourceMappingURL=main.c0d39ad2.chunk.js.map