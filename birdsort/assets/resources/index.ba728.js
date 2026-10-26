System.register("chunks:///_virtual/moreGame.ts",["./rollupPluginModLoBabelHelpers.js","cc","./moreItem.ts"],(function(e){var i,t,n,r,o,a,c,l,s,u,m,p;return{setters:[function(e){i=e.applyDecoratedDescriptor,t=e.inheritsLoose,n=e.initializerDefineProperty,r=e.assertThisInitialized},function(e){o=e.cclegacy,a=e._decorator,c=e.Node,l=e.ScrollView,s=e.sys,u=e.instantiate,m=e.Component},function(e){p=e.moreItem}],execute:function(){var f,h,d,b,g,v,y,w,G;o._RF.push({},"2cb7bPQaBJJkqepgILi4uSu","moreGame",void 0);var z=a.ccclass,V=a.property;e("moreGame",(f=z("moreGame"),h=V(c),d=V(c),b=V(l),f((y=i((v=function(e){function i(){for(var i,t=arguments.length,o=new Array(t),a=0;a<t;a++)o[a]=arguments[a];return i=e.call.apply(e,[this].concat(o))||this,n(i,"item",y,r(i)),n(i,"anim",w,r(i)),n(i,"scrollView",G,r(i)),i.config=[{name:"闯关冲冲冲呀",appid:"wxe589826d20cb720f",icon:"1"},{name:"让你过两关",appid:"wxb68f9d283b365d00",icon:"2"}],i}t(i,e);var o=i.prototype;return o.onLoad=function(){this.item.active=!1,this.anim.active=!1,s.platform!=s.Platform.WECHAT_GAME&&(this.node.getChildByName("moreBtn").active=!1)},o.openMoreGame=function(){if(this.anim.active=!0,!(this.scrollView.content.children.length>0))for(var e=0;e<this.config.length;e++){var i=u(this.item);i.active=!0,i.parent=this.scrollView.content,i.getComponent(p).init(this.config[e])}},o.hideMoreGame=function(){this.anim.active=!1},i}(m)).prototype,"item",[h],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),w=i(v.prototype,"anim",[d],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),G=i(v.prototype,"scrollView",[b],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),g=v))||g));o._RF.pop()}}}));

System.register("chunks:///_virtual/moreItem.ts",["./rollupPluginModLoBabelHelpers.js","cc"],(function(e){var t,n,r,o,a,i,s,c,u,m,p,l;return{setters:[function(e){t=e.inheritsLoose,n=e.asyncToGenerator,r=e.regeneratorRuntime},function(e){o=e.cclegacy,a=e._decorator,i=e.sys,s=e.resources,c=e.Prefab,u=e.SpriteFrame,m=e.Component,p=e.Sprite,l=e.Label}],execute:function(){var f;o._RF.push({},"406b6WDxNJLTJHiAKDfm/Rl","moreItem",void 0);var d=a.ccclass;a.property,e("moreItem",d("moreItem")(f=function(e){function o(){for(var t,n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(t=e.call.apply(e,[this].concat(r))||this).data=void 0,t}t(o,e);var a=o.prototype;return a.init=function(){var e=n(r().mark((function e(t){var n;return r().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.data=t,this.node.getChildByName("lbName").getComponent(l).string=t.name,e.next=4,this.loadCommonAssetSync("wxMoreGame/icon/"+t.icon,u);case 4:(n=e.sent)&&(this.node.getChildByName("icon").getComponent(p).spriteFrame=n);case 6:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}(),a.gotoGame=function(){i.platform==i.Platform.WECHAT_GAME&&wx.navigateToMiniProgram({appId:this.data.appid,path:"page/index/index",extraData:{foo:"bar"},envVersion:"release",success:function(e){}})},a.loadCommonAssetSync=function(e,t){return new Promise((function(n){e=t==c?"prefab/"+e:e,t==u&&(e+="/spriteFrame"),s.load(e,t,(function(e,t){n(e?null:t)}))}))},o}(m))||f);o._RF.pop()}}}));

System.register("chunks:///_virtual/resources",["./moreGame.ts","./moreItem.ts"],(function(){return{setters:[null,null],execute:function(){}}}));

(function(r) {
  r('virtual:///prerequisite-imports/resources', 'chunks:///_virtual/resources'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});