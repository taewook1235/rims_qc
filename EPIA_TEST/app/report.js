
initSessionData();
var v_dataPoints = Data.dataPoints;
var length = Data.needleLength;
var min=0,max=0;
length = parseInt(length);    
if(length==50) {
    min=0; max=50;}
else if(length==55){
    min=5; max=55;
}
else if(length==60){
    min=10; max=60;
}
else if(length==80) {
    min=30; max=80;
}
var g_options = {
    exportEnabled: true,
    theme: "dark1",
    title: {
        title:"", 
    },		
    axisX: {
        title: "Length(mm)",
        minimum: min,
        maximum: max,
    },
    axisY: { 
        title: "Force(gf)",
        minimum: 0,
        maximum: 2000,
        
    },
    width:690,
    height:425,
    data: [{
        type: "splineArea",
        toolTipContent: "<b>Length: {x}</b> </br> Force: {y}",
        dataPoints: v_dataPoints
    }]
}; 

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
        Data =  JSON.parse(vetpia); 
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

function report_js() {
    var n2id_buf = {
        'main_navbar': 'report_main_navbar',
        'navbar_home_item': 'report_navbar_home_item',
        'navbar_before_item': 'report_navbar_before_item',
        'navbar_start_item': 'report_navbar_start_item',
        'navbar_after_item': 'report_navbar_after_item',
        'navbar_report_item': 'report_navbar_report_item',
        'mobileworkarea_10': 'report_mobileworkarea_10',
        'main_grid': 'report_main_grid',
        'main_grid_cell': 'report_main_grid_cell',
        'main_title': 'report_main_title',
        'main_grid_graph': 'report_main_grid_graph',
        'cell_graph': 'report_cell_graph',
        'main_grid_cell_content_grid': 'report_main_grid_cell_content_grid',
        'cell_surgeryNumber': 'report_cell_surgeryNumber',
        'lbl_surgerynumber': 'report_lbl_surgerynumber',
        'cell_surgeryNumber_value': 'report_cell_surgeryNumber_value',
        'lbl_surgeryNumber_value': 'report_lbl_surgeryNumber_value',
        'cell_doctorName': 'report_cell_doctorName',
        'lbl_DoctorName': 'report_lbl_DoctorName',
        'cell_doctorName_value': 'report_cell_doctorName_value',
        'lbl_doctorName_value': 'report_lbl_doctorName_value',
        'cell_hospitalName': 'report_cell_hospitalName',
        'lbl_HospitalName': 'report_lbl_HospitalName',
        'cell_hospitalName_value': 'report_cell_hospitalName_value',
        'lbl_hospitalName_value': 'report_lbl_hospitalName_value',
        'cell_department': 'report_cell_department',
        'lbl_Department': 'report_lbl_Department',
        'cell_depart_value': 'report_cell_depart_value',
        'lbl_depart_value': 'report_lbl_depart_value',
        'cell_species': 'report_cell_species',
        'lbl_Species': 'report_lbl_Species',
        'cell_species_value': 'report_cell_species_value',
        'lbl_species_value': 'report_lbl_species_value',
        'cell_subspecies': 'report_cell_subspecies',
        'lbl_SubSpecies': 'report_lbl_SubSpecies',
        'cell_subspecies_value': 'report_cell_subspecies_value',
        'lbl_subspecies_value': 'report_lbl_subspecies_value',
        'cell_name': 'report_cell_name',
        'lbl_PatientName': 'report_lbl_PatientName',
        'cell_name_value': 'report_cell_name_value',
        'lbl_name_value': 'report_lbl_name_value',
        'cell_age': 'report_cell_age',
        'lbl_PatientAge': 'report_lbl_PatientAge',
        'cell_age_value': 'report_cell_age_value',
        'lbl_age_value': 'report_lbl_age_value',
        'cell_gender': 'report_cell_gender',
        'lbl_PatientGender': 'report_lbl_PatientGender',
        'cell_gender_value': 'report_cell_gender_value',
        'lbl_gender_value': 'report_lbl_gender_value',
        'cell_weight': 'report_cell_weight',
        'lbl_PatientWeight': 'report_lbl_PatientWeight',
        'cell_weight_value': 'report_cell_weight_value',
        'lbl_weight_value': 'report_lbl_weight_value',
        'cell_height': 'report_cell_height',
        'lbl_PatientHeight': 'report_lbl_PatientHeight',
        'cell_height_value': 'report_cell_height_value',
        'lbl_height_value': 'report_lbl_height_value',
        'cell_gauge': 'report_cell_gauge',
        'lbl_NeedleGauge': 'report_lbl_NeedleGauge',
        'cell_gauge_value': 'report_cell_gauge_value',
        'lbl_gauge_value': 'report_lbl_gauge_value',
        'cell_length': 'report_cell_length',
        'lbl_NeedleLength': 'report_lbl_NeedleLength',
        'cell_length_value': 'report_cell_length_value',
        'lbl_length_value': 'report_lbl_length_value',
        'cell_pitch': 'report_cell_pitch',
        'lbl_Pitch': 'report_lbl_Pitch',
        'cell_pitch_value': 'report_cell_pitch_value',
        'lbl_pitch_value': 'report_lbl_pitch_value',
        'cell_diff': 'report_cell_diff',
        'lbl_Difference': 'report_lbl_Difference',
        'cell_diff_value': 'report_cell_diff_value',
        'lbl_diff_value': 'report_lbl_diff_value',
        'cell_slope': 'report_cell_slope',
        'lbl_Slope': 'report_lbl_Slope',
        'cell_slope_value': 'report_cell_slope_value',
        'lbl_slope_value': 'report_lbl_slope_value',
        'cell_lagging': 'report_cell_lagging',
        'lbl_LaggingTime': 'report_lbl_LaggingTime',
        'cell_lagging_value': 'report_cell_lagging_value',
        'lbl_lagging_value': 'report_lbl_lagging_value',
        'cell_count': 'report_cell_count',
        'lbl_Count': 'report_lbl_Count',
        'cell_count_value': 'report_cell_count_value',
        'lbl_count_value': 'report_lbl_count_value',
        'cell_trial': 'report_cell_trial',
        'lbl_TrialTime': 'report_lbl_TrialTime',
        'cell_trial_value': 'report_cell_trial_value',
        'lbl_trial_value': 'report_lbl_trial_value',
        'cell_insert_length': 'report_cell_insert_length',
        'lbl_InsertLength': 'report_lbl_InsertLength',
        'cell_insert_length_value': 'report_cell_insert_length_value',
        'lbl_insert_length_value': 'report_lbl_insert_length_value',
        'cell_angle': 'report_cell_angle',
        'lbl_InsertAngle': 'report_lbl_InsertAngle',
        'cell_angle_value': 'report_cell_angle_value',
        'lbl_angle_value': 'report_lbl_angle_value',
        'cell_position': 'report_cell_position',
        'lbl_InsertPosition': 'report_lbl_InsertPosition',
        'cell_position_value': 'report_cell_position_value',
        'lbl_position_value': 'report_lbl_position_value',
        'cell_pose': 'report_cell_pose',
        'lbl_PatientPose': 'report_lbl_PatientPose',
        'cell_pose_value': 'report_cell_pose_value',
        'lbl_pose_value': 'report_lbl_pose_value',
        'btn_ok': 'report_btn_ok'
    };
    if ("n2id" in window && window.n2id !== undefined) {
        $.extend(n2id, n2id_buf);
    } else {
        window.n2id = n2id_buf;
    }

    Apperyio.mappings = Apperyio.mappings || {};
    Apperyio.datasources = Apperyio.datasources || {};
    Apperyio.CurrentScreen = 'report';
    _.chain(Apperyio.mappings)
        .filter(function(m) {
            return m.homeScreen === Apperyio.CurrentScreen;
        })
        .each(Apperyio.UIHandler.hideTemplateComponents);

    var report_onLoad = function() {
        report_elementsExtraJS();
        Apperyio('main_grid').css('margin', 'auto');
        Apperyio('main_grid').css('margin-top', '50px');
        
        report_deviceEvents();
        report_windowEvents();
        report_elementsEvents();
    };

    function report_windowEvents() {
        $('#report').bind('pageshow orientationchange', function() {
            var _page = this;
            adjustContentHeightWithPadding(_page);
        });
    };

    function report_deviceEvents() {
        document.addEventListener("deviceready", function() {
        });
    };

    function report_elementsExtraJS() {

    };

    function report_elementsEvents() {
        $(document).on("click", "a :input,a a,a fieldset label", function(event) {
            event.stopPropagation();
        });
        $(document).off("click", '#report_rim_header [name="navbar_home_item"]').on({
            click: function(event) {
                if (!$(this).attr('disabled')) {
                    Apperyio.navigateTo('main', {
                        transition: 'slide',
                        reverse: false
                    });
                }
            },
        }, '#report_rim_header [name="navbar_home_item"]');
        $(document).off("click", '#report_rim_header [name="navbar_before_item"]').on({
            click: function(event) {
                if (!$(this).attr('disabled')) {
                    Apperyio.navigateTo('before', {
                        transition: 'slide',
                        reverse: false
                    });
                }
            },
        }, '#report_rim_header [name="navbar_before_item"]');
        $(document).off("click", '#report_rim_header [name="navbar_start_item"]').on({
            click: function(event) {
                if (!$(this).attr('disabled')) {
                    Apperyio.navigateTo('start', {
                        transition: 'slide',
                        reverse: false
                    });
                }
            },
        }, '#report_rim_header [name="navbar_start_item"]');
        $(document).off("click", '#report_rim_header [name="navbar_after_item"]').on({
            click: function(event) {
                if (!$(this).attr('disabled')) {
                    Apperyio.navigateTo('after', {
                        transition: 'slide',
                        reverse: false
                    });
                }
            },
        }, '#report_rim_header [name="navbar_after_item"]');
        $(document).off("click", '#report_rim_header [name="navbar_report_item"]').on({
            click: function(event) {
                if (!$(this).attr('disabled')) {
                    Apperyio.navigateTo('report', {
                        transition: 'slide',
                        reverse: false
                    });
                }
            },
        }, '#report_rim_header [name="navbar_report_item"]');
        $(document).off("click", '#report_rim_container [name="btn_ok"]').on({
            click: function(event) {
                if (!$(this).attr('disabled')) {
                    Apperyio.navigateTo('main', {
                        transition: 'slide',
                        reverse: false
                    });
                }
            },
        }, '#report_rim_container [name="btn_ok"]');
    };
    $(document).off("pagebeforeshow", "#report").on("pagebeforeshow", "#report", function(event, ui) {
        Apperyio.CurrentScreen = "report";
        _.chain(Apperyio.mappings)
            .filter(function(m) {
                return m.homeScreen === Apperyio.CurrentScreen;
            })
            .each(Apperyio.UIHandler.hideTemplateComponents);
    });
    report_onLoad();
};
$(document).off("pagecreate", "#report").on("pagecreate", "#report", function(event, ui) {
    Apperyio.processSelectMenu($(this));
    report_js();
});
$(document).off("pageshow", "#report").on("pageshow", "#report", function(event, ui) {
    g_options.width = 690;
    g_options.height = 425;
    $("#chartContainer").CanvasJSChart(g_options);
    $("#report_lbl_surgeryNumber_value").text(Data.opNumber);
    $("#report_lbl_doctorName_value").text(Data.docName);
    $("#report_lbl_depart_value").text(Data.affiliation);
    $("#report_lbl_species_value").text(Data.species);
    $("#report_lbl_subspecies_value").text(Data.breeds);
    $("#report_lbl_name_value").text(Data.patientName);
    $("#report_lbl_age_value").text(Data.patientAge);
    $("#report_lbl_gender_value").text(Data.patientSex);
    $("#report_lbl_weight_value").text(Data.patientWeight);
    $("#report_lbl_length_value").text(Data.needleLength);
    $("#report_lbl_count_value").text(Data.totalCount);
    $("#report_lbl_angle_value").text(Data.insertAngle);
    $("#report_lbl_position_value").text(Data.insertSite);
    $("#report_lbl_pose_value").text(Data.patientPos);
    $("#btn_start").focus();
});
