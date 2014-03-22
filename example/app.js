doit.init({
	resourceRoot: 'vendor/doitsimple',
	modules: [
		{
			type: 'restView',
			name: 'book',
			apiRoot: '/api/books',
			webRoot: '/book',
			tokenField: 'access_token',
			emptyEntity: {
				name: '',
				authors: [''],
				description: ''
			}
		},
		{
			type: 'restView',
			name: 'user',
			apiRoot: '/api/user',
			webRoot: '/user',
			tokenField: 'access_token',
			emptyEntity: {
				userid: '',
				access_token: ''
			}
		},
		{
			type: 'listView',
			name: 'bookList',
			src: 'book'
		},
		{
			type: 'listView',
			name: 'userList',
			src: 'user'
		},
		{
			type: 'jsonView',
			name: 'jsonView'
		}
	]
});
