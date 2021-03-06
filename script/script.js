$(document).ready(function(){

	var results = $('#results');
	var form = $("#form");

	function updateValues() {

		var rsName = form[0].rsname.value;

		if(!rsName)
			return false;

		var xp99 =13034431;	
		var xp120 = 104273167;
		results.html('');

		$.getJSON('runescape.php?lowercase=yes&user='+rsName,function(data){
			var xptomax = 0;

			for(var key in data.skills) {
				var intxp = parseInt(data.skills[key].xp);

					if (key === 'dungeoneering' && form[0].dung.checked && intxp < xp120) {
						var diff = xp120 - intxp;
						xptomax += diff;
						getListItem(key,diff.toLocaleString(),"xp to level 120").appendTo(results);
					} else if(intxp < xp99) {
						var diff = xp99 - intxp;
						xptomax += diff;
						getListItem(key,diff.toLocaleString(),"xp to level 99").appendTo(results);
					}
			}
			getListItem('Total',xptomax.toLocaleString(),"xp to maxed").prependTo(results);
		});
	}

	form.submit(updateValues);
	$("#checkbox").change(updateValues);

	function getListItem(key,value,after) {
		var item = $('<li>',{'class':'list-group-item','text':value});
		$('<strong>',{'text':key}).prependTo(item);
		if(after) {
			$('<small>',{'text':after}).appendTo(item);
		}
		return item;
	};
});