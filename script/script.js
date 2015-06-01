$(document).ready(function(){

	var results = $('#alert');

	$("#form").submit(function(){

		var rsName = this.rsname.value;
		
		$.getJSON('http://services.runescape.com/m=hiscore/index_lite.ws?player='+rsName,function(data){
			console.log(data);
		});

		return false;
	});
});