var bookApp = angular.module('bookApp',['eveCore', 'eveHeaderController']);
bookApp.run(function(Config){
	Config.setDirRoot("seed");
	Config.setRestRoot("/books");
});


