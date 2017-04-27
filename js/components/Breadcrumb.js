var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var Breadcrumb = React.createClass({
	render: function () {
		return (
			<div className="container">
	          <ol className="breadcrumb">
	            {this.props.routes.map((item, index) =>
	              <li key={index}>
	                <Link
	                  onlyActiveOnIndex={true}
	                  activeClassName="active"
	                  to={item.path || ''}>
	                  {item.component.displayName}
	                </Link>
	              </li>
	            )}
	          </ol>
	        </div>
		);
	}
});

module.exports = Breadcrumb;