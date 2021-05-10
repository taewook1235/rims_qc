
var position_sub = 20;
var back_flag = 0;


var v_dataPoints = [{x:0,y:0}];
var length = 30
var min=0,max=0;
var totalCount = 1; 
length = parseInt(length);    



viewInfo("5");
function listener(event) {
    const value = event.target.value;
    let tmpResult = [];
    let forceArray = new Uint8Array(4);
    let positionArray = new Uint8Array(4);
    let timeArray = new Uint8Array(4);
    let commandArray =new Uint8Array(4);
    let testArray =new Uint8Array(4);
    for (let i = 0; i < value.byteLength; i++) {
        tmpResult.push(value.getUint8(i));
    }
    
    if( value.byteLength == 22){
        forceArray = getFloat(tmpResult.slice(2,6).reverse());
        positionArray = getFloat(tmpResult.slice(6,10).reverse());
        timeArray = getFloat(tmpResult.slice(10,14).reverse());
        commandArray = getFloat(tmpResult.slice(14,18).reverse());
        testdArray = getFloat(tmpResult.slice(18,22).reverse());

        forceArray = Math.round(forceArray*10)/10;
        positionArray = Math.round(positionArray*1000)/1000;
        positionArray = positionArray - position_sub;

        positionArray = positionArray.toFixed(3);
        message1 = "FORCE : " + forceArray;
        message1 += "<BR> LENGTH : " + positionArray;
        message1 += "<BR> TIME : " + timeArray;
        message1 += "<BR> COMMAND : " + commandArray;
        message1 += "<BR> TEST : " + testdArray;
        
        document.querySelector("#device_data"). innerHTML =message1;
    }
    else {
        document.querySelector("#device_data"). innerHTML = tmpResult.toString('ascii', 0, value.byteLength);
    }

}

function getFloat(array) {
    var view = new DataView(new ArrayBuffer(4));
        array.forEach(function (b, i) {
        view.setUint8(i, b);
    });
    return view.getFloat32(0);
}

function viewInfo (str) {
    let info = document.querySelector("#start_info");
    info.innerHTML = str; 
}

class VETPIA {
    constructor() {
        this.device = null;
        this.onDisconnected = this.onDisconnected.bind(this);
    }
    request() {
        let options = {
            "filters": [
               { name : "EPIA"} , 
               { name : "CHIPSEN"} ,
               { name : "VETPIA"} 

            ],
            "optionalServices": [0xFFF0]
        };
        return navigator.bluetooth.requestDevice(options)
        .then(device => {
            this.device = device;
            this.device.addEventListener('gattserverdisconnected', this.onDisconnected);
        });
    }
    connect() {
        viewInfo("Searching Devices...");
        if (!this.device) {
            return Promise.reject('Device is not connected.');
        }
        return this.device.gatt.connect();
    }
    readDescripter() {
        return this.device.gatt.getPrimaryService(0xFFF0)
        .then(service => service.getCharacteristic(0xFFF1))
        .then(characteristic  => characteristic.getDescriptor(0x2902))
        .then(descriptor => descriptor.readValue())
        .then(value => {
                const desc = value.getUint8().toString(16);
                return desc;})
    }
    writeDescripter() {
        return this.device.gatt.getPrimaryService(0xFFF0)
        .then(service => service.getCharacteristic(0xFFF1))
        .then(characteristic  => characteristic.getDescriptor(0x2902))
        .then(descriptor => {
                let str = stringToBytes("00");
                descriptor.writeValue(str);})
    }
    writeData(data) {
    return this.device.gatt.getPrimaryService(0xFFF0)
    .then(service => service.getCharacteristic(0xFFF2))
    .then(characteristic => characteristic.writeValue(data));
    }
    startNotifications(listener) {
    return this.device.gatt.getPrimaryService(0xFFF0)
    .then(service => service.getCharacteristic(0xFFF1))
    .then(characteristic => characteristic.startNotifications())
    .then(characteristic => characteristic.addEventListener('characteristicvaluechanged', listener));
    }
    stopNotifications(listener) {
    return this.device.gatt.getPrimaryService(0xFFF0)
    .then(service => service.getCharacteristic(0xFFF1))
    .then(characteristic => characteristic.stopNotifications())
    .then(characteristic => characteristic.removeEventListener('characteristicvaluechanged', listener));
    }
    disconnect() {
    if (!this.device) {
        return Promise.reject('Device is not connected.');
    }
    return this.device.gatt.disconnect();
    }
    onDisconnected() {
    viewInfo('Device is disconnected.');
    }
}

function start_js() {
    var n2id_buf = {
        'main_navbar': 'start_main_navbar',
        'navbar_home_item': 'start_navbar_home_item',
        'navbar_before_item': 'start_navbar_before_item',
        'navbar_start_item': 'start_navbar_start_item',
        'navbar_after_item': 'start_navbar_after_item',
        'navbar_report_item': 'start_navbar_report_item',
        'mobileworkarea_10': 'start_mobileworkarea_10',
        'main_title': 'start_main_title',
        'main_grid_name': 'start_main_grid_name',
        'main_grid_cell_number': 'start_main_grid_cell_number',
        'lbl_surgerynumber': 'start_lbl_surgerynumber',
        'lbl_number': 'start_lbl_number',
        'main_grid_cell_name': 'start_main_grid_cell_name',
        'lbl_doctorname': 'start_lbl_doctorname',
        'lbl_name': 'start_lbl_name',
        'main_grid': 'start_main_grid',
        'main_grid_cell_left': 'start_main_grid_cell_left',
        'graph_grid': 'start_graph_grid',
        'graph_grid_cell_graph': 'start_graph_grid_cell_graph',
        'chartContainer': 'start_chartContainer',
        'graph_grid_cell_bar': 'start_graph_grid_cell_bar',
        'lbl_needleprogress': 'start_lbl_needleprogress',
        'slide_needle': 'start_slide_needle',
        'grid_graph_button': 'start_grid_graph_button',
        'grid_graph_button_cell_new': 'start_grid_graph_button_cell_new',
        'btn_new': 'start_btn_new',
        'grid_graph_button_cell_save': 'start_grid_graph_button_cell_save',
        'btn_save': 'start_btn_save',
        'main_grid_cell_right': 'start_main_grid_cell_right',
        'main_grid_cell_right_grid': 'start_main_grid_cell_right_grid',
        'main_grid_cell_right_grid_cell_info': 'start_main_grid_cell_right_grid_cell_info',
        'main_grid_cell_right_grid_cell_info_grid': 'start_main_grid_cell_right_grid_cell_info_grid',
        'main_grid_cell_right_grid_cell_info_grid_title': 'start_main_grid_cell_right_grid_cell_info_grid_title',
        'lbl_patientinfo': 'start_lbl_patientinfo',
        'main_grid_cell_right_grid_cell_info_grid_title_sheet': 'start_main_grid_cell_right_grid_cell_info_grid_title_sheet',
        'main_grid_cell_right_grid_cell_info_grid_title_sheet_grid': 'start_main_grid_cell_right_grid_cell_info_grid_title_sheet_grid',
        'main_grid_cell_right_grid_cell_info_grid_title_sheet_grid_subspecies': 'start_main_grid_cell_right_grid_cell_info_grid_title_sheet_grid_subspecies',
        'lbl_subspecies': 'start_lbl_subspecies',
        'main_grid_cell_right_grid_cell_info_grid_title_sheet_grid_subspecies_value': 'start_main_grid_cell_right_grid_cell_info_grid_title_sheet_grid_subspecies_value',
        'txt_subspecies': 'start_txt_subspecies',
        'main_grid_cell_right_grid_cell_info_grid_title_sheet_grid_name': 'start_main_grid_cell_right_grid_cell_info_grid_title_sheet_grid_name',
        'lbl_info_name': 'start_lbl_info_name',
        'main_grid_cell_right_grid_cell_info_grid_title_sheet_grid_name_value': 'start_main_grid_cell_right_grid_cell_info_grid_title_sheet_grid_name_value',
        'txt_info_name': 'start_txt_info_name',
        'main_grid_cell_right_grid_cell_info_grid_title_sheet_grid_age': 'start_main_grid_cell_right_grid_cell_info_grid_title_sheet_grid_age',
        'lbl_info_age': 'start_lbl_info_age',
        'main_grid_cell_right_grid_cell_info_grid_title_sheet_grid_age_value': 'start_main_grid_cell_right_grid_cell_info_grid_title_sheet_grid_age_value',
        'txt_info_age': 'start_txt_info_age',
        'main_grid_cell_right_grid_cell_info_grid_title_sheet_grid_gender': 'start_main_grid_cell_right_grid_cell_info_grid_title_sheet_grid_gender',
        'lbl_info_gender': 'start_lbl_info_gender',
        'main_grid_cell_right_grid_cell_info_grid_title_sheet_grid_gender_value': 'start_main_grid_cell_right_grid_cell_info_grid_title_sheet_grid_gender_value',
        'txt_info_gender': 'start_txt_info_gender',
        'main_grid_cell_right_grid_cell_info_grid_title_sheet_grid_weight': 'start_main_grid_cell_right_grid_cell_info_grid_title_sheet_grid_weight',
        'lbl_info_weight': 'start_lbl_info_weight',
        'main_grid_cell_right_grid_cell_info_grid_title_sheet_grid_weight_value': 'start_main_grid_cell_right_grid_cell_info_grid_title_sheet_grid_weight_value',
        'txt_info_weight': 'start_txt_info_weight',
        'main_grid_cell_right_grid_cell_info_grid_title_sheet_grid_height': 'start_main_grid_cell_right_grid_cell_info_grid_title_sheet_grid_height',
        'lbl_info_height': 'start_lbl_info_height',
        'main_grid_cell_right_grid_cell_info_grid_title_sheet_grid_height_value': 'start_main_grid_cell_right_grid_cell_info_grid_title_sheet_grid_height_value',
        'txt_info_height': 'start_txt_info_height',
        'main_grid_cell_right_grid_cell_setting': 'start_main_grid_cell_right_grid_cell_setting',
        'main_grid_cell_right_grid_cell_setting_grid_sheet': 'start_main_grid_cell_right_grid_cell_setting_grid_sheet',
        'main_grid_cell_right_grid_cell_setting_grid_sheet_cell_title': 'start_main_grid_cell_right_grid_cell_setting_grid_sheet_cell_title',
        'lbl_setting': 'start_lbl_setting',
        'main_grid_cell_right_grid_cell_setting_grid_sheet_cell_pitch': 'start_main_grid_cell_right_grid_cell_setting_grid_sheet_cell_pitch',
        'lbl_pitch': 'start_lbl_pitch',
        'slide_pitch': 'start_slide_pitch',
        'main_grid_cell_right_grid_cell_setting_grid_sheet_cell_diff': 'start_main_grid_cell_right_grid_cell_setting_grid_sheet_cell_diff',
        'lbl_diff': 'start_lbl_diff',
        'slide_diff': 'start_slide_diff',
        'main_grid_cell_right_grid_cell_setting_grid_sheet_cell_slope': 'start_main_grid_cell_right_grid_cell_setting_grid_sheet_cell_slope',
        'lbl_slope': 'start_lbl_slope',
        'slide_slope': 'start_slide_slope',
        'main_grid_cell_right_grid_cell_setting_grid_sheet_cell_lagging': 'start_main_grid_cell_right_grid_cell_setting_grid_sheet_cell_lagging',
        'lbl_lagging': 'start_lbl_lagging',
        'slide_lagging': 'start_slide_lagging',
        'main_grid_cell_right_grid_cell_setting_grid_button': 'start_main_grid_cell_right_grid_cell_setting_grid_button',
        'main_grid_cell_right_grid_cell_setting_grid_button_cell_reset': 'start_main_grid_cell_right_grid_cell_setting_grid_button_cell_reset',
        'btn_reset': 'start_btn_reset',
        'main_grid_cell_right_grid_cell_setting_grid_button_cell_ok': 'start_main_grid_cell_right_grid_cell_setting_grid_button_cell_ok',
        'btn_ok': 'start_btn_ok'
    };
    if ("n2id" in window && window.n2id !== undefined) {
        $.extend(n2id, n2id_buf);
    } else {
        window.n2id = n2id_buf;
    }



    var start_onLoad = function() {
        start_elementsExtraJS();
        start_deviceEvents();
        start_windowEvents();
        start_elementsEvents();

        let vetpia = new VETPIA();
        document.querySelector('#btn_start').addEventListener('click', event => {
            vetpia.request()
            .then(_ => vetpia.connect())
            .then(_ => { 
                viewInfo("<font color=#00ff00>Device connected..</font>");

                graphInterval = setInterval(function(){
                    vetpia.startNotifications(listener);
                    vetpia.stopNotifications(listener);
                },100)
            })
            .catch(error => { viewInfo("<font color=#ff0000>" + error + "</font>")});
        });
        document.querySelector('#input_write').addEventListener('click', event => {
            alert("aa");
        });
    };

    function start_windowEvents() {
        $('#start').bind('pageshow orientationchange', function() {
       //     var _page = this;
       //     adjustContentHeightWithPadding(_page);
        });
    };
    function start_deviceEvents() {
        document.addEventListener("deviceready", function() {
        });
    };

    function start_elementsExtraJS() {

    };

    function start_elementsEvents() {
        $("#btn_clear").click(function(){
           // initGraph();
        });
        $(document).on("click", "a :input,a a,a fieldset label", function(event) {
            event.stopPropagation();
        });
        $(document).off("click", '#start_rim_header [name="navbar_home_item"]').on({
            click: function(event) {
                if (!$(this).attr('disabled')) {

                }
            },
        }, '#start_rim_header [name="navbar_home_item"]');

        $(document).off("click", '#start_rim_container [name="btn_new"]').on({
            click: function(event) {
                if (!$(this).attr('disabled')) {
                        alert("aa");
                    
                }
            },
        }, '#start_rim_container [name="btn_new"]');
        $(document).off("click", '#start_rim_container [name="btn_save"]').on({
            click: function(event) {
                if (!$(this).attr('disabled')) {
                    Data.dataPoints = v_dataPoints;
                    sessionStorage.setItem("vetpia",JSON.stringify(Data));
                    clearInterval(graphInterval);

                }
            },
        }, '#start_rim_container [name="btn_save"]');
    };
    $(document).off("pagebeforeshow", "#start").on("pagebeforeshow", "#start", function(event, ui) {

    });
    start_onLoad();
};
$(document).off("pagecreate", "#start").on("pagecreate", "#start", function(event, ui) {
    start_js();
    var scale = min;
    var ticks ="";
    var i = 0; 
    while(i<6){
        ticks += '<div class="sliderTickmarks"><span>' + scale + '</span></div>';
        i++;        
        scale = scale + 10;
    }        
    $(".start_slide_needle .ui-slider-track").prepend(ticks);
});

$(document).off("pageshow", "#start").on("pageshow", "#start", function(event, ui) {

 //   initGraph();
    $("#btn_start").focus();
});
