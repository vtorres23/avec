/*var  linechart = dc.barChart('#chart-01');
	periodoRingChart   = dc.pieChart("#chart-03"),
	masculinoChart = dc.numberDisplay("#chart-07"),	
	femininoChart = dc.numberDisplay("#chart-08"),	
	cesarioChart = dc.numberDisplay("#chart-09"),	
	

	brancaChart = dc.numberDisplay("#brancaChart"),	
	amarelaChart = dc.numberDisplay("#amarelaChart"),	
	pardaChart = dc.numberDisplay("#pardaChart"),	
	pretaChart = dc.numberDisplay("#pretaChart"),	
	indigenaChart = dc.numberDisplay("#indigenaChart"),	

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
	chart25 = dc.numberDisplay("#chart25"),	
	chart26 = dc.numberDisplay("#chart26"),	
	
	
	
	*/
	
/*	totalChart = dc.numberDisplay("#chart-06"),		
   

	lineChart1 = dc.compositeChart("#comparativo"),    
	*/
//	var chart01 = dc.geoChoroplethChart("#chart-01");		

    var numberFormat = d3.format(".2f");

    var usChart = dc.geoChoroplethChart("#chart27");
    var industryChart = dc.bubbleChart("#chart28");
    var roundChart = dc.bubbleChart("#chart29");
	
	//var mapa =  document.getElementById('mapa').offsetWidth -100;
	
	/*inicio dos graficos e arquivo de depositos*/
	/*d3.csv("../data/depositos_inpi_2016_atenovembro.csv", function (csv) {
	
	    var data = crossfilter(csv);

        var uf = data.dimension(function (d) {
            return d["uf"];
        });
        var stateRaisedSum = uf.group().reduceSum(function (d) {
            return d["total_geral"];
        });
		
	        d3.json("../data/brazil.json", function (statesJson) {
            chart01.width(mapa)
					 .projection(d3.geo.albers()
						  .center([-85,-8.4])
						  .parallels( [11.5,-38])
						  .scale(mapa*0.7)
						  .rotate([55, -3, -5])
						  .translate([mapa/2 - (mapa-(mapa/11.6)),mapa/2 -(mapa/4.6)]))
                    .height(mapa-300)
                    .dimension(uf)
                    .group(stateRaisedSum)
                    .colors([ "#4e4200", "#625300", "#766300", "#897400", "#9d8400", "#b19500", "#c4a500", "#d8b600"])
                    .colorDomain([0, 	60000])
                    .overlayGeoJson(statesJson.features, "state", function (d) {
                        return d.properties.name;
                    })
                    .title(function (d) {
                        return "UF: " + d.key + "\nTotal de depósitos: " + numberFormat(d.value ? d.value : 0)
                    });

            dc.renderAll();
        });
	});	*/
	/*fim dos graficos e arquivo de depositos*/
	
	
	var tablewidth =  document.getElementById('bigchart-05').offsetWidth;
	

	var mychart = dc.rowChart("#chart-04");
	d3.csv(inpi_personalidade, function(error, experiments) {

	  var ndx                 = crossfilter(experiments),
		  runDimension        = ndx.dimension(function(d) {return d.origem;}),
		  speedSumGroup       = runDimension.group().reduceSum(function(d) {return +d.total_geral;});

	
	var dataTableOptions = {
				"sWidth": tablewidth*.65,
				"bScrollCollapse": true,
				"bPaginate": true,
				"bJQueryUI": true,
                "lengthMenu": [[6], [7]],
                "retrieve": true,
                columnDefs: [
			        {
						"width": "15%",
                        "orderable": true,
						"orderData": [ 1, 1 ],
                        targets: 0,
                        data: function (d) { return d.origem;}
                    } ,
                    {
						"width": "20%",
                        "orderable": true,
						"orderData": [ 1, 1 ],
                        targets: 1,
                        data: function (d) { return d.personalidade;}
                    } ,
					{
						"width": "20%",
                        "orderable": true,
						"orderData": [ 1, 1 ],
                        targets: 2,
                        data: function (d) { return d.detalhe;}
                    } ,

                    {
						"width": "12.5%",
                        "orderable": false,
                        targets: 3,
                        data: function (d) { return d.patente_invencao + " ("+((d.patente_invencao/d.total_geral)*100).toFixed(2)+"%)" ; }
                    },
                    {
						"width": "12.5%",
                        "orderable": false,
                        targets: 4,
                        data: function (d) { return d.modelo_utilidade + " ("+((d.modelo_utilidade/d.total_geral)*100).toFixed(2)+"%)" }
                    },
                    {
						"width": "12.55%",
                        "orderable": false,
                        targets: 5,
                        data: function (d) { return d.certificado_adicao + " ("+((d.certificado_adicao/d.total_geral)*100).toFixed(2)+"%)" }
                    },
			        {
						"width": "7.5%",
                        "orderable": false,
                        targets: 6,
                        data: function (d) { return d.total_geral; }
                    }
                ]
            };
			

		
		//console.log(dataTableOptions);		
			$("#chart-05").css("width","80%");
            var datatable = $('#chart-05').dataTable(dataTableOptions);
				  				
            function RefreshTable() {
                dc.events.trigger(function () {
                    datatable.api()
                      .clear()					  
                      .rows.add(runDimension.top(12))
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
			
	var heightTable =  document.getElementById('chart-05_wrapper').offsetHeight;	

		  mychart
			  .width(768)
			  .height(heightTable)
			  .x(d3.scale.ordinal())
			  //.x(d3.scale.linear().domain([6,20]))
			  .elasticX(true)		  
			  .dimension(runDimension)
			  .group(speedSumGroup);
		  mychart.render();
		  
		  
	});

    d3.csv(indice, function (csv) {
        var data = crossfilter(csv);

        var states = data.dimension(function (d) {
            return d["economy"];
        });
        var stateRaisedSum = states.group().reduceSum(function (d) {
            return d["score_global"];
        });
        var rankGlobalSum = states.group().reduceSum(function (d) {
            return d["rank_global"];
        });			
		

        var industries = data.dimension(function (d) {
            return d["economy"];
        });
        var statsByIndustries = industries.group().reduce(
                function (p, v) {
                    p.amountRaised += +v["score_universidade"];
                    p.deals += +v["rank_universidade"];
                    return p;
                },
                function (p, v) {
                    p.amountRaised -= +v["score_universidade"];
                    //if (p.amountRaised < 0.001) p.amountRaised = 0; // do some clean up
                    p.deals -= +v["rank_universidade"];
                    return p;
                },
                function () {
                    return {amountRaised: 0, deals: 0}
                }
        );

        var rounds = data.dimension(function (d) {
            return d["economy"];
        });
        var statsByRounds = rounds.group().reduce(
                function (p, v) {
                    p.amountRaised += +v["score_patente"];
                    p.deals += +v["rank_patente"];
                    return p;
                },
                function (p, v) {
                    p.amountRaised -= +v["score_patente"];
                    p.deals -= +v["rank_patente"];
                    return p;
                },
                function () {
                    return {amountRaised: 0, deals: 0}
                }
        );

		var widthcomp =  document.getElementById('correlatos').offsetWidth;		
		
        
		d3.json(world_countries, function (statesJson) {
            usChart.width(widthcomp-20)
                    .height(widthcomp/2)
                    .dimension(states)
                    .group(rankGlobalSum)                    
					  .colors(["#fff5eb","#fee6ce","#fdd0a2","#fdae6b","#fd8d3c","#f16913","#d94801","#a63603","#7f2704","#ccc"])
                    .colorDomain([1, 100])
					.projection(d3.geo.mercator()
						.translate([widthcomp*.475, 350])
						.rotate([0,0])
						.scale(widthcomp*.175))
                    .overlayGeoJson(statesJson.features, "state", function (d) {
                        return d.properties.name;
                    })
                    .title(function (d) {
                        return "Pais: " + d.key + "\nRanking: " + numberFormat(d.value) ;
                    });

            industryChart.width(widthcomp/2)
                    .height(widthcomp/2)
                    .margins({top: 10, right: 50, bottom: 30, left: 60})
                    .dimension(industries)
                    .group(statsByIndustries)
                    .colors(d3.scale.category10())
                    .keyAccessor(function (p) {
                        return p.value.amountRaised;
                    })
                    .valueAccessor(function (p) {
                        return p.value.deals;
                    })
                    .radiusValueAccessor(function (p) {
                        return p.value.amountRaised;
                    })
                    .x(d3.scale.linear().domain([0, 30]))
                    .r(d3.scale.linear().domain([0, 30]))
                    .minRadiusWithLabel(0)
                    .elasticY(true)
                    .yAxisPadding(10)
                    .elasticX(true)
                    .xAxisPadding(10)
                    .maxBubbleRelativeSize(0.025)
                    .renderHorizontalGridLines(true)
                    .renderVerticalGridLines(true)
                    .renderLabel(true)
                    .renderTitle(true)
                    .title(function (p) {
                        return p.key
                                + "\n"
                                + "Score: " + numberFormat(p.value.amountRaised)
                                + "Posicao: " + numberFormat(p.value.deals);
                    });
            industryChart.yAxis().tickFormat(function (s) {
                return s + " º";
            });
            industryChart.xAxis().tickFormat(function (s) {
                return s + " pts";
            });

            roundChart.width(widthcomp/2)
                    .height(widthcomp/2)
                    .margins({top: 10, right: 50, bottom: 30, left: 60})
                    .dimension(rounds)
                    .group(statsByRounds)
                    .colors(d3.scale.category10())
                    .keyAccessor(function (p) {
                        return p.value.amountRaised;
                    })
                    .valueAccessor(function (p) {
                        return p.value.deals;
                    })
                    .radiusValueAccessor(function (p) {
                        return p.value.amountRaised;
                    })
                    .x(d3.scale.linear().domain([0, 30]))
                    .r(d3.scale.linear().domain([0, 30]))
                    .minRadiusWithLabel(0)
                    .elasticY(true)
                    .yAxisPadding(10)
                    .elasticX(true)
                    .xAxisPadding(10)
                    .maxBubbleRelativeSize(0.025)
                    .renderHorizontalGridLines(true)
                    .renderVerticalGridLines(true)
                    .renderLabel(true)
                    .renderTitle(true)
                    .title(function (p) {
                        return p.key
                                + "\n"
                                + "Score: " + numberFormat(p.value.amountRaised)
                                + "Posicao: " + numberFormat(p.value.deals);
                    });
            roundChart.yAxis().tickFormat(function (s) {
                return s + " º";
            });
            roundChart.xAxis().tickFormat(function (s) {
                return s + " pts";
            });

            dc.renderAll();
        });
    });
	
	
	var widthcomp =  document.getElementById('mapa2').offsetWidth;
	//var treemapHeight =  document.getElementById('treemap').offsetHeight;
	
	var margin = {top: 20, right: 0, bottom: 0, left: 0},
		treemapHeight =  (500 ) + (document.getElementById('treemap').offsetHeight);
	
	var text_string = "Uma fibra óptica feita inteiramente de hidrogel - um material elástico, parecido com uma borracha, e composto quase inteiramente por água - deverá se tornar o instrumento preferido em uma série de tecnologias médicas. As fibras ópticas já são largamente utilizadas em medicina, de exames e cirurgias, até as mais exploratórias técnicas optogenéticas, usadas, entre outras coisas, para controlar o cérebro com luz.   Mas o cérebro é mais parecido com uma gelatina, enquanto as fibras ópticas comuns são como vidro, muito rígidas, podendo danificar os tecidos cerebrais. [Com fibras] que atinjam a flexibilidade e a maciez do cérebro, poderemos oferecer estimulação e terapias mais eficazes a longo prazo, disse o professor Xuanhe Zhao, do MIT, nos EUA. Fibra óptica de hidrogel A fibra óptica de hidrogel é formada por um material central encapsulado por uma camada de proteção. O grande feito da equipe foi ajustar a composição dos dois materiais para que eles tivessem índices de refração bem distintos, o que é essencial para transmitir o máximo possível de luz - com índices similares, a luz que entra pelo núcleo simplesmente vaza pela proteção externa. Inserindo corantes ao longo da fibra, é possível detectar exatamente onde a fibra se dobra, o que é importante para a inserção do dispositivo no corpo humano, para monitorar os movimentos de próteses e implantes ou para acompanhar a recuperação de membros, afirmam os pesquisadores Uma microcâmera mais fina do que um fio de cabelo humano pode não apenas facilitar os exames médicos atuais, como também criar uma nova geração de exames mais precisos e menos invasivos. Timo Gissibl e seus colegas da Universidade de Stuttgart, na Alemanha, usaram uma técnica especial de microimpressão 3D - ou manufatura aditiva - para criar uma câmera totalmente funcional que não é maior do que um grão de sal. A técnica, que poderá ser aplicada a outros tipos de componentes ópticos, usa um laser para atingir pontos específicos de um polímero, construindo o sistema de lentes da microcâmera camada por camada. Como a microcâmera pode ser construída na ponta de uma fibra óptica, passa a ser possível criar uma nova geração de endoscópios ultrafinos.  grande vantagem da técnica é que ela permite a construção de sistemas com múltiplas lentes ou lentes com formatos especializados e mais próximos do ideal para cada aplicação, como paraboloides ou lentes asféricas - lentes cujo perfil não é uma parte de uma esfera ou cilindro. Em particular, sistemas ópticos com duas ou mais lentes podem ser construídos pela primeira vez com este método. Isto abre a porta para sistemas de correção de aberração e de imagens micro-ópticas com uma qualidade sem precedentes, dizem os pesquisadores.  câmera inteira tem apenas 125 micrômetros de diâmetro, podendo focar objetos a uma distância de até 3 milímetros. Os dados são enviados por uma fibra óptica de 1,7 metro de comprimento. Com essas dimensões, ela passa com folga pelo buraco de uma agulha de seringa, podendo gerar imagens de qualquer órgão do corpo humano - incluindo o cérebro. Além dos exames médicos, Gissibl afirma que a tecnologia poderá ser usada em sistemas de câmeras de segurança invisíveis aos usuários e em mini e microrrobôs. Uma cadeira de rodas que pode ser controlada por pequenos movimentos da face, da cabeça ou da íris foi desenvolvida por engenheiros eletricistas e de computação da Unicamp (Universidade Estadual de Campinas). A equipe já iniciou um projeto junto à FAPESP (Fundação de Amparo à Pesquisa do Estado de São Paulo) para tornar a tecnologia acessível e colocá-la no mercado em um prazo estimado em dois anos. Nosso objetivo é que o produto final custe no máximo o dobro de uma cadeira motorizada comum, dessas que são controladas por joystick e hoje custam em torno de R$ 7 mil, disse o professor Eleri Cardozo. A tecnologia deverá beneficiar pessoas com tetraplegia, vítimas de acidente vascular cerebral (AVC), portadores de esclerose lateral amiotrófica ou outras condições de saúde que impedem o movimento preciso das mãos. Juntando tecnologias O núcleo da automação da cadeira de rodas está em uma câmera 3D com a tecnologia RealSense, da Intel, que permite interagir com o computador por meio de expressões faciais ou movimentos corporais. O processamento é feito por um notebook. A câmera identifica mais de 70 pontos da face - em torno da boca, do nariz e dos olhos - e, a partir da movimentação desses pontos, é possível extrair comandos simples, como ir para frente, para trás, para a esquerda ou direita e, o mais importante, parar, explicou Cardozo. Pensando em pacientes com quadros ainda mais graves - que impedem até mesmo a movimentação facial - o grupo também trabalha em uma tecnologia de interface cérebro-computador que permite extrair sinais diretamente do cérebro, por meio de eletrodos externos, e transformá-los em comandos. O equipamento, no entanto, ainda não está embarcado na cadeira robotizada. A cadeira também foi equipada como uma antena wifi que permite a um cuidador dirigir o equipamento remotamente, pela internet. Essas interfaces exigem do usuário um nível de concentração que pode ser cansativo. Por isso, se houver necessidade, a qualquer momento outra pessoa pode assumir o comando da cadeira, contou Cardozo. Melhorando a automação O pesquisador Paulo Gurgel Pinheiro, por sua vez, pretende simplificar o sistema para que ele possa ser usado em qualquer cadeira de rodas motorizada e controlada por joystick. Para isso, ele pretende desenvolver um software e uma minigarra mecânica que será responsável por traduzir os comandos do software de leitura facial e controlar o joystick. Nossa ideia é que o usuário possa baixar o software que fará o processamento das expressões faciais em seu notebook. O computador ficará conectado a essa minigarra por meio de uma porta USB. Quando ele fizer as expressões-chave, como um beijo, um meio sorriso, franzir o nariz, inflar as bochechas ou levantar as sobrancelhas, o software manda o comando para a garra e essa movimenta o joystick. Dessa forma, não mexemos na estrutura da cadeira e ela não perde a garantia, explicou Pinheiro. O pesquisador estima que um protótipo do sistema, já batizado de Wheelie, estará pronto até o início de 2017. Músculo artificial pneumático Engenheiros japoneses criaram um novo tipo de exoesqueleto que dá suporte ao andar sem a necessidade de quaisquer dispositivos eletrônicos ou baterias.  equipamento, chamado UPS (Unplugged Powered Suit) funciona com base em um novo tipo de músculo artificial pneumático, chamado PGM (Pneumatic Gel Muscle). O exoesqueleto pode melhorar a qualidade de vida não apenas dos idosos e pacientes debilitados, mas também de pessoas saudáveis que gostam de atividades esportivas, que podem obter um impulso extra para aumentar a velocidade de suas corridas.Sem baterias O aparelho consiste em três partes: o atuador (músculo artificial), um compressor de ar para acionar o músculo artificial e os tubos de transmissão. Como a pressão do ar é baixa, o aparelho final ficou leve e flexível, sendo fácil de usar, sem provocar desconforto. A bomba de ar é acionada ao pisar, de forma que o próprio movimento da pessoa fornece a energia de atuação, dispensando as mais tradicionais baterias. O exoesqueleto cobre a articulação do quadril e a bomba é acionada na contralateral. Este arranjo permite apoiar o movimento da coxa na fase de balanço, explica o professor Yuichi Kurita, da Universidade de Hiroshima. Suporte ao movimento humano Segundo Kurita, há duas aplicações principais para o exoesqueleto, uma voltada para diminuir a atividade muscular durante a corrida e outra para aumentar a velocidade do andar ou correr. Numa e noutra função, as duas partes superiores do exoesqueleto devem ser reposicionadas conforme o músculo sobre o qual o aparelho deve agir. Só a bomba fica no calcanhar do pé do lado oposto ao músculo artificial - ou nos dois, em uma configuração completa. O exoesqueleto foi projetado para dar suporte ao movimento humano onde e quando necessário. Ele não contém quaisquer dispositivos pesados. Isso significa que nós podemos personalizar o exoesqueleto para necessidades específicas do usuário, tais como força muscular para atletas ou para reabilitação. No futuro, nós poderemos desenvolver roupas assistivas mais inteligentes, incluindo atuadores e sensores de vestir usando nossa técnica, disse o professor Kurita. Embora ainda sem data marcada, há expectativas de que o exoesqueleto possa chegar ao mercado, uma vez que a pesquisa está sendo feita em parceria com a empresa Daiya Industry, que construiu o protótipo. Pequenos robôs capazes de entrar no corpo humano e curar doenças ainda estão distantes da realidade. Mas a chance de você engolir uma cápsula robótica em um futuro próximo agora aumentou dramaticamente. Engenheiros da Universidade de Vanderbilt, nos EUA, lançaram em sistema de código aberto (open-source) o projeto - hardware e software - de uma pílula robótica. O objetivo é que equipes de pesquisa de todo o mundo não precisem mais começar do zero, concentrando esforços na funcionalidade das pílulas robóticas para aplicações específicas em saúde. Pílula open-source Os módulos de hardware lidam com a computação, comunicação sem fio, alimentação, detecção e atuação. Cada módulo foi projetado para ser facilmente interfaceado com tecnologias em desenvolvimento por outros grupos de pesquisa. No lado do software, a equipe usa o TinyOS, sistema operacional livre, para desenvolver rotinas reutilizáveis. Nós projetamos cápsulas customizadas - uma para o cólon, uma para o estômago e outra com um grampo para parar hemorragias - mas vimos que estávamos basicamente reutilizando os mesmos componentes, disse o professor Pietro Valdastri. É como montar blocos de Lego, você pode remontá-los para diferentes funções. Nós queremos oferecer às pessoas trabalhando nesse campo nossos blocos Lego para que elas montem suas próprias cápsulas, acrescentou. O kit completo das cápsulas robóticas foi disponibilizado na plataforma GitHub.  ";

      drawWordCloud(text_string);

      function drawWordCloud(text_string){
        var common = "a ,à,agora,ainda,alguém,algum,alguma,duas,r$,mil, tornar,algumas,alguns,ampla,amplas,dois,qualquer,onde, poderemos, podem,70,às, dá,cujo,amplo,amplos,ante,antes,ao,aos,após,aquela,aquelas,aquele,aqueles,aquilo,as,até,mais,através,cada,coisa,coisas,com,como,contra,contudo,da,daquele,daqueles,das,de,dela,delas,dele,deles,depois,dessa,dessas,desse,desses,desta,destas,deste,deste,destes,deve,devem,devendo,dever,deverá,deverão,deveria,deveriam,devia,deviam,disse,disso,disto,dito,diz,dizem,do,dos,e,é,e',ela,elas,ele,eles,em,enquanto,entre,era,essa,essas,esse,esses,esta,está,estamos,estão,estas,estava,estavam,estávamos,este,estes,estou,eu,fazendo,fazer,feita,feitas,feito,feitos,foi,for,foram,fosse,fossem,grande,grandes,há,isso,isto,já,la,la,lá,lhe,lhes,lo,mas,me,mesma,mesmas,mesmo,mesmos,meu,meus,minha,minhas,muita,muitas,muito,muitos,na,não,nas,nem,nenhum,nessa,nessas,nesta,nestas,ninguém,no,nos,nós,nossa,nossas,nosso,nossos,num,numa,nunca,o,os,ou,outra,outras,outro,outros,para,pela,pelas,pelo,pelos,pequena,pequenas,pequeno,pequenos,per,perante,pode,pôde,podendo,poder,poderia,poderiam,podia,podiam,pois,por,porém,porque,posso,pouca,poucas,pouco,poucos,primeiro,primeiros,própria,próprias,próprio,próprios,quais,qual,quando,quanto,quantos,que,quem,são,se,seja,sejam,sem,sempre,sendo,será,serão,seu,seus,si,sido,só,sob,sobre,sua,suas,talvez,também,tampouco,te,tem,tendo,tenha,ter,teu,teus,ti,tido,tinha,tinham,toda,todas,todavia,todo,todos,tu,tua,tuas,tudo,última,últimas,último,últimos,um,uma,umas,uns,vendo,ver,vez,vindo,vir,vos,vós,";

        var word_count = {};

        var words = text_string.split(/[ '\-\(\)\*":;\[\]|{},.!?]+/);
          if (words.length == 1){
            word_count[words[0]] = 1;
          } else {
            words.forEach(function(word){
              var word = word.toLowerCase();
              if (word != "" && common.indexOf(word)==-1 && word.length>1){
                if (word_count[word]){
                  word_count[word]++;
                } else {
                  word_count[word] = 1;
                }
              }
            })
          }

        var svg_location = "#chart-01";
        var width = widthcomp;
		//console.log(treemapHeight);
        var height = treemapHeight;
		//console.log(height);
        var fill = d3.scale.category20();

        var word_entries = d3.entries(word_count);

        var xScale = d3.scale.linear()
           .domain([0, d3.max(word_entries, function(d) {
              return d.value;
            })
           ])
           .range([10,100]);

        d3.layout.cloud().size([width, height])
          .timeInterval(20)
          .words(word_entries)
          .fontSize(function(d) { return xScale(+d.value); })
          .text(function(d) { return d.key; })
          .rotate(function() { return ~~(Math.random() * 2) * 90; })
          .font("Impact")
          .on("end", draw)
          .start();

        function draw(words) {
          d3.select(svg_location).append("svg")
              .attr("width", width)
              .attr("height", height)
            .append("g")
              .attr("transform", "translate(" + [width >> 1, height >> 1] + ")")
            .selectAll("text")
              .data(words)
            .enter().append("text")
              .style("font-size", function(d) { return xScale(d.value) + "px"; })
              .style("font-family", "Impact")
              .style("fill", function(d, i) { return fill(i); })
              .attr("text-anchor", "middle")
              .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
              })
              .text(function(d) { return d.key; });
        }

        d3.layout.cloud().stop();
      }
	  
  