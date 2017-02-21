var  linechart = dc.barChart('#chart-01');
	periodoRingChart   = dc.pieChart("#chart-03"),
    //spenderRowChart = dc.rowChart("#dc-depth-chart"),
	masculinoChart = dc.numberDisplay("#chart-07"),	
	femininoChart = dc.numberDisplay("#chart-08"),	
	cesarioChart = dc.numberDisplay("#chart-09"),	
	
	/*inicio declaracao graficos de cor_raça*/
	brancaChart = dc.numberDisplay("#brancaChart"),	
	amarelaChart = dc.numberDisplay("#amarelaChart"),	
	pardaChart = dc.numberDisplay("#pardaChart"),	
	pretaChart = dc.numberDisplay("#pretaChart"),	
	indigenaChart = dc.numberDisplay("#indigenaChart"),	
	/*fim declaracao graficos de cor_raça*/
	
	/*inicio declaracao graficos de peso ao nascer*/
	chart15 = dc.numberDisplay("#chart15"),	
	chart16 = dc.numberDisplay("#chart16"),	
	chart17 = dc.numberDisplay("#chart17"),	
	chart18 = dc.numberDisplay("#chart18"),	
	chart19 = dc.numberDisplay("#chart19"),	
	chart20 = dc.numberDisplay("#chart20"),	
	chart21 = dc.numberDisplay("#chart21"),	
	/*fim declaracao graficos de peso ao nascer*/

	/*inicio declaracao graficos de pre natal*/
	chart22 = dc.numberDisplay("#chart22"),	
	chart23 = dc.numberDisplay("#chart23"),	
	chart24 = dc.numberDisplay("#chart24"),	
	chart25 = dc.numberDisplay("#chart25"),	
	chart26 = dc.numberDisplay("#chart26"),	
	/*fim declaracao graficos de pre natal*/
	
	
	
	barmyChart = dc.barChart("#chart-04"),
	totalChart = dc.numberDisplay("#chart-06"),		
   // dataTable = dc.dataTable("#chart-05"),

	lineChart1 = dc.compositeChart("#comparativo"),    
	usChart = dc.geoChoroplethChart("#us-chart");		

var ndx;
var mundondx;

var mundo = d3.csv(Taxa_natalidade_brasil_mundo, function (data) {         
    mundondx = crossfilter(data);
	var all = mundondx.groupAll();

	var dimensaoAno = mundondx.dimension(function (d) { return d.b; });
	
	var brasilGroup = dimensaoAno.group().reduceSum(function (d) { return d.Brasil; });
	var mundoGroup = dimensaoAno.group().reduceSum(function (d) { return d.Mundo; });
	var widthcomp =  document.getElementById('comparativotitle').offsetWidth;
	
	lineChart1
	.width(widthcomp-20)
		.height(widthcomp/3)
		.margins({ top: 10, right: 10, bottom: 20, left: 40 })
		.dimension(dimensaoAno)
		.transitionDuration(500)
		//.elasticY(true)
		.brushOn(false)
		.valueAccessor(function (d) {
			return d.value;
		})
		.title(function (d) {
			return "\nTaxa de natalidade por mil habitantes: " + d.key;

		})
		.renderHorizontalGridLines(true)
		.renderVerticalGridLines(true)
		.x(d3.scale.linear().domain([2000, 2014]))
		.y(d3.scale.linear().domain([13, 25]))
		.legend(dc.legend().x(60).y(10).itemHeight(13).gap(5))
		.compose([
			dc.lineChart(lineChart1).group(mundoGroup, "Mundo")
				.colors('blue')
				.renderArea(true),
			dc.lineChart(lineChart1).group(brasilGroup, "Brasil")
				.colors('red')
				.renderArea(true),		
		]);

	dc.renderAll();
	
});

var oxe = d3.csv(nascidosvivosUF_novotestar, function (data) {         

 	
// "Grab the filters from the charts, set the filters on the charts to null,
// do your Crossfilter data removal, then add the filters back to the charts.
// The exact filter format is kind of screwy, and the fact that you have to put
// the output of .filters() in an array to make it work with .filter() is a bit strange."
function resetData(ndx, dimensions) {
    var periodoChartFilters = periodoRingChart.filters();
    var spenderChartFilters = spenderRowChart.filters();
	var barChartFilters = barmyChart.filters();
	var masculinoChartFilters = masculinoChart.filters();
	var femininoChartFilters = femininoChart.filters();
	var cesarioChartFilters = cesarioChart.filters();
	
	/*inicio filtros cor_raça*/
	var brancaChartFilters = brancaChart.filters();
	var amarelaChartFilters = amarelaChart.filters();
	var indigenaChartFilters = indigenaChart.filters();
	var pretaChartFilters = pretaChart.filters();
	var pardaChartFilters = pardaChart.filters();
	/*fim filtros cor_raça*/
	
	/*inicio filtros peso nascer*/
	var chart15Filters = chart15.filters();
	var chart16Filters = chart16.filters();
	var chart17Filters = chart17.filters();
	var chart18Filters = chart18.filters();
	var chart19Filters = chart19.filters();
	var chart20Filters = chart20.filters();
	var chart21Filters = chart21.filters();	
	/*fim filtros peso nascer*/

	/*inicio filtros pre natal*/
	var chart22Filters = chart22.filters();
	var chart23Filters = chart23.filters();
	var chart24Filters = chart24.filters();
	var chart25Filters = chart25.filters();
	var chart26Filters = chart26.filters();
	/*fim filtros pre natal*/	
	
	
	var totalChartFilters = totalChart.filters();
    periodoRingChart.filter(null);
    spenderRowChart.filter(null);
	barmyChart.filter(null);
	masculinoChart.filter(null);
	femininoChart.filter(null);
	cesarioChart.filter(null);
	
	/*inicio filtros cor_raça*/
	brancaChart.filter(null);
	amarelaChart.filter(null);	
	indigenaChart.filter(null);
	pretaChart.filter(null);
	pardaChart.filter(null);	
	/*fim filtros cor_raça*/
	
	/*inicio filtros peso_nascer*/
	chart15.filter(null);
	chart16.filter(null);	
	chart17.filter(null);
	chart19.filter(null);
	chart19.filter(null);
	chart20.filter(null);
	chart21.filter(null);	
	/*fim filtros peso_nascer*/	
	
	/*inicio filtros pre natal*/
	chart22.filter(null);
	chart23.filter(null);	
	chart24.filter(null);
	chart25.filter(null);
	chart26.filter(null);
	/*fim filtros pre natal*/	
		
	
	totalChart.filter(null);
	
    ndx.remove();
    periodoRingChart.filter([periodoChartFilters]);
    spenderRowChart.filter([spenderChartFilters]);
	barmyChart.filter([barChartFilters]);
	masculinoChart.filter([masculinoChartFilters]);
	femininoChart.filter([femininoChartFilters]);
	cesarioChart.filter([cesarioChartFilters]);
	totalChart.filter([totalChartFilters]);
	
	/*inicio filtros cor_raça*/
	brancaChart.filter([brancaChartFilters]);
	amarelaChart.filter([amarelaChartFilters]);
	indigenaChart.filter([indigenaChartFilters]);
	pretaChart.filter([pretaChartFilters]);
	pardaChart.filter([pardaChartFilters]);
	/*fim filtros cor_raça*/
	
	/*inicio filtros peso_nascer*/
	chart15.filter([chart15Filters]);
	chart16.filter([chart16Filters]);
	chart17.filter([chart17Filters]);
	chart18.filter([chart18Filters]);
	chart19.filter([chart19Filters]);
	chart20.filter([chart20Filters]);
	chart21.filter([chart21Filters]);	
	/*fim filtros peso_nascer*/	

	/*inicio filtros pre natal*/
	chart22.filter([chart22Filters]);
	chart23.filter([chart23Filters]);
	chart24.filter([chart24Filters]);
	chart25.filter([chart25Filters]);
	chart26.filter([chart26Filters]);
	/*fim filtros pre natal*/		

    console.log(spenderRowChart.filters());
}

// set crossfilter with first dataset
 ndx = crossfilter(data),
    periodoDim  = ndx.dimension(function(d) {return +d.b;}),
    regiaoDim  = ndx.dimension(function(d) {return d.a;}),
	ufDim = ndx.dimension(function(d) {return d.c;});

    spendPerperiodo = periodoDim.group().reduceSum(function(d) {return +d.i;}),
    spendPerregiao = regiaoDim.group().reduceSum(function(d) {return +d.i;}),
	totalAnual = periodoDim.group().reduceSum(function(d){return +d.i;});
	
	/**/
	
	var corRaca = periodoDim.groupAll().reduce(
						//add
						function(p, v) {							
							p.Branca += +v.ac;
							p.Amarela += +v.r;
							p.Preta += +v.z;
							p.Parda += +v.j;
							p.Indigena += +v.k;
							p.Total += +v.i;
							return p;
						},
						//remove
						function(p, v) {
							p.Branca -= +v.ac;
							p.Amarela -= +v.r;
							p.Preta -= +v.z;
							p.Parda -= +v.j;
							p.Indigena -= +v.k;
							p.Total -= +v.i;
							return p;
						},
						//init
						function() {
							return {Branca:0, Amarela:0,Preta:0,Parda:0,Indigena:0,Total:0};
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
				
	/**/	
	var sexoSomaAnual = periodoDim.groupAll().reduce(
						//add
						function(p, v) {
							p.Feminino += +v.l;
							p.Masculino += +v.m;
							p.Total += +v.i;
							return p;
						},
						//remove
						function(p, v) {
							p.Feminino -= +v.l;
							p.Masculino -= +v.m;
							p.Total -= +v.i;
							return p;
						},
						//init
						function() {
							return {Feminino:0, Masculino:0, Total:0};
						}
				);

	var pctFeminino = function(d){
		return (d.Feminino / d.Total) ;
	};
	var pctMasculino = function(d){
		return (d.Masculino / d.Total)  ;
	};		
	var vlrTotal = function(d){
		return (d.Total)  ;
	};			
				
	var tipodeParto = periodoDim.groupAll().reduce(
						//add
						function(p, v) {							
							p.Cesario += +v.f;
							p.Vaginal += +v.u;
							p.Ignorado += +v.s;
							p.Total += +v.i;
							return p;
						},
						//remove
						function(p, v) {
							p.Cesario -= +v.f;
							p.Vaginal -= +v.u;
							p.Ignorado -= +v.s;
							p.Total -= +v.i;
							return p;
						},
						//init
						function() {
							return {Cesario:0, Vaginal:0,Ignorado:0,Total:0};
						}
				);
	
	var percentualCesario = function(d){
		return (d.Cesario / d.Total)  ;
	};
	var percentualVaginal = function(d){
		return (d.Vaginal / d.Total) ;
	};
	var percentualIgnorado = function(d){
		return (d.Ignorado / d.Total) ;
	};
	var tipopartoTotal = function(d){
		return (d.Total) ;
	};
	
	var pesoaoNascer = periodoDim.groupAll().reduce(
						//add
						function(p, v) {							
							p.Peso_ao_nascer_Menosde500g += +v.ad;
							p.Peso_ao_nascer_500a999g += +v.q;
							p.Peso_ao_nascer_1000a1499g += +v.y;
							p.Peso_ao_nascer_1500a2499g += +v.g;
							p.Peso_ao_nascer_2500a2999g += +v.t;
							p.Peso_ao_nascer_3000a3999g += +v.e;
							p.Peso_ao_nascer_4000gemais += +v.aa;
							p.Peso_ao_nascer_Ignorado += +v.o;
							p.Peso_ao_nascer_Total += +v.i;
							return p;
						},
						//remove
						function(p, v) {
							p.Peso_ao_nascer_Menosde500g -= +v.ad;
							p.Peso_ao_nascer_500a999g -= +v.q;
							p.Peso_ao_nascer_1000a1499g -= +v.y;
							p.Peso_ao_nascer_1500a2499g -= +v.g;
							p.Peso_ao_nascer_2500a2999g -= +v.t;
							p.Peso_ao_nascer_3000a3999g -= +v.e;
							p.Peso_ao_nascer_4000gemais -= +v.aa;
							p.Peso_ao_nascer_Ignorado -= +v.o;
							p.Peso_ao_nascer_Total -= +v.i;
							return p;
						},
						//init
						function() {
							return {Peso_ao_nascer_Menosde500g:0, Peso_ao_nascer_500a999g:0,Peso_ao_nascer_1000a1499g:0,Peso_ao_nascer_1500a2499g:0,
									Peso_ao_nascer_2500a2999g:0, Peso_ao_nascer_3000a3999g:0,Peso_ao_nascer_4000gemais:0,
									Peso_ao_nascer_Ignorado:0,Peso_ao_nascer_Total:0};
						}
				);
	
	var percentualMenosde500g = function(d){
		return (d.Peso_ao_nascer_Menosde500g / d.Peso_ao_nascer_Total)  ;
	};
	var percentual500a999g = function(d){
		return (d.Peso_ao_nascer_500a999g / d.Peso_ao_nascer_Total) ;
	};
	var percentual1000a1499g = function(d){
		return (d.Peso_ao_nascer_1000a1499g / d.Peso_ao_nascer_Total) ;
	};
	var percentual1500a2499g = function(d){
		return (d.Peso_ao_nascer_1500a2499g / d.Peso_ao_nascer_Total)  ;
	};
	var percentual2500a2999g = function(d){
		return (d.Peso_ao_nascer_1500a2499g / d.Peso_ao_nascer_Total) ;
	};
	var percentual3000a3999g = function(d){
		return (d.Peso_ao_nascer_3000a3999g / d.Peso_ao_nascer_Total) ;
	};
	var percentual4000gemais = function(d){
		return (d.Peso_ao_nascer_4000gemais / d.Peso_ao_nascer_Total)  ;
	};
	var percentualIgnorado = function(d){
		return (d.Peso_ao_nascer_Ignorado / d.Peso_ao_nascer_Total) ;
	};
	var pesonascerTotal = function(d){
		return (d.Peso_ao_nascer_Total) ;
	};	

	var preNatal = periodoDim.groupAll().reduce(
						//add
						function(p, v) {							
							p.Consult_pre_natal_Nenhuma += +v.w;
							p.Consult_pre_natal_De1a3consultas += +v.ab;
							p.Consult_pre_natal_De4a6consultas += +v.n;
							p.Consult_pre_natal_7oumaisconsultas += +v.h;
							p.Consult_pre_natal_Ignorado += +v.x;							
							p.Consult_pre_natal_Total += +v.i;
							return p;
						},
						//remove
						function(p, v) {
							p.Consult_pre_natal_Nenhuma -= +v.w;
							p.Consult_pre_natal_De1a3consultas -= +v.ab;
							p.Consult_pre_natal_De4a6consultas -= +v.n;
							p.Consult_pre_natal_7oumaisconsultas -= +v.h;
							p.Consult_pre_natal_Ignorado -= +v.x;							
							p.Consult_pre_natal_Total -= +v.i;
							return p;
						},
						//init
						function() {
							return {Consult_pre_natal_Nenhuma:0, Consult_pre_natal_De1a3consultas:0,Consult_pre_natal_De4a6consultas:0,
							Consult_pre_natal_7oumaisconsultas:0,Consult_pre_natal_Ignorado:0,Consult_pre_natal_Total:0};
						}
				);

	var percentualNenhuma = function(d){
		return (d.Consult_pre_natal_Nenhuma / d.Consult_pre_natal_Total)  ;
	};
	var percentual1a3consultas = function(d){
		return (d.Consult_pre_natal_De1a3consultas / d.Consult_pre_natal_Total) ;
	};
	var percentual4a6consultas = function(d){
		return (d.Consult_pre_natal_De4a6consultas / d.Consult_pre_natal_Total) ;
	};
	var percentual7oumaisconsultas = function(d){
		return (d.Consult_pre_natal_7oumaisconsultas / d.Consult_pre_natal_Total) ;
	};
	var percentualnatalIgnorado = function(d){
		return (d.Consult_pre_natal_Ignorado / d.Consult_pre_natal_Total) ;
	};	
	var prenatalTotal = function(d){
		return (d.Consult_pre_natal_Total) ;
	};	

	var vaginalSomaAnual = periodoDim.group().reduce(
						//add
						function(p, v) {
							++p.count;
							p.vag = (v.u / v.i) * 100;
							p.ces = (v.f / v.i) * 100;
							p.ign = (v.s / v.i) * 100;
							return p;
						},
						//remove
						function(p, v) {
							--p.count;
							p.vag = (v.u / v.i) * 100;
							p.ces = (v.f / v.i) * 100;
							p.ign = (v.s / v.i) * 100;
							return p;
						},
						//init
						function() {
							return {count:0, vag:0, ces:0, ign:0};
						}
				);

	var tipoParto = periodoDim.groupAll().reduce(
						//add
						function(p, v) {							
							p.vaginal += +v.u;
							p.cesario += +v.f;
							p.ignorado += +v.s;
							p.total += +v.i;
							return p;
						},
						//remove
						function(p, v) {
							p.vaginal -= +v.u;
							p.cesario -= +v.f;
							p.ignorado -= +v.s;
							p.total -= +v.i;
							return p;
						},
						//init
						function() {
							return {vaginal:0, cesario:0, ignorado:0,
							total:0};
						}
				);
				
	var pctVaginal = function(d){
		return (d.vaginal / d.total) ;
	};
	var pctCesario = function(d){
		return (d.cesario / d.total) ;
	};
	var pctIgnorado = function(d){
		return (d.ignorado / d.total) ;
	};	
	
				/*
	var cesarioSomaAnual = periodoDim.group().reduce(
			//add
			function(p, v) {
				++p.count;
				p.percentageCesario = (v.f / v.i) * 100;
				return p;
			},
			//remove
			function(p, v) {
				--p.count;
				p.percentageCesario = (v.f / v.i) * 100;
				return p;
			},
			//init
			function() {
				return {count:0, percentageCesario:0};
			}
	);
	*//*
	var ignoradoSomaAnual = periodoDim.group().reduce(
			//add
			function(p, v) {
				++p.count;
				p.percentageIgnorado = (v.s / v.i) * 100;
				return p;
			},
			//remove
			function(p, v) {
				--p.count;
				p.percentageIgnorado = (v.s / v.i) * 100;
				return p;
			},
			//init
			function() {
				return {count:0, percentageIgnorado:0};
			}
	);

	var totalSomaAnual = regiaoDim.group().reduce(
			//add
			function(p, v) {
				++p.count;
				p.somaTotal =  v.i;
				return p;
			},
			//remove
			function(p, v) {
				--p.count;
				p.somaTotal =  v.i;
				return p;
			},
			//init
			function() {
				return {count:0, somaTotal:0};
			}
	);
*//*
		var cesarioSomaAnualRegiao = regiaoDim.group().reduce(
			//add
			function(p, v) {
				++p.count;
				p.percentageCesario = (v.f / v.i) * 100;
				return p;
			},
			//remove
			function(p, v) {
				--p.count;
				p.percentageCesario = (v.f / v.i) * 100;
				return p;
			},
			//init
			function() {
				return {count:0, percentageCesario:0};
			}
	);
*/

	var w =  document.getElementById('chart-stage03').offsetWidth;
	var z =  document.getElementById('chart-stage04').offsetWidth;
	var h =  document.getElementById('chart-stage04').offsetHeight;
	var mapa =  document.getElementById('mapa').offsetWidth;
				
function render_plots(){


	
linechart
    .width(580)
	.colors('#9C9C9C')
    .height(mapa-15)
	.margins({ top: 10, right: 40 , bottom: 20, left: 100 })
	.yAxisLabel('qtd. nascimentos')
    .dimension(periodoDim)
    .group(spendPerperiodo)
    .x(d3.scale.linear().domain([1999,2016]))
    .elasticY(true)
    .controlsUseVisibility(true);

		  
    periodoRingChart
        .width(w-15).height(mapa-30)
		//.margins({top: 20, right: 20, bottom: 20, left: 20})
        .dimension(regiaoDim)
        .group(spendPerregiao)
		.minAngleForLabel(0.1)
		.externalLabels(4)
        .externalRadiusPadding(20)
        .drawPaths(true)
		//.legend(dc.legend().x(w-120).y(0).gap(5))
        .innerRadius(30);
		
	 // example of formatting the legend via svg
      // http://stackoverflow.com/questions/38430632/how-can-we-add-legends-value-beside-of-legend-with-proper-alignment
      periodoRingChart.on('pretransition', function(periodoRingChart) {
          periodoRingChart.selectAll('.dc-legend-item text')
              .text('')
            .append('tspan')
              .text(function(d) { return d.a; })
            .append('tspan')
              .attr('x', 50)
              .attr('text-anchor', 'end')
              .text(function(d) { return d.data; });
      });
      periodoRingChart.render();	

       var states = ndx.dimension(function (d) {
            return d["c"];
        });
        var stateRaisedSum = states.group().reduceSum(function (d) {
            return d["i"];
        });
		
		var numberFormat = d3.format(".2f");
		
        d3.json(brazil_json, function (statesJson) {
            usChart.width(mapa)
					 .projection(d3.geo.albers()
						  .center([-54,-8.4])
						  .parallels( [11.5,-38])
						  .scale(mapa)
						  .rotate([55, -3, -5])
						  .translate([mapa/2 - (mapa-(mapa/11.6)),mapa/2 -(mapa/4.6)]))
                    .height(mapa-70)
                    .dimension(states)
                    .group(stateRaisedSum)
                    .colors([ "#4e4200", "#625300", "#766300", "#897400", "#9d8400", "#b19500", "#c4a500", "#d8b600"])
                    .colorDomain([-5, 	4000000])
                    .overlayGeoJson(statesJson.features, "state", function (d) {
                        return d.properties.name;
                    })
                    .title(function (d) {
                        return "UF: " + d.key + "\nTotal de  nascidos: " + numberFormat(d.value ? d.value : 0) + "M";
                    });

            dc.renderAll();
        });

  	
	/**/	
	brancaChart
		.formatNumber(d3.format(".2%"))		
	    .valueAccessor(percentualBranca)
		.group(corRaca);

	amarelaChart
		.formatNumber(d3.format(".2%"))		
	    .valueAccessor(percentualAmarela)
		.group(corRaca);

	pretaChart
		.formatNumber(d3.format(".2%"))		
	    .valueAccessor(percentualPreta)
		.group(corRaca);

	pardaChart
		.formatNumber(d3.format(".2%"))		
	    .valueAccessor(percentualParda)
		.group(corRaca);

	indigenaChart
		.formatNumber(d3.format(".2%"))		
	    .valueAccessor(percentualIndigena)
		.group(corRaca);	/**/	
		
	/**/	

 	/*inicio charts peso ao nascer*/
	chart15
		.formatNumber(d3.format(".2%"))		
	    .valueAccessor(percentualMenosde500g)
		.group(pesoaoNascer);

	chart16
		.formatNumber(d3.format(".2%"))		
	    .valueAccessor(percentual500a999g)
		.group(pesoaoNascer);

	chart17
		.formatNumber(d3.format(".2%"))		
	    .valueAccessor(percentual1000a1499g)
		.group(pesoaoNascer);

	chart18
		.formatNumber(d3.format(".2%"))		
	    .valueAccessor(percentual1500a2499g)
		.group(pesoaoNascer);

	chart19
		.formatNumber(d3.format(".2%"))		
	    .valueAccessor(percentual2500a2999g)
		.group(pesoaoNascer);
		
	chart20
		.formatNumber(d3.format(".2%"))		
	    .valueAccessor(percentual3000a3999g)
		.group(pesoaoNascer);

	chart21
		.formatNumber(d3.format(".2%"))		
	    .valueAccessor(percentual4000gemais)
		.group(pesoaoNascer);
		/*fim charts peso ao nascer*/		
		
 	   		
	/*inicio charts pre natal*/	
	chart22
		.formatNumber(d3.format(".2%"))		
	    .valueAccessor(percentualNenhuma)
		.group(preNatal);

	chart23
		.formatNumber(d3.format(".2%"))		
	    .valueAccessor(percentual1a3consultas)
		.group(preNatal);

	chart24
		.formatNumber(d3.format(".2%"))		
	    .valueAccessor(percentual4a6consultas)
		.group(preNatal);
		
	chart25
		.formatNumber(d3.format(".2%"))		
	    .valueAccessor(percentual7oumaisconsultas)
		.group(preNatal);

	chart26
		.formatNumber(d3.format(".2%"))		
	    .valueAccessor(percentualnatalIgnorado)
		.group(preNatal);
		/*fim charts pre natal*/	
	
	cesarioChart
		.formatNumber(d3.format(".2%"))		
	    .valueAccessor(percentualCesario)
		.group(tipodeParto);	

	masculinoChart
		.formatNumber(d3.format(".2%"))		
	    .valueAccessor(pctMasculino)
		.group(sexoSomaAnual);	

	femininoChart
		.formatNumber(d3.format(".2%"))		
	    .valueAccessor(pctFeminino)
		.group(sexoSomaAnual);	
		
	totalChart
		.formatNumber(d3.format(".3s"))		
	    .valueAccessor(vlrTotal)
		.group(sexoSomaAnual);	


	barmyChart
		.width(z*0.9)
		.height(422)
		.margins({top: 5, right: 0, bottom: 30, left: 80})
		.dimension(periodoDim)
		.group(vaginalSomaAnual, "Vaginal")	
		.valueAccessor(function(d) {
			return d.value.vag;
		})
		.stack(vaginalSomaAnual, "Cesario", function (d) {
            return d.value.ces;
        })
		.stack(vaginalSomaAnual, "Ignorado", function (d) {
            return d.value.ign;
        })
        .x(d3.scale.linear().domain([1994, 2014]))
		.x(d3.scale.ordinal())
		.xUnits(dc.units.ordinal)
		.renderHorizontalGridLines(true)
		.centerBar(true)
		.elasticY(true)
		.brushOn(true)
		.legend(dc.legend().x(0).y(10))
		.xAxis().ticks(10).tickFormat(d3.format("d"));					
		
		
	var dataTableOptions = {
                "lengthMenu": [[10], [25]],
                "retrieve": true,
                columnDefs: [
                    {
                        "orderable": true,
						"orderData": [ 1, 1 ],
                        targets: 0,
                        data: function (d) { return d.b;  }
                    } ,
					      /*function(d) { return d.Vaginal + " ("+Math.round((d.Vaginal/d.Total)*100)+"%)"; },
      function(d) { return d.Cesario + " ("+Math.round((d.Cesario/d.Total)*100)+"%)"; },
      function(d) { return d.Ignorado + " ("+Math.round((d.Ignorado/d.Total)*100)+"%)"; },	  */
				   {
                        "orderable": true,
                        targets: 1,
                        data: function (d) { return d.d; }
                    },

                    {
                        "orderable": false,
                        targets: 2,
                        data: function (d) { return d.u + " ("+((d.u/d.i)*100).toFixed(2)+"%)" ; }
                    },
                    {
                        "orderable": false,
                        targets: 3,
                        data: function (d) { return d.f + " ("+((d.f/d.i)*100).toFixed(2)+"%)" }
                    },
                    {
                        "orderable": false,
                        targets: 4,
                        data: function (d) { return d.s + " ("+((d.s/d.i)*100).toFixed(2)+"%)" }
                    },
			        {
                        "orderable": false,
                        targets: 5,
                        data: function (d) { return d.i; }
                    }
                ]
            };

            var datatable = $('#chart-05').dataTable(dataTableOptions);
		
			
            function RefreshTable() {
                dc.events.trigger(function () {
                    datatable.api()
                      .clear()
                      .rows.add(periodoDim.top(5598))
                      .draw();
                });
            }
            for (var i = 0; i < dc.chartRegistry.list().length; i++) {
                var chartI = dc.chartRegistry.list()[i];
                chartI.on("filtered", RefreshTable);
            }

            //Jquery DT

            window.filter = function (filters) {
                filters.forEach(function (d, i) { charts[i].filter(d); });
                renderAll();
            };

            window.reset = function (i) {
                charts[i].filter(null);
                renderAll();
            };

			
			
            RefreshTable();	
	
	
	var relat =  document.getElementById('char-relatstage').offsetWidth;
			
    dc.renderAll();
}

render_plots();

  
  
});


//////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////INDICADORES SOCIAIS - BUBBLE CHART////////////////////////
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
    width = document.getElementById('correlatos').offsetWidth - (document.getElementById('correlatos').offsetWidth*0.05);
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
    .text("Taxa de mortalidade infantil(a cada mil)");

// Add a y-axis label.
svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", 6)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Expectativa de vida");

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
d3.json(uf_json, function(nations) {
  
  filtered = filterJSON(nations);
  
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



 
/*
regiao: a
Ano: b
Uf: c
desc_municipio: d
Peso_ao_nascer_3000a3999g: e
Cesario: f
Peso_ao_nascer_1500a2499g: g
Consult_pre_natal_7oumaisconsultas: h
Total: i
Cor_raca_Parda: j
Cor_raca_Indigena: k
Sexo_Fem: l
Sexo_Masc: m
Consult_pre_natal_De4a6consultas: n
Peso_ao_nascer_Ignorado: o
Sexo_Ign: p
Peso_ao_nascer_500a999g: q
Cor_raca_Amarela: r
Ignorado: s
Peso_ao_nascer_2500a2999g: t
Vaginal: u
Cor_raca_Ignorado: v
Consult_pre_natal_Ignorado: x
Cor_raca_Preta: z
Peso_ao_nascer_1000a1499g: y
Consult_pre_natal_Nenhuma: w
Peso_ao_nascer_4000gemais: aa
Consult_pre_natal_De1a3consultas: ab
Cor_raca_Branca: ac
Peso_ao_nascer_Menosde500g: ad
*/