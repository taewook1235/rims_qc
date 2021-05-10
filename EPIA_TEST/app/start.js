
var position_sub = 20;
var back_flag = 0;


var v_dataPoints = [{x:0,y:0}];
var length = 30
var min=0,max=0;
var totalCount = 1; 
length = parseInt(length);    



viewInfo("16");


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
    
    document.querySelector("#device_data_length"). innerHTML =value.byteLength;

    if( value.byteLength == 22){
        forceArray = getFloat(tmpResult.slice(2,6).reverse());
        positionArray = getFloat(tmpResult.slice(6,10).reverse());
        timeArray = getFloat(tmpResult.slice(10,14).reverse());
        commandArray = getFloat(tmpResult.slice(14,18).reverse());
        testArray = getFloat(tmpResult.slice(18,22).reverse());

        forceArray = Math.round(forceArray*10)/10;
        positionArray = Math.round(positionArray*1000)/1000;
        positionArray = positionArray - position_sub;

        positionArray = positionArray.toFixed(3);
        testArray = testArray.toFixed(2);
        message1 = "FORCE : " + forceArray;
        message1 += "<BR> LENGTH : " + positionArray;
        message1 += "<BR> TIME : " + timeArray;
        message1 += "<BR> COMMAND : " + commandArray;
        message1 += "<BR> TEST : " + testArray;

        document.querySelector("#device_data"). innerHTML =message1;
    }
    else {
        let input_a = "";
        for (let i = 0; i < value.byteLength; i++) {
            input_a += String.fromCharCode(tmpResult[i]);
        }
        //var input_a = "T2\t604.8\t29.288\t95230\tOOXXXX\tOOOO\t0";
        var jbSplit = input_a.split('\t'); 
        if (!( typeof jbSplit[0] == "undefined")){
            document.querySelector("#device_data").innerHTML = input_a;
            document.querySelector("#data_info").innerHTML =
                '<p>' +  jbSplit[0] + '</p>' +
                '<p>' +  jbSplit[1] + '</p>' +
                '<p>' +  jbSplit[2] + '</p>' +
                '<p>' +  jbSplit[3] + '</p>' +
                '<p>' +  jbSplit[4] + '</p>' +
                '<p>' +  jbSplit[5] + '</p>' +
                '<p>' +  jbSplit[6] + '</p>';
        }
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
            vetpia.writeData("RST\r\n");
            alert("Aa");
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

