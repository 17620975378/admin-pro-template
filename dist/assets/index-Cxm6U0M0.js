import{e as f,r as h,f as x,o as y,c as b,g as t,w as o,u as g,E,h as w,i as n,j as C,k as r,l as k,n as v,q as B}from"./vendor-CjuydzvB.js";import{g as I}from"./index-bzrqV-M2.js";import{_ as T}from"./index-6XxPr3PP.js";const N=f({__name:"index",setup(L){const c=g(),a=h([]);x(()=>{I().then(e=>{a.value=e.data})});const u=()=>{C.prompt("请输入角色名称","新增角色",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(({value:e})=>{a.value.push({roleId:a.value.length+1,roleName:e,authority:[]}),r({type:"success",message:`${e}新增成功`})}).catch(()=>{r({type:"info",message:"取消新增"})})},_=e=>{c.push({path:"/auth",query:{roleId:e.roleId,authList:e.authority}})};return(e,M)=>{const s=k,p=v,m=E,l=B,d=w;return y(),b("div",null,[t(m,{class:"form-box"},{default:o(()=>[t(p,null,{default:o(()=>[t(s,{style:{width:"60px"},size:"small",type:"warning",onClick:u},{default:o(()=>[n("新增角色")]),_:1})]),_:1})]),_:1}),t(d,{data:a.value,style:{width:"100%"},border:""},{default:o(()=>[t(l,{label:"角色编号",prop:"roleId",width:"180px"}),t(l,{label:"角色名称",prop:"roleName",width:"180px"}),t(l,{label:"操作"},{default:o(i=>[t(s,{style:{width:"60px"},type:"primary",text:!0,size:"small",onClick:R=>_(i.row)},{default:o(()=>[n("修改权限")]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"])])}}}),F=T(N,[["__scopeId","data-v-c1d0f981"]]);export{F as default};
