(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],{103:function(t,e,a){t.exports=a(135)},108:function(t,e,a){},132:function(t,e,a){},135:function(t,e,a){"use strict";a.r(e);var n=a(0),o=a.n(n),i=a(8),r=a.n(i);a(108),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var l,c,s=a(15),d=a(28),u=a(47),m=a(29),f=a(84),p=a.n(f);!function(t){t[t.New=0]="New",t[t.InProgress=1]="InProgress",t[t.Completed=2]="Completed",t[t.Draft=3]="Draft"}(l||(l={})),function(t){t[t.Low=0]="Low",t[t.Middle=1]="Middle",t[t.Hi=2]="Hi",t[t.Urgently=3]="Urgently",t[t.Later=4]="Later"}(c||(c={}));var b,g=p.a.create({baseURL:"https://social-network.samuraijs.com/api/1.1/",withCredentials:!0,headers:{"API-KEY":"bf0875ba-8463-481a-87a8-643832194416"}}),h=function(){return g.get("todo-lists")},v=function(t){return g.post("todo-lists",{title:t})},E=function(t){return g.delete("todo-lists/".concat(t))},k=function(t,e){return g.put("todo-lists/".concat(t),{title:e})},C=function(t){return g.get("todo-lists/".concat(t,"/tasks"))},y=function(t,e){return g.post("todo-lists/".concat(t,"/tasks"),{title:e})},j=function(t,e,a){return g.put("todo-lists/".concat(t,"/tasks/").concat(e),a)},O=function(t,e){return g.delete("todo-lists/".concat(t,"/tasks/").concat(e))},I=function(t){return g.post("auth/login",t)},T=function(){return g.get("auth/me")},w=function(){return g.delete("auth/login")},A=function(t,e){t.messages.length?e(B({error:t.messages[0]})):e(B({error:"Some error"})),e(M({status:"failed"}))},S=function(t,e){e(B(t.message?{error:t.message}:{error:"Some error"})),e(M({status:"failed"}))},L=a(25),x=Object(L.b)({name:"auth",initialState:{isLoggedIn:!1},reducers:{setIsLoggedInAC:function(t,e){t.isLoggedIn=e.payload.value}}}),D=x.reducer,F=x.actions.setIsLoggedInAC,P=Object(L.b)({name:"app",initialState:{status:"loading",error:null,isInitialized:!1},reducers:{setAppStatusAC:function(t,e){t.status=e.payload.status},setAppErrorAC:function(t,e){t.error=e.payload.error},setAppInitializedAC:function(t,e){t.isInitialized=e.payload.isInitialized}}}),z=P.reducer,N=P.actions,M=N.setAppStatusAC,B=N.setAppErrorAC,H=N.setAppInitializedAC,q=Object(m.v1)(),J=Object(m.v1)(),R=Object(L.b)({name:"todolist",initialState:[],reducers:{removeTodolistAC:function(t,e){var a=t.findIndex((function(t){return t.id===e.payload.todolistId}));a>-1&&t.splice(a,1)},addTodolistAC:function(t,e){t.unshift(Object(d.a)(Object(d.a)({},e.payload.todolist),{},{filter:"all",entityStatus:"idle"}))},changeTodolistTitleAC:function(t,e){var a=t.findIndex((function(t){return t.id===e.payload.todolistId}));t[a].title=e.payload.title},changeTodolistFilterAC:function(t,e){var a=t.findIndex((function(t){return t.id===e.payload.todolistId}));t[a].filter=e.payload.filter},setTodolistsAC:function(t,e){return e.payload.todolist.map((function(t){return Object(d.a)(Object(d.a)({},t),{},{filter:"all",entityStatus:"idle"})}))},changeTodolistEntityStatusAC:function(t,e){var a=t.findIndex((function(t){return t.id===e.payload.id}));t[a].entityStatus=e.payload.entityStatus}}}),U=R.reducer,Z=R.actions,K=Z.removeTodolistAC,W=Z.addTodolistAC,$=Z.changeTodolistTitleAC,_=Z.changeTodolistFilterAC,V=Z.setTodolistsAC,Y=Z.changeTodolistEntityStatusAC,G=(b={},Object(u.a)(b,q,[{id:Object(m.v1)(),title:"HTML",status:l.Completed,todoListId:q,description:"",startDate:"",deadline:"",addedDate:"",order:0,priority:c.Low},{id:Object(m.v1)(),title:"CSS",status:l.Completed,todoListId:q,description:"",startDate:"",deadline:"",addedDate:"",order:0,priority:c.Low},{id:Object(m.v1)(),title:"JS",status:l.New,todoListId:q,description:"",startDate:"",deadline:"",addedDate:"",order:0,priority:c.Low}]),Object(u.a)(b,J,[{id:Object(m.v1)(),title:"Milk",status:l.Completed,todoListId:J,description:"",startDate:"",deadline:"",addedDate:"",order:0,priority:c.Low},{id:Object(m.v1)(),title:"Beef",status:l.New,todoListId:J,description:"",startDate:"",deadline:"",addedDate:"",order:0,priority:c.Low}]),b),Q=Object(L.b)({name:"tasks",initialState:G,reducers:{removeTaskAC:function(t,e){var a=t[e.payload.todolistId],n=a.findIndex((function(t){return t.id===e.payload.taskId}));n>-1&&a.splice(n,1)},addTaskAC:function(t,e){t[e.payload.todoListId].unshift(e.payload)},updateTaskAC:function(t,e){var a=t[e.payload.todolistId],n=a.findIndex((function(t){return t.id===e.payload.taskId}));n>-1&&(a[n]=Object(d.a)(Object(d.a)({},a[n]),e.payload.model))},setTasksAC:function(t,e){t[e.payload.todolist]=e.payload.tasks}},extraReducers:function(t){t.addCase(W,(function(t,e){t[e.payload.todolist.id]=[]})),t.addCase(K,(function(t,e){delete t[e.payload.todolistId]})),t.addCase(V,(function(t,e){e.payload.todolist.forEach((function(e){t[e.id]=[]}))}))}}),X=Q.reducer,tt=Q.actions,et=tt.removeTaskAC,at=tt.addTaskAC,nt=tt.updateTaskAC,ot=tt.setTasksAC,it=function(t,e,a){return function(n,o){var i=o().tasks[a].find((function(e){return e.id===t}));if(i){var r=Object(d.a)({deadline:i.deadline,description:i.description,priority:i.priority,startDate:i.startDate,title:i.title,status:i.status},e);n(M({status:"loading"})),j(a,t,r).then((function(o){0===o.data.resultCode?(n(nt({taskId:t,model:e,todolistId:a})),n(M({status:"succeeded"}))):A(o.data,n)})).catch((function(t){S(t,n)}))}else console.warn("task not found")}},rt=a(20),lt=a(48),ct=Object(rt.c)({tasks:X,todoLists:U,app:z,auth:D}),st=Object(L.a)({reducer:ct,middleware:function(t){return t().prepend(lt.a)}});window.store=st;a(132);var dt=a(179),ut=a(180),mt=a(181),ft=a(172),pt=a(137),bt=a(175),gt=a(183),ht=a(184),vt=a(182),Et=a(176),kt=a(136),Ct=a(44),yt=a(185),jt=a(173),Ot=o.a.memo((function(t){var e=t.addItem,a=t.disabled,i=void 0!==a&&a,r=Object(n.useState)(""),l=Object(Ct.a)(r,2),c=l[0],s=l[1],d=Object(n.useState)(null),u=Object(Ct.a)(d,2),m=u[0],f=u[1],p=function(){var t=c.trim();""!==t?(e(t),s("")):f("Title is required")};return o.a.createElement("div",null,o.a.createElement(yt.a,{variant:"outlined",value:c,onChange:function(t){s(t.currentTarget.value)},onKeyPress:function(t){null!==m&&f(null),"Enter"===t.key&&p()},helperText:m,label:"Title",error:!m,disabled:i}),o.a.createElement(ft.a,{onClick:p,disabled:i},o.a.createElement(jt.a,null)))})),It=a(92),Tt=o.a.memo((function(t){var e=Object(n.useState)(!1),a=Object(Ct.a)(e,2),i=a[0],r=a[1],l=Object(n.useState)(t.title),c=Object(Ct.a)(l,2),s=c[0],d=c[1];return i?o.a.createElement(yt.a,{variant:"standard",value:s,autoFocus:!0,onBlur:function(){r(!1),t.changeItem(s)},onChange:function(t){d(t.currentTarget.value)}}):o.a.createElement("span",{onDoubleClick:function(){r(!0)}},t.title)})),wt=a(174),At=a(187),St=o.a.memo((function(t){var e=Object(n.useCallback)((function(e){t.changeTaskTitle(t.task.id,e,t.todolistId)}),[t.changeTaskTitle,t.task.id,t.todolistId]);return o.a.createElement("div",{key:t.task.id,className:t.task.status===l.Completed?"is-done":""},o.a.createElement(At.a,{color:"secondary",checked:t.task.status===l.Completed,onChange:function(e){var a=e.currentTarget.checked;t.changeStatus(t.task.id,a?l.Completed:l.New,t.todolistId)}}),o.a.createElement(Tt,{title:t.task.title,changeItem:e}),o.a.createElement(ft.a,{onClick:function(){t.removeTask(t.task.id,t.todolistId)}},o.a.createElement(wt.a,null)))})),Lt=o.a.memo((function(t){var e=t.demo,a=void 0!==e&&e,i=Object(It.a)(t,["demo"]),r=Object(s.b)();Object(n.useEffect)((function(){var t;a||r((t=i.todolist.id,function(e){e(M({status:"loading"})),C(t).then((function(a){var n=a.data.items;e(ot({tasks:n,todolist:t})),e(M({status:"succeeded"}))})).catch((function(t){S(t,e)}))}))}),[]);var c=Object(n.useCallback)((function(t){i.addTask(t,i.todolist.id)}),[i.addTask,i.todolist.id]),d=Object(n.useCallback)((function(t){return i.changeTodoListTitle(t,i.todolist.id)}),[i.changeTodoListTitle,i.todolist.id]),u=Object(n.useCallback)((function(){i.removeTodolist(i.todolist.id)}),[]),m=i.tasks;"active"===i.todolist.filter&&(m=i.tasks.filter((function(t){return t.status===l.New}))),"completed"===i.todolist.filter&&(m=i.tasks.filter((function(t){return t.status===l.Completed})));var f=m.map((function(t){return o.a.createElement(St,{task:t,key:t.id,removeTask:i.removeTask,changeTaskTitle:i.changeTaskTitle,changeStatus:i.changeStatus,todolistId:i.todolist.id})}));return o.a.createElement("div",null,o.a.createElement("h3",null,o.a.createElement(Tt,{title:i.todolist.title,changeItem:d}),o.a.createElement(ft.a,{onClick:u,disabled:"loading"===i.todolist.entityStatus},o.a.createElement(wt.a,null))),o.a.createElement(Ot,{addItem:c,disabled:"loading"===i.todolist.entityStatus}),o.a.createElement("ul",{style:{listStyle:"none",paddingLeft:"0"}},f),o.a.createElement("div",null,o.a.createElement(bt.a,{size:"small",color:"all"===i.todolist.filter?"secondary":"primary",variant:"contained",onClick:function(){i.changeFilter("all",i.todolist.id)}},"All"),o.a.createElement(bt.a,{size:"small",color:"active"===i.todolist.filter?"secondary":"primary",variant:"contained",onClick:function(){i.changeFilter("active",i.todolist.id)}},"Active"),o.a.createElement(bt.a,{size:"small",color:"completed"===i.todolist.filter?"secondary":"primary",variant:"contained",onClick:function(){i.changeFilter("completed",i.todolist.id)}},"Completed")))})),xt=a(12),Dt=function(t){var e=t.demo,a=void 0!==e&&e,i=Object(s.c)((function(t){return t.todoLists})),r=Object(s.c)((function(t){return t.tasks})),l=Object(s.c)((function(t){return t.auth.isLoggedIn})),c=Object(s.b)();Object(n.useEffect)((function(){!a&&l&&c((function(t,e){t(M({status:"loading"})),h().then((function(e){t(M({status:"succeeded"})),t(V({todolist:e.data}))})).catch((function(e){S(e,t)}))}))}),[]);var d=Object(n.useCallback)((function(t,e){var a=function(t,e){return function(a){a(M({status:"loading"})),O(e,t).then((function(n){a(et({taskId:t,todolistId:e})),a(M({status:"succeeded"}))})).catch((function(t){S(t,a)}))}}(t,e);c(a)}),[c]),u=Object(n.useCallback)((function(t,e){c(function(t,e){return function(a){a(M({status:"loading"})),y(e,t).then((function(t){if(0===t.data.resultCode){var e=t.data.data.item;a(at(e)),a(M({status:"succeeded"}))}else A(t.data,a)})).catch((function(t){S(t,a)}))}}(t,e))}),[c]),m=Object(n.useCallback)((function(t,e,a){c(it(t,{status:e},a))}),[c]),f=Object(n.useCallback)((function(t,e,a){c(it(t,{title:e},a))}),[c]),p=Object(n.useCallback)((function(t){var e=function(t){return function(e){e(M({status:"loading"})),e(Y({id:t,entityStatus:"loading"})),E(t).then((function(a){e(K({todolistId:t})),e(M({status:"succeeded"}))})).catch((function(t){S(t,e)}))}}(t);c(e)}),[c]),b=Object(n.useCallback)((function(t,e){c(_({filter:t,todolistId:e}))}),[c]),g=Object(n.useCallback)((function(t,e){c(function(t,e){return function(a){a(M({status:"loading"})),k(e,t).then((function(n){a($({todolistId:e,title:t})),a(M({status:"succeeded"}))})).catch((function(t){S(t,a)}))}}(t,e))}),[c]),C=Object(n.useCallback)((function(t){c(function(t){return function(e){e(M({status:"loading"})),v(t).then((function(t){0===t.data.resultCode?(e(W({todolist:t.data.data.item})),e(M({status:"succeeded"}))):A(t.data,e)})).catch((function(t){S(t,e)}))}}(t))}),[c]);return l?o.a.createElement(o.a.Fragment,null,o.a.createElement(Et.a,{container:!0,style:{padding:"7px 0"}}," ",o.a.createElement(Ot,{addItem:C})),o.a.createElement(Et.a,{container:!0,spacing:10},i.map((function(t){var e=r[t.id];return o.a.createElement(Et.a,{item:!0,key:t.id},o.a.createElement(kt.a,{elevation:10,style:{padding:"20px"}},o.a.createElement(Lt,{key:t.id,todolist:t,tasks:e,removeTask:d,changeFilter:b,addTask:u,changeStatus:m,removeTodolist:p,changeTaskTitle:f,changeTodoListTitle:g,demo:a})))})))):o.a.createElement(xt.a,{to:"/login"})},Ft=a(189),Pt=a(186);function zt(t){return o.a.createElement(Pt.a,Object.assign({elevation:6,variant:"filled"},t))}function Nt(){var t=Object(s.c)((function(t){return t.app.error})),e=Object(s.b)(),a=function(t,a){"click away"!==a&&e(B({error:null}))};return o.a.createElement(Ft.a,{open:null!==t,autoHideDuration:4e3,onClose:a},o.a.createElement(zt,{onClose:a,severity:"error"},t))}var Mt=a(190),Bt=a(171),Ht=a(177),qt=a(178),Jt=a(91),Rt=function(){var t=Object(s.b)(),e=Object(s.c)((function(t){return t.auth.isLoggedIn})),a=Object(Jt.a)({initialValues:{email:"",password:"",rememberMe:!1},validate:function(t){var e={};return t.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(t.email)||(e.email="Invalid email address"):e.email="Email is required",t.password?t.password.length<3&&(e.password="Password not less than 3 characters"):e.password="Password required",e},onSubmit:function(e){var n;t((n=e,function(t){t(M({status:"loading"})),I(n).then((function(e){0===e.data.resultCode?(t(F({value:!0})),t(M({status:"succeeded"}))):A(e.data,t)})).catch((function(e){S(e,t)}))})),a.resetForm()}});return e?o.a.createElement(xt.a,{to:"/"}):o.a.createElement(Et.a,{container:!0,justify:"center"},o.a.createElement(Et.a,{item:!0,xs:4},o.a.createElement(Mt.a,null,o.a.createElement(Bt.a,null,o.a.createElement("p",null,"To log in get registered",o.a.createElement("a",{href:"https://social-network.samuraijs.com/",target:"_blank"},"here")),o.a.createElement("p",null,"or use common test account credentials:"),o.a.createElement("p",null,"Email: free@samuraijs.com"),o.a.createElement("p",null,"Password: free")),o.a.createElement("form",{onSubmit:a.handleSubmit},o.a.createElement(Ht.a,null,o.a.createElement(yt.a,Object.assign({label:"Email",margin:"normal"},a.getFieldProps("email"))),a.touched.email&&a.errors.email&&o.a.createElement("div",{style:{color:"red"}},a.errors.email),o.a.createElement(yt.a,Object.assign({type:"password",label:"Password",margin:"normal"},a.getFieldProps("password"))),a.touched.password&&a.errors.password&&o.a.createElement("div",{style:{color:"red"}},a.errors.password),o.a.createElement(qt.a,{label:"Remember me",control:o.a.createElement(At.a,a.getFieldProps("rememberMe"))}),o.a.createElement(bt.a,{type:"submit",variant:"contained",color:"primary"},"Login"))))))},Ut=function(t){var e=t.demo,a=void 0!==e&&e,i=Object(s.c)((function(t){return t.app.status})),r=Object(s.c)((function(t){return t.app.isInitialized})),l=Object(s.c)((function(t){return t.auth.isLoggedIn})),c=Object(s.b)();Object(n.useEffect)((function(){c((function(t){T().then((function(e){0===e.data.resultCode&&(t(F({value:!0})),t(H({isInitialized:!0})))})).finally((function(){t(H({isInitialized:!0}))}))}))}),[]);var d=Object(n.useCallback)((function(){c((function(t){t(M({status:"loading"})),w().then((function(e){0===e.data.resultCode?(t(F({value:!1})),t(M({status:"succeeded"}))):A(e.data,t)})).catch((function(e){S(e,t)}))}))}),[]);return r?o.a.createElement("div",{className:"App"},o.a.createElement(ut.a,{position:"static"},o.a.createElement(mt.a,null,o.a.createElement(ft.a,{edge:"start",color:"inherit","aria-label":"menu"},o.a.createElement(vt.a,null)),o.a.createElement(pt.a,{variant:"h6"},"News"),l&&o.a.createElement(bt.a,{color:"inherit",onClick:d},"Log Out"))),o.a.createElement(gt.a,{fixed:!0},"loading"===i&&o.a.createElement(ht.a,{color:"secondary"}),o.a.createElement(xt.d,null,o.a.createElement(xt.b,{exact:!0,path:"/",render:function(){return o.a.createElement(Dt,{demo:a})}}),o.a.createElement(xt.b,{path:"/login",render:function(){return o.a.createElement(Rt,null)}}),o.a.createElement(xt.b,{path:"/404",render:function(){return o.a.createElement("h1",{style:{textAlign:"center"}},"404.Page not found")}}),o.a.createElement(xt.a,{from:"*",to:"/404"}))),o.a.createElement(Nt,null)):o.a.createElement("div",{style:{position:"fixed",top:"30%",textAlign:"center",width:"100%"}},o.a.createElement(dt.a,null))},Zt=a(46);r.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(s.a,{store:st},o.a.createElement(Zt.a,null,o.a.createElement(Ut,null)))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}},[[103,1,2]]]);
//# sourceMappingURL=main.dfdb7144.chunk.js.map