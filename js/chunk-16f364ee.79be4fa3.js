(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-16f364ee"],{2335:function(t,e,s){"use strict";s("74bd")},"3e35":function(t,e,s){"use strict";var i=s("1e6c"),a=s("adda"),r=s("58df"),o=s("80d2"),l=s("1c87");const n=Object(r["a"])(i["a"],l["a"]);e["a"]=n.extend().extend({name:"v-carousel-item",inject:{parentTheme:{default:{isDark:!1}}},provide(){return{theme:this.parentTheme}},inheritAttrs:!1,methods:{genDefaultSlot(){return[this.$createElement(a["a"],{staticClass:"v-carousel__item",props:{...this.$attrs,height:this.windowGroup.internalHeight},on:this.$listeners,scopedSlots:{placeholder:this.$scopedSlots.placeholder}},Object(o["n"])(this))]},genWindowItem(){const{tag:t,data:e}=this.generateRouteLink();return e.staticClass="v-window-item",e.directives.push({name:"show",value:this.isActive}),this.$createElement(t,e,this.genDefaultSlot())}}})},"5e49":function(t,e,s){"use strict";s.r(e);var i=s("c6a6"),a=s("8336"),r=s("b0af"),o=s("99d9"),l=s("5e66"),n=s("3e35"),c=s("62ad"),m=s("553a"),u=s("ce87"),h=s("132d"),d=s("adda"),v=s("e449"),p=s("67b6"),_=s("43a6"),g=s("0fd9"),f=s("2fa4"),y=s("8654"),b=s("71d9"),C=s("3a2f"),k=function(){var t=this,e=t._self._c;return e("div",[e("div",{staticClass:"mx-3"},[e("Snackbar",{attrs:{SnackBarComponent:t.SnackBarComponent}}),"LIST_VIEW"==t.CurrentView?e(b["a"],{staticClass:"mt-5",attrs:{flat:"",color:1==t.$vuetify.theme.dark?"#121212":""}},["md"==t.$vuetify.breakpoint.name||"lg"==t.$vuetify.breakpoint.name||"xl"==t.$vuetify.breakpoint.name?e("div",{staticClass:"display-1 dark_text--text mt-n5"},[t._v(" Articles ")]):t._e(),"md"==t.$vuetify.breakpoint.name||"lg"==t.$vuetify.breakpoint.name||"xl"==t.$vuetify.breakpoint.name?e(f["a"]):t._e(),e(y["a"],{class:"sm"==t.$vuetify.breakpoint.name||"xs"==t.$vuetify.breakpoint.name?"mt-2 mr-2 ml-n3":"mt-3 mr-4",style:"sm"==t.$vuetify.breakpoint.name||"xs"==t.$vuetify.breakpoint.name?"max-width: 800px;":"max-width: 250px;",attrs:{dense:"",outlined:"",clearable:"",label:"Search","prepend-inner-icon":"mdi-magnify",color:"primary"},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}}),e(v["a"],{attrs:{bottom:"","offset-y":"","close-on-content-click":!1},scopedSlots:t._u([{key:"activator",fn:function({on:s,attrs:i}){return[e(a["a"],t._g(t._b({class:"sm"==t.$vuetify.breakpoint.name||"xs"==t.$vuetify.breakpoint.name?"elevation-1 mt-n5 mr-n3":"elevation-1 mt-n5",attrs:{small:"",color:"primary",fab:""}},"v-btn",i,!1),s),[e(h["a"],[t._v(" mdi-filter-outline ")])],1)]}}],null,!1,642831023),model:{value:t.FilterMenu,callback:function(e){t.FilterMenu=e},expression:"FilterMenu"}},[e(r["a"],{attrs:{width:"250"}},[e(o["b"],{attrs:{align:"center"}},[e("div",[t._v("Filter By")]),e(i["a"],{staticClass:"mt-3",attrs:{outlined:"",dense:"",label:"Select Category",items:t.CategoryItems},model:{value:t.CategoryValue,callback:function(e){t.CategoryValue=e},expression:"CategoryValue"}}),e("div",{staticClass:"my-n4"},[t._v("Sort By")]),e(_["a"],{model:{value:t.SortByValue,callback:function(e){t.SortByValue=e},expression:"SortByValue"}},[e(p["a"],{attrs:{label:"Latest",value:"LATEST"}}),e(p["a"],{attrs:{label:"Posted First",value:"FIRST"}}),e(p["a"],{attrs:{label:"A-Z",value:"AZ"}}),e(p["a"],{attrs:{label:"Z-A",value:"ZA"}})],1)],1),e(o["a"],{staticClass:"mt-n9"},[e(f["a"]),e(a["a"],{staticClass:"text-Capitalize mr-1",attrs:{outlined:"",text:"",small:"",color:"red"},on:{click:function(e){t.FilterMenu=!t.FilterMenu}}},[t._v(" Close ")]),e(a["a"],{staticClass:"text-Capitalize mr-1",attrs:{small:"",color:"primary"},on:{click:t.FilterMethod}},[t._v(" Apply ")])],1)],1)],1)],1):t._e(),"LIST_VIEW"==t.CurrentView?e(g["a"],{staticClass:"mx-n1 mt-n2 mb-2",attrs:{"no-gutters":""}},t._l(t.ArticlesList,(function(s,i){return e(c["a"],{key:i,attrs:{cols:"12",md:"3"}},[e(u["a"],{scopedSlots:t._u([{key:"default",fn:function({hover:a}){return[e(r["a"],{staticClass:"ma-2",class:{"on-hover":a},attrs:{elevation:a?12:2,color:1==t.$vuetify.theme.dark?"#272727":""},on:{click:function(e){return t.CheckItem(s,i)}}},[e(d["a"],{attrs:{src:s.image_src,alt:"No Image found!",height:"170","max-width":"100%"}}),e(o["b"],{staticClass:"px-0 mx-2 my-0 py-2"},[e(C["a"],{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function({on:i,attrs:a}){return[e("div",t._g(t._b({staticClass:"mx-1 mt-1 dark_text--text"},"div",a,!1),i),[t._v(" "+t._s(s.article_title?s.article_title.length>40?s.article_title.slice(0,40)+"...":s.article_title:"title not available : (")+" ")])]}}],null,!0)},[e("span",[t._v(t._s(s.article_title))])]),e(b["a"],{staticClass:"ml-n2 mt-1",attrs:{dense:"",flat:"",height:"30"}},[e("small",{staticClass:"ml-n3"},[e(h["a"],{staticClass:"mt-n1",attrs:{color:"green"}},[t._v("mdi-circle-small")]),t._v(" "+t._s(s.category))],1),e(f["a"]),e("small",[e(h["a"],{staticClass:"mt-n1 mx-0",attrs:{small:"",color:"purple"}},[t._v("mdi-timer-outline")]),t._v(" "+t._s(s.created_on?new Date(s.created_on).toLocaleString():"-")+" ")],1)],1)],1)],1)]}}],null,!0)})],1)})),1):"DETAIL_VIEW"==t.CurrentView?e(o["b"],{class:"sm"==t.$vuetify.breakpoint.name||"xs"==t.$vuetify.breakpoint.name?"ma-0 pa-0 mt-3":""},[e(l["a"],{attrs:{"hide-delimiters":"",height:"auto","show-arrows-on-hover":"sm"==t.$vuetify.breakpoint.name||"xs"==t.$vuetify.breakpoint.name},model:{value:t.CurrentIdx,callback:function(e){t.CurrentIdx=e},expression:"CurrentIdx"}},t._l(t.ArticlesList,(function(s,i){return e(n["a"],{key:i},[e(g["a"],{class:"sm"==t.$vuetify.breakpoint.name||"xs"==t.$vuetify.breakpoint.name?"":"mx-5 px-15",attrs:{"no-gutters":""}},[e(c["a"],{attrs:{cols:"12",md:"12",sm:"12",xs:"12"}},[e(b["a"],{staticClass:"ma-0 pa-0",attrs:{flat:"",dense:"",color:1==t.$vuetify.theme.dark?"#121212":""}},[e("div",{staticClass:"font-weight-bold"},[e(h["a"],{staticClass:"mt-n1 ml-n7 mr-n2",attrs:{"x-large":"",color:"primary"}},[t._v("mdi-circle-small")]),t._v(" "+t._s(s.category?s.category:"-")+" ")],1),e(f["a"]),e(C["a"],{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function({on:r}){return[e(a["a"],t._g({attrs:{icon:"",dark:"",color:1==t.$vuetify.theme.dark?"#121212":""},on:{click:function(e){return e.stopPropagation(),t.AddToFavorite(i)}},model:{value:s.favourite,callback:function(e){t.$set(s,"favourite",e)},expression:"item.favourite"}},r),[e(h["a"],{attrs:{color:"primary"}},[t._v(" "+t._s(1==s.favourite?"mdi-star":"mdi-star-outline")+" ")])],1)]}}],null,!0)},[e("span",[t._v(" "+t._s(1==s.favourite?"Remove from favorites":"Add to favorites")+" ")])])],1)],1),e(c["a"],{attrs:{cols:"12",md:"12",sm:"12",xs:"12"}},[e("div",{class:"sm"==t.$vuetify.breakpoint.name||"xs"==t.$vuetify.breakpoint.name?"MobileHeading":"display-1"},[t._v(" "+t._s(s.article_title)+" ")]),e("div",{class:"sm"==t.$vuetify.breakpoint.name||"xs"==t.$vuetify.breakpoint.name?"MobileDescription py-2":"Description py-5"},[t._v(" "+t._s(s.article_description)+" ")])]),e(c["a"],{attrs:{cols:"12",md:"12",sm:"12",xs:"12"}},[e(d["a"],{attrs:{src:s.image_src,alt:"No Image found!",height:"sm"==t.$vuetify.breakpoint.name||"xs"==t.$vuetify.breakpoint.name?"200px":"400px","max-width":"100%",align:"center"}})],1),e(c["a"],{attrs:{cols:"12",md:"12",sm:"12",xs:"12"}},[e("div",{staticClass:"mt-3"},[e(h["a"],{staticClass:"mt-n1 mx-0 mr-1",attrs:{small:"",color:"green"}},[t._v("mdi-account")]),t._v(" "+t._s(s.published_by?s.published_by:"-")+" ")],1)]),e(c["a"],{attrs:{cols:"12",md:"12",sm:"12",xs:"12"}},[e("div",[e(h["a"],{staticClass:"mt-n1 mx-0",attrs:{small:"",color:"blue"}},[t._v("mdi-timer-outline")]),t._v(" "+t._s(s.created_on?new Date(s.created_on).toLocaleString():"-")+" ")],1)]),e(c["a"],{attrs:{cols:"12",md:"12",sm:"12",xs:"12"}},[e("div",{staticClass:"py-3",domProps:{innerHTML:t._s(s.article_data)}})])],1)],1)})),1)],1):t._e()],1),"sm"!=t.$vuetify.breakpoint.name&&"xs"!=t.$vuetify.breakpoint.name||"LIST_VIEW"!=t.CurrentView?t._e():e(m["a"],{attrs:{tile:"",height:"75",color:"#2B3A55"}},[e(o["b"],{staticClass:"font-weight-light white--text mt-2 pt-0",attrs:{align:"center"}},[e("div",{staticClass:"FooterText"},[t._v("Copyright © Articlz "+t._s((new Date).getFullYear()))]),e("div",{staticClass:"FooterText"},[e(h["a"],{attrs:{dark:"",small:""}},[t._v("mdi-pencil-ruler")]),t._v(" Designed & developed by "),e("a",{staticClass:"white--text",attrs:{href:"https://www.linkedin.com/in/g-venkatesh-35849022a",target:"_blank",title:"Connect on LinkedIn"}},[t._v("G Venkatesh")])],1)])],1)],1)},$=[],x=(s("14d9"),s("ffda")),T=s("c73d"),I={data:()=>({ArticlesList:[],search:"",CurrentView:"",CurrentIdx:0,CurrentItem:{},CategoryItems:["All","Technology","Business","Politics","Sports","Startups","Entertainment","International","Automobile","Travel","Fashion","Education","Health & Fitness","Others"],CategoryValue:"All",SortByValue:"LATEST",FilterMenu:!1,SnackBarComponent:{}}),components:{Snackbar:x["a"]},mounted(){0==this.$store.getters.get_articles_list.length?(this.$store.commit("SET_ARTICLES_LIST",T),this.ArticlesList=T):this.ArticlesList=this.$store.getters.get_articles_list,this.$store.commit("SET_PREVIOUS_ROUTE",this.$store.getters.get_current_route),this.$store.commit("SET_CURRENT_ROUTE",this.$route.name),this.$store.getters.get_previous_route!==this.$route.name&&!0===this.$store.getters.get_from_detail_view&&(this.$store.commit("SET_DETAIL_VIEW",!1),this.CurrentView="LIST_VIEW",this.$router.push("/"+this.$store.getters.get_previous_route)),this.CurrentView="LIST_VIEW",this.FilterMethod(),console.warn("ArticlesList",this.ArticlesList)},watch:{search(t){this.ArticlesList=""==t||null==t?this.$store.getters.get_articles_list:this.$store.getters.get_articles_list.filter(e=>e.article_title.toLowerCase().includes(t.toLowerCase()))},"$route.name"(t){console.log("path",t),"Articles"==t&&(this.CurrentView="LIST_VIEW")},CurrentView(t){"DETAIL_VIEW"==t?this.$store.commit("SET_DETAIL_VIEW",!0):this.$store.commit("SET_DETAIL_VIEW",!1)}},methods:{FilterMethod(){switch("All"==this.CategoryValue?this.ArticlesList=this.$store.getters.get_articles_list:"All"!=this.CategoryValue&&(this.ArticlesList=this.$store.getters.get_articles_list.filter(t=>t.category==this.CategoryValue)),this.SortByValue){case"LATEST":this.ArticlesList=this.$store.getters.get_articles_list.sort((t,e)=>e.created_on-t.created_on);break;case"FIRST":this.ArticlesList=this.$store.getters.get_articles_list.sort((t,e)=>t.created_on-e.created_on);break;case"AZ":this.ArticlesList=this.$store.getters.get_articles_list.sort((t,e)=>t.article_title.toLowerCase().localeCompare(e.article_title.toLowerCase()));break;case"ZA":this.ArticlesList=this.$store.getters.get_articles_list.sort((t,e)=>e.article_title.toLowerCase().localeCompare(t.article_title.toLowerCase()));break}this.FilterMenu=!1},AddToFavorite(t){this.ArticlesList[t].favourite=!this.ArticlesList[t].favourite,this.$store.commit("SET_ARTICLES_LIST",this.ArticlesList),this.SnackBarComponent={SnackbarVmodel:!0,SnackbarColor:"green",Top:!0,SnackbarText:1==this.ArticlesList[t].favourite?"Added to Favorites":"Removed from Favorites"}},CheckItem(t,e){this.CurrentIdx=e,this.CurrentItem=t,this.CurrentView="DETAIL_VIEW"},LoadPreviousItem(){this.CurrentItem=this.ArticlesList[--this.CurrentIdx],this.transistionLeft()},LoadNextItem(){this.CurrentItem=this.ArticlesList[++this.CurrentIdx],this.transistionRight()}}},w=I,S=(s("2335"),s("2877")),A=Object(S["a"])(w,k,$,!1,null,null,null);e["default"]=A.exports},"5e66":function(t,e,s){"use strict";s("63b7");var i=s("f665"),a=s("afdd"),r=s("9d26"),o=s("37c6"),l=s("604c"),n=l["a"].extend({name:"button-group",provide(){return{btnToggle:this}},computed:{classes(){return l["a"].options.computed.classes.call(this)}},methods:{genData:l["a"].options.methods.genData}}),c=s("80d2"),m=s("d9bd");e["a"]=i["a"].extend({name:"v-carousel",props:{continuous:{type:Boolean,default:!0},cycle:Boolean,delimiterIcon:{type:String,default:"$delimiter"},height:{type:[Number,String],default:500},hideDelimiters:Boolean,hideDelimiterBackground:Boolean,interval:{type:[Number,String],default:6e3,validator:t=>t>0},mandatory:{type:Boolean,default:!0},progress:Boolean,progressColor:String,showArrows:{type:Boolean,default:!0},verticalDelimiters:{type:String,default:void 0}},provide(){return{parentTheme:this.theme}},data(){return{internalHeight:this.height,slideTimeout:void 0}},computed:{classes(){return{...i["a"].options.computed.classes.call(this),"v-carousel":!0,"v-carousel--hide-delimiter-background":this.hideDelimiterBackground,"v-carousel--vertical-delimiters":this.isVertical}},isDark(){return this.dark||!this.light},isVertical(){return null!=this.verticalDelimiters}},watch:{internalValue:"restartTimeout",interval:"restartTimeout",height(t,e){t!==e&&t&&(this.internalHeight=t)},cycle(t){t?this.restartTimeout():(clearTimeout(this.slideTimeout),this.slideTimeout=void 0)}},created(){this.$attrs.hasOwnProperty("hide-controls")&&Object(m["a"])("hide-controls",':show-arrows="false"',this)},mounted(){this.startTimeout()},methods:{genControlIcons(){return this.isVertical?null:i["a"].options.methods.genControlIcons.call(this)},genDelimiters(){return this.$createElement("div",{staticClass:"v-carousel__controls",style:{left:"left"===this.verticalDelimiters&&this.isVertical?0:"auto",right:"right"===this.verticalDelimiters?0:"auto"}},[this.genItems()])},genItems(){const t=this.items.length,e=[];for(let s=0;s<t;s++){const i=this.$createElement(a["a"],{staticClass:"v-carousel__controls__item",attrs:{"aria-label":this.$vuetify.lang.t("$vuetify.carousel.ariaLabel.delimiter",s+1,t)},props:{icon:!0,small:!0,value:this.getValue(this.items[s],s)},key:s},[this.$createElement(r["a"],{props:{size:18}},this.delimiterIcon)]);e.push(i)}return this.$createElement(n,{props:{value:this.internalValue,mandatory:this.mandatory},on:{change:t=>{this.internalValue=t}}},e)},genProgress(){return this.$createElement(o["a"],{staticClass:"v-carousel__progress",props:{color:this.progressColor,value:(this.internalIndex+1)/this.items.length*100}})},restartTimeout(){this.slideTimeout&&clearTimeout(this.slideTimeout),this.slideTimeout=void 0,window.requestAnimationFrame(this.startTimeout)},startTimeout(){this.cycle&&(this.slideTimeout=window.setTimeout(this.next,+this.interval>0?+this.interval:6e3))}},render(t){const e=i["a"].options.render.call(this,t);return e.data.style=`height: ${Object(c["g"])(this.height)};`,this.hideDelimiters||e.children.push(this.genDelimiters()),(this.progress||this.progressColor)&&e.children.push(this.genProgress()),e}})},"63b7":function(t,e,s){},"74bd":function(t,e,s){}}]);
//# sourceMappingURL=chunk-16f364ee.79be4fa3.js.map