"use strict";(self.webpackChunkems=self.webpackChunkems||[]).push([[155],{5155:(P,l,o)=>{o.r(l),o.d(l,{HttpLoaderFactory:()=>c,WebModule:()=>x});var g=o(9808),s=o(9334),t=o(5e3),u=o(675),d=o(1062),h=o(2075);let p=(()=>{class e{constructor(n,r,i,O){this.firebaseService=n,this.router=r,this.translate=i,this.authService=O,this.sideNavToggled=new t.vpe,this.sideNavToggledClosed=new t.vpe,this.menuStatus=!1,this.menuStatusClose=!0,this.Clicked=!0,this.language=[{value:"en"},{value:"gu"}],i.setDefaultLang("en")}ngOnInit(){}logOut(){localStorage.clear(),this.authService.signOut()}changepassword(){this.router.navigate(["/changepassword"])}languageChange(n){this.translate.use(n.attributes.value.value)}}return e.\u0275fac=function(n){return new(n||e)(t.Y36(u.O),t.Y36(s.F0),t.Y36(d.sK),t.Y36(h.e))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-thm-header"]],outputs:{sideNavToggled:"sideNavToggled",sideNavToggledClosed:"sideNavToggledClosed"},decls:23,vars:0,consts:[[1,"header-content"],[1,"text"],["src","../../../assets/img/logo.png"],[1,"logout_language_content"],[1,"logout"],["id","navbarDropdownMenuLink","data-bs-toggle","dropdown",1,"ri-user-3-fill",2,"color","white","font-size","30px"],["aria-labelledby","navbarDropdownMenuLink",1,"dropdown-menu"],[1,"dropdown-item"],[1,"dropdown-item",3,"click"]],template:function(n,r){1&n&&(t.TgZ(0,"div")(1,"div",0)(2,"div",1),t._UZ(3,"img",2),t.TgZ(4,"span"),t._uU(5,"Attendance management system"),t.qZA()(),t.TgZ(6,"div",3),t._UZ(7,"div",4),t.TgZ(8,"div",4),t._UZ(9,"i",5),t.TgZ(10,"ul",6)(11,"li")(12,"a",7),t._uU(13,"Dashboard"),t.qZA()(),t.TgZ(14,"li")(15,"a",7),t._uU(16,"View Profile"),t.qZA()(),t.TgZ(17,"li")(18,"a",8),t.NdJ("click",function(){return r.changepassword()}),t._uU(19,"Change Password"),t.qZA()(),t.TgZ(20,"li")(21,"a",8),t.NdJ("click",function(){return r.logOut()}),t._uU(22,"Logout"),t.qZA()()()()()()())},styles:[".text[_ngcontent-%COMP%]{display:flex;align-items:center;padding:8px;color:#fff}.text[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{margin-left:10px;font-size:25px;font-weight:500}.text[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:5%}.header-content[_ngcontent-%COMP%]{display:flex;justify-content:space-between;background:#343b4a;align-items:center;box-shadow:#0000003d 0 3px 8px}.header-content[_ngcontent-%COMP%]   .logout[_ngcontent-%COMP%]{margin-right:20px;cursor:pointer}.header-content[_ngcontent-%COMP%]   .logout[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:37px}.header-content[_ngcontent-%COMP%]   .logout_language_content[_ngcontent-%COMP%]{display:flex;color:#3b4d6391}.header-content[_ngcontent-%COMP%]   .logout_language_content[_ngcontent-%COMP%]   .language[_ngcontent-%COMP%]{margin-right:10px}.dropdown-menu[_ngcontent-%COMP%]{margin:5px!important;box-shadow:#0003 0 8px 16px;border-radius:5px}@media only screen and (max-width: 415px){.text[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{margin-left:10px;font-size:17px}.text[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:13%!important}}"]}),e})();const m=[{path:"",component:(()=>{class e{constructor(){this.sideNavStatus=!1,this.sideNavStatusClose=!1}ngOnInit(){}}return e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-web-main"]],decls:4,vars:0,consts:[[1,"header-content"]],template:function(n,r){1&n&&(t.TgZ(0,"div"),t._UZ(1,"app-thm-header",0),t.qZA(),t.TgZ(2,"main"),t._UZ(3,"router-outlet"),t.qZA())},directives:[p,s.lC],styles:[".header-content[_ngcontent-%COMP%]{height:4rem}.header-content[_ngcontent-%COMP%]   app-thm-header[_ngcontent-%COMP%]{position:fixed;width:auto;top:0;height:4rem;z-index:2;background-color:#f3f6f8}main[_ngcontent-%COMP%]{height:calc(100vh - 4rem)}"]}),e})(),children:[{path:"",redirectTo:"dashboard",pathMatch:"full"},{path:"dashboard",loadChildren:()=>o.e(70).then(o.bind(o,4070)).then(e=>e.DeshboardModule)}]}];let C=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[[s.Bz.forChild(m)],s.Bz]}),e})();var f=o(1573),v=o(40),M=o(520);function c(e){return new v.w(e)}let x=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[[g.ez,C,f.m,d.aw.forRoot({loader:{provide:d.Zw,useFactory:c,deps:[M.eN]}})]]}),e})()}}]);