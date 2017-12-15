function createUseCaseView(state) {
	console.log("createUseCaseView state: ", state);
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	if (state) {
		
		function createContents(step) {
			
			if (step.useCase) {
				
				if (step.useCase instanceof Array) {
					
					var useCaseArray = step.useCase;
					
					useCaseArray.forEach(function(useCase) {
						
						var tempStep = jQuery.extend({}, step);
						tempStep.useCase = useCase;
						var pos = {
								x : (tempStep.link.x1 + tempStep.useCase.link.x),
								y : (tempStep.link.y1 + tempStep.useCase.link.y)
							};
							var cCanvas = flowCanvas
									.append("g")
									.attr("class", "useCases")
									.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
							var useCaseImage = cCanvas.append("image").attr("width", "40px")
									.attr("height", "40px").attr("x", 0).attr("y", 0).attr(
											"xlink:href",
											getUseCaseAttributes(tempStep.useCase.name).image)
									.style("cursor", "pointer");

							useCaseImage.on("click", function() {
								createUseCaseOptionMenu(tempStep);
							});
						
					});
				}
				else {
					
					var pos = {
							x : (step.link.x1 + step.useCase.link.x),
							y : (step.link.y1 + step.useCase.link.y)
						};
						var cCanvas = flowCanvas
								.append("g")
								.attr("class", "useCases")
								.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
						var useCaseImage = cCanvas.append("image").attr("width", "40px")
								.attr("height", "40px").attr("x", 0).attr("y", 0).attr(
										"xlink:href",
										getUseCaseAttributes(step.useCase.name).image)
								.style("cursor", "pointer");

						useCaseImage.on("click", function() {
							createUseCaseOptionMenu(step);
						});
				}
			}
		}

		var crumbs = bCrumbs();
		var model = crumbs[crumbs.length - 1].model;

		$.each(model.p2pObject, function(p, step) {			
			
			if (step.useCase) {
				
				createContents(step);
			}
			
			if (step.linked) {
				$.each(step.linked, function(l, linkObj) {
					linkObj.p2pObject[0].startPos = {
						x : step.link.x1,
						y : step.link.y1
					};
					linkObj.p2pObject[0].linkStart = true;
					linkObj.p2pObject = generateProgressiveLinkPosition(
							linkObj.p2pObject, linkObj.stepName, {
								x : step.link.x1,
								y : step.link.y1
							}, linkObj.flowDir);

					$.each(linkObj.p2pObject, function(p, linkedStep) {
						if (linkedStep.useCase) {
							createContents(linkedStep);
						}
						
						if (linkedStep.levels) {
							linkedStep.levels.forEach(function(level) {									
								if (level.p2pObject[1].useCase) {								
									createContents(level.p2pObject[1]);
								}
							});
						}
					});
				})
			}			
			if (step.levels) {				
				step.levels.forEach(function(level) {
					level.p2pObject.forEach(function(p2pObject) {
						if (p2pObject.useCase) {
							createContents(p2pObject);
						}
					});					
				});
			}
		});
	} else {
		flowCanvas.selectAll("defs#gradient").remove();
		flowCanvas.selectAll("g.useCases").remove();
		flowCanvas.selectAll("g.useCaseOptions").remove();
		flowCanvas.selectAll("g.useCaseExtended").remove();
	}
}

// ------------------------------ Deployments View --------------------------//

function createDeploymentsView(state) {
	console.log("createDeploymentsView state: ", state);
		var mapContainer = d3.select("div#mapContainer");
		var svg = mapContainer.select("svg");
		var flowCanvas = svg.select("g#flowCanvas");

		if (state) {

			function createContents(step) {
				
				if (step.deploymentsCase) {
					
					if (step.deploymentsCase instanceof Array) {
						
						var useCaseArray = step.deploymentsCase;
						
						useCaseArray.forEach(function(useCase) {
							
							var tempStep = jQuery.extend({}, step);
							tempStep.deploymentsCase = useCase;
							var pos = {
								x : (step.link.x1 + step.deploymentsCase.link.x),
								y : (step.link.y1 + step.deploymentsCase.link.y)
							};
							var cCanvas = flowCanvas
									.append("g")
									.attr("class", "deploymentsCases")
									.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
							var deploymentsCaseImage = cCanvas.append("image").attr("width", "40px")
									.attr("height", "40px").attr("x", 0).attr("y", 0).attr(
											"xlink:href",
											getUseCaseAttributes(step.deploymentsCase.name).image)
									.style("cursor", "pointer");
			
							deploymentsCaseImage.on("click", function() {
								createDeploymentsCaseOptionMenu(step);
							});
						});
					}
					else {						
						var pos = {
								x : (step.link.x1 + step.deploymentsCase.link.x),
								y : (step.link.y1 + step.deploymentsCase.link.y)
							};
							var cCanvas = flowCanvas
									.append("g")
									.attr("class", "deploymentsCases")
									.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
							var deploymentsCaseImage = cCanvas.append("image").attr("width", "40px")
									.attr("height", "40px").attr("x", 0).attr("y", 0).attr(
											"xlink:href",
											getUseCaseAttributes(step.deploymentsCase.name).image)
									.style("cursor", "pointer");
			
							deploymentsCaseImage.on("click", function() {
								createDeploymentsCaseOptionMenu(step);
							});
					}
				}
			}

			var crumbs = bCrumbs();
			var model = crumbs[crumbs.length - 1].model;

			$.each(model.p2pObject, function(p, step) {			
				if (step.deploymentsCase) {
					createContents(step);
				}
				if (step.linked) {
					$.each(step.linked, function(l, linkObj) {
						linkObj.p2pObject[0].startPos = {
							x : step.link.x1,
							y : step.link.y1
						};
						linkObj.p2pObject[0].linkStart = true;
						linkObj.p2pObject = generateProgressiveLinkPosition(
								linkObj.p2pObject, linkObj.stepName, {
									x : step.link.x1,
									y : step.link.y1
								}, linkObj.flowDir);

						$.each(linkObj.p2pObject, function(p, linkedStep) {
							if (linkedStep.deploymentsCase) {
								createContents(linkedStep);
							}						
							if (linkedStep.levels) {
								
								linkedStep.levels.forEach(function(level) {									
									if (level.p2pObject[1].deploymentsCase) {
										createContents(level.p2pObject[1]);
									}
								});
							}		
						});					
					})
				}			
				if (step.levels) {					
					step.levels.forEach(function(level) {	
						level.p2pObject.forEach(function(p2pObject) {
								if (p2pObject.deploymentsCase) {
									createContents(p2pObject);
								}
						});		
					});			
				}				
			});
		} else {
			flowCanvas.selectAll("defs#gradient").remove();
			flowCanvas.selectAll("g.deploymentsCases").remove();
			flowCanvas.selectAll("g.useCaseOptions").remove();
			flowCanvas.selectAll("g.useCaseExtended").remove();
		}
	}

// --------------------- End of Deployments View -------------------------//


function createUseCaseOptionMenu(step) {
	switch (step.useCase.name) {
	case "Amelia":
		createAmeliaUseCaseOptions(step);
		break;
	case "ProcureToPayPO":
		ProcureToPayPO(step);
		break;
	case "QuoteToCashPO":
		QuoteToCashPO(step);
		break;
	case "ITDesignToBuildPO":
		ITDesignToBuildPO(step);
		break;
	case "TalentPlanningAcquisitionPO":
		TalentPlanningAcquisitionPO(step);
		break;
	case "HireToRetirePO":
		HireToRetirePO(step);
		break;
	case "PlanToForecastPO":
		PlanToForecastPO(step);
		break;
	case "RecordToReportPO":
		RecordToReportPO(step);
		break;
	case "ProcureToPay6":
		ProcureToPay6(step);
		break;
	case "ProcureToPay41":
		ProcureToPay41(step);
		break;
	case "ProcureToPay511U":
		ProcureToPay511U(step);
		break;
	case "ProcureToPay52U":
		ProcureToPay52U(step);
		break;
	case "PlanToForecast2":
		PlanToForecast2(step);
		break;	
	case "PlanToForecast22U":
		PlanToForecast22U(step);
		break;	
	case "PlanToForecast6":
		PlanToForecast6(step);
		break;	
	case "PlanToDelivery12":
		PlanToDelivery12(step);
		break;	
	case "PlanToDelivery21":
		PlanToDelivery21(step);
		break;
	case "PlanToDelivery32":
		PlanToDelivery32(step);
		break;	
	case "PlanToDelivery72":
		PlanToDelivery72(step);
		break;	
	case "ITStrategyToArchitecture2U":
		ITStrategyToArchitecture2U(step);
		break;	
	case "QuoteToCash42U":
		QuoteToCash42U(step);
		break;	
	case "QuoteToCash51U":
		QuoteToCash51U(step);
		break;	
	case "QuoteToCash72U":
		QuoteToCash72U(step);
		break;	
	case "QuoteToCash2U":
		QuoteToCash2U(step);
		break;
	case "QuoteToCash1":
		QuoteToCash1(step);
		break;
	case "ItTransitionToOperationCI31U":
		ItTransitionToOperationCI31U(step);
		break;
	case "ItTransitionToOperationCI2UAmelia":
		ItTransitionToOperationCI2UAmelia(step);
		break;
	case "ItTransitionToOperationCI2U":
		ItTransitionToOperationCI2U(step);
		break;
	case "ItTransitionToOperationCI4":
		ItTransitionToOperationCI4(step);
		break;
	case "NewProductDevelopment31":
		NewProductDevelopment31(step);
		break;
	case "ProductLineManagement2":
		ProductLineManagement2(step);
		break;
	case "ProductLineManagement42":
		ProductLineManagement42(step);
		break;
	case "RecordToReport6":
		RecordToReport6(step);
		break;
	case "RecordToReport7U":
		RecordToReport7U(step);
		break;
	case "RecordToReport8":
		RecordToReport8(step);
		break;
	case "RecordToReport31":
		RecordToReport31(step);
		break;
	case "ProcureToPay22B":
		ProcureToPay22B(step);
		break;
	case "ProcureToPay5B":
		ProcureToPay5B(step);
		break;
	case "ProcureToPay31B":
		ProcureToPay31B(step);
		break;
	case "ProcureToPay11B":
		ProcureToPay11B(step);
		break;
	case "QuoteToCash21B":
		QuoteToCash21B(step);
		break;
	case "QuoteToCash42B":
		QuoteToCash42B(step);
		break;
	case "QuoteToCash31B":
		QuoteToCash31B(step);
		break;
	case "ItTransitionToOperationCI3B":
		ItTransitionToOperationCI3B(step);
		break;
	case "ItTransitionToOperationCI42B":
		ItTransitionToOperationCI42B(step);
		break;
	case "ITStrategyToArchitecture21B":
		ITStrategyToArchitecture21B(step);
		break;
	case "ItTransitionToOperationCI21":
		ItTransitionToOperationCI21(step);
		break;
	case "AssetAcquireToRetire41B":
		AssetAcquireToRetire41B(step);
		break;
	case "AssetAcquireToRetire21B":
		AssetAcquireToRetire21B(step);
		break;
	case "HireToRetire41B":
		HireToRetire41B(step);
		break;
	case "HireToRetire71B":
		HireToRetire71B(step);
		break;
	case "NewProductDevelopment21B":
		NewProductDevelopment21B(step);
		break;
	case "InnovateToCommercialization21B":
		InnovateToCommercialization21B(step);
		break;
	case "InnovateToCommercialization31B":
		InnovateToCommercialization31B(step);
		break;
	case "InnovateToCommercialization32B":
		InnovateToCommercialization32B(step);
		break;
	case "ProductLineManagement31":
		ProductLineManagement31(step);
		break;
	case "PlanToForecast71B":
		PlanToForecast71B(step);
		break;
	case "RecordToReport52B":
		RecordToReport52B(step);
		break;
	case "RecordToReport62B":
		RecordToReport62B(step);
		break;
	case "PlanToDelivery21B":
		PlanToDelivery21B(step);
		break;
	case "PlanToDelivery61B":
		PlanToDelivery61B(step);
		break;
	case "PlanToDelivery11B":
		PlanToDelivery11B(step);
		break;
	case "PlanToDelivery7B":
		PlanToDelivery7B(step);
		break;
	case "PlanToDelivery6B":
		PlanToDelivery6B(step);
		break;
	case "PlanToDelivery13B":
		PlanToDelivery13B(step);
		break;
	case "ProductLineManagement31B":
		ProductLineManagement31B(step);
		break;
		}
}

function createDeploymentsCaseOptionMenu(step) {	
	switch (step.deploymentsCase.name) {
	case "Amelia":
		createAmeliaDeploymentsCaseOptions(step);
		break;
	case "ProcureToPay22":
		ProcureToPay22(step);
		break;
	case "ProcureToPay511":
		ProcureToPay511(step);
		break;
	case "ProcureToPay52":
		ProcureToPay52(step);
		break;
	case "ProcureToPay61":
		ProcureToPay61(step);
		break;
	case "PlanToForecast22":
		PlanToForecast22(step);
		break;
	case "PlanToForecast53":
		PlanToForecast53(step);
		break;	
	case "PlanToForecast62":
		PlanToForecast62(step);
		break;	
	case "PlanToDelivery7":
		PlanToDelivery7(step);
		break;	
	case "ITStrategyToArchitecture2":
		ITStrategyToArchitecture2(step);
		break;	
	case "QuoteToCash2":
		QuoteToCash2(step);
		break;	
	case "QuoteToCash42":
		QuoteToCash42(step);
		break;	
	case "QuoteToCash61":
		QuoteToCash61(step);
		break;	
	case "QuoteToCash51":
		QuoteToCash51(step);
		break;	
	case "QuoteToCash72":
		QuoteToCash72(step);
		break;
	case "ItTransitionToOperationCI21":
		ItTransitionToOperationCI21(step);
		break;
	case "ItTransitionToOperationCI31":
		ItTransitionToOperationCI31(step);
		break;
	case "ItTransitionToOperationCI3":
		ItTransitionToOperationCI3(step);
		break;
	case "HireToRetire31":
		HireToRetire31(step);
		break;
	case "NewProductDevelopment43":
		NewProductDevelopment43(step);
		break;
	case "ProductLineManagement4":
		ProductLineManagement4(step);
		break;
	case "ProductLineManagement21":
		ProductLineManagement21(step);
		break;
	case "ProductLineManagement3":
		ProductLineManagement3(step);
		break;
	case "RecordToReport2":
		RecordToReport2(step);
		break;
	case "RecordToReport7":
		RecordToReport7(step);
		break;
	}
}

function createAmeliaUseCaseOptions(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var gradient = svg.append("defs").append("linearGradient").attr("id",
	"gradient").attr("x1", "0%").attr("y1", "0%")
	.attr("x2", "100%").attr("y2", "100%").attr("spreadMethod",
			"pad");

gradient.append("stop").attr("offset", "0%").attr("stop-color", "#eee")
	.attr("stop-opacity", 1);

gradient.append("stop").attr("offset", "100%").attr("stop-color",
	"#ddd").attr("stop-opacity", 1);

	var pos = {
			x : (step.link.x1 + step.useCase.link.x -150),
			y : (step.link.y1 + step.useCase.link.y -50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "250px").attr("height", "250px")
	.style("fill", "url(#gradient)").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("Click a Use Case to Learn More").style("fill", "#276134").style("font-weight", "600").style("font-style", "italic").attr("x",0).attr("y", 20).style("text-anchor", "middle").style("font-size", "12px");
	wrapG.append("image").attr("width", "20px").attr("height", "20px").attr("x", 100).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
		flowCanvas.selectAll("g.useCaseExtended").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("image").attr("width", "60px").attr("height", "60px").attr("x", 20).attr("y", 0).attr("xlink:href", getUseCaseAttributes(step.useCase.name).image);
	var rectBox = wrapG.append("rect").attr("class", "buttons").attr("x", 90).attr("y", 15).attr("height", 30).style("fill", "#31a94b").attr("rx", 5).attr("ry", 5).style("cursor", "pointer").style("filter", "url(#drop-shadow)");
	var text = wrapG.append("text").text("Administration Rights").attr("x", 100).attr("y", 35).style("fill", "#FFF").style("font-size", "13px").style("cursor", "pointer");
	var dim = text.node().getBBox();
	rectBox.attr("width", dim.width + 20)
	wrapG.on("click", function(){
		cCanvas.selectAll("rect.buttons").style("fill", "#31a94b");
		d3.select(this).select("rect.buttons").transition().duration(300).style("fill", "#1e582b");
		var options = {
				name: "Admin Rights with Amelia",
				description: "Users can place requests with Cognitive chat bot to obtain Administrator Rights to their computer and recived access to install applications",
				successRate: "95%",
				noOfRequests: "2750"
		}
		createAmeliaUseCaseExtendedView(options, {clientX: d3.event.clientX, clientY: d3.event.clientY, pos: pos, offsetY: 30});
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,100)");
	wrapG.append("image").attr("width", "60px")	.attr("height", "60px").attr("x", 20).attr("y", 0).attr("xlink:href", getUseCaseAttributes(step.useCase.name).image);
	var rectBox = wrapG.append("rect").attr("class", "buttons").attr("x", 90).attr("y", 15).attr("height", 30).style("fill", "#31a94b").attr("rx", 5).attr("ry", 5).style("cursor", "pointer").style("filter", "url(#drop-shadow)");
	var text = wrapG.append("text").text("USB Privileges").attr("x", 100).attr("y", 35).style("fill", "#FFF").style("font-size", "13px").style("cursor", "pointer");
	var dim = text.node().getBBox();
	rectBox.attr("width", dim.width + 20)
	wrapG.on("click", function(){
		cCanvas.selectAll("rect.buttons").style("fill", "#31a94b");
		d3.select(this).select("rect.buttons").transition().duration(300).style("fill", "#1e582b");
		var options = {
				name: "USB Privileges with Amelia",
				description: "Users can place requests to obtain USB Privileges through Cognitive chat bot and recieve access to use a removeable drive for data transfer",
				successRate: "93%",
				noOfRequests: "1835"
		}
		createAmeliaUseCaseExtendedView(options, {clientX: d3.event.clientX, clientY: d3.event.clientY, pos: pos, offsetY: 100});
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,170)");
	wrapG.append("image").attr("width", "60px").attr("height", "60px").attr("x", 20).attr("y", 0).attr("xlink:href", getUseCaseAttributes(step.useCase.name).image);
	var rectBox = wrapG.append("rect").attr("class", "buttons").attr("x", 90).attr("y", 15).attr("height", 30).style("fill", "#31a94b").attr("rx", 5).attr("ry", 5).style("cursor", "pointer").style("filter", "url(#drop-shadow)");
	var text = wrapG.append("text").text("Guest WiFi").attr("x", 100).attr("y", 35).style("fill", "#FFF").style("font-size", "13px").style("cursor", "pointer");
	var dim = text.node().getBBox();
	rectBox.attr("width", dim.width + 20)
	wrapG.on("click", function(){
		cCanvas.selectAll("rect.buttons").style("fill", "#31a94b");
		d3.select(this).select("rect.buttons").transition().duration(300).style("fill", "#1e582b");
		var options = {
				name: "Guest WiFi with Amelia",
				description: "Users can place requests for guest wireless access using cognitive chat bot and recive credentials nearly instantly",
				successRate: "91%",
				noOfRequests: "4499"
		}
		createAmeliaUseCaseExtendedView(options, {clientX: d3.event.clientX, clientY: d3.event.clientY, pos: pos, offsetY: 170});
	});	
}

function createAmeliaUseCaseExtendedView(options, ePos){
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	flowCanvas.selectAll("g.useCaseExtended").remove();
	var pos = {};
	var containerWidth = 250;
	var containerHeight = 350;
	var dom = getDom();
	var svgWidth = dom.width();
	var svgHeight = dom.height();
	var image = {
			w: 100,
			h: 100
	}
	var gap = 20;
	
	if(ePos.clientX > (containerWidth*2)){
		pos = {
				x: ePos.pos.x - 253,
				y: ePos.pos.y + 20 + ePos.offsetY
		}
	}else{
		pos = {
				x: ePos.pos.x + 253,
				y: ePos.pos.y + 20 + ePos.offsetY
		}
	}
	
	var uCanvas = flowCanvas.append("g").attr("class", "useCaseExtended").attr("transform", "translate("+pos.x+","+pos.y+")");
	
	uCanvas.append("rect").attr("width", containerWidth).attr("height", containerHeight)
	.style("fill", "#f1f1f1").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	uCanvas.append("image").attr("width", image.w)
	.attr("height", image.h).attr("x", ((containerWidth /2) - (image.w / 2))).attr("y", gap).attr("xlink:href", "img/assessments/ameliaSide.png");
	uCanvas.append("g").attr("transform", "translate(20, "+(image.h + gap + 20)+")")
	.append("text").text(options.name).style("font-size", "14px").style("font-style", "italic").style("font-weight", "500")
	.style("fill", "#57575c").style("font-weight", "bold");
	
	wrapG = uCanvas.append("g").attr("transform", "translate(20, "+(image.h + gap + 50)+")");
	wrapG.append("text").text("DESCRIPTION").style("fill", "#e6832a").style("font-size", "14px");
	wrapG = uCanvas.append("g").attr("transform", "translate(20, "+(image.h + gap + 70)+")");
	wrapG.append("text").text(options.description).attr("x",0).attr("y", 0).call(wrap, containerWidth - 5).style("font-size", "12px").style("fill", "#57575c");	
	
	wrapG = uCanvas.append("g").attr("transform","translate(20, "+(image.h + gap + 160)+")");	
	wrapG.append("text").attr("x",0).attr("y", 20).style("font-size","12px").text("SUCCESS RATE").style("fill","#247dbe");

	wrapG.append("image").attr("width",	"20px").attr("height","20px").attr("x",  120).attr("y", 5)
	.attr("xlink:href",	"img/assessments/right.png");

	wrapG.append("text").attr("x", containerWidth - 80).attr("y", 20).style("font-size","14px").text(options.successRate).style("fill","#575757");
	
	wrapG = uCanvas.append("g").attr("transform","translate(20, "+(image.h + gap + 185)+")");	
	wrapG.append("text").attr("x",0).attr("y", 20).style("font-size","12px").text("# OF REQUESTS").style("fill","#247dbe");

	wrapG.append("image").attr("width",	"20px").attr("height","20px").attr("x",  120).attr("y", 5)
	.attr("xlink:href",	"img/assessments/right.png");

	wrapG.append("text").attr("x", containerWidth - 80).attr("y", 20).style("font-size","14px").text(options.noOfRequests).style("fill","#575757");
	
}

/* For Amelia Deployments View */

function createAmeliaDeploymentsCaseOptions(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var gradient = svg.append("defs").append("linearGradient").attr("id",
	"gradient").attr("x1", "0%").attr("y1", "0%")
	.attr("x2", "100%").attr("y2", "100%").attr("spreadMethod",
			"pad");

gradient.append("stop").attr("offset", "0%").attr("stop-color", "#eee")
	.attr("stop-opacity", 1);

gradient.append("stop").attr("offset", "100%").attr("stop-color",
	"#ddd").attr("stop-opacity", 1);

	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x -150),
			y : (step.link.y1 + step.deploymentsCase.link.y -50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "250px").attr("height", "250px")
	.style("fill", "url(#gradient)").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("Click a Use Case to Learn More").style("fill", "#276134").style("font-weight", "600").style("font-style", "italic").attr("x",0).attr("y", 20).style("text-anchor", "middle").style("font-size", "12px");
	wrapG.append("image").attr("width", "20px").attr("height", "20px").attr("x", 100).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
		flowCanvas.selectAll("g.useCaseExtended").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("image").attr("width", "60px").attr("height", "60px").attr("x", 20).attr("y", 0).attr("xlink:href", getUseCaseAttributes(step.deploymentsCase.name).image);
	var rectBox = wrapG.append("rect").attr("class", "buttons").attr("x", 90).attr("y", 15).attr("height", 30).style("fill", "#31a94b").attr("rx", 5).attr("ry", 5).style("cursor", "pointer").style("filter", "url(#drop-shadow)");
	var text = wrapG.append("text").text("Administration Rights").attr("x", 100).attr("y", 35).style("fill", "#FFF").style("font-size", "13px").style("cursor", "pointer");
	var dim = text.node().getBBox();
	rectBox.attr("width", dim.width + 20)
	wrapG.on("click", function(){
		cCanvas.selectAll("rect.buttons").style("fill", "#31a94b");
		d3.select(this).select("rect.buttons").transition().duration(300).style("fill", "#1e582b");
		var options = {
				name: "Admin Rights with Amelia",
				description: "Users can place requests with Cognitive chat bot to obtain Administrator Rights to their computer and recived access to install applications",
				successRate: "95%",
				noOfRequests: "2750"
		}
		createAmeliaUseCaseExtendedView(options, {clientX: d3.event.clientX, clientY: d3.event.clientY, pos: pos, offsetY: 30});
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,100)");
	wrapG.append("image").attr("width", "60px")	.attr("height", "60px").attr("x", 20).attr("y", 0).attr("xlink:href", getUseCaseAttributes(step.deploymentsCase.name).image);
	var rectBox = wrapG.append("rect").attr("class", "buttons").attr("x", 90).attr("y", 15).attr("height", 30).style("fill", "#31a94b").attr("rx", 5).attr("ry", 5).style("cursor", "pointer").style("filter", "url(#drop-shadow)");
	var text = wrapG.append("text").text("USB Privileges").attr("x", 100).attr("y", 35).style("fill", "#FFF").style("font-size", "13px").style("cursor", "pointer");
	var dim = text.node().getBBox();
	rectBox.attr("width", dim.width + 20)
	wrapG.on("click", function(){
		cCanvas.selectAll("rect.buttons").style("fill", "#31a94b");
		d3.select(this).select("rect.buttons").transition().duration(300).style("fill", "#1e582b");
		var options = {
				name: "USB Privileges with Amelia",
				description: "Users can place requests to obtain USB Privileges through Cognitive chat bot and recieve access to use a removeable drive for data transfer",
				successRate: "93%",
				noOfRequests: "1835"
		}
		createAmeliaUseCaseExtendedView(options, {clientX: d3.event.clientX, clientY: d3.event.clientY, pos: pos, offsetY: 100});
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,170)");
	wrapG.append("image").attr("width", "60px").attr("height", "60px").attr("x", 20).attr("y", 0).attr("xlink:href", getUseCaseAttributes(step.deploymentsCase.name).image);
	var rectBox = wrapG.append("rect").attr("class", "buttons").attr("x", 90).attr("y", 15).attr("height", 30).style("fill", "#31a94b").attr("rx", 5).attr("ry", 5).style("cursor", "pointer").style("filter", "url(#drop-shadow)");
	var text = wrapG.append("text").text("Guest WiFi").attr("x", 100).attr("y", 35).style("fill", "#FFF").style("font-size", "13px").style("cursor", "pointer");
	var dim = text.node().getBBox();
	rectBox.attr("width", dim.width + 20)
	wrapG.on("click", function(){
		cCanvas.selectAll("rect.buttons").style("fill", "#31a94b");
		d3.select(this).select("rect.buttons").transition().duration(300).style("fill", "#1e582b");
		var options = {
				name: "Guest WiFi with Amelia",
				description: "Users can place requests for guest wireless access using cognitive chat bot and recive credentials nearly instantly",
				successRate: "91%",
				noOfRequests: "4499"
		}
		createAmeliaUseCaseExtendedView(options, {clientX: d3.event.clientX, clientY: d3.event.clientY, pos: pos, offsetY: 170});
	});	
}

function createAmeliaUseCaseExtendedView(options, ePos){
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	flowCanvas.selectAll("g.useCaseExtended").remove();
	var pos = {};
	var containerWidth = 250;
	var containerHeight = 350;
	var dom = getDom();
	var svgWidth = dom.width();
	var svgHeight = dom.height();
	var image = {
			w: 100,
			h: 100
	}
	var gap = 20;
	
	if(ePos.clientX > (containerWidth*2)){
		pos = {
				x: ePos.pos.x - 253,
				y: ePos.pos.y + 20 + ePos.offsetY
		}
	}else{
		pos = {
				x: ePos.pos.x + 253,
				y: ePos.pos.y + 20 + ePos.offsetY
		}
	}
	
	var uCanvas = flowCanvas.append("g").attr("class", "useCaseExtended").attr("transform", "translate("+pos.x+","+pos.y+")");
	
	uCanvas.append("rect").attr("width", containerWidth).attr("height", containerHeight)
	.style("fill", "#f1f1f1").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	uCanvas.append("image").attr("width", image.w)
	.attr("height", image.h).attr("x", ((containerWidth /2) - (image.w / 2))).attr("y", gap).attr("xlink:href", "img/assessments/ameliaSide.png");
	uCanvas.append("g").attr("transform", "translate(20, "+(image.h + gap + 20)+")")
	.append("text").text(options.name).style("font-size", "14px").style("font-style", "italic").style("font-weight", "500")
	.style("fill", "#57575c").style("font-weight", "bold");
	
	wrapG = uCanvas.append("g").attr("transform", "translate(20, "+(image.h + gap + 50)+")");
	wrapG.append("text").text("DESCRIPTION").style("fill", "#e6832a").style("font-size", "14px");
	wrapG = uCanvas.append("g").attr("transform", "translate(20, "+(image.h + gap + 70)+")");
	wrapG.append("text").text(options.description).attr("x",0).attr("y", 0).call(wrap, containerWidth - 5).style("font-size", "12px").style("fill", "#57575c");	
	
	wrapG = uCanvas.append("g").attr("transform","translate(20, "+(image.h + gap + 160)+")");	
	wrapG.append("text").attr("x",0).attr("y", 20).style("font-size","12px").text("SUCCESS RATE").style("fill","#247dbe");

	wrapG.append("image").attr("width",	"20px").attr("height","20px").attr("x",  120).attr("y", 5)
	.attr("xlink:href",	"img/assessments/right.png");

	wrapG.append("text").attr("x", containerWidth - 80).attr("y", 20).style("font-size","14px").text(options.successRate).style("fill","#575757");
	
	wrapG = uCanvas.append("g").attr("transform","translate(20, "+(image.h + gap + 185)+")");	
	wrapG.append("text").attr("x",0).attr("y", 20).style("font-size","12px").text("# OF REQUESTS").style("fill","#247dbe");

	wrapG.append("image").attr("width",	"20px").attr("height","20px").attr("x",  120).attr("y", 5)
	.attr("xlink:href",	"img/assessments/right.png");

	wrapG.append("text").attr("x", containerWidth - 80).attr("y", 20).style("font-size","14px").text(options.noOfRequests).style("fill","#575757");
	
}

// ---------- For Invoice Matching under Procure to Pay process ----------//

function ProcureToPay6(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x + 60),
			y : (step.link.y1 + step.useCase.link.y - 35)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "250px").attr("height", "200px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("3 Bots in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 30).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 110).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").text("RTPAPIPCLInvoicePostingSNOW - LA").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("Invoice submissions into ServiceNow for ").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("Latin America").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");
	
	wrapG.append("text").text("InvoiceVerificationSGANZ - GA").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 75).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 90).style("font-size", "10px");
	wrapG.append("text").html("Confirms certain form fields are filled out ").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 90).style("font-size", "10px");
	wrapG.append("text").html("correctly for new invoices").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 100).style("font-size", "10px");
	
	wrapG.append("text").text("InvoicePulling - NA").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 120).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 135).style("font-size", "10px");
	wrapG.append("text").html("To pull AP and Sales invoices from SAP ").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 135).style("font-size", "10px");
	wrapG.append("text").html("ECC, Tahiti, 4.0B and Coupa").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 145).style("font-size", "10px");
	
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 160).style("font-size", "10px");
	wrapG.append("text").html("FTE : 1").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 160).style("font-size", "10px");
}

/*
 * ---- For Supplier selection and contract negotiation under Procure to Pay
 * Process ----------
 */

function ProcureToPay22(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x - 90),
			y : (step.link.y1 + step.deploymentsCase.link.y + 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "250px").attr("height", "110px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("1 Bot in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 20).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 110).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").text("BuySmartTaxCode - GA").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("Autmoates population of tax code in associated").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("	BuySmart contract field").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 70).style("font-size", "10px");
	wrapG.append("text").html("FTE : 1").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 70).style("font-size", "10px");
}

/*
 * ---- For Creation of POs and spot buys under Procure to Pay Process
 * ----------
 */

function ProcureToPay511(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x - 90),
			y : (step.link.y1 + step.deploymentsCase.link.y + 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "275px").attr("height", "250px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("3 Bots in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 125).attr("y", 10).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").text("PR2PO4Hungary - EU").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("automates update of Req to Purchase Order").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("	process for Hungary in SAP 4.0B").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 70).style("font-size", "10px");
	wrapG.append("text").html("FTE : 0.25").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 70).style("font-size", "10px");

	wrapG.append("text").text("PR2PO4France - EU").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 85).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 100).style("font-size", "10px");
	wrapG.append("text").html("automates update of Req to Purchase Order").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 100).style("font-size", "10px");
	wrapG.append("text").html("process for France in SAP 4.0B (ME58, ME9F)").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 110).style("font-size", "10px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 125).style("font-size", "10px");
	wrapG.append("text").html("FTE : 0.5").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 125).style("font-size", "10px");

	wrapG.append("text").text("PR2PO6France - EU").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 140).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 155).style("font-size", "10px");
	wrapG.append("text").html("automates update of Req to Purchase Order").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 155).style("font-size", "10px");
	wrapG.append("text").html("process for France in SAP ECC (ME57, ME9F)").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 165).style("font-size", "10px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 180).style("font-size", "10px");
	wrapG.append("text").html("FTE : 1").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 180).style("font-size", "10px");
}

/*
 * ---- For Shopping, creation of requisitions and approval under Procure to Pay
 * Process ----------
 */

function ProcureToPay41(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 90),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "200px").attr("height", "150px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("image").attr("width", "200px").attr("height", "150px").attr("x",-120).attr("y", 0).style("cursor", "pointer").attr("xlink:href", "img/assessments/imageProcureToPay41.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
}

/*
 * ---- For Use Case View - Creation of POs and spot buys under Procure to Pay
 * Process ----------
 */

function ProcureToPay511U(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x - 90),
			y : (step.link.y1 + step.deploymentsCase.link.y + 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "285px").attr("height", "110px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("1 Bot in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 140).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("RTPIPMXShoppingCarts2POConversion - LA").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("Enters the vendor items from shopping cart and ").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("convert into PO in SAP ECC").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");
	
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 70).style("font-size", "10px");
	wrapG.append("text").html("FTE : 0.5").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 70).style("font-size", "10px");
}


/*
 * For Supplier master data management under Procure to Pay Process
 */

function ProcureToPay52(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x - 90),
			y : (step.link.y1 + step.deploymentsCase.link.y + 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "250px").attr("height", "250px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("3 Bots in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 20).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 110).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").text("VendorMaster - NA").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("automates US vendor creation in SAP ECC").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("(XK01)").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 70).style("font-size", "10px");
	wrapG.append("text").html("FTE : 0.2").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 70).style("font-size", "10px");

	wrapG.append("text").text("PointMan - NA").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 85).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 100).style("font-size", "10px");
	wrapG.append("text").html("Process posting in PointMan system").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 100).style("font-size", "10px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 115).style("font-size", "10px");
	wrapG.append("text").html("FTE : 1").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 115).style("font-size", "10px");

	wrapG.append("text").text("Made2Manage - NA").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 140).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 155).style("font-size", "10px");
	wrapG.append("text").html("Process posting in M2M system").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 155).style("font-size", "10px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 170).style("font-size", "10px");
	wrapG.append("text").html("FTE : 1").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 170).style("font-size", "10px");
	}

/*
 * ---- For Use Case View - Supplier master data management under Procure to Pay
 * Process ----------
 */

function ProcureToPay52U(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x - 90),
			y : (step.link.y1 + step.deploymentsCase.link.y + 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "250px").attr("height", "100px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("1 Bot in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 20).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 110).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").text("Add Supplier in ARAVO").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("Matches data in SAP and creates a new ").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("supplier in ARAVO").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");
	}

/*
 * ---- For 3 way matching of PO, invoice and receipt and approval to pay under
 * Procure to Pay Process ----------
 */

function ProcureToPay61(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x - 90),
			y : (step.link.y1 + step.deploymentsCase.link.y + 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "250px").attr("height", "110px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("1 Bot in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 20).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 110).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").text("StatementOfAccount - GA").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("Updates the invoice status for a vendor").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 60).style("font-size", "10px");
	wrapG.append("text").html("FTE : 0.55").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 60).style("font-size", "10px");

}

/* ---- For Draft Budget under Plan To Forecast Process ---------- */

function PlanToForecast22(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x - 290),
			y : (step.link.y1 + step.deploymentsCase.link.y - 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "275px").attr("height", "290px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("8 Bots in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 20).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 130).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("All bots update the material master info record").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 20).style("font-size", "10px");
	wrapG.append("text").html("(creation, change and deletion) in SAP systems").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 30).style("font-size", "10px");
	
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 50).style("font-size", "10px");
	wrapG.append("text").text("MaterialMasterHungary - EU").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",40).attr("y", 50).style("font-size", "12px");
	
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 65).style("font-size", "10px");
	wrapG.append("text").html("FTE : 1").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 65).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 80).style("font-size", "10px");
	wrapG.append("text").text("MaterialMasterIRGA1A - GA").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",40).attr("y", 80).style("font-size", "12px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 95).style("font-size", "10px");
	wrapG.append("text").html("FTE : 1.5").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 95).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 110).style("font-size", "10px");
	wrapG.append("text").text("MaterialMasterSLGA1A - GA").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",40).attr("y", 110).style("font-size", "12px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 125).style("font-size", "10px");
	wrapG.append("text").html("FTE : 1.5").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 125).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 140).style("font-size", "10px");
	wrapG.append("text").text("MaterialMasterIRGA1B - GA").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",40).attr("y", 140).style("font-size", "12px");
	
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 155).style("font-size", "10px");
	wrapG.append("text").text("MaterialMasterHungaryECC - EU").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",40).attr("y", 155).style("font-size", "12px");
	
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 170).style("font-size", "10px");
	wrapG.append("text").html("FTE : 1").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 170).style("font-size", "10px");
	
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 185).style("font-size", "10px");
	wrapG.append("text").text("MaterialMaster2 - GA").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",40).attr("y", 185).style("font-size", "12px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 200).style("font-size", "10px");
	wrapG.append("text").html("FTE : 0.75").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 200).style("font-size", "10px");
	
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 215).style("font-size", "10px");
	wrapG.append("text").text("MaterialMasterSLGA1B - GA").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",40).attr("y", 215).style("font-size", "12px");
	
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 230).style("font-size", "10px");
	wrapG.append("text").text("MaterialMasterFrance - EU").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",40).attr("y", 230).style("font-size", "12px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 245).style("font-size", "10px");
	wrapG.append("text").html("FTE : 1").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 245).style("font-size", "10px");
	
}

/*
 * For Use Case View - Draft Budget under Plan To Forecast Process
 */

function PlanToForecast22U(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 410),
			y : (step.link.y1 + step.useCase.link.y - 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "390px").attr("height", "180px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("2 Bots in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 20).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 220).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("TEExpenseDataEntryForNodumCountries - LA").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("To automate the process for entering information").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("from Concur into Nodum").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 70).style("font-size", "10px");
	wrapG.append("text").html("FTE : 0.7").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 70).style("font-size", "10px");

	wrapG.append("text").html("ARCashApplication - LA").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 85).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 100).style("font-size", "10px");
	wrapG.append("text").html("To automate the process for downloading daily bank statements, entering").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 100).style("font-size", "10px");
	wrapG.append("text").html("and matching amounts in Nodum and SAP ECC (FBL5N and").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 110).style("font-size", "10px");
	wrapG.append("text").html("S_ALR_87012173) and making cash applications to clear receivables.").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 120).style("font-size", "10px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 135).style("font-size", "10px");
	wrapG.append("text").html("FTE : 2.6").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 135).style("font-size", "10px");
}

/*
 * For Financial Planning under Plan To Forecast Process
 */

function PlanToForecast2(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 90),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "300px").attr("height", "125px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("1 Bot in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 20).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 160).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Inventory Projections").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("Automates report consolidation and basic excel").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("macros to delivery inventory projection quantities").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 70).style("font-size", "10px");
	wrapG.append("text").html("FTE : TBD").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 70).style("font-size", "10px");
}


/*
 * For Business Analytics under Plan To Forecast Process
 */

function PlanToForecast6(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 140),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "300px").attr("height", "230px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("3 Bots in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 20).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 160).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("InvoiceLookup - GLB").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("To retrieve supplier invoice information from").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("SAP 4.0B (FBL1, ZBD2_monitor), ECC, Tahiti and Monaco").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 70).style("font-size", "10px");
	wrapG.append("text").html("FTE : 3").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 70).style("font-size", "10px");

	wrapG.append("text").html("SC Metrics Dashboard").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 85).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 100).style("font-size", "10px");
	wrapG.append("text").html("Description TBD").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 100).style("font-size", "10px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 115).style("font-size", "10px");
	wrapG.append("text").html("FTE : TBD").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 115).style("font-size", "10px");

	wrapG.append("text").html("GCS Metrics Submission").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 130).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 145).style("font-size", "10px");
	wrapG.append("text").html("Description TBD").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 145).style("font-size", "10px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 160).style("font-size", "10px");
	wrapG.append("text").html("FTE : TBD").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 160).style("font-size", "10px");

}


/* ---- For Generate reports under Plan To Forecast Process ---------- */

function PlanToForecast53(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x + 60),
			y : (step.link.y1 + step.deploymentsCase.link.y - 35)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "310px").attr("height", "310px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("5 Bots in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 20).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 170).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("SAP Plant Maintenance Report").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("Description : TBD").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 55).style("font-size", "10px");
	wrapG.append("text").html("FTE : TBD").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");
	
	wrapG.append("text").html("PAS Month To Date").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 75).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 90).style("font-size", "10px");
	wrapG.append("text").html("Build of month to date sales report for PAS ").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 90).style("font-size", "10px");
	
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 100).style("font-size", "10px");
	wrapG.append("text").html("FTE : TBD").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 100).style("font-size", "10px");
	
	wrapG.append("text").html("SGPConsolidator - GA").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 120).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 135).style("font-size", "10px");
	wrapG.append("text").html("To consolidate all the Sales Gross Profit data from").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 135).style("font-size", "10px");
	wrapG.append("text").html("Hyperion Smart View into one excel file with 17 GA entities ").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 145).style("font-size", "10px");
	
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 160).style("font-size", "10px");
	wrapG.append("text").html("FTE : 0.6").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 160).style("font-size", "10px");
	
	wrapG.append("text").html("HFMHIER - GA").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 175).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 190).style("font-size", "10px");
	wrapG.append("text").html("To automate process to add/edit/delete rows/columns in").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 190).style("font-size", "10px");
	wrapG.append("text").html("multiple excel files (which are coming from Hyperion Smart View)").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 200).style("font-size", "10px");
	
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 215).style("font-size", "10px");
	wrapG.append("text").html("FTE : 0.1").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 215).style("font-size", "10px");
	
	wrapG.append("text").html("BDBEN4 - EU").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 230).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 245).style("font-size", "10px");
	wrapG.append("text").html("To automate the process for account provisioning").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 245).style("font-size", "10px");
	wrapG.append("text").html(" for BDBEN4").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 255).style("font-size", "10px");
	
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 270).style("font-size", "10px");
	wrapG.append("text").html("FTE : 1").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 270).style("font-size", "10px");
	
}

/*
 * ---- For Analyze drivers of performance under Plan To Forecast Process
 * ----------
 */

function PlanToForecast62(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x - 260),
			y : (step.link.y1 + step.deploymentsCase.link.y - 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "250px").attr("height", "175px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("2 Bots in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 20).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 110).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("GAMCDashboard - GA").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("To automate the process retrieving GAMC data ").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("from Hyperion Smart View ").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 70).style("font-size", "10px");
	wrapG.append("text").html("FTE : 0.35").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 70).style("font-size", "10px");	

	wrapG.append("text").html("GAMCDashboard 2 - GA").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 85).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 100).style("font-size", "10px");
	wrapG.append("text").html("To automate the process retrieving GAMC data ").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 100).style("font-size", "10px");
	wrapG.append("text").html("from Hyperion Smart View ").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 110).style("font-size", "10px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 125).style("font-size", "10px");
	wrapG.append("text").html("FTE : 0.35").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 125).style("font-size", "10px");	

}

/* ---- For Outbound Logistics under Plan To Deliver Process ---------- */

function PlanToDelivery7(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x + 60),
			y : (step.link.y1 + step.deploymentsCase.link.y - 35)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "250px").attr("height", "120px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("1 Bot in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 20).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 110).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("FreightAllocation - NA").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("Prepares the freight allocation ").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("report from SAP ECC").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 70).style("font-size", "10px");
	wrapG.append("text").html("FTE : 1").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 70).style("font-size", "10px");

}

/*
 * For Monitor activity against forecast under Plan To Deliver Process
 */

function PlanToDelivery12(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 90),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "250px").attr("height", "110px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("1 Bot in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 20).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 110).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Demand Planning").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("Description TBD").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 60).style("font-size", "10px");
	wrapG.append("text").html("FTE : TBD").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 60).style("font-size", "10px");

}

/*
 * For Order Material and Services under Plan To Deliver Process
 */

function PlanToDelivery32(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 90),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "250px").attr("height", "110px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("1 Bot in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 20).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 110).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Material Document Transfer Order").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("Description TBD").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 60).style("font-size", "10px");
	wrapG.append("text").html("FTE : TBD").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 60).style("font-size", "10px");

}


/*
 * ---- For IT Portfolio Management under ITStrategy To Architecture Process
 * ----------
 */

function ITStrategyToArchitecture2(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x - 90),
			y : (step.link.y1 + step.deploymentsCase.link.y + 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "340px").attr("height", "150px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("11 Bots in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 20).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 200).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("3pm/SNOW Update Bots (11)").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("Automatically run various portfolio reports and matches data").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("between 3pm, SQL tables, and eventually updates SNOW reports").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 70).style("font-size", "10px");
	wrapG.append("text").html("FTE Metrics: 0.058 FTE's reduced").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 70).style("font-size", "10px");
}

/*
 * ---- For Use Case View - IT Portfolio Management under ITStrategy To
 * Architecture Process ----------
 */

function ITStrategyToArchitecture2U(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 90),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "250px").attr("height", "110px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("1 Bot in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 20).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 110).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Auxiliary Cost Component Report").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("Description TBD").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
}

/* ---- For Credit, Pricing, Quote under Quote To Cash Process ---------- */

function QuoteToCash2(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x - 90),
			y : (step.link.y1 + step.deploymentsCase.link.y + 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "250px").attr("height", "215px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("3 Bots in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 20).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 110).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("SEAandHKBelowMarginPricing - GA").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("Updating below margin pricing for ").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("SEA and HK in SAP 4.0b for Asia region").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");
	
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 70).style("font-size", "10px");
	wrapG.append("text").html("FTE : 0.05").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 70).style("font-size", "10px");

	wrapG.append("text").html("SEAPricingMaster - GA").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 85).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 100).style("font-size", "10px");
	wrapG.append("text").html("Updating pricing for SEA in SAP 4.0b").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 100).style("font-size", "10px");
	wrapG.append("text").html("from Flowtrix system for Asia region").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 110).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 125).style("font-size", "10px");
	wrapG.append("text").html("FTE : 0.05").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 125).style("font-size", "10px");

	wrapG.append("text").html("HKPricingMaster - GA").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 140).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 155).style("font-size", "10px");
	wrapG.append("text").html("Updating pricing for HK in SAP 4.0b from").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 155).style("font-size", "10px");
	wrapG.append("text").html("ePrice system for Asia region").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 165).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 180).style("font-size", "10px");
	wrapG.append("text").html("FTE : 0.05").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 180).style("font-size", "10px");
}

/*
 * ---- For Use Case View - Credit, Pricing, Quote under Quote To Cash Process
 * ----------
 */

function QuoteToCash2U(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 90),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "280px").attr("height", "125px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("1 Bot in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 20).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 130).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("TRCurrencyExchange - LA").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("Updating the exchange rate from internet in").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("SAP (BR-MX) and Nodum for Latin America").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 70).style("font-size", "10px");
	wrapG.append("text").html("FTE : 0.25").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 70).style("font-size", "10px");
}

/* ---- For Customer Setup under Quote To Cash Process ---------- */

function QuoteToCash1(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x + 50),
			y : (step.link.y1 + step.useCase.link.y - 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "280px").attr("height", "220px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("3 Bots in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 20).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 130).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("OpsArmadillo - NA").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("Validation of customer addresses from distributors").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("and update in ECC for North America").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");
	
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 70).style("font-size", "10px");
	wrapG.append("text").html("FTE : 2.5").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 70).style("font-size", "10px");

	wrapG.append("text").html("ProcessTraceRequestsBD2 - NA").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 85).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 100).style("font-size", "10px");
	wrapG.append("text").html("Validation of customer addresses from distributors").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 100).style("font-size", "10px");
	wrapG.append("text").html("and updating in SAP ECC for North America").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 110).style("font-size", "10px");
	
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 125).style("font-size", "10px");
	wrapG.append("text").html("FTE : 2").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 125).style("font-size", "10px");
	
	wrapG.append("text").html("CMDOCRM - EU").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 140).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 155).style("font-size", "10px");
	wrapG.append("text").html("To update customer information").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 155).style("font-size", "10px");
	wrapG.append("text").html("in SAP ECC and LOTS for Europe").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 165).style("font-size", "10px");
	
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 180).style("font-size", "10px");
	wrapG.append("text").html("FTE : 1.3").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 180).style("font-size", "10px");
}



/* ---- For Process order under Quote To Cash Process ---------- */

function QuoteToCash42(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x + 50),
			y : (step.link.y1 + step.deploymentsCase.link.y - 40)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "250px").attr("height", "400px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("22 Bots in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 20).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 110).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("OrderEntryKorea - GA (9 bots)").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("Entering Korea sales orders for Medical").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("and non-Medical products for Asia").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");
	
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 70).style("font-size", "10px");
	wrapG.append("text").html("FTE : 1.6").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 70).style("font-size", "10px");
	
	wrapG.append("text").html("OrderEntryMexico - NA (4 bots)").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 85).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 100).style("font-size", "10px");
	wrapG.append("text").html("Entering sales orders in SAP ").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 100).style("font-size", "10px");
	wrapG.append("text").html("for Mexico").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 110).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 125).style("font-size", "10px");
	wrapG.append("text").html("FTE : 1").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 125).style("font-size", "10px");

	
	wrapG.append("text").html("OrderEntryJapan - GA (6 bots)").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 140).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 155).style("font-size", "10px");
	wrapG.append("text").html("Entering sales orders in SAP 4.0b ").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 155).style("font-size", "10px");
	wrapG.append("text").html("for Japan").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 165).style("font-size", "10px");
	
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 180).style("font-size", "10px");
	wrapG.append("text").html("FTE : 0.5").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 180).style("font-size", "10px");

	wrapG.append("text").html("ServiceComplaintsLotsExtract").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 195).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 210).style("font-size", "10px");
	wrapG.append("text").html("Retrieving order information from").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 210).style("font-size", "10px");
	wrapG.append("text").html("BDBEN4 system for Europe").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 220).style("font-size", "10px");
	
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 235).style("font-size", "10px");
	wrapG.append("text").html("FTE : 0.5").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 235).style("font-size", "10px");

	wrapG.append("text").html("OrderEntryBrazil - LA").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 250).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 265).style("font-size", "10px");
	wrapG.append("text").html("Entering sales orders into SalesForce system").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 265).style("font-size", "10px");
	wrapG.append("text").html("for Brazil").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 275).style("font-size", "10px");
	
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 290).style("font-size", "10px");
	wrapG.append("text").html("FTE : 1").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 290).style("font-size", "10px");

	wrapG.append("text").html("ServiceComplaintsTraceReport - EU").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 305).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 320).style("font-size", "10px");
	wrapG.append("text").html("Retrieving order shipment status from").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 320).style("font-size", "10px");
	wrapG.append("text").html("carrier company website for Europe").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 330).style("font-size", "10px");
	
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 345).style("font-size", "10px");
	wrapG.append("text").html("FTE : 1").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 345).style("font-size", "10px");

}

/* ---- For Use Case View - Process order under Quote To Cash Process ---------- */

function QuoteToCash42U(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x + 50),
			y : (step.link.y1 + step.useCase.link.y - 40)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "250px").attr("height", "300px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("5 Bots in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 20).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 110).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("PASDailyOrderReport").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("Updating sales order report").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("for PAS business unit").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");
	
	wrapG.append("text").html("MPSUSDailyBackOrderReport").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 75).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 90).style("font-size", "10px");
	wrapG.append("text").html("Creation of back order report for").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 90).style("font-size", "10px");
	wrapG.append("text").html("the MPS business unit in the US").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 100).style("font-size", "10px");
	
	wrapG.append("text").html("MMSSalesOrderUpdates").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 120).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 135).style("font-size", "10px");
	wrapG.append("text").html("Updating sales orders for medical ").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 135).style("font-size", "10px");
	wrapG.append("text").html("management systems business unit").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 145).style("font-size", "10px");
	
	wrapG.append("text").html("IntercompanyClearing - NA").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 165).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 180).style("font-size", "10px");
	wrapG.append("text").html("Clearing of open items for intercompany ").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 180).style("font-size", "10px");
	wrapG.append("text").html("transactions in ECC for North America").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 190).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 205).style("font-size", "10px");
	wrapG.append("text").html("FTE : 0.39").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 205).style("font-size", "10px");

	wrapG.append("text").html("CSOENodumCountries - LA").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 220).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 235).style("font-size", "10px");
	wrapG.append("text").html("Automate the process of entering orders").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 235).style("font-size", "10px");
	wrapG.append("text").html("in Nodum system for Latin America").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 245).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 260).style("font-size", "10px");
	wrapG.append("text").html("FTE : 3").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 260).style("font-size", "10px");
}


/* ---- For Receive Cash under Quote To Cash Process ---------- */

function QuoteToCash61(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x + 50),
			y : (step.link.y1 + step.deploymentsCase.link.y + 10)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "250px").attr("height", "110px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("1 Bot in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 110).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("ARCashApplicationFrance").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("Clearing payments in SAP 4.0b ").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("for France").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 70).style("font-size", "10px");
	wrapG.append("text").html("FTE : 0.5").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 70).style("font-size", "10px");
}

/* ---- For Create Invoice under Quote To Cash Process ---------- */

function QuoteToCash51(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x - 90),
			y : (step.link.y1 + step.deploymentsCase.link.y + 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "250px").attr("height", "110px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("1 Bot in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 110).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("ARMXInvoiceManagement - LA").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("Downloading new sales invoices from Carvajal").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("and sending to customer for Latin America").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 70).style("font-size", "10px");
	wrapG.append("text").html("FTE : 0.5").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 70).style("font-size", "10px");
}

/*
 * ---- For Use Case View - Create Invoice under Quote To Cash Process
 * ----------
 */

function QuoteToCash51U(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 90),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "290px").attr("height", "210px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("3 Bots in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 150).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("BuySmartEnforcer - NA").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("Requesting replacement electronic invoices for").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("rejected physical invoices in BuySmart for North America").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");

	wrapG.append("text").html("BuySmartPreapprovedInvoices - EU").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 75).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 90).style("font-size", "10px");
	wrapG.append("text").html("Preapprove invoices in BuySmart").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 90).style("font-size", "10px");
	wrapG.append("text").html("for Europe").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 100).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 115).style("font-size", "10px");
	wrapG.append("text").html("FTE : 1.6").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 115).style("font-size", "10px");
	
	wrapG.append("text").html("InvoiceProcessingSG - GA").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 130).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 145).style("font-size", "10px");
	wrapG.append("text").html("RInvoice posting for Singapore and ").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 145).style("font-size", "10px");
	wrapG.append("text").html("Japan in SAP 4.0B").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 155).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 170).style("font-size", "10px");
	wrapG.append("text").html("FTE : 0.5").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 170).style("font-size", "10px");

}

/* ---- For Collection under Quote To Cash Process ---------- */

function QuoteToCash72(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x - 90),
			y : (step.link.y1 + step.deploymentsCase.link.y + 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "250px").attr("height", "110px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("1 Bot in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 110).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("ClaimsResearch - LA").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("Searching for claims information in").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("SAP ECC for North America").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 70).style("font-size", "10px");
	wrapG.append("text").html("FTE : 2").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 70).style("font-size", "10px");
}

/* ---- For Yse Case View - Collection under Quote To Cash Process ---------- */

function QuoteToCash72U(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 90),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "290px").attr("height", "110px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("1 Bot in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 150).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("ARInvoicePulling - NA").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("To pull invoices, order screens and validate if the invoices").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("have been paid in SAP ECC.for North America").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");
	
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 70).style("font-size", "10px");
	wrapG.append("text").html("FTE : 0.5").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 70).style("font-size", "10px");
}

/*
 * ---- For Monitor issues under IT Transition to Operation CI Process
 * ----------
 */

function ItTransitionToOperationCI21(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x - 90),
			y : (step.link.y1 + step.deploymentsCase.link.y + 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "250px").attr("height", "160px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("5 Bots in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 110).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("5 iAutomate scripts in production").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 25).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 40).style("font-size", "10px");
	wrapG.append("text").html("Total Metrics: 2.8 FTE's reduced").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 40).style("font-size", "10px");
	
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 55).style("font-size", "10px");
	wrapG.append("text").html("Server Availability").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");
	
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 70).style("font-size", "10px");
	wrapG.append("text").html("Disk Utilization/Cleanup").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 70).style("font-size", "10px");
	
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 85).style("font-size", "10px");
	wrapG.append("text").html("File System Clean up").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 85).style("font-size", "10px");
	
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 40100).style("font-size", "10px");
	wrapG.append("text").html("Windows Service Management").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 100).style("font-size", "10px");
	
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 115).style("font-size", "10px");
	wrapG.append("text").html("CPU/Memory Utilization Threshold Incidents").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 115).style("font-size", "10px");
}



/*
 * ---- For Define performance metrics under IT Transition to Operation CI
 * Process ----------
 */

function ItTransitionToOperationCI31(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x + 50),
			y : (step.link.y1 + step.deploymentsCase.link.y - 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "250px").attr("height", "170px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("2 Bots in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 20).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 100).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Quality Dashboard - NA").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("prepares the BD product quality dashboard").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("for complaints and defects data").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");
	wrapG.append("text").html("from SAP ECC, CRS system, Pilgrim").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 65).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 80).style("font-size", "10px");
	wrapG.append("text").html("FTE : 1.9").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 80).style("font-size", "10px");

	wrapG.append("text").html("ECS QV Dashboard").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 95).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 110).style("font-size", "10px");
	wrapG.append("text").html("Prepares QlikView dashboard for").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 110).style("font-size", "10px");
	wrapG.append("text").html("ECS data updates").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 120).style("font-size", "10px");

}

/*
 * ---- For Use Case View - Define performance metrics under IT Transition to
 * Operation CI Process ----------
 */

function ItTransitionToOperationCI31U(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 270),
			y : (step.link.y1 + step.useCase.link.y - 70)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "250px").attr("height", "170px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("3 Bots in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 20).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 100).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("SAP Firefighter Dashboard").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("Compiles excel report monitoring ").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("firefighters requests and approval SLAs").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");
		
	wrapG.append("text").html("File Sharing DLP Report").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 70).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 85).style("font-size", "10px");
	wrapG.append("text").html("Description TBD").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 85).style("font-size", "10px");
	
	wrapG.append("text").html("CIF Error Reporting").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 100).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 115).style("font-size", "10px");
	wrapG.append("text").html("Description TBD").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 115).style("font-size", "10px");

}


/*
 * ---- For Develop production and materials plan under Plan To Delivery Process
 * ----------
 */

function PlanToDelivery21(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x + 50),
			y : (step.link.y1 + step.useCase.link.y - 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "275px").attr("height", "230px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("3 Bots in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 125).attr("y", 10).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Material Activation for BD1 Canada").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("Extension of material master activation ").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("from USA to BD1 Canada").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 70).style("font-size", "10px");
	wrapG.append("text").html("FTE : TBD").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 70).style("font-size", "10px");

	wrapG.append("text").html("MaterialMasterFranceECC - EU").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 85).style("font-size", "12px");
	
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 100).style("font-size", "10px");
	wrapG.append("text").html("Update the material master info record").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 100).style("font-size", "10px");
	wrapG.append("text").html("in SAP6ECC (ME01, ME11, ME12, ME15)").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 110).style("font-size", "10px");
	
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 125).style("font-size", "10px");
	wrapG.append("text").html("FTE : 1").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 125).style("font-size", "10px");

	wrapG.append("text").html("Global Hold").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 140).style("font-size", "12px");
	
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 155).style("font-size", "10px");
	wrapG.append("text").html("Extension of product “on-hold” status").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 155).style("font-size", "10px");
	wrapG.append("text").html("from USA to Europe LOTS").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 165).style("font-size", "10px");
	
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 180).style("font-size", "10px");
	wrapG.append("text").html("FTE : TBD").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 180).style("font-size", "10px");
}


/*
 * ---- For Track center delivery performance under Plan To Delivery Process
 * ----------
 */

function PlanToDelivery72(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x + 50),
			y : (step.link.y1 + step.useCase.link.y - 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "275px").attr("height", "220px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("3 Bots in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 125).attr("y", 10).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("DC Month to Date").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("Description : TBD").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 60).style("font-size", "10px");
	wrapG.append("text").html("FTE : TBD").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 60).style("font-size", "10px");

	wrapG.append("text").html("IMS and Distributor Inventory for SEA").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 85).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 100).style("font-size", "10px");
	wrapG.append("text").html("Description : TBD").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 100).style("font-size", "10px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 115).style("font-size", "10px");
	wrapG.append("text").html("FTE : TBD").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 115).style("font-size", "10px");

	wrapG.append("text").html("Consignment Vendor Inventory").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 135).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 150).style("font-size", "10px");
	wrapG.append("text").html("Description : TBD").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 150).style("font-size", "10px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 165).style("font-size", "10px");
	wrapG.append("text").html("FTE : TBD").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 165).style("font-size", "10px");
}

/*
 * For Application Performance Management under IT Transition to Operation CI
 * Process
 */

function ItTransitionToOperationCI3(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x - 145),
			y : (step.link.y1 + step.deploymentsCase.link.y + 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "355px").attr("height", "310px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("8 Bots in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 20).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 215).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("AS2 Certificates Master").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("Automatically monitors expiring EDI certificates and initiates").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("renewal process to re-establish communications records").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 70).style("font-size", "10px");
	wrapG.append("text").html("Metrics: 0.02 FTE's reduced").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 70).style("font-size", "10px");

	wrapG.append("text").html("BIP/PW1 Data Load Failure Ticketing").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 85).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 100).style("font-size", "10px");
	wrapG.append("text").html("Tests the scheduled data loads done on a weekly basis on BIP & PW1").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 100).style("font-size", "10px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 115).style("font-size", "10px");
	wrapG.append("text").html("and looks for any load failures and then updates a SNOW ticket").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 115).style("font-size", "10px");

	wrapG.append("text").html("AccessReportMalaysia - GA").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 130).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 145).style("font-size", "10px");
	wrapG.append("text").html("automates the process of generating access report in KLSSC").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 145).style("font-size", "10px");
	
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 160).style("font-size", "10px");
	wrapG.append("text").html("FTE : 0.1").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 160).style("font-size", "10px");

	wrapG.append("text").html("5 Automic scripts in production").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 175).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 190).style("font-size", "10px");
	wrapG.append("text").html("Total Metrics: 3.8 FTE's reduced").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 190).style("font-size", "10px");
	
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 205).style("font-size", "10px");
	wrapG.append("text").html("SAP Bssis Health Check").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 205).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 220).style("font-size", "10px");
	wrapG.append("text").html("SAP IDOC Monitoring & Alerting").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 220).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 235).style("font-size", "10px");
	wrapG.append("text").html("SAP SCM CTM Planning Run Monitoring").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 235).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 250).style("font-size", "10px");
	wrapG.append("text").html("SAP SCM Planner Code Upload").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 250).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 265).style("font-size", "10px");
	wrapG.append("text").html("SAP ABCD Indicator Upload").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 265).style("font-size", "10px");
}


/*
 * ---- For Incident Management and Continuous Improvement under IT Transition
 * to Operation CI ----------
 */

function ItTransitionToOperationCI2U(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 90),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "250px").attr("height", "220px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("5 Bots in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 110).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("SAP 4.0b enrollment").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 25).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 40).style("font-size", "10px");
	wrapG.append("text").html("User access into SAP 4.0b system").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 40).style("font-size", "10px");
	
	wrapG.append("text").html("LOTS User Creation").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 55).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 70).style("font-size", "10px");
	wrapG.append("text").html("User access/creation in Europe LOTS ").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 70).style("font-size", "10px");
	wrapG.append("text").html("system upon request").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 80).style("font-size", "10px");
	
	wrapG.append("text").html("Forecast Horizon Deletion").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 95).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 110).style("font-size", "10px");
	wrapG.append("text").html("Description TBD").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 110).style("font-size", "10px");
	
	wrapG.append("text").html("Korea Chemicals Management").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 125).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 140).style("font-size", "10px");
	wrapG.append("text").html("Description TBD").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 140).style("font-size", "10px");
	
	wrapG.append("text").html("SAPIdocVerification - GA").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 155).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 170).style("font-size", "10px");
	wrapG.append("text").html("Automates verification procedures for").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 170).style("font-size", "10px");
	wrapG.append("text").html("IDoc transfers and then alerts if needed").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 180).style("font-size", "10px");
}


/*
 * ---- For Release and Deployment under IT Transition to Operation CI
 * ----------
 */

function ItTransitionToOperationCI4(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 90),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "250px").attr("height", "150px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("2 Bots in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 110).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("SAP Promote to Prod").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 25).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 40).style("font-size", "10px");
	wrapG.append("text").html("Produces verification report comparing").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 40).style("font-size", "10px");
	wrapG.append("text").html("SAP modules approved for production").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 50).style("font-size", "10px");
	wrapG.append("text").html("and actual data downloaded from SAP").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 60).style("font-size", "10px");
	
	wrapG.append("text").html("EMEA7 Plant Code Transfer").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 75).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 90).style("font-size", "10px");
	wrapG.append("text").html("Matches plant code information from ").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 90).style("font-size", "10px");
	wrapG.append("text").html("source system into EMEA7").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 100).style("font-size", "10px");
}

/*
 * ---- For Time tracking and absence tracking under Hire To Retire Process
 * ----------
 */

function HireToRetire31(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x - 90),
			y : (step.link.y1 + step.deploymentsCase.link.y + 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "250px").attr("height", "110px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("1 Bot in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 110).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("GCSTimeSheetMalaysia - GA").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 25).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("Generating timesheet report ").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("from Genysys for Asia region").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 70).style("font-size", "10px");
	wrapG.append("text").html("FTE : 0.25").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 70).style("font-size", "10px");
}

/*
 * ---- For Eliminate quality and reliability problems under New Product
 * Development Process ----------
 */

function NewProductDevelopment43(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x - 90),
			y : (step.link.y1 + step.deploymentsCase.link.y + 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "250px").attr("height", "120px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("1 Bot in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 110).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("MaterealityMaster").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 25).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("Downloading data from Matereality partner").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("and validating internal database").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");
	
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 70).style("font-size", "10px");
	wrapG.append("text").html("Merics: 0.116 FTE's reduced").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 70).style("font-size", "10px");
	
}


/*
 * ---- For Develop and document product design specifications under New Product
 * Development Process ----------
 */

function NewProductDevelopment31(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 90),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "250px").attr("height", "135px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("2 Bots in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 110).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("R&DASE").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 25).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 40).style("font-size", "10px");
	wrapG.append("text").html("Graphics update engine for").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 40).style("font-size", "10px");
	wrapG.append("text").html("product labels").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 50).style("font-size", "10px");
	
	wrapG.append("text").html("MPSHypo").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 70).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 85).style("font-size", "10px");
	wrapG.append("text").html("Integrated soliton with Cognitive agent for ").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 85).style("font-size", "10px");
	wrapG.append("text").html("updating product labels for MPS business unit ").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 95).style("font-size", "10px");
	
}

/*
 * ---- For Material Characterization under Product Line Management Process
 * ----------
 */

function ProductLineManagement2(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 90),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "250px").attr("height", "95px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("1 Bot in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 110).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Safety Stock Modelling").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 25).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 40).style("font-size", "10px");
	wrapG.append("text").html("Description TBD").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 40).style("font-size", "10px");
}


/*
 * ---- For Identify and refine performance indicators under Product Line
 * Management Process ----------
 */

function ProductLineManagement42(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x + 50),
			y : (step.link.y1 + step.useCase.link.y - 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "250px").attr("height", "110px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("1 Bot in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 110).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("GCSReporting - NA").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 25).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 40).style("font-size", "10px");
	wrapG.append("text").html("To pull patch and AV information status of").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 40).style("font-size", "10px");
	wrapG.append("text").html("the devices from RSS (Imacros).").style("fill", "#404041").style("font-weight", "500").attr("x",50).attr("y", 50).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 65).style("font-size", "10px");
	wrapG.append("text").html("FTE : 5").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 65).style("font-size", "10px");
}

/*
 * ---- For Product Life Cycle Management under Product Line Management Process
 * ----------
 */

function ProductLineManagement4(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x - 90),
			y : (step.link.y1 + step.deploymentsCase.link.y + 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "285px").attr("height", "105px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("1 Bot in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 145).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("SAP Sharepoint Content Management Master").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 25).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 40).style("font-size", "10px");
	wrapG.append("text").html("Matches new updates to product data in").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 40).style("font-size", "10px");
	wrapG.append("text").html("SharePoint to SAP material masters.").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 50).style("font-size", "10px");
}

/*
 * ---- For Characterize materials under Product Line Management Process
 * ----------
 */

function ProductLineManagement21(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x - 90),
			y : (step.link.y1 + step.deploymentsCase.link.y + 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "250px").attr("height", "115px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("1 Bot in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 110).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("BDBInstrumentsEquipment - GA").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 25).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 40).style("font-size", "10px");
	wrapG.append("text").html("To automate creation of BDB equipment in SAP").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 40).style("font-size", "10px");
	wrapG.append("text").html("with serial number and shipment details").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 50).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 65).style("font-size", "10px");
	wrapG.append("text").html("FTE : 0.35").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 65).style("font-size", "10px");
}

/*
 * ---- For Product and Process Change Management under Product Line Management
 * Process ----------
 */

function ProductLineManagement3(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x - 90),
			y : (step.link.y1 + step.deploymentsCase.link.y + 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "250px").attr("height", "190px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("3 Bots in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 110).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("BCTEC BDDS Batch Inquiry").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 20).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 35).style("font-size", "10px");
	wrapG.append("text").html("The BACTEC bot provides customers with").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 35).style("font-size", "10px");
	wrapG.append("text").html("critical batch and expiry date information").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("to optimize laboratory workflow.").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");

	wrapG.append("text").html("BDDS Crystal Data Upload SQL").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 75).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 90).style("font-size", "10px");
	wrapG.append("text").html("Automates the collection, consolidation").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 90).style("font-size", "10px");
	wrapG.append("text").html("and upload of inoculation data to SQL").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 100).style("font-size", "10px");

	wrapG.append("text").html("BDDS Plastic Data Upload SQL").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 120).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 135).style("font-size", "10px");
	wrapG.append("text").html("Automates the collection, consolidation").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 135).style("font-size", "10px");
	wrapG.append("text").html(" and upload of inoculation data to SQL").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 145).style("font-size", "10px");

}

/*
 * ---- For Reporting under Record to Report Process ----------
 */

function RecordToReport2(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x - 90),
			y : (step.link.y1 + step.deploymentsCase.link.y + 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "230px").attr("height", "125px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("1 Bot in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 90).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("CostCenterSAPQV - GA").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 20).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 35).style("font-size", "10px");
	wrapG.append("text").html("Consolidating all the cost center").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 35).style("font-size", "10px");
	wrapG.append("text").html("reports from SAP into QlikView").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html(" flat file format for Asia region").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 70).style("font-size", "10px");
	wrapG.append("text").html("FTE : 0.1").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 70).style("font-size", "10px");
}

/*
 * ---- For GL and Subledger Maintenance under Record to Report Process
 * ----------
 */

function RecordToReport7(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x - 90),
			y : (step.link.y1 + step.deploymentsCase.link.y + 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "230px").attr("height", "120px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("1 Bot in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 90).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("GLReconciliation - NA").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 20).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 35).style("font-size", "10px");
	wrapG.append("text").html("Clearing of GL reconciliation in").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 35).style("font-size", "10px");
	wrapG.append("text").html("SAP ECC for North America").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 70).style("font-size", "10px");
	wrapG.append("text").html("FTE : 1").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 70).style("font-size", "10px");
}

/*
 * ---- For Closing Journey Entries under Record to Report Process ----------
 */

function RecordToReport6(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 90),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "230px").attr("height", "130px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("2 Bots in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 90).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("TaxPackage").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 20).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 35).style("font-size", "10px");
	wrapG.append("text").html("Preparing tax package documentation").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 35).style("font-size", "10px");
	wrapG.append("text").html(" for annual statements").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("LegalContractFinalization").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 60).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 75).style("font-size", "10px");
	wrapG.append("text").html("Finalization of executed legal").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 75).style("font-size", "10px");
	wrapG.append("text").html("agreements").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 85).style("font-size", "10px");

}


/*
 * ---- For Use Case View - GL and Subledger Maintenance under Record to Report
 * Process ----------
 */

function RecordToReport7U(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 90),
			y : (step.link.y1 + step.useCase.link.y - 110)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "230px").attr("height", "100px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("1 Bot in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 90).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("CustomGLDetailReport").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 20).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 35).style("font-size", "10px");
	wrapG.append("text").html("Creating general ledger report details").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 35).style("font-size", "10px");
	wrapG.append("text").html("based on specified standards").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");

}

/*
 * ---- For Accounting Policy Maintenance under Record to Report Process
 * ----------
 */

function RecordToReport8(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 90),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "230px").attr("height", "100px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("1 Bot in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 90).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("AccrualObjectDeactivation").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 20).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 35).style("font-size", "10px");
	wrapG.append("text").html("Deactivating accrual objects for").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 35).style("font-size", "10px");
	wrapG.append("text").html("closing statements").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");

}

/*
 * ---- For Coordinate and execute consolidation and closing of books under
 * Record to Report Process ----------
 */

function RecordToReport31(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 90),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "230px").attr("height", "120px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("1 Bot in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 90).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("ARCashApplicationFrance").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 20).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 35).style("font-size", "10px");
	wrapG.append("text").html("Clearing payments in SAP 4.0b").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 35).style("font-size", "10px");
	wrapG.append("text").html("for France").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 60).style("font-size", "10px");
	wrapG.append("text").html("FTE : 0.5").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 60).style("font-size", "10px");
	
}

/*
 * ---- For Big Data View - Supplier selection and contract negotiation under
 * Procure to Pay Process ----------
 */

function ProcureToPay22B(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 90),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "200px").attr("height", "60px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(80,0)");
	wrapG.append("text").text("Use Case Opportunity").style("fill", "#f27707").style("font-weight", "700").style("font-style", "Bold").attr("x",-50).attr("y", 25).style("font-size", "14px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 100).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Supplier Cockpit").style("fill", "#404041").style("font-weight", "500").attr("x",30).attr("y", 15).style("font-size", "12px");

}

/*
 * ---- For Big Data View - POs and Recieving under Procure to Pay Process
 * ----------
 */

function ProcureToPay5B(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x + 50),
			y : (step.link.y1 + step.useCase.link.y - 10)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "200px").attr("height", "70px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(80,0)");
	wrapG.append("text").text("Use Case Opportunity").style("fill", "#f27707").style("font-weight", "700").style("font-style", "Bold").attr("x",-50).attr("y", 25).style("font-size", "14px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 100).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Indirect Purchasing &").style("fill", "#404041").style("font-weight", "500").attr("x",30).attr("y", 15).style("font-size", "12px");
	wrapG.append("text").html("Invoice Processing").style("fill", "#404041").style("font-weight", "500").attr("x",30).attr("y", 27).style("font-size", "12px");
}

/*
 * ---- For Big Data View - Administration and management of contract and for
 * compliance and value delivery under Procure to Pay Process ----------
 */

function ProcureToPay31B(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 90),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "200px").attr("height", "70px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(80,0)");
	wrapG.append("text").text("Use Case Opportunity").style("fill", "#f27707").style("font-weight", "700").style("font-style", "Bold").attr("x",-50).attr("y", 25).style("font-size", "14px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 100).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Effectiveness of Incentives /").style("fill", "#404041").style("font-weight", "500").attr("x",30).attr("y", 15).style("font-size", "12px");
	wrapG.append("text").html("Contract Adherence").style("fill", "#404041").style("font-weight", "500").attr("x",30).attr("y", 27).style("font-size", "12px");
}

/*
 * ---- For Big Data View - Strategy for sourcing within each category to
 * maximize value and reduce Total Cost of Ownership under Procure to Pay
 * Process ----------
 */

function ProcureToPay11B(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 90),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "200px").attr("height", "70px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(80,0)");
	wrapG.append("text").text("Use Case Opportunity").style("fill", "#f27707").style("font-weight", "700").style("font-style", "Bold").attr("x",-50).attr("y", 25).style("font-size", "14px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 100).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Effectiveness of Incentives /").style("fill", "#404041").style("font-weight", "500").attr("x",30).attr("y", 15).style("font-size", "12px");
	wrapG.append("text").html("Contract Adherence").style("fill", "#404041").style("font-weight", "500").attr("x",30).attr("y", 27).style("font-size", "12px");
}

/*
 * ---- For Big Data View - Contract creation, processing and management under
 * Quote To Cash Process ----------
 */

function QuoteToCash31B(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 90),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "200px").attr("height", "60px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(80,0)");
	wrapG.append("text").text("Use Case Opportunity").style("fill", "#f27707").style("font-weight", "700").style("font-style", "Bold").attr("x",-50).attr("y", 25).style("font-size", "14px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 100).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Legal - Contract Insights").style("fill", "#404041").style("font-weight", "500").attr("x",30).attr("y", 15).style("font-size", "12px");
	}


/*
 * ---- For Big Data View - Apply Price under Quote To Cash Process ----------
 */

function QuoteToCash21B(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x + 50),
			y : (step.link.y1 + step.useCase.link.y - 10)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "200px").attr("height", "70px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(80,0)");
	wrapG.append("text").text("Use Case Opportunity").style("fill", "#f27707").style("font-weight", "700").style("font-style", "Bold").attr("x",-50).attr("y", 25).style("font-size", "14px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 100).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("BDB - Pricing (Web Crawling)").style("fill", "#404041").style("font-weight", "500").attr("x",30).attr("y", 15).style("font-size", "12px");
}

/*
 * ---- For Big Data View - Process Order under Quote To Cash Process ----------
 */

function QuoteToCash42B(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 120),
			y : (step.link.y1 + step.useCase.link.y + 55)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "240px").attr("height", "70px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(80,0)");
	wrapG.append("text").text("Use Case Opportunity").style("fill", "#f27707").style("font-weight", "700").style("font-style", "Bold").attr("x",-50).attr("y", 25).style("font-size", "14px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 140).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Optical Character Recognition (OCR) -").style("fill", "#404041").style("font-weight", "500").attr("x",30).attr("y", 15).style("font-size", "12px");
	wrapG.append("text").html("Invoices (Greater Asia)").style("fill", "#404041").style("font-weight", "500").attr("x",30).attr("y", 25).style("font-size", "12px");
}


/*
 * ---- For Big Data View - Application Performance Management under IT Trantion to Operation CI Process ----------
 */

function ItTransitionToOperationCI3B(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 120),
			y : (step.link.y1 + step.useCase.link.y + 55)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "240px").attr("height", "70px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(80,0)");
	wrapG.append("text").text("Use Case Opportunity").style("fill", "#f27707").style("font-weight", "700").style("font-style", "Bold").attr("x",-50).attr("y", 25).style("font-size", "14px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 140).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Information Security - DNS").style("fill", "#404041").style("font-weight", "500").attr("x",30).attr("y", 15).style("font-size", "12px");
	wrapG.append("text").html("Monitoring Analytics").style("fill", "#404041").style("font-weight", "500").attr("x",30).attr("y", 25).style("font-size", "12px");
}


/*
 * ---- For Big Data View - Develop Deployment Strategy under IT Trantion to Operation CI Process ----------
 */

function ItTransitionToOperationCI42B(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x + 50),
			y : (step.link.y1 + step.useCase.link.y - 20)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "240px").attr("height", "70px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(80,0)");
	wrapG.append("text").text("Use Case Opportunity").style("fill", "#f27707").style("font-weight", "700").style("font-style", "Bold").attr("x",-50).attr("y", 25).style("font-size", "14px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 140).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Information Security - Security").style("fill", "#404041").style("font-weight", "500").attr("x",30).attr("y", 15).style("font-size", "12px");
	wrapG.append("text").html("Stack Analysis").style("fill", "#404041").style("font-weight", "500").attr("x",30).attr("y", 25).style("font-size", "12px");
}




/*
 * ---- For Big Data View - Manage Portfolio under IT Strategy To Architecture
 * Process ----------
 */

function ITStrategyToArchitecture21B(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 85),
			y : (step.link.y1 + step.useCase.link.y - 100)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "240px").attr("height", "90px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(80,0)");
	wrapG.append("text").text("Use Case (POC Complete)").style("fill", "#f27707").style("font-weight", "700").style("font-style", "Bold").attr("x",-50).attr("y", 25).style("font-size", "14px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 140).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("IT Survey Analytics").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 15).style("font-size", "12px");
	wrapG.append("text").html("Provide Survey analytics to identify key").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 30).style("font-size", "10px");
	wrapG.append("text").html("areas of improvement based on end user").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 40).style("font-size", "10px");
	wrapG.append("text").html("feedback").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 50).style("font-size", "10px");
}

/*
 * ---- For Big Data View - Monitor Productivity under Asset Acquire to Retire
 * Process ----------
 */

function AssetAcquireToRetire41B(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x + 50),
			y : (step.link.y1 + step.useCase.link.y - 15)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "240px").attr("height", "90px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(80,0)");
	wrapG.append("text").text("Use Case (POC Complete)").style("fill", "#f27707").style("font-weight", "700").style("font-style", "Bold").attr("x",-50).attr("y", 25).style("font-size", "14px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 140).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("BDB - Predictive Asset Maintenance").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 15).style("font-size", "12px");
	wrapG.append("text").html("Improving customer experience and").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 30).style("font-size", "10px");
	wrapG.append("text").html("satisfaction by providing visibility into").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 40).style("font-size", "10px");
	wrapG.append("text").html("when an instrument is going to fail.").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 50).style("font-size", "10px");
}

/*
 * ---- For Big Data View - Manage Portfolio under Asset Acquire to Retire
 * Process ----------
 */

function AssetAcquireToRetire21B(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 100),
			y : (step.link.y1 + step.useCase.link.y - 100)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "265px").attr("height", "90px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(80,0)");
	wrapG.append("text").text("Use Case (POC)").style("fill", "#f27707").style("font-weight", "700").style("font-style", "Bold").attr("x",-50).attr("y", 25).style("font-size", "14px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 165).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("BDB - Technical Services Resource Forecasting").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 15).style("font-size", "10px");
	wrapG.append("text").html("Using Technician Stats and Details, build a model").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 30).style("font-size", "9px");
	wrapG.append("text").html("to forecast most effective resource allocation").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 40).style("font-size", "9px");
}


/*
 * ---- For Big Data View - Define Performance Objectives under Hire to Retire
 * Process ----------
 */

function HireToRetire41B(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 80),
			y : (step.link.y1 + step.useCase.link.y - 80)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "230px").attr("height", "70px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(80,0)");
	wrapG.append("text").text("Use Case (POC Complete)").style("fill", "#f27707").style("font-weight", "700").style("font-style", "Bold").attr("x",-50).attr("y", 25).style("font-size", "14px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 130).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Sales Competency Analytics").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 15).style("font-size", "12px");}

/*
 * ---- For Big Data View - Manage Employee Information under Hire to Retire
 * Process ----------
 */

function HireToRetire71B(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 120),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "300px").attr("height", "90px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(80,0)");
	wrapG.append("text").text("Use Case (On Track for Deployment)").style("fill", "#f27707").style("font-weight", "700").style("font-style", "Bold").attr("x",-50).attr("y", 25).style("font-size", "14px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 200).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Workplace Environment - HR/Ethics Correlations").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 15).style("font-size", "12px");
	wrapG.append("text").html("Leveraging data from Ethics, Compliance, AccessHR,").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 30).style("font-size", "10px");
	wrapG.append("text").html("Perceptyx, Termination etc. to identify signals").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 40).style("font-size", "10px");
	wrapG.append("text").html("to be investigated further").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 50).style("font-size", "10px");
}

/*
 * ---- For Big Data View - Define Requirements under New Product Development
 * Process ----------
 */

function NewProductDevelopment21B(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x + 50),
			y : (step.link.y1 + step.useCase.link.y - 15)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "200px").attr("height", "70px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(80,0)");
	wrapG.append("text").text("Use Case Opportunity").style("fill", "#f27707").style("font-weight", "700").style("font-style", "Bold").attr("x",-50).attr("y", 25).style("font-size", "14px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 100).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("BDT / BDG - Genomics").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 15).style("font-size", "10px");
	wrapG.append("text").html("Sequencing Analytics ").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 25).style("font-size", "10px");
}

/*
 * ---- For Big Data View - Evaluate ideas for feasibilty under Innovate To
 * Commercialization Process ----------
 */

function InnovateToCommercialization21B(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 110),
			y : (step.link.y1 + step.useCase.link.y - 190)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "300px").attr("height", "180px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(80,0)");
	wrapG.append("text").text("Use Case (On Track)").style("fill", "#f27707").style("font-weight", "700").style("font-style", "Bold").attr("x",-50).attr("y", 25).style("font-size", "14px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 200).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("MPS V.Mueller - IMPRESS Analytics").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 15).style("font-size", "10px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",20).attr("y", 30).style("font-size", "10px");
	wrapG.append("text").html("create trending and predictive customer reports").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 30).style("font-size", "10px");
	wrapG.append("text").html("generated using data from IMPRESS systems").style("fill", "#404041").style("font-weight", "500").attr("x",35).attr("y", 40).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",20).attr("y", 55).style("font-size", "10px");
	wrapG.append("text").html("On-demand/Automated report generation").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 55).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",20).attr("y", 70).style("font-size", "10px");
	wrapG.append("text").html("Customer segmentation across multiple identifiers").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 70).style("font-size", "10px");
	wrapG.append("text").html("(Size, Region, GPO, Procedure type, Tray type, IDN)").style("fill", "#404041").style("font-weight", "500").attr("x",35).attr("y", 80).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",20).attr("y", 95).style("font-size", "10px");
	wrapG.append("text").html("Allow customers to define  - What does good look like").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 95).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",20).attr("y", 110).style("font-size", "10px");
	wrapG.append("text").html("Customized dashboards based on customer's desired fields").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 110).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",20).attr("y", 125).style("font-size", "10px");
	wrapG.append("text").html("Future State: Allow customers to pull their own dashboards").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 125).style("font-size", "10px");

}


/*
 * ---- For Big Data View - Develop Timeline under Innovate To Commercialization
 * Process ----------
 */

function InnovateToCommercialization31B(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 200),
			y : (step.link.y1 + step.useCase.link.y - 15)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "200px").attr("height", "70px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(80,0)");
	wrapG.append("text").text("Use Case Opportunity").style("fill", "#f27707").style("font-weight", "700").style("font-style", "Bold").attr("x",-50).attr("y", 25).style("font-size", "14px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 100).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("MMS Marketing Intelligence Tool").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 15).style("font-size", "10px");
	}


/*
 * ---- For Big Data View - Establish standards for launch and marketing plans
 * under Innovate To Commercialization Process ----------
 */

function InnovateToCommercialization32B(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x + 50),
			y : (step.link.y1 + step.useCase.link.y - 15)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "200px").attr("height", "60px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(80,0)");
	wrapG.append("text").text("Use Case Opportunity").style("fill", "#f27707").style("font-weight", "700").style("font-style", "Bold").attr("x",-50).attr("y", 25).style("font-size", "14px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 100).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Campaign Analytics - Marketo").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 15).style("font-size", "10px");
}

function ProductLineManagement31(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var gradient = svg.append("defs").append("linearGradient").attr("id",
	"gradient").attr("x1", "0%").attr("y1", "0%")
	.attr("x2", "100%").attr("y2", "100%").attr("spreadMethod",
			"pad");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x -250),
			y : (step.link.y1 + step.useCase.link.y -50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "250px").attr("height", "180px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	
	wrapG.append("image").attr("width", "20px").attr("height", "20px").attr("x", 100).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
		.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
		
	wrapG = cCanvas.append("g").attr("transform", "translate(0,20)");
	wrapG.append("image").attr("width", "60px").attr("height", "60px").attr("x", 20).attr("y", 0).attr("xlink:href", "img/assessments/imageProductLineManagement31.png");
	
	var text = wrapG.append("text").text("R&D Sustaining").attr("x", 100).attr("y", 20).style("fill", "#404041").style("font-size", "14px").style("font-weight", "bold").style("cursor", "pointer");
	var text = wrapG.append("text").text("Engineering").attr("x", 100).attr("y", 35).style("fill", "#404041").style("font-size", "14px").style("font-weight", "bold").style("cursor", "pointer");

	var text = wrapG.append("text").text("Keith Knapp").attr("x", 100).attr("y", 60).style("fill", "#404041").style("font-size", "11px").style("font-weight", "bold").style("cursor", "pointer");
	var text = wrapG.append("text").text("Sudarsan Srinivasan").attr("x", 100).attr("y", 75).style("fill", "#404041").style("font-size", "11px").style("font-weight", "bold").style("cursor", "pointer");
	
	wrapG.append("text").html("Automated software portal that automates").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 100).style("font-size", "10px");
	wrapG.append("text").html("the manual effort to analyze design inputs,").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 113).style("font-size", "10px");
	wrapG.append("text").html("gather relevant data from SAP, and update BD").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 126).style("font-size", "10px");
	wrapG.append("text").html("product labels. Reducing the process from 5").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 139).style("font-size", "10px");
	wrapG.append("text").html("Months to 4 Weeks for 8 Major Work Streams.").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 152).style("font-size", "10px");
}

function ItTransitionToOperationCI2UAmelia(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var gradient = svg.append("defs").append("linearGradient").attr("id",
	"gradient").attr("x1", "0%").attr("y1", "0%")
	.attr("x2", "100%").attr("y2", "100%").attr("spreadMethod",
			"pad");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 110),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "310px").attr("height", "310px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	
	wrapG.append("image").attr("width", "15px").attr("height", "15px").attr("x", 160).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
		.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
		
	wrapG = cCanvas.append("g").attr("transform", "translate(0,20)");
	wrapG.append("image").attr("width", "60px").attr("height", "60px").attr("x", 20).attr("y", 0).attr("xlink:href", "img/assessments/imageItTransitionToOperationCI2ItServiceDesk.png");
	
	var text = wrapG.append("text").text("IT Service Desk").attr("x", 100).attr("y", 20).style("fill", "#404041").style("font-size", "14px").style("font-weight", "bold").style("cursor", "pointer");
		
	var text = wrapG.append("text").text("Matt Avigliano").attr("x", 100).attr("y", 42).style("fill", "#404041").style("font-size", "11px").style("font-weight", "bold").style("cursor", "pointer");
	var text = wrapG.append("text").text("Mike LoRusso").attr("x", 100).attr("y", 54).style("fill", "#404041").style("font-size", "11px").style("font-weight", "bold").style("cursor", "pointer");
	var text = wrapG.append("text").text("Bob Shannon").attr("x", 100).attr("y", 66).style("fill", "#404041").style("font-size", "11px").style("font-weight", "bold").style("cursor", "pointer");
	
	wrapG.append("text").html("Deploying Amelia on Service Desk will absorb the high").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 85).style("font-size", "10px");
	wrapG.append("text").html("volume L1 queries, thus allowing BD to reduce the time and ").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 97).style("font-size", "10px");
	wrapG.append("text").html("overhead associated with Service Desk requests while").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 109).style("font-size", "10px");
	wrapG.append("text").html("improving end users experience.").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 121).style("font-size", "10px");

	wrapG.append("image").attr("width", "280px").attr("height", "60px").attr("x", 20).attr("y", 110).attr("xlink:href", "img/assessments/imageLineInsideFrame.png");

	wrapG = cCanvas.append("g").attr("transform", "translate(0,20)");
	wrapG.append("image").attr("width", "60px").attr("height", "60px").attr("x", 20).attr("y", 160).attr("xlink:href", "img/assessments/imageItTransitionToOperationCI2BDBardBack.png");
	wrapG.append("image").attr("width", "60px").attr("height", "60px").attr("x", 20).attr("y", 155).attr("xlink:href", "img/assessments/imageItTransitionToOperationCI2BDBardFore.png");
	
	var text = wrapG.append("text").text("BD-Bard Cross").attr("x", 100).attr("y", 175).style("fill", "#404041").style("font-size", "14px").style("font-weight", "bold").style("cursor", "pointer");
	var text = wrapG.append("text").text("Company Access").attr("x", 100).attr("y", 187).style("fill", "#404041").style("font-size", "14px").style("font-weight", "bold").style("cursor", "pointer");
	
	var text = wrapG.append("text").text("BD: Ryan Yardis").attr("x", 100).attr("y", 205).style("fill", "#404041").style("font-size", "11px").style("font-weight", "bold").style("cursor", "pointer");
	var text = wrapG.append("text").text("Bard: Michael Acque").attr("x", 100).attr("y", 218).style("fill", "#404041").style("font-size", "11px").style("font-weight", "bold").style("cursor", "pointer");
		
	wrapG.append("text").html("Deploying Amelia on Service Desk will absorb the high").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 235).style("font-size", "10px");
	wrapG.append("text").html("volume L1 queries, thus allowing BD to reduce the time and ").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 247).style("font-size", "10px");
	wrapG.append("text").html("overhead associated with Service Desk requests while").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 259).style("font-size", "10px");
	wrapG.append("text").html("improving end users experience.").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 271).style("font-size", "10px");
}

/*
 * ---- For Big Data View - Update forcast based on performance under Plan To
 * Forecast Process ----------
 */

function PlanToForecast71B(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 90),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "220px").attr("height", "90px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(80,0)");
	wrapG.append("text").text("Use Case Opportunity").style("fill", "#f27707").style("font-weight", "700").style("font-style", "Bold").attr("x",-50).attr("y", 25).style("font-size", "14px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 120).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Eight Quarter Forecast -").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",30).attr("y", 15).style("font-size", "11px");
	wrapG.append("text").html("Predict shift in raw material spend").style("fill", "#404041").style("font-weight", "500").attr("x",30).attr("y", 27).style("font-size", "11px");
	wrapG.append("text").html("due to movement in spot and").style("fill", "#404041").style("font-weight", "500").attr("x",30).attr("y", 37).style("font-size", "11px");
	wrapG.append("text").html("future prices for commodities").style("fill", "#404041").style("font-weight", "500").attr("x",30).attr("y", 47).style("font-size", "11px");
	}

/*
 * ---- For Big Data View - Prepare and review GL account reconcillations under
 * Record To Report Process ----------
 */

function RecordToReport52B(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 225),
			y : (step.link.y1 + step.useCase.link.y - 20)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "220px").attr("height", "75px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(80,0)");
	wrapG.append("text").text("Use Case Opportunity").style("fill", "#f27707").style("font-weight", "700").style("font-style", "Bold").attr("x",-50).attr("y", 25).style("font-size", "14px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 120).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Accounts Receivables -").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",30).attr("y", 15).style("font-size", "11px");
	wrapG.append("text").html("Creating a global view incorporating").style("fill", "#404041").style("font-weight", "500").attr("x",30).attr("y", 27).style("font-size", "11px");
	wrapG.append("text").html("various rules and processes").style("fill", "#404041").style("font-weight", "500").attr("x",30).attr("y", 37).style("font-size", "11px");
	}

/*
 * ---- For Big Data View - Prepare and review GL account reconcillations under
 * Record To Report Process ----------
 */

function RecordToReport62B(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x + 50),
			y : (step.link.y1 + step.useCase.link.y - 20)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "220px").attr("height", "90px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(80,0)");
	wrapG.append("text").text("Use Case Opportunity").style("fill", "#f27707").style("font-weight", "700").style("font-style", "Bold").attr("x",-50).attr("y", 25).style("font-size", "14px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 120).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Internal Audit - Topic Discovery").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",30).attr("y", 15).style("font-size", "11px");
	wrapG.append("text").html("on Manual G/L entries, using").style("fill", "#404041").style("font-weight", "500").attr("x",30).attr("y", 27).style("font-size", "11px");
	wrapG.append("text").html("machine learning to identify").style("fill", "#404041").style("font-weight", "500").attr("x",30).attr("y", 37).style("font-size", "11px");
	wrapG.append("text").html("potential risks").style("fill", "#404041").style("font-weight", "500").attr("x",30).attr("y", 47).style("font-size", "11px");
	}

/*
 * ---- For Big Data View - Manage Portfolio under Plan To Delivery Process
 * ----------
 */

function PlanToDelivery21B(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 80),
			y : (step.link.y1 + step.useCase.link.y - 85)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "205px").attr("height", "65px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(80,0)");
	wrapG.append("text").text("Use Case Oppurtunity").style("fill", "#f27707").style("font-weight", "700").style("font-style", "Bold").attr("x",-50).attr("y", 25).style("font-size", "15px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 105).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Inventory Management").style("fill", "#404041").style("font-weight", "550").style("font-style", "Bold").attr("x",25).attr("y", 15).style("font-size", "12px");
}


/*
 * ---- For Big Data View - Plan and manage inbound material flow under Plan To Delivery Process
 * ----------
 */

function PlanToDelivery61B(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 80),
			y : (step.link.y1 + step.useCase.link.y - 85)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "205px").attr("height", "65px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(80,0)");
	wrapG.append("text").text("Use Case Oppurtunity").style("fill", "#f27707").style("font-weight", "700").style("font-style", "Bold").attr("x",-50).attr("y", 25).style("font-size", "15px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 105).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Back Order Management").style("fill", "#404041").style("font-weight", "550").style("font-style", "Bold").attr("x",25).attr("y", 15).style("font-size", "12px");
}


/*
 * ---- For Big Data View - Develop Forecast under Plan To Delivery Process
 * ----------
 */

function PlanToDelivery11B(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 210),
			y : (step.link.y1 + step.useCase.link.y - 10)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "205px").attr("height", "65px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(80,0)");
	wrapG.append("text").text("Use Case Oppurtunity").style("fill", "#f27707").style("font-weight", "700").style("font-style", "Bold").attr("x",-50).attr("y", 25).style("font-size", "15px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 105).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("MPS - Injection Systems").style("fill", "#404041").style("font-weight", "500").style("font-style", "Bold").attr("x",25).attr("y", 15).style("font-size", "11px");
	wrapG.append("text").html("Forecast Accuracy").style("fill", "#404041").style("font-weight", "500").style("font-style", "Bold").attr("x",25).attr("y", 25).style("font-size", "11px");
	
	wrapG.append("image").attr("width", "112px").attr("height", "85px").attr("x",25).attr("y", -120).attr("xlink:href", "img/assessments/imagePlanToDelivery11B.png");
}


/*
 * ---- For Big Data View - Outbound Logistics under Plan To Delivery Process
 * ----------
 */

function PlanToDelivery7B(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x + 50),
			y : (step.link.y1 + step.useCase.link.y - 70)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "275px").attr("height", "140px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(80,0)");
	wrapG.append("text").text("Use Case (POC Complete)").style("fill", "#f27707").style("font-weight", "700").style("font-style", "Bold").attr("x",-50).attr("y", 25).style("font-size", "15px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 175).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("End-to-End Supply Chain Network Visibility").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",25).attr("y", 15).style("font-size", "11px");
	
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",20).attr("y", 30).style("font-size", "10px");
	wrapG.append("text").html("Daily global inventory snapshots").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 30).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",20).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("Target stock vs. actual stock").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 45).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",20).attr("y", 60).style("font-size", "10px");
	wrapG.append("text").html("Low or zero stock alerts").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 60).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",20).attr("y", 75).style("font-size", "10px");
	wrapG.append("text").html("Global month to date orders").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 75).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",20).attr("y", 90).style("font-size", "10px");
	wrapG.append("text").html("Inventory status visibility (Unrestricted,").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 90).style("font-size", "10px");
	wrapG.append("text").html("Blocked, Quality Hold, Restricted)").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 100).style("font-size", "10px");

	wrapG.append("image").attr("width", "162px").attr("height", "109px").attr("x",90).attr("y", 115).attr("xlink:href", "img/assessments/imagePlanToDelivery7B.png");
}

/*
 * ---- For Big Data View - Plan for and implement modifications under Product Line Management
 * ----------
 */

function ProductLineManagement31B(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x + 50),
			y : (step.link.y1 + step.useCase.link.y - 70)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "225px").attr("height", "110px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(80,0)");
	wrapG.append("text").text("Use Case (On Track)").style("fill", "#f27707").style("font-weight", "700").style("font-style", "Bold").attr("x",-50).attr("y", 25).style("font-size", "15px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 125).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("MES - Control Charts").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",25).attr("y", 15).style("font-size", "11px");
	
	wrapG.append("text").html("Identifying machines or lines not").style("fill", "#404041").style("font-weight", "500").attr("x", 25).attr("y", 30).style("font-size", "10px");
	wrapG.append("text").html("operating within normal control limits").style("fill", "#404041").style("font-weight", "500").attr("x", 25).attr("y", 40).style("font-size", "10px");
	wrapG.append("text").html("for good quantity, scrap, downtime and").style("fill", "#404041").style("font-weight", "500").attr("x", 25).attr("y", 50).style("font-size", "10px");
	wrapG.append("text").html("process parameters and predicting").style("fill", "#404041").style("font-weight", "500").attr("x", 25).attr("y", 60).style("font-size", "10px");
	wrapG.append("text").html("which machines are at risk of failing.").style("fill", "#404041").style("font-weight", "500").attr("x", 25).attr("y", 70).style("font-size", "10px");

	wrapG.append("image").attr("width", "160").attr("height", "80").attr("x",50).attr("y", 82).attr("xlink:href", "img/assessments/imageProductLineManagement31B.png");
}

/*
 * ---- For Big Data View - Inbound Logistics and Warehousing under Plan To Delivery Process
 * ----------
 */

function PlanToDelivery6B(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 100),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "235px").attr("height", "110px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(80,0)");
	wrapG.append("text").text("Use Case Opportunity").style("fill", "#f27707").style("font-weight", "700").style("font-style", "Bold").attr("x",-50).attr("y", 25).style("font-size", "15px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 135).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Situational Analysis Data Gathering").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",25).attr("y", 15).style("font-size", "11px");
	
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",20).attr("y", 30).style("font-size", "10px");
	wrapG.append("text").html("Quick and accurate").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 30).style("font-size", "10px");
	wrapG.append("text").html("Reconcile by material / batch").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 40).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",20).attr("y", 55).style("font-size", "10px");
	wrapG.append("text").html("Where stocked (WW)").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 55).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",20).attr("y", 70).style("font-size", "10px");
	wrapG.append("text").html("Where stocked (WW)").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 70).style("font-size", "10px");

}

/*
 * ---- For Big Data View - Inbound Logistics and Warehousing under Plan To Delivery Process
 * ----------
 */

function PlanToDelivery13B(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 150),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "225px").attr("height", "130px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(80,0)");
	wrapG.append("text").text("Use Case Opportunity").style("fill", "#f27707").style("font-weight", "700").style("font-style", "Bold").attr("x",-50).attr("y", 25).style("font-size", "15px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 125).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("DC Workload Forecasting & Metrics").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",25).attr("y", 15).style("font-size", "11px");
	
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",20).attr("y", 30).style("font-size", "10px");
	wrapG.append("text").html("Inbound receiving forecasts").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 30).style("font-size", "10px");
	wrapG.append("text").html("by truckload").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 40).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",20).attr("y", 55).style("font-size", "10px");
	wrapG.append("text").html("Outbound shipping forecasts").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 55).style("font-size", "10px");
	wrapG.append("text").html("by case").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 65).style("font-size", "10px");
	
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",20).attr("y", 80).style("font-size", "10px");
	wrapG.append("text").html("Inbound receiving").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 80).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",20).attr("y", 95).style("font-size", "10px");
	wrapG.append("text").html("Outbound shipping").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 95).style("font-size", "10px");

}

/*
 * ---- For Process Orchestration View - Procure To Pay Process
 * ----------
 */

function ProcureToPayPO(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 80),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "180px").attr("height", "130px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(0,0)");
	wrapG.append("text").html("Global Process Owner:").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 20).style("font-size", "12px");
	wrapG.append("text").html("Roger Ambrose").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",35).attr("y", 35).style("font-size", "12px");

	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 165).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG.append("image").attr("width", "180px").attr("height", "60px").attr("x", 0).attr("y", 20).attr("xlink:href", "img/assessments/imageLineInsideFramePO.png");
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Stage 1: Complete").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 35).style("font-size", "10px");
	wrapG.append("text").html("Stage 2: Start Date TBD").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 50).style("font-size", "10px");
	wrapG.append("text").html("Stage 3: TBD").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 65).style("font-size", "10px");
	wrapG.append("text").html("Stage 4: TBD").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 80).style("font-size", "10px");
	
}


/*
 * ---- For Process Orchestration View - Quote To Cash Process
 * ----------
 */

function QuoteToCashPO(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 80),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "180px").attr("height", "130px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(0,0)");
	wrapG.append("text").html("Global Process Owner:").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 20).style("font-size", "12px");
	//wrapG.append("text").html(" ").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",35).attr("y", 35).style("font-size", "12px");

	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 165).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG.append("image").attr("width", "180px").attr("height", "60px").attr("x", 0).attr("y", 20).attr("xlink:href", "img/assessments/imageLineInsideFramePO.png");
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Stage 1: EU Only").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 35).style("font-size", "10px");
	wrapG.append("text").html("Stage 2: TBD").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 50).style("font-size", "10px");
	wrapG.append("text").html("Stage 3: TBD").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 65).style("font-size", "10px");
	wrapG.append("text").html("Stage 4: TBD").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 80).style("font-size", "10px");
}


/*
 * ---- For Process Orchestration View - IT Design To Build Process
 * ----------
 */

function ITDesignToBuildPO(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 80),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "180px").attr("height", "130px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(0,0)");
	wrapG.append("text").html("Global Process Owner:").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 20).style("font-size", "12px");
	wrapG.append("text").html("Michele Cevoli").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",35).attr("y", 35).style("font-size", "12px");

	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 165).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG.append("image").attr("width", "180px").attr("height", "60px").attr("x", 0).attr("y", 20).attr("xlink:href", "img/assessments/imageLineInsideFramePO.png");
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Stage 1: In Process").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 35).style("font-size", "10px");
	wrapG.append("text").html("Stage 2: TBD").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 50).style("font-size", "10px");
	wrapG.append("text").html("Stage 3: TBD").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 65).style("font-size", "10px");
	wrapG.append("text").html("Stage 4: TBD").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 80).style("font-size", "10px");
}

/*
 * ---- For Process Orchestration View - Talent Planning Acquisition Process
 * ----------
 */

function TalentPlanningAcquisitionPO(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 80),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "180px").attr("height", "130px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(0,0)");
	wrapG.append("text").html("Global Process Owner:").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 20).style("font-size", "12px");
	wrapG.append("text").html("Lisa King").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",35).attr("y", 35).style("font-size", "12px");

	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 165).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG.append("image").attr("width", "180px").attr("height", "60px").attr("x", 0).attr("y", 20).attr("xlink:href", "img/assessments/imageLineInsideFramePO.png");
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Stage 1: Complete").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 35).style("font-size", "10px");
	wrapG.append("text").html("Stage 2: Start Date TBD").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 50).style("font-size", "10px");
	wrapG.append("text").html("Stage 3: TBD").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 65).style("font-size", "10px");
	wrapG.append("text").html("Stage 4: TBD").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 80).style("font-size", "10px");
}

/*
 * ---- For Process Orchestration View - Hire To Retire Process
 * ----------
 */

function HireToRetirePO(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 80),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "180px").attr("height", "130px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(0,0)");
	wrapG.append("text").html("Global Process Owner:").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 20).style("font-size", "12px");
	wrapG.append("text").html("Lisa King").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",35).attr("y", 35).style("font-size", "12px");

	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 165).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG.append("image").attr("width", "180px").attr("height", "60px").attr("x", 0).attr("y", 20).attr("xlink:href", "img/assessments/imageLineInsideFramePO.png");
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Stage 1: Complete").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 35).style("font-size", "10px");
	wrapG.append("text").html("Stage 2: Start Date TBD").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 50).style("font-size", "10px");
	wrapG.append("text").html("Stage 3: TBD").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 65).style("font-size", "10px");
	wrapG.append("text").html("Stage 4: TBD").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 80).style("font-size", "10px");
}

/*
 * ---- For Process Orchestration View - Plan To Forecast Process
 * ----------
 */

function PlanToForecastPO(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 80),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "180px").attr("height", "130px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(0,0)");
	wrapG.append("text").html("Global Process Owner:").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 20).style("font-size", "12px");
	//wrapG.append("text").html("Lisa King").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",35).attr("y", 35).style("font-size", "12px");

	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 165).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG.append("image").attr("width", "180px").attr("height", "60px").attr("x", 0).attr("y", 20).attr("xlink:href", "img/assessments/imageLineInsideFramePO.png");
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Stage 1: Complete").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 35).style("font-size", "10px");
	wrapG.append("text").html("Stage 2: In Process").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 50).style("font-size", "10px");
	wrapG.append("text").html("Stage 3: TBD").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 65).style("font-size", "10px");
	wrapG.append("text").html("Stage 4: TBD").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 80).style("font-size", "10px");
}

/*
 * ---- For Process Orchestration View - Record To Report(Consolidations) Process
 * ----------
 */

function RecordToReportPO(step) {	
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	
	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 70),
			y : (step.link.y1 + step.useCase.link.y - 150)
		};
	
	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
	
	cCanvas.append("rect").attr("width", "180px").attr("height", "140px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");
	
	var wrapG = cCanvas.append("g").attr("transform", "translate(0,0)");
	wrapG.append("text").html("Global Process Owner:").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 20).style("font-size", "12px");
	//wrapG.append("text").html("Lisa King").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",35).attr("y", 35).style("font-size", "12px");

	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 165).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});
	
	wrapG.append("image").attr("width", "180px").attr("height", "60px").attr("x", 0).attr("y", 20).attr("xlink:href", "img/assessments/imageLineInsideFramePO.png");
	
	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Stage 1: Consolidations").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 35).style("font-size", "10px");
	wrapG.append("text").html(" - In Process").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 50).style("font-size", "10px");
	wrapG.append("text").html("Stage 2: TBD").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 65).style("font-size", "10px");
	wrapG.append("text").html("Stage 3: TBD").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 80).style("font-size", "10px");
	wrapG.append("text").html("Stage 4: TBD").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 95).style("font-size", "10px");
}