initSessionData(); 

function initSessionData(){
    let vetpia = sessionStorage.getItem("vetpia");
        console.log(vetpia);
    if (vetpia == null){
        let today = new Date();
        console.log(today);
        const opNumber = "VET" + today.getTime();
        console.log(opNumber);  
        Data["opNumber"] = opNumber; 
        sessionStorage.setItem("vetpia",JSON.stringify(Data)); 
    }
        else
        Data =  JSON.parse(vetpia); 
    
        console.log(Data);
}

Apperyio.getProjectGUID = function() {
    return 'a1336f56-f818-419e-a907-cd345a9b01a4';
};

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

function after_js() {
   
    var n2id_buf = {
        'main_navbar': 'after_main_navbar',
        'navbar_home_item': 'after_navbar_home_item',
        'navbar_before_item': 'after_navbar_before_item',
        'navbar_start_item': 'after_navbar_start_item',
        'navbar_after_item': 'after_navbar_after_item',
        'navbar_report_item': 'after_navbar_report_item',
        'mobileworkarea_10': 'after_mobileworkarea_10',
        'main_grid': 'after_main_grid',
        'main_grid_cell_input': 'after_main_grid_cell_input',
        'main_title': 'after_main_title',
        'lbl_insertlength': 'after_lbl_insertlength',
        'input_insertlength': 'after_input_insertlength',
        'lbl_insertangle': 'after_lbl_insertangle',
        'slide_insertangle': 'after_slide_insertangle',
        'lbl_insertposition': 'after_lbl_insertposition',
        'input_insertposition': 'after_input_insertposition',
        'input_insertposition-0': 'after_input_insertposition-0',
        'lbl_patientpose': 'after_lbl_patientpose',
        'sel_patientpose': 'after_sel_patientpose',
        'sel_patientpose-0': 'after_sel_patientpose-0',
        'lbl_totalcount': 'after_lbl_totalcount',
        'input_totalcount': 'after_input_totalcount',
        'lbl_trialtime': 'after_lbl_trialtime',
        'input_trialtime': 'after_input_trialtime',
        'lbl_pitch': 'after_lbl_pitch',
        'input_pitch': 'after_input_pitch',
        'lbl_difference': 'after_lbl_difference',
        'input_difference': 'after_input_difference',
        'lbl_slope': 'after_lbl_slope',
        'input_slope': 'after_input_slope',
        'main_grid_cell_btn': 'after_main_grid_cell_btn',
        'main_grid_cell_btn_cancel': 'after_main_grid_cell_btn_cancel',
        'btn_doctor_con': 'after_btn_doctor_con',
        'main_grid_cell_btn_con': 'after_main_grid_cell_btn_con',
        'btn_doctor_cancel': 'after_btn_doctor_cancel'
    };
    if ("n2id" in window && window.n2id !== undefined) {
        $.extend(n2id, n2id_buf);
    } else {
        window.n2id = n2id_buf;
    }
    
    Apperyio.mappings = Apperyio.mappings || {};
    Apperyio.datasources = Apperyio.datasources || {};
    Apperyio.CurrentScreen = 'after';
    _.chain(Apperyio.mappings)
        .filter(function(m) {
            return m.homeScreen === Apperyio.CurrentScreen;
        })
        .each(Apperyio.UIHandler.hideTemplateComponents);
    var after_onLoad = function() {
        after_elementsExtraJS();
        Apperyio('main_grid').css('margin', 'auto');
        Apperyio('main_grid').css('margin-top', '50px');
        after_deviceEvents();
        after_windowEvents();
        after_elementsEvents();
    };

    function after_windowEvents() {
        $('#after').bind('pageshow orientationchange', function() {
            var _page = this;
            adjustContentHeightWithPadding(_page);
        });
    };

    function after_deviceEvents() {
        document.addEventListener("deviceready", function() {
        });
    };

    function after_elementsExtraJS() {
        $("#after_sel_patientpose").parent().find("a.ui-btn").attr("tabindex", "3");
    };

    function after_elementsEvents() {
        $(document).on("click", "a :input,a a,a fieldset label", function(event) {
            event.stopPropagation();
        });
        $(document).off("click", '#after_rim_header [name="navbar_home_item"]').on({
            click: function(event) {
                if (!$(this).attr('disabled')) {
                    Apperyio.navigateTo('main', {
                        transition: 'slide',
                        reverse: false
                    });
                }
            },
        }, '#after_rim_header [name="navbar_home_item"]');
        $(document).off("click", '#after_rim_header [name="navbar_before_item"]').on({
            click: function(event) {
                if (!$(this).attr('disabled')) {
                    Apperyio.navigateTo('before', {
                        transition: 'slide',
                        reverse: false
                    });
                }
            },
        }, '#after_rim_header [name="navbar_before_item"]');
        $(document).off("click", '#after_rim_header [name="navbar_start_item"]').on({
            click: function(event) {
                if (!$(this).attr('disabled')) {
                    Apperyio.navigateTo('start', {
                        transition: 'slide',
                        reverse: false
                    });
                }
            },
        }, '#after_rim_header [name="navbar_start_item"]');
        $(document).off("click", '#after_rim_header [name="navbar_after_item"]').on({
            click: function(event) {
                if (!$(this).attr('disabled')) {
                    Apperyio.navigateTo('after', {
                        transition: 'slide',
                        reverse: false
                    });
                }
            },
        }, '#after_rim_header [name="navbar_after_item"]');
        $(document).off("click", '#after_rim_header [name="navbar_report_item"]').on({
            click: function(event) {
                if (!$(this).attr('disabled')) {
                    Apperyio.navigateTo('report', {
                        transition: 'slide',
                        reverse: false
                    });
                }
            },
        }, '#after_rim_header [name="navbar_report_item"]');
        $(document).off("click", '#after_rim_container [name="btn_doctor_con"]').on({
            click: function(event) {
                if (!$(this).attr('disabled')) {
                    Data.insertAngle = $("#after_slide_insertangle").val();
                    Data.insertSite = $("#after_input_insertposition").val(); 
                    Data.patientPos = $("#after_sel_patientpose").val();
                    Data.remark = $("#input_remark").val();
                    sessionStorage.setItem("vetpia",JSON.stringify(Data));
                    Apperyio.navigateTo('report', {
                        transition: 'slide',
                        reverse: false
                    });
                }
            },
        }, '#after_rim_container [name="btn_doctor_con"]');
        $(document).off("click", '#after_rim_container [name="btn_doctor_cancel"]').on({
            click: function(event) {
                if (!$(this).attr('disabled')) {
                    setAttribute_('after_slide_insertangle', 'value', '20');
                    $('[id="after_slide_insertangle"]').refresh();
                    setAttribute_('after_input_insertposition', 'value', 'L1~L2');
                    $('[id="after_input_insertposition"]').refresh();
                    setAttribute_('after_sel_patientpose', 'selectedIndex', 'IateralDecubitus');
                    $('[id="after_sel_patientpose"]').refresh();
                }
            },
        }, '#after_rim_container [name="btn_doctor_cancel"]');
    };
    $(document).off("pagebeforeshow", "#after").on("pagebeforeshow", "#after", function(event, ui) {
        Apperyio.CurrentScreen = "after";
        _.chain(Apperyio.mappings)
            .filter(function(m) {
                return m.homeScreen === Apperyio.CurrentScreen;
            })
            .each(Apperyio.UIHandler.hideTemplateComponents);
    });
    after_onLoad();
};
$(document).off("pagecreate", "#after").on("pagecreate", "#after", function(event, ui) {
    Apperyio.processSelectMenu($(this));
    after_js();
    var ticks  = '<div class="sliderTickmarks"><span>20</span></div>';
    ticks += '<div class="sliderTickmarks"><span>40</span></div>';
    ticks += '<div class="sliderTickmarks"><span>60</span></div>';
    ticks += '<div class="sliderTickmarks"><span>80</span></div>';
    ticks += '<div class="sliderTickmarks"><span>100</span></div>';
    ticks += '<div class="sliderTickmarks"><span>120</span></div>';
    ticks += '<div class="sliderTickmarks"><span>140</span></div>';
    ticks += '<div class="sliderTickmarks"><span>160</span></div>';
    ticks += '<div class="sliderTickmarks"><span>180</span></div>';
    $(".after_slide_insertangle .ui-slider-track").prepend(ticks);
});

$(document).off("pageshow", "#after").on("pageshow", "#after", function(event, ui) {
            
    var arrNeedleLength = Data.dataPoints;
    if ( arrNeedleLength == null){
        
    }
    else {
        var arrLengLast = (arrNeedleLength.length)-1;
        var insertLeng = arrNeedleLength[arrLengLast].x;
        $("#after_input_insertlength").val(insertLeng);

    }
});
