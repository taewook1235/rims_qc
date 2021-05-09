
let Data = {};

Data.opNumber = "Not Input";
Data.docName = "Not Input";
Data.affiliation = "Not Input";
Data.department = "Not Input"; 
Data.species = "Not Input"; 
Data.breeds = "Not Input"; 
Data.patientName = "Not Input";
Data.patientAge = "Not Input";
Data.AgeYearOrMonth = "Not Input"; 
Data.patientSex = "Not Input"; 
Data.patientWeight = "Not Input";
Data.weightKgOrLb = "Not Input"; 
Data.needleGause = "Not Input";
Data.needleLength = "Not Input"; 
Data.insertForce = 0; 
Data.insertLength = 0; 
Data.totalCount = 1; 
Data.dataPoints = []; 
Data.maxDistance = 75;
Data.difference = 60; 
Data.slope = 400; 
Data.insertAngle = 20; 
Data.insertSite = "Not Input"; 
Data.patientPos = "Not Input"; 
Data.remark = "Not Input"; 

initSessionData();

function initSessionData(){
    let vetpia = sessionStorage.getItem("vetpia");
    if (vetpia == null){
        let today = new Date();
        console.log(today);
        const opNumber = "VET" + today.getTime();
        console.log(opNumber);  
        Data["opNumber"] = opNumber; 
        sessionStorage.setItem("vetpia",JSON.stringify(Data)); 
    }
        else
    {
        let today = new Date();
        const opNumber = "VET" + today.getTime();
        Data["opNumber"] = opNumber; 
        sessionStorage.setItem("vetpia",JSON.stringify(Data));
        Data =  JSON.parse(vetpia);
    }
}

function navigateTo(outcome, useAjax) {
    Apperyio.navigateTo(outcome, useAjax);
}

function adjustContentHeight() {
    Apperyio.adjustContentHeightWithPadding();
}

function adjustContentHeightWithPadding(_page) {
    Apperyio.adjustContentHeightWithPadding(_page);
}

function setDetailContent(pageUrl) {
    Apperyio.setDetailContent(pageUrl);
}
Apperyio.AppPages = [{
    "name": "after",
    "location": "after.html"
}, {
    "name": "main",
    "location": "main.html"
}, {
    "name": "report",
    "location": "report.html"
}, {
    "name": "before",
    "location": "before.html"
}, {
    "name": "start",
    "location": "start.html"
}];

function main_js() {
    var n2id_buf = {
        'main_navbar': 'main_main_navbar',
        'navbar_home_item': 'main_navbar_home_item',
        'navbar_before_item': 'main_navbar_before_item',
        'navbar_start_item': 'main_navbar_start_item',
        'navbar_after_item': 'main_navbar_after_item',
        'navbar_report_item': 'main_navbar_report_item',
        'mobileworkarea_10': 'main_mobileworkarea_10',
        'main_grid': 'main_main_grid',
        'main_grid_cell_input': 'main_main_grid_cell_input',
        'main_title': 'main_main_title',
        'lbl_doctorname': 'main_lbl_doctorname',
        'input_doctorname': 'main_input_doctorname',
        'lbl_hospitalname': 'main_lbl_hospitalname',
        'input_hospitalname': 'main_input_hospitalname',
        'lbl_depart': 'main_lbl_depart',
        'input_depart': 'main_input_depart',
        'main_grid_cell_btn': 'main_main_grid_cell_btn',
        'main_grid_cell_btn_cancel': 'main_main_grid_cell_btn_cancel',
        'btn_doctor_con': 'main_btn_doctor_con',
        'main_grid_cell_btn_con': 'main_main_grid_cell_btn_con',
        'btn_doctor_cancel': 'main_btn_doctor_cancel',
        'doc_popup': 'main_doc_popup',
        'pop_lbl_doctorname': 'main_pop_lbl_doctorname',
        'mobilelabel_13': 'main_mobilelabel_13'
    };
    if ("n2id" in window && window.n2id !== undefined) {
        $.extend(n2id, n2id_buf);
    } else {
        window.n2id = n2id_buf;
    }
    Apperyio.CurrentScreen = 'main';
    
    _.chain(Apperyio.mappings)
        .filter(function(m) {
            return m.homeScreen === Apperyio.CurrentScreen;
        })
        .each(Apperyio.UIHandler.hideTemplateComponents);
    var main_onLoad = function() {
        main_elementsExtraJS();
        Apperyio('main_grid').css('margin', 'auto');
        Apperyio('main_grid').css('margin-top', '50px');
        main_deviceEvents();
        main_windowEvents();
        main_elementsEvents();
    };

    function main_windowEvents() {
        $('#main').bind('pageshow orientationchange', function() {
            var _page = this;
            adjustContentHeightWithPadding(_page);
        });
    };

    function main_deviceEvents() {
        document.addEventListener("deviceready", function() {
        });
    };

    function main_elementsExtraJS() {
        $("#main_doc_popup").popup("option", "positionTo", "window");
        
    };

    function main_elementsEvents() {
        $(document).on("click", "a :input,a a,a fieldset label", function(event) {
            event.stopPropagation();
        });
        $(document).off("click", '#main_rim_header [name="navbar_home_item"]').on({
            click: function(event) {
                if (!$(this).attr('disabled')) {
                    Apperyio.navigateTo('main', {
                        transition: 'slide',
                        reverse: false
                    });
                }
            },
        }, '#main_rim_header [name="navbar_home_item"]');
        $(document).off("click", '#main_rim_header [name="navbar_before_item"]').on({
            click: function(event) {
                if (!$(this).attr('disabled')) {
                    Apperyio.navigateTo('before', {
                        transition: 'slide',
                        reverse: false
                    });
                }
            },
        }, '#main_rim_header [name="navbar_before_item"]');
        $(document).off("click", '#main_rim_header [name="navbar_start_item"]').on({
            click: function(event) {
                if (!$(this).attr('disabled')) {
                    Apperyio.navigateTo('start', {
                        transition: 'slide',
                        reverse: false
                    });
                }
            },
        }, '#main_rim_header [name="navbar_start_item"]');
        $(document).off("click", '#main_rim_header [name="navbar_after_item"]').on({
            click: function(event) {
                if (!$(this).attr('disabled')) {
                    Apperyio.navigateTo('after', {
                        transition: 'slide',
                        reverse: false
                    });
                }
            },
        }, '#main_rim_header [name="navbar_after_item"]');
        $(document).off("click", '#main_rim_header [name="navbar_report_item"]').on({
            click: function(event) {
                if (!$(this).attr('disabled')) {
                    Apperyio.navigateTo('report', {
                        transition: 'slide',
                        reverse: false
                    });
                }
            },
        }, '#main_rim_header [name="navbar_report_item"]');
        $(document).off("click", '#main_rim_container [name="btn_doctor_con"]').on({
            click: function(event) {
                if (!$(this).attr('disabled')) {
                    var doctorName = $("#main_input_doctorname").val();
                    var hospitalName = $("#main_input_hospitalname").val();
                    var departName = $("#main_input_depart").val();
                    if(doctorName&&hospitalName&&departName){
                        $("#popupConfirm").popup("open");
                    }
                    else{
                        $("#popupEmpty").popup("open");
                    }
                }
            },
        }, '#main_rim_container [name="btn_doctor_con"]');
        $(document).off("click", '#btn_restore_confirm').on({
            click: function(event) {
                if (!$(this).attr('disabled')) {
                    Data.docName = $("#main_input_doctorname").val();
                    Data.affiliation = $("#main_input_hospitalname").val();
                    Data.department = $("#main_input_depart").val(); 
                    sessionStorage.setItem("vetpia",JSON.stringify(Data));
                    Apperyio.navigateTo('before', {
                        transition: 'slide',
                        reverse: false
                    });
                }
            },
        }, '#btn_restore_confirm');
        $(document).off("click", '#main_rim_container [name="btn_doctor_cancel"]').on({
            click: function(event) {
                if (!$(this).attr('disabled')) {
                    try {
                        $a.c15r("input_doctorname", "set", "text", ' ')
                    } catch (e) {
                        console.error(e)
                    };
                    try {
                        $a.c15r("input_hospitalname", "set", "text", ' ')
                    } catch (e) {
                        console.error(e)
                    };
                    try {
                        $a.c15r("input_depart", "set", "text", ' ')
                    } catch (e) {
                        console.error(e)
                    };
                }
            },
        }, '#main_rim_container [name="btn_doctor_cancel"]');
    };
    
    $(document).off("pagebeforeshow", "#main").on("pagebeforeshow", "#main", function(event, ui) {
        Apperyio.CurrentScreen = "main";
        _.chain(Apperyio.mappings)
            .filter(function(m) {
                return m.homeScreen === Apperyio.CurrentScreen;
            })
            .each(Apperyio.UIHandler.hideTemplateComponents);
    });
    
    main_onLoad();
};

$(document).off("pagecreate", "#main").on("pagecreate", "#main", function(event, ui) {
    Apperyio.processSelectMenu($(this));
    main_js();
});

$(document).ready(function() {
    $("#main_input_doctorname").focus();
});