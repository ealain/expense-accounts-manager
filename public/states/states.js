app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/user', '/user/dashboard');
    
    $stateProvider.state('home', {
	url: '/',
	templateUrl: 'views/login.html',
	controller: 'loginCtrl'
    });
    
    $stateProvider.state('user', {
	url: '/user',
	templateUrl: 'views/user.html'
    });

    $stateProvider.state('user.dashboard', {
	url: '/dashboard',
	templateUrl: 'views/dashboard.html',
	controller: 'userDashCtrl'
    });

    $stateProvider.state('user.edit', {
	url: '/edit',
	templateUrl: 'views/edit.html',
	controller: 'userEditCtrl'
    });
    
    $stateProvider.state('admin', {});
    
    $stateProvider.state('manager', {});
});
