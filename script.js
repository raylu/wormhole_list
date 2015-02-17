window.addEvent('domready', function() {
	new Request.JSON({
		'url': '/wh_systems.json',
		'onSuccess': loadSystems,
		'onFailure': function(xhr) {
			console.error(xhr);
		},
	}).get();

	var systems;
	function loadSystems(data) {
		systems = data;

		var table = $('table');
		systems.each(function(system) {
			var row = new Element('div').addClass('row');
			var a = new Element('a', {'href': 'http://wh.pasta.gg/' + system['name']});
			var static1 = system['static1'] || '';
			var static2 = system['static2'] || '';
			row.adopt(
				a.grab(new Element('div').appendText(system['name'])),
				new Element('div').appendText(system['class']),
				new Element('div').appendText(static1).addClass(static1),
				new Element('div').appendText(static2).addClass(static2),
				new Element('div').appendText(system['effect'])
			);
			table.grab(row);
			system['row'] = row;
		});
		render();
	}

	var class_n = effect = null;
	var count = $('count');
	function render() {
		var shown = 0;
		systems.each(function(system) {
			var display = true;
			if (class_n && system['class'] != class_n)
				display = false;
			else if (effect && system['effect'] != effect)
				display = false;

			if (display) {
				system['row'].setStyle('display', 'flex');
				shown++;
			} else
				system['row'].setStyle('display', 'none');
		});
		count.set('html', shown + ' systems');
	}

	$('class').addEvent('change', function(e) {
		class_n = e.target.get('value');
		render();
	});
	$('effect').addEvent('change', function(e) {
		effect = e.target.get('value');
		render();
	});
});
