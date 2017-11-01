var app = require("../../app");
var modulesGraph = require("../../graphs/modules");
var chunkTemplate=require("./chunk.jade");
var tableModulesTemplate=require("./tableModules.jade");

module.exports = function(id) {
	id = parseInt(id, 10);
	document.title = "chunk " + id;
	var chunkData=app.mapChunks[id];

	$(".page").html(chunkTemplate({
		stats: app.stats,
		id: id,
		chunk: chunkData
	}));
	var isAscend=false;
    $(document).on('click','th.sortable-th',function () {
        if(isAscend){
            chunkData.modules=chunkData.modules.sort(fnSortAscend);
            $("#tableModulesCan").html(tableModulesTemplate({
                chunk:chunkData
            }));
		}else{
            chunkData.modules=chunkData.modules.sort(fnSortDescend);
            $("#tableModulesCan").html(tableModulesTemplate({
                chunk:chunkData
            }));
		}
        isAscend=!isAscend;
	});

    // $('th.sortable-th').toggle(function(){alert(1)
    //     chunkData.modules=chunkData.modules.sort(fnSortAscend);
    //     $("#tableModulesCan").html(tableModulesTemplate({
    //         chunk:chunkData
    //     }));
    //     $('th.sortable-th').toggle(true)
    // },function(){alert(2)
    //     chunkData.modules=chunkData.modules.sort(fnSortDescend);
    //     $("#tableModulesCan").html(tableModulesTemplate({
    //         chunk:chunkData
    //     }));
    //     $('th.sortable-th').toggle(true)
    // });
	modulesGraph.show();
	modulesGraph.setActiveChunk(id);
	return function() {
		modulesGraph.hide();
	}
};

function fnSortAscend(a, b) {
    if (a.size > b.size) {
        return 1;
    }
    if (a.size < b.size) {
        return -1;
    }
    // a 必须等于 b
    return 0;
}

function fnSortDescend(a, b) {
    if (a.size > b.size) {
        return -1;
    }
    if (a.size < b.size) {
        return 1;
    }
    // a 必须等于 b
    return 0;
}
