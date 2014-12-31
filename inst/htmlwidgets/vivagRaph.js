HTMLWidgets.widget({

  name: 'vivagRaph',

  type: 'output',

  initialize: function(el, width, height) {
	
    return {};

  },

  renderValue: function(el, x) {

    el.innerText = 'test test';

	var graph= Viva.Graph.graph();
	var networkData = {nodes: x.nodes,
		 			   links: x.edges
		 			   };
	
	for (var i=0; i < networkData.nodes.length; i++){
		graph.addNode(i,networkData.nodes[i]);
	}
	
	for (var i=0; i < networkData.links.length; i++){
		var link = networkData.links[i];
		graph.addLink(link.source,link.target,link.value);
	}
	
	
	var graphics=Viva.Graph.View.svgGraphics(),nodeSize=24;
	
	var layout= Viva.Graph.Layout.forceDirected(graph,{
		springLength : 40,
		springCoeff : 0.0008,
		dragCoeff : 0.08,
		gravity : -20
	});
	
	var renderer = Viva.Graph.View.renderer(graph,{
		layout : layout,
		graphics : graphics
	});
	
	var colors = [

                        "#1f77b4", "#aec7e8",

                        "#ff7f0e", "#ffbb78",

                        "#2ca02c", "#98df8a",

                        "#d62728", "#ff9896",

                        "#9467bd", "#c5b0d5",

                        "#8c564b", "#c49c94",

                        "#e377c2", "#f7b6d2",

                        "#7f7f7f", "#c7c7c7",

                        "#bcbd22", "#dbdb8d",

                        "#17becf", "#9edae5"

                        ];




	    graphics.node(

            function(node) {

                var groupID = node.data.group;

                var ui = Viva.Graph.svg('g'),

                    nodeColor = node.data.color ? node.data.color : '#00a2e8',

                svgText = Viva.Graph.svg('text').attr('y', '-12px').attr('x','-8px').text('')



                var img = Viva.Graph.svg('circle')

                            .attr('r', 7)

                            .attr('stroke', '#fff')

                            .attr('stroke-width', '1.5px')

                            .attr("fill", colors[groupID ? groupID - 1 : 5]);

                $(img).hover(function() {

                   svgText.text(node.data.nodeName);

                }, function() {

                   svgText.text('');

                });



                ui.append(svgText);

                ui.append(img);

                return ui;

            }).placeNode(

            function(nodeUI, pos) {

                nodeUI.attr('transform', 'translate(' + (pos.x - 0)

                        + ',' + (pos.y - 0) + ')');

            });
		
		    graphics.link(function(link){

                        return Viva.Graph.svg('line')

                                .attr('stroke', '#999')

                                .attr('stroke-width', 3);

                    });

		renderer.run();


	
  },

  resize: function(el, width, height) {

  }

});