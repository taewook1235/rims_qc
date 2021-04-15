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

function before_js() {
    
    var n2id_buf = {
        'main_navbar': 'before_main_navbar',
        'navbar_home_item': 'before_navbar_home_item',
        'navbar_before_item': 'before_navbar_before_item',
        'navbar_start_item': 'before_navbar_start_item',
        'navbar_after_item': 'before_navbar_after_item',
        'navbar_report_item': 'before_navbar_report_item',
        'mobileworkarea_10': 'before_mobileworkarea_10',
        'main_grid': 'before_main_grid',
        'main_grid_cell_input': 'before_main_grid_cell_input',
        'main_title': 'before_main_title',
        'lbl_surgerynumber': 'before_lbl_surgerynumber',
        'input_surgerynumber': 'before_input_surgerynumber',
        'lbl_species': 'before_lbl_species',
        'sel_species': 'before_sel_species',
        'sel_species-0': 'before_sel_species-0',
        'lbl_subspecies': 'before_lbl_subspecies',
        'sel_subspecies': 'before_sel_subspecies',
        'sel_subspecies-0': 'before_sel_subspecies-0',
        'lbl_patientname': 'before_lbl_patientname',
        'input_patientname': 'before_input_patientname',
        'lbl_patientage': 'before_lbl_patientage',
        'input_patientage': 'before_input_patientage',
        'lbl_patientgender': 'before_lbl_patientgender',
        'radiogroup_gender': 'before_radiogroup_gender',
        'radio_gendermale': 'before_radio_gendermale',
        'radio_genderfemale': 'before_radio_genderfemale',
        'lbl_patientweight': 'before_lbl_patientweight',
        'slide_patientweight': 'before_slide_patientweight',
        'lbl_patientheight': 'before_lbl_patientheight',
        'slide_height': 'before_slide_height',
        'lbl_needlegauge': 'before_lbl_needlegauge',
        'radiogroup_needlegauge': 'before_radiogroup_needlegauge',
        'radio_18g': 'before_radio_18g',
        'radio_20g': 'before_radio_20g',
        'lbl_needlelength': 'before_lbl_needlelength',
        'sel_needlelength': 'before_sel_needlelength',
        'sel_needlelength-0': 'before_sel_needlelength-0',
        'main_grid_cell_btn': 'before_main_grid_cell_btn',
        'main_grid_cell_btn_cancel': 'before_main_grid_cell_btn_cancel',
        'btn_doctor_con': 'before_btn_doctor_con',
        'main_grid_cell_btn_con': 'before_main_grid_cell_btn_con',
        'btn_doctor_cancel': 'before_btn_doctor_cancel'
    };
    if ("n2id" in window && window.n2id !== undefined) {
        $.extend(n2id, n2id_buf);
    } else {
        window.n2id = n2id_buf;
    }
    
    Apperyio.CurrentScreen = 'before';
    _.chain(Apperyio.mappings)
        .filter(function(m) {
            return m.homeScreen === Apperyio.CurrentScreen;
        })
        .each(Apperyio.UIHandler.hideTemplateComponents);
    var before_onLoad = function() {
        before_elementsExtraJS();
        Apperyio('main_grid').css('margin', 'auto');
        Apperyio('main_grid').css('margin-top', '50px');
        before_deviceEvents();
        before_windowEvents();
        before_elementsEvents();
    };

    function before_windowEvents() {
        $('#before').bind('pageshow orientationchange', function() {
            var _page = this;
            adjustContentHeightWithPadding(_page);
        });
    };

    function before_deviceEvents() {
        document.addEventListener("deviceready", function() {
        });
    };

    function before_elementsExtraJS() {
        $("#before_sel_species").parent().find("a.ui-btn").attr("tabindex", "1");
        $("#before_sel_subspecies").parent().find("a.ui-btn").attr("tabindex", "2");
        $("#before_sel_needlelength").parent().find("a.ui-btn").attr("tabindex", "16");
    };

    function before_elementsEvents() {
        $(document).on("click", "a :input,a a,a fieldset label", function(event) {
            event.stopPropagation();
        });
        $(document).off("click", '#before_rim_header [name="navbar_home_item"]').on({
            click: function(event) {
                if (!$(this).attr('disabled')) {
                    Apperyio.navigateTo('main', {
                        transition: 'slide',
                        reverse: false
                    });
                }
            },
        }, '#before_rim_header [name="navbar_home_item"]');
        $(document).off("click", '#before_rim_header [name="navbar_before_item"]').on({
            click: function(event) {
                if (!$(this).attr('disabled')) {
                    Apperyio.navigateTo('before', {
                        transition: 'slide',
                        reverse: false
                    });
                }
            },
        }, '#before_rim_header [name="navbar_before_item"]');
        $(document).off("click", '#before_rim_header [name="navbar_start_item"]').on({
            click: function(event) {
                if (!$(this).attr('disabled')) {
                    Apperyio.navigateTo('start', {
                        transition: 'slide',
                        reverse: false
                    });
                }
            },
        }, '#before_rim_header [name="navbar_start_item"]');
        $(document).off("click", '#before_rim_header [name="navbar_after_item"]').on({
            click: function(event) {
                if (!$(this).attr('disabled')) {
                    Apperyio.navigateTo('after', {
                        transition: 'slide',
                        reverse: false
                    });
                }
            },
        }, '#before_rim_header [name="navbar_after_item"]');
        $(document).off("click", '#before_rim_header [name="navbar_report_item"]').on({
            click: function(event) {
                if (!$(this).attr('disabled')) {
                    Apperyio.navigateTo('report', {
                        transition: 'slide',
                        reverse: false
                    });
                }
            },
        }, '#before_rim_header [name="navbar_report_item"]');
        $(document).off("click", '#before_rim_container [name="btn_doctor_con"]').on({
            click: function(event) {
                if (!$(this).attr('disabled')) {
                
                    Data.species = $("#before_sel_species").val();
                    Data.breeds = $("#before_sel_subspecies").val(); 
                    Data.patientName = $("#before_input_patientname").val(); 
                    Data.patientAge = $("#before_input_patientage").val();
                    Data.AgeYearOrMonth = $("input[name=radiogroup_age]").val(); 
                    Data.patientSex = $("input[name=radiogroup_gender]").val();
                    Data.patientWeight = $("#before_slide_patientweight").val();
                    Data.weightKgOrLb = $("input[name=radiogroup_unit]").val(); 
                    Data.needleGause = $("input[name=radiogroup_needlegauge]").val();
                    Data.needleLength = $("#before_sel_needlelength").val(); 
                    sessionStorage.setItem("vetpia",JSON.stringify(Data));
                    Apperyio.navigateTo('start', {
                        transition: 'slide',
                        reverse: false
                    });
                }
            },
        }, '#before_rim_container [name="btn_doctor_con"]');
    };
    $(document).off("pagebeforeshow", "#before").on("pagebeforeshow", "#before", function(event, ui) {
        Apperyio.CurrentScreen = "before";
        _.chain(Apperyio.mappings)
            .filter(function(m) {
                return m.homeScreen === Apperyio.CurrentScreen;
            })
            .each(Apperyio.UIHandler.hideTemplateComponents);
    });
    before_onLoad();
};
$(document).off("pagecreate", "#before").on("pagecreate", "#before", function(event, ui) {
    Apperyio.processSelectMenu($(this));
    before_js();
    var ticks  = '<div class="sliderTickmarks"><span>1</span></div>';
    ticks += '<div class="sliderTickmarks"><span>10</span></div>';
    ticks += '<div class="sliderTickmarks"><span>20</span></div>';
    ticks += '<div class="sliderTickmarks"><span>30</span></div>';
    ticks += '<div class="sliderTickmarks"><span>40</span></div>';
    ticks += '<div class="sliderTickmarks"><span>50</span></div>';
    ticks += '<div class="sliderTickmarks"><span>60</span></div>';
    ticks += '<div class="sliderTickmarks"><span>70</span></div>';
    ticks += '<div class="sliderTickmarks"><span>80</span></div>';
    ticks += '<div class="sliderTickmarks"><span>90</span></div>';
    ticks += '<div class="sliderTickmarks"><span>100</span></div>';
    $(".before_slide_patientweight .ui-slider-track").prepend(ticks);
});

$(document).off("pageshow", "#before").on("pageshow", "#before", function(event, ui) {
    $("#before_input_surgerynumber").val(Data.opNumber);
    $("#before_sel_species").focus(); 
});
