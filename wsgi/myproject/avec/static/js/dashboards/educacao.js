var  
	spenderRowChart = dc.barChart("#chart-01"),
	localizacaoRowChart = dc.barChart("#chart-03"),	
	sexoLineChart   = dc.lineChart("#chart-04");
//	yearlyBubbleChart = dc.bubbleChart('#us-chart');
	//yearRingChart   = dc.pieChart("#us-chart"),

	/*inicio declaracao graficos de cor_raça*/
	brancaChart = dc.numberDisplay("#brancaChart"),	
	amarelaChart = dc.numberDisplay("#amarelaChart"),	
	pardaChart = dc.numberDisplay("#pardaChart"),	
	pretaChart = dc.numberDisplay("#pretaChart"),	
	indigenaChart = dc.numberDisplay("#indigenaChart"),
	naoDeclaradaChart = dc.numberDisplay("#naoDeclaradaChart"),
	/*fim declaracao graficos de cor_raça*/	

	/*inicio declaracao graficos de faixa etaria*/
	chart15 = dc.numberDisplay("#chart15"),	
	chart16 = dc.numberDisplay("#chart16"),	
	chart17 = dc.numberDisplay("#chart17"),	
	chart18 = dc.numberDisplay("#chart18"),	
	chart19 = dc.numberDisplay("#chart19"),	
	chart20 = dc.numberDisplay("#chart20"),	
	chart21 = dc.numberDisplay("#chart21"),	
	chart22 = dc.numberDisplay("#chart22"),	
	chart23 = dc.numberDisplay("#chart23"),	
	chart24 = dc.numberDisplay("#chart24"),	
	chart25 = dc.numberDisplay("#chart25");
	
	/*fim declaracao graficos de faixa etaria*/
	
var ndx;

var oxe = d3.csv(sinopse_estatistica_da_educacao_basica_2015, function (data) {         

  data.forEach(function(x) {
	x.EnsinoFundamental = +x.EnsinoFundamental;
	x.EnsinoMedio = +x.EnsinoMedio;
	x.EducacaoProfissional = +x.EducacaoProfissional;
	x.Urbana = +x.Urbana;
	x.Rural = +x.Rural;	  
    x.Branca += +x.Branca;
	x.Amarela += +x.Amarela;
	x.Preta += +x.Preta;
	x.Parda += +x.Parda;
	x.Indigena += +x.Indigena;
	x.NaoDeclarada += +x.NaoDeclarada;							
	x.Total += +x.Total;	  
	x.ate_3 += +x.ate_3;
	x.ate_5 += +x.ate_5;
	x.ate_10 += +x.ate_10;
	x.ate_14 += +x.ate_14;
	x.ate_17 += +x.ate_17;
	x.ate_19 += +x.ate_19;
	x.ate_24 += +x.ate_24;
	x.ate_29 += +x.ate_29;
	x.ate_34 += +x.ate_34
	x.ate_39 += +x.ate_39;
	x.maisde_40 += +x.maisde_40;	
  });
 	
 ndx = crossfilter(data),
	yearDim  = ndx.dimension(function(d) {return +d.Ano;}),
	cityDim  = ndx.dimension(function(d) {return +d.Ano;}),	
    qtdPerYear = yearDim.group().reduceSum(function(d) {return +d.Total;})
	cidadeDim = ndx.dimension(function(d) {return d.Municipio;});
	cidadeDim.filter(null);
	masculinoGroup = cityDim.group().reduceSum(function (d) { return d.Masculino; })
	femininoGroup = cityDim.group().reduceSum(function (d) { return d.Feminino; })

	;
	
	
	
	var etapaPerYear = cityDim.group().reduce(
						//add
						function(p, v) {
							++p.count;
							p.EnsinoFundamental += v.EnsinoFundamental;
							p.EnsinoMedio += v.EnsinoMedio;
							p.EducacaoProfissional += v.EducacaoProfissional;
							return p;
						},
						//remove
						function(p, v) {
							--p.count;
							p.EnsinoFundamental -= v.EnsinoFundamental;
							p.EnsinoMedio -= v.EnsinoMedio;
							p.EducacaoProfissional -= v.EducacaoProfissional;
							return p;
						},
						//init
						function() {
							return {count:0, EnsinoFundamental:0, EnsinoMedio:0, EducacaoProfissional:0};
						}
				);

	var localizacaoPerYear = cityDim.group().reduce(
						//add
						function(p, v) {
							++p.count;
							p.Urbana += v.Urbana;
							p.Rural += v.Rural;
							return p;
						},
						//remove
						function(p, v) {
							--p.count;
							p.Urbana -= v.Urbana;
							p.Rural -= v.Rural;
							return p;
						},
						//init
						function() {
							return {count:0, Urbana:0, Rural:0};
						}
				);				
				
	/*inicio group Cor-Raça*/
	
	var corRaca = cityDim.groupAll().reduce(
						//add
						function(p, v) {		
							++p.count;					
							p.Branca += +v.Branca;
							p.Amarela += +v.Amarela;
							p.Preta += +v.Preta;
							p.Parda += +v.Parda;
							p.Indigena += +v.Indigena;
							p.NaoDeclarada += +v.NaoDeclarada;							
							p.Total += +v.Total;
							return p;
						},
						//remove
						function(p, v) {
							--p.count;
							p.Branca -= +v.Branca;
							p.Amarela -= +v.Amarela;
							p.Preta -= +v.Preta;
							p.Parda -= +v.Parda;
							p.Indigena -= +v.Indigena;
							p.NaoDeclarada -= +v.NaoDeclarada;							
							p.Total -= +v.Total;
							return p;
						},
						//init
						function() {
							return {Branca:0, Amarela:0,Preta:0,Parda:0,Indigena:0, NaoDeclarada:0,Total:0};
						}
				);
	
	var percentualBranca = function(d){
		return (d.Branca / d.Total)  ;
	};	
	var percentualAmarela = function(d){
		return (d.Amarela / d.Total) ;
	};
	var percentualPreta = function(d){
		return (d.Preta / d.Total) ;
	};
	var percentualParda = function(d){
		return (d.Parda / d.Total) ;
	};
	var percentualIndigena = function(d){
		return (d.Indigena / d.Total)  ;
	};
	var percentualNaodeclarada = function(d){
		return (d.NaoDeclarada / d.Total)  ;
	};	
				
	/*fim group Cor-Raça*/				


	/*inicio group Cor-Raça*/
	
	var faixaEtaria = cityDim.groupAll().reduce(
						//add
						function(p, v) {		
							++p.count;					
							p.ate_3 += +v.ate_3;
							p.ate_5 += +v.ate_5;
							p.ate_10 += +v.ate_10;
							p.ate_14 += +v.ate_14;
							p.ate_17 += +v.ate_17;
							p.ate_19 += +v.ate_19;
							p.ate_24 += +v.ate_24;
							p.ate_29 += +v.ate_29;
							p.ate_34 += +v.ate_34
							p.ate_39 += +v.ate_39;
							p.maisde_40 += +v.maisde_40;						
							p.Total += +v.Total;
							return p;
						},
						//remove
						function(p, v) {
							--p.count;
							p.ate_3 -= +v.ate_3;
							p.ate_5 -= +v.ate_5;
							p.ate_10 -= +v.ate_10;
							p.ate_14 -= +v.ate_14;
							p.ate_17 -= +v.ate_17;
							p.ate_19 -= +v.ate_19;
							p.ate_24 -= +v.ate_24;
							p.ate_29 -= +v.ate_29;
							p.ate_34 -= +v.ate_34
							p.ate_39 -= +v.ate_39;
							p.maisde_40 -= +v.maisde_40;						
							p.Total -= +v.Total;
							return p;
						},
						//init
						function() {
							return {ate_3:0, ate_5:0,ate_10:0,ate_14:0,ate_17:0, ate_19:0,ate_24:0,ate_29:0,ate_34:0, ate_39:0,maisde_40:0,Total:0};
						}
				);
	
	var percentualAte_3 = function(d){
		return (d.ate_3 / d.Total)  ;
	};	
	var percentualAte_5 = function(d){
		return (d.ate_5 / d.Total) ;
	};
	var percentualAte_10 = function(d){
		return (d.ate_10 / d.Total) ;
	};
	var percentualAte_14 = function(d){
		return (d.ate_14 / d.Total) ;
	};
	var percentualAte_17 = function(d){
		return (d.ate_17 / d.Total)  ;
	};
	var percentualAte_19 = function(d){
		return (d.ate_19 / d.Total)  ;
	};	
	var percentualAte_24 = function(d){
		return (d.ate_24 / d.Total)  ;
	};	
	var percentualAte_29 = function(d){
		return (d.ate_29 / d.Total) ;
	};
	var percentualAte_34 = function(d){
		return (d.ate_34 / d.Total) ;
	};
	var percentualAte_39 = function(d){
		return (d.ate_39 / d.Total) ;
	};
	var percentualMaisde_40 = function(d){
		return (d.maisde_40 / d.Total)  ;
	};
				
	/*fim group Cor-Raça*/				
	
function render_plots(){
		
	cidadeDim.filter(cidade);

	/* yearRingChart
        .width(200).height(200)
        .dimension(yearDim)
        .group(qtdPerYear)
		.minAngleForLabel(0.1)
        .drawPaths(true)
        .innerRadius(30);*/
		

		
	
	sexoLineChart
		.width(800).height(200)
		.margins({top: 25, right: 0, bottom: 30, left: 220})
		.dimension(yearDim)
			.group(masculinoGroup,"Masculino")
			.stack(femininoGroup,"Feminino")        
			.renderArea(true)
		.x(d3.time.scale().domain([2011,2012]))
			.elasticX(true)
			.brushOn(false)
			.legend(dc.legend().x(60).y(10).itemHeight(13).gap(5))
		.yAxisLabel("Matriculas por sexo/Ano") 
		.elasticY(true)
		;
						
		
	spenderRowChart
			.width(800)
			.height(422)
			.margins({top: 5, right: 0, bottom: 30, left: 220})
			.dimension(yearDim)
			.group(etapaPerYear, "EnsinoFundamental")	
			.valueAccessor(function(d) {
				return d.value.EnsinoFundamental;
			})
			.stack(etapaPerYear, "EnsinoMedio", function (d) {
				return d.value.EnsinoMedio;
			})
			.stack(etapaPerYear, "EducacaoProfissional", function (d) {
				return d.value.EducacaoProfissional;
			})      
			.x(d3.scale.ordinal())
			  .title(function(d) {
				  return d.key + '[' + this.layer + ']: ' + d.value[this.layer];
			  })
			.xUnits(dc.units.ordinal)
			.renderHorizontalGridLines(true)
			.centerBar(true)
			.elasticY(true)
			.brushOn(true)
			.legend(dc.legend().x(0).y(10))
			.xAxis().ticks(10).tickFormat(d3.format("d"));
			
	localizacaoRowChart
			.width(400)
			.height(422)
			.margins({top: 5, right: 0, bottom: 30, left: 120})
			.dimension(yearDim)
			.group(localizacaoPerYear, "Urbana")	
			.valueAccessor(function(d) {
				return d.value.Urbana;
			})
			.stack(localizacaoPerYear, "Rural", function (d) {
				return d.value.Rural;
			})   
			.x(d3.scale.ordinal())
			  .title(function(d) {
				  return d.key + '[' + this.layer + ']: ' + d.value[this.layer];
			  })
			.xUnits(dc.units.ordinal)
			.renderHorizontalGridLines(true)
			.centerBar(true)
			.elasticY(true)
			.brushOn(true)
			.legend(dc.legend().x(0).y(10))
			.xAxis().ticks(10).tickFormat(d3.format("d"));		

	/*inicio matriculados por cor caça*/	
	brancaChart
		.formatNumber(d3.format(".5%"))		
	    .valueAccessor(percentualBranca)
		.group(corRaca);

	amarelaChart
		.formatNumber(d3.format(".5%"))		
	    .valueAccessor(percentualAmarela)
		.group(corRaca);

	pretaChart
		.formatNumber(d3.format(".5%"))		
	    .valueAccessor(percentualPreta)
		.group(corRaca);

	pardaChart
		.formatNumber(d3.format(".5%"))		
	    .valueAccessor(percentualParda)
		.group(corRaca);

	indigenaChart
		.formatNumber(d3.format(".5%"))		
	    .valueAccessor(percentualIndigena)
		.group(corRaca);
		
	naoDeclaradaChart
		.formatNumber(d3.format(".5%"))		
	    .valueAccessor(percentualNaodeclarada)
		.group(corRaca);
	/*fim matriculados por cor caça*/			
		
	/*inicio matriculados por faixa etaria*/	

	chart15
		.formatNumber(d3.format(".5%"))		
	    .valueAccessor(percentualAte_3)
		.group(faixaEtaria);

	chart16
		.formatNumber(d3.format(".5%"))		
	    .valueAccessor(percentualAte_5)
		.group(faixaEtaria);
		
	chart17
		.formatNumber(d3.format(".5%"))		
	    .valueAccessor(percentualAte_10)
		.group(faixaEtaria);

	chart18
		.formatNumber(d3.format(".5%"))		
	    .valueAccessor(percentualAte_14)
		.group(faixaEtaria);
		
	chart19
		.formatNumber(d3.format(".5%"))		
	    .valueAccessor(percentualAte_17)
		.group(faixaEtaria);
		
	chart20
		.formatNumber(d3.format(".5%"))		
	    .valueAccessor(percentualAte_19)
		.group(faixaEtaria);

	chart21
		.formatNumber(d3.format(".5%"))		
	    .valueAccessor(percentualAte_24)
		.group(faixaEtaria);
		
	chart22
		.formatNumber(d3.format(".5%"))		
	    .valueAccessor(percentualAte_29)
		.group(faixaEtaria);		
		
	chart23
		.formatNumber(d3.format(".5%"))		
	    .valueAccessor(percentualAte_34)
		.group(faixaEtaria);		
		
	chart24
		.formatNumber(d3.format(".5%"))		
	    .valueAccessor(percentualAte_39)
		.group(faixaEtaria);	

	chart25
		.formatNumber(d3.format(".5%"))		
	    .valueAccessor(percentualMaisde_40)
		.group(faixaEtaria);		
	/*fim matriculados por faixa etaria*/			
		
		
		

	dc.renderAll();
	
	d3.select('#myDropDown').on('change', function(){     
		if (this.value == "null"){
			console.log("Voce deve selecionar uma cidade");
		}else{
			cidadeDim.filter(this.value);
			console.log(this.value);
			dc.redrawAll();    
			}
	});

}


render_plots();


});


 //////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////dependencia administrativa - BUBBLE CHART////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


// Various accessors that specify the four dimensions of data to visualize.
function x(d) { return d.income; }
function y(d) { return d.lifeExpectancy; }
function radius(d) { return d.population; }
function color(d) { return d.region; }
function key(d) { return d.name; }

//var correlato =  document.getElementById('correlato').offsetWidth;
// Chart dimensions.
var margin = {top: 19.5, right: 19.5, bottom: 19.5, left: 39.5},
    width = 800;
    height = (width/3) - margin.top - margin.bottom;

// Various scales. These domains make assumptions of data, naturally.
var xScale = d3.scale.linear().domain([58, 5]).range([0, width]),
    yScale = d3.scale.linear().domain([65, 80]).range([height, 0]),
    radiusScale = d3.scale.sqrt().domain([400000, 80749699]).range([5, 40]),
    colorScale = d3.scale.category10();
 
// The x & y axes.
var xAxis = d3.svg.axis().orient("bottom").scale(xScale).ticks(12, d3.format(",d")),
    yAxis = d3.svg.axis().scale(yScale).orient("left");

// Create the SVG container and set the origin.
var svg = d3.select("#chart-relat").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Add the x-axis.
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

// Add the y-axis.
svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

// Add an x-axis label.
svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height - 6)
    .text("");

// Add a y-axis label.
svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", 6)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("");

// Add the year label; the value is set on transition.
var label = svg.append("text")
    .attr("class", "year label")
    .attr("text-anchor", "end")
    .attr("y", height - 24)
    .attr("x", width)
    .text(2005);

function filterJSON(json, key, value) {
      var result = [];
      for (var indicator in json) {
        if (json[indicator][key] === value) {
          result.push(json[indicator]);
        }
      }
      return result;
    }
	
// Load the data.
d3.json(mun_json, function(nations) {
  
  filtered = filterJSON(nations, 'name', 'Distrito Federal');
  
  // A bisector since many nation's data is sparsely-defined.
  var bisect = d3.bisector(function(d) { return d[0]; });

  // Add a dot per nation. Initialize the data at 2005, and set the colors.
  var dot = svg.append("g")
      .attr("class", "dots")
    .selectAll(".dot")
      .data(interpolateData(2005))
    .enter().append("circle")
      .attr("class", "dot")
      .style("fill", function(d) { return colorScale(color(d)); })
      .call(position)
      .sort(order);

  // Add a title.
  dot.append("title")
      .text(function(d) { return "UF: " + d.name;}); 
	  //+ "\nExpectativa de vida: " + d.lifeExpectancy + "\nTaxa de mortalidade infantil(cada mil): " + d.income + "\nPopulação: " + d.population;});

  // Add an overlay for the year label.
  var box = label.node().getBBox();

  var overlay = svg.append("rect")
        .attr("class", "overlay")
        .attr("x", box.x)
        .attr("y", box.y)
        .attr("width", box.width)
        .attr("height", box.height)
        .on("mouseover", enableInteraction);

  // Start a transition that interpolates the data based on year.
  svg.transition()
      .duration(30000)
      .ease("linear")
      .tween("year", tweenYear)
      .each("end", enableInteraction);

  // Positions the dots based on data.
  function position(dot) {
    dot .attr("cx", function(d) { return xScale(x(d)); })
        .attr("cy", function(d) { return yScale(y(d)); })
        .attr("r", function(d) { return radiusScale(radius(d)); });
  }

  // Defines a sort order so that the smallest dots are drawn on top.
  function order(a, b) {
    return radius(b) - radius(a);
  }

  // After the transition finishes, you can mouseover to change the year.
  function enableInteraction() {
    var yearScale = d3.scale.linear()
        .domain([2005, 2015])
        .range([box.x + 10, box.x + box.width - 10])
        .clamp(true);

    // Cancel the current transition, if any.
    svg.transition().duration(0);

    overlay
        .on("mouseover", mouseover)
        .on("mouseout", mouseout)
        .on("mousemove", mousemove)
        .on("touchmove", mousemove);

    function mouseover() {
      label.classed("active", true);
    }

    function mouseout() {
      label.classed("active", false);
    }

    function mousemove() {
      displayYear(yearScale.invert(d3.mouse(this)[0]));
    }
  }

  // Tweens the entire chart by first tweening the year, and then the data.
  // For the interpolated data, the dots and label are redrawn.
  function tweenYear() {
    var year = d3.interpolateNumber(2005, 2015);
    return function(t) { displayYear(year(t)); };
  }

  // Updates the display to show the specified year.
  function displayYear(year) {
    dot.data(interpolateData(year), key).call(position).sort(order);
    label.text(Math.round(year))
	//dot.replace("title").text(function(d) { return "UF: " + name;});
	//+ "\nExpectativa de vida: " + lifeExpectancy + "\nTaxa de mortalidade infantil(cada mil): " + income + "\nPopulação: " + population;});
  }

  // Interpolates the dataset for the given (fractional) year.
  function interpolateData(year) {
    return filtered.map(function(d) {
      return {
        name: d.name,
        region: d.region,
        income: interpolateValues(d.income, year),
        population: interpolateValues(d.population, year),
        lifeExpectancy: interpolateValues(d.lifeExpectancy, year)
      };
    });
  }

  // Finds (and possibly interpolates) the value for the specified year.
  function interpolateValues(values, year) {
    var i = bisect.left(values, year, 0, values.length - 1),
        a = values[i];
    if (i > 0) {
      var b = values[i - 1],
          t = (year - a[0]) / (b[0] - a[0]);
      return a[1] * (1 - t) + b[1] * t;
    }
    return a[1];
  }
});