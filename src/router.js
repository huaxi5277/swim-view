import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Private from './utils/Private'
const isAuthority = true
let routeArr = [
  {
    path : "/",
    component : ()=>import('../src/routes/IndexPage'),
    model : [],
    routes : [
      {
        path : "/home",
        component : ()=>import('./routes/MainView'),
        model : [],
        isAuthority
      },
      {
        path : "/login",
        component : ()=>import('./routes/Login'),
        model : []
      },
      {
        path : '/design',
        component : ()=>import('./routes/Design'),
        model : []
      },
      {
        path : "/study",
        component : ()=>import('./routes/Study/StudySkill'),
        model : [],
        routes:[
          {
            path : "/study/breaststroke",
            component : ()=>import('./routes/Study/breaststroke'),
            model : [],
            routes : [
              {
                path : "/study/breaststroke/history",
                component : ()=>import('./routes/Study/breaststroke/history'),
                model : [],
              },
              {
                path : "/study/breaststroke/basic",
                component : ()=>import('./routes/Study/breaststroke/basic'),
                model : [],
              },
              {
                path : "/study/breaststroke/senior",
                component : ()=>import('./routes/Study/breaststroke/senior'),
                model : [],
              },
              {
                path : "/study/breaststroke/compontation",
                component : ()=>import('./routes/Study/breaststroke/compontation'),
                model : [],
              }
            ]
          },
          {
            path : "/study/freestroke",
            component : ()=>import('./routes/Study/freestroke'),
            model : [],
            routes : [
              {
                path : "/study/backstroke/history",
                component : ()=>import('./routes/Study/freestroke/history'),
                model : [],
              },
              {
                path : "/study/backstroke/basic",
                component : ()=>import('./routes/Study/freestroke/basic'),
                model : [],
              },
              {
                path : "/study/backstroke/senior",
                component : ()=>import('./routes/Study/freestroke/senior'),
                model : [],
              },
              {
                path : "/study/backstroke/compontation",
                component : ()=>import('./routes/Study/freestroke/compontation'),
                model : [],
              }
            ]
          },
          {
            path : "/study/backstroke",
            component : ()=>import('./routes/Study/backstroke'),
            model : [],
            routes :[
              {
                path : "/study/backstroke/history",
                component : ()=>import('./routes/Study/backstroke/history'),
                model : [],
              },
              {
                path : "/study/backstroke/basic",
                component : ()=>import('./routes/Study/backstroke/basic'),
                model : [],
              },
              {
                path : "/study/backstroke/senior",
                component : ()=>import('./routes/Study/backstroke/senior'),
                model : [],
              },
              {
                path : "/study/backstroke/compontation",
                component : ()=>import('./routes/Study/backstroke/compontation'),
                model : [],
              }
            ]
          },
          {
            path : "/study/butterflystroke",
            component : ()=>import('./routes/Study/butterflystroke'),
            model : [],
            routes : [
              {
                path : "/study/backstroke/history",
                component : ()=>import('./routes/Study/butterflystroke/history'),
                model : [],
              },
              {
                path : "/study/backstroke/basic",
                component : ()=>import('./routes/Study/butterflystroke/basic'),
                model : [],
              },
              {
                path : "/study/backstroke/senior",
                component : ()=>import('./routes/Study/butterflystroke/senior'),
                model : [],
              },
              {
                path : "/study/backstroke/compontation",
                component : ()=>import('./routes/Study/butterflystroke/compontation'),
                model : [],
              }
            ]
          },
        ]
      }
    ]
  }
]
function RouterConfig({ history,app}) {
  return (
    <Router history={history}>
      <Switch>
        {
          routeArr.map((route,i)=>{
            return (
             <Private {...route} key={i} app={app}></Private>
            )
          })
        }
      </Switch>
    </Router>
  );
}

export default RouterConfig;
