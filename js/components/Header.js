var React = require('react');
var ReactRouter = require('react-router');
var {browserHistory, Router, Route, IndexRoute} = ReactRouter;
var ReactBootstrap = require('react-bootstrap');
var ReactRouterBootstrap = require('react-router-bootstrap');
var LinkContainer = ReactRouterBootstrap.LinkContainer;
var {Navbar, Nav, NavItem, NavDropdown, MenuItem} = ReactBootstrap;
var LoginActions = require('../actions/LoginActions');

var Header = React.createClass({

	render: function () {
		return (
			<Navbar>
			    <Navbar.Header>
			      	<Navbar.Brand>
			        	<LinkContainer to="/"><a href="#">My App</a></LinkContainer>
			      	</Navbar.Brand>
			      	<Navbar.Toggle />
			    </Navbar.Header>
			    <Navbar.Collapse>
		      		<Nav>
				      	<LinkContainer to="/photo">
				        	<NavItem eventKey={1}>Photo</NavItem>
			        	</LinkContainer>
			        	<LinkContainer to="/setting">
				        	<NavItem eventKey={2}>Setting</NavItem>
			        	</LinkContainer>
			      	</Nav>
			      	<Nav pullRight>
			        	<NavDropdown eventKey={3} title={this.props.userinfo ? this.props.userinfo: 'Account'} id="basic-nav-dropdown">
			          		<LinkContainer to="/setting">
			          			<MenuItem eventKey={3.1}>Setting</MenuItem>
			          		</LinkContainer>
			          		<MenuItem divider />
			          		<MenuItem eventKey={3.2} onClick={this.logout}>Log out</MenuItem>
			        	</NavDropdown>
			      	</Nav>
			    </Navbar.Collapse>
			</Navbar>
		)
	},
	logout: function() {
	    console.log('logout');
	    LoginActions.logout();
	    browserHistory.push('/');
	},
});

module.exports = Header;