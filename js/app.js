var ReactRouter = require('react-router');
var {browserHistory, Router, Route, IndexRoute} = ReactRouter;
var React = require('react');
var ReactDOM = require('react-dom');

var Main = require('./components/Main');
var Login = require('./components/Login');
var Home = require('./components/Home');
var Photo = require('./components/Photo');
var Setting = require('./components/Setting');

ReactDOM.render(
	<Router history={browserHistory}>		
	    <Route path="/" component={Main}>
	    	<IndexRoute component={Photo} />
	    	<Route path="login" component={Login} />	      	
	      	<Route path="photo" component={Photo} />
	      	<Route path="setting" component={Setting} />
	    </Route>
	</Router>,
  	document.getElementById('app')
);