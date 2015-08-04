var React = require('react');
var RegisterPage = require('./components/RegisterComponent');
var LoginPage = require('./components/LoginComponent');
var HomePage = require('./components/HomeComponent');
var PostPage = require('./components/PostPage');
var PostListPage = require('./components/PostListPage')
var Backbone = require('backparse')(require('./config/parseSettings'));
var UserModel = require('./models/UserModel');
var PostCollection = require('./collections/PostCollection');
var CategoryPage = require('./components/CategoryComponent');
var Navigation = require('./components/NavComponent');
var SearchBar = require('./components/SearchComponent');

var posts = new PostCollection();
var user = new UserModel();
var search = new SearchBar();

user.set('session', localStorage.getItem('sessionToken'));
user.set('username', localStorage.getItem('username'));
user.set('id', localStorage.getItem('id'));

// console.log(user)

var App = Backbone.Router.extend({
	routes:{
		'': 		'login',
		'login':    'login',
		'register':  'register',
		'post': 	  'post',
		'blog':  'blog',
		'category/:category':   'category'
	},

	category: function(category){
		// console.log(category);

		posts.fetch({
			query: {category: category},
			success: function(posts){


				var topTen = posts.slice(posts.length - 10, posts.length).reverse();
		
				React.render(
					<div>
						<Navigation user={user} router={app}/ >
						<CategoryPage posts={topTen} category={category}/>
					</div>,
					document.getElementById('container')
				);
			}
		});
		
	},
	blog: function(){
		// console.log('postlist')

		posts.fetch({
			success: function(posts){
				console.log();
				var newPosts= posts.slice(posts.length - 9, posts.length);

				React.render(
						<div>
							<Navigation user={user} router={app} search={search}/>
							<PostListPage user={user} posts={newPosts} router={app} />
						</div>,
						document.getElementById('container')
				)

			}
		})
	},
	post: function (){
		// console.log('post');
		React.render(
			<div>
			<Navigation user={user} router={app}/>
			<PostPage router={app}/>
			</div>,
			document.getElementById('container')
		);
	},
	register: function(){
		// console.log('register');
		React.render(
		<div>

		<RegisterPage user={user} router={app}/>
		</div>,
		document.getElementById('container')
		);
	},
	login: function() {
		// console.log('login');
		React.render(
		<div >
			<LoginPage user={user} router={app} nav={Navigation}/>
		</div>,
		document.getElementById('container')
		);
	}
})

var app = new App();
Backbone.history.start();