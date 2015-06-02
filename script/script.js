$(document).ready(function(){

	var results = $('#results');

	function updateValues() {

		var rsName = this.rsname.value;

		if(!rsName)
			return false;

		var xp99 =13034431;	
		results.html('');

		$.getJSON('runescape.php?lowercase=yes&user='+rsName,function(data){
			var xptomax = 0;

			for(var key in data.skills) {
				var intxp = parseInt(data.skills[key].xp);
					if(intxp < xp99) {
						var diff = xp99 - intxp
						xptomax += diff;
						getListItem(key,diff.toLocaleString()).appendTo(results);
					}
			}
			getListItem('Total',xptomax.toLocaleString()).prependTo(results);
		});
	}

	$("#form").submit(updateValues);
	$("radio").change(updateValues);

	function getListItem(key,value) {
		var item = $('<li>',{'class':'list-group-item','text':value});
		$('<strong>',{'text':key}).prependTo(item);
		return item;
	};
});