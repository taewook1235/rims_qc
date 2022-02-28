
var position_sub = 20;
var back_flag = 0;


var v_dataPoints = [{x:0,y:0}];
var length = 30
var min=0,max=0;
var totalCount = 1; 
length = parseInt(length);    


function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint8Array(buf));
  }
function str2ab(str) {
  var buf = new ArrayBuffer(str.length); // 2 bytes for each char
  var bufView = new Uint8Array(buf);
  for (var i=0, strLen=str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

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
        message1 += "<br> LENGTH : " + positionArray;
        message1 += "<br> TIME : " + timeArray;
        message1 += "<br> COMMAND : " + commandArray;
        message1 += "<br> TEST : " + testArray;

        document.querySelector("#device_data"). innerHTML =message1;
        document.querySelector("#data_info").innerHTML = "";
        var product = "";
        var FWversion = "1.";
        var ver = String(((testArray/100) % 10).toFixed(0));
        var productCode = Math.round(Number(testArray/10) % 10);
        if ( productCode == 1){
            product = "EPIA";
        }
        if ( productCode == 2){
            product = "VETPIA";
        }
        viewTest("검사모드 연결 ", 
        "검사 기기 ( " + product + " ) <br>" + 
        "F/W Version ( " +  FWversion + ver  +  " ) <br>" + 
        "사용횟수 : "  + Math.round(Number(testArray%1 * 100)) + " 회<br><br>" +
        "검사 모드로 동작시켜주세요.<br> 정지버튼 누른상태에서 후진버튼 5회 누르면 검사모드로 동작됩니다. <br>" );

    }
    else {
        let input_device = "";
        for (let i = 0; i < value.byteLength; i++) {
            input_device += String.fromCharCode(tmpResult[i]);
        }
      test_message(input_device);
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
        .then(service => service.getCharacteristic(0xFFF2))
        .then(descriptor => {
                
                let str1 =("75 60 400\n");
                var buffer = new ArrayBuffer();
                
                buffer = str2ab(str1);
               // encoder.encode(str1);
                const encoder = new TextEncoder('utf-8');
                const userDescription = encoder.encode(str1);
                descriptor.writeValue(encoder.encode(userDescription));
            
            
            });
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
                },300)
            })
            .catch(error => { viewInfo("<font color=#ff0000>" + error + "</font>")});
        });
        document.querySelector('#input_write').addEventListener('click', event => {

            //let str1 =("RST\r\n");
            let str1 =("75 60 400\n");
            var buffer = new ArrayBuffer();
            
            buffer = str2ab(str1);
           // encoder.encode(str1);
            const encoder = new TextEncoder('utf-8');
            const userDescription = encoder.encode(str1);

            vetpia.writeData(userDescription);
            
        });
        

        viewInfo("EPIA(VETPIA) TEST 1.1.0");
       // viewTest("EPIA(VETPIA) TEST", 
       // "EPIA(VETPIA) TEST <br>" );
/*
        var input_device = "T4\t604.8\t29.288\t95230\tOOXXXX\tXXOO\t1200";
        test_message(input_device);
*/



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



function test_message(input_device){

    var input = input_device.split('\t'); 
    document.querySelector("#device_data").innerHTML = input_device;
    document.querySelector("#data_info").innerHTML =
            '<p>' +  input[0] + '</p>' + //step
            '<p>' +  input[1] + '</p>' + // force
            '<p>' +  input[2] + '</p>' + // postion
            '<p>' +  input[3] + '</p>' + // time
            '<p>' +  input[4] + '</p>' + // check1
            '<p>' +  input[5] + '</p>' + // btn check
            '<p>' +  input[6] + '</p>';  // moving

    if (input[4].substr(5,1) == 'O' ){
        document.getElementById("TEST5").className = "main_grid_top_2_clear";
    }
    else {
        document.getElementById("TEST5").className = "main_grid_top_2";
    }
    switch(input[0]){
        case 'T0':            
        document.getElementById("TEST1").className = "main_grid_top_2_run";
        document.getElementById("TEST2").className = "main_grid_top_2";
        document.getElementById("TEST3").className = "main_grid_top_2";
        document.getElementById("TEST4").className = "main_grid_top_2";
        document.getElementById("TEST5").className = "main_grid_top_2";
        viewTest("Limit Switch 검사", 
        "검사모드 시작시 모터가 뒤로 회전하며 리셋스위치를 누르면 다음단계로 넘어갑니다.<br><br>" +
        " <font color='red' size='5'>불량 기준 및 대처 방안 </font><br>" +
                " 모터가 동작 안함 <br>" +
                "&nbsp&nbsp> 파워서플라이 출력 전류 (0.6A 이상) " + "<font color='yellow'>모터 케이블 간섭 확인 </font> <br>  " + 
                "&nbsp&nbsp> 파워서플라이 출력 전류 (0.2A 이하) " + "<font color='yellow'>모터 커넥터 확인, 모터 교체</font> <br><br>  "  + 
                " 2단계(버튼검사)로 진입하지않고 모터가 계속 뒤로 이동 하려함" + "&nbsp&nbsp> <font color='yellow'> 스위치 교체</font> ");
            break;
        case 'T1':            
        document.getElementById("TEST1").className = "main_grid_top_2_clear";
        document.getElementById("TEST2").className = "main_grid_top_2_run";
        document.getElementById("TEST3").className = "main_grid_top_2";
        document.getElementById("TEST4").className = "main_grid_top_2";
        document.getElementById("TEST5").className = "main_grid_top_2";
        viewTest("버튼 검사", 
        "버튼을 아래 순서대로 누르고 결과(정상 동작시 괄호안에 O표시 됨)를 확인한다. <br><br>" +
        " 전진 버튼 : (" + input[5].substr(3,1) + ") <br>" + 
        " 미세전진 버튼 : (" + input[5].substr(2,1) + ") <br>" + 
        " 정지 버튼 : (" + input[5].substr(1,1) + ") <br>" + 
        " 후진 버튼 : (" + input[5].substr(0,1) + ") <br><br>" + 

        " <font color='red' size='5'>불량 기준 및 대처 방안 </font><br>" +
                " 검사자가 버튼을 누르기 전 O 표시가 되어있음 <br>" +
                "&nbsp&nbsp>버튼을 눌러보며 눌리는 소리가 나는지 확인하고, 버튼과 스위치 노브간 결합을 확인한다. ");
            break;
        case 'T2':
            document.getElementById("TEST1").className = "main_grid_top_2_clear";
            document.getElementById("TEST2").className = "main_grid_top_2_clear";
            document.getElementById("TEST3").className = "main_grid_top_2_run";
            document.getElementById("TEST4").className = "main_grid_top_2";
            document.getElementById("TEST5").className = "main_grid_top_2";
            viewTest("센서 검사", 
            "센서를 손으로 힘을 가해보며 값의 변화를 검사한다. 정상 동작시 전진버튼을 누르면 다음 단계로 넘어갑니다. <br><br>" +
            " force : ( " + input[1] + " ) [ gf ] <br><br>" +  
    
            " <font color='red' size='5'>불량 기준 및 대처 방안 </font><br>" +
                    " 힘을 가해도 센서 값의 큰 변화가 없음 또는 5000gf 이상 <br>" +
                    "&nbsp&nbsp > <font color='yellow'>센서 교체 </font> <br>" + 
                    " 변화는 있으나 센서에 힘을 가하지 않아도 2000gf 이상 <br>" +
                    "&nbsp&nbsp > <font color='yellow'>센서 홀더 재결합 또는 교체 </font>");
                break;
        case 'T3':
            document.getElementById("TEST1").className = "main_grid_top_2_clear";
            document.getElementById("TEST2").className = "main_grid_top_2_clear";
            document.getElementById("TEST3").className = "main_grid_top_2_clear";
            document.getElementById("TEST4").className = "main_grid_top_2_run";  
            document.getElementById("TEST5").className = "main_grid_top_2";         
            viewTest("모터 검사1", 
            "자동으로 모터가 회전하며 최대 행정거리까지 이동합니다. <br><br>" +
            " 이동거리 :  " + input[2] + "  [ mm ] <br>" +  
            " 이동시간 :  " + parseFloat(input[6])/20 + "  [ 초 ] <br><br>" +  
    
            " <font color='red' size='5'>불량 기준 및 대처 방안 </font><br>" +

                    " 75mm 이전에 멈추거나 이동거리가 증가하지않음 <br>" +
                    "&nbsp&nbsp > <font color='yellow'> 모터 뒷단에 홀 센서가 떨어져있는지 확인하여 떨어져있는 경우 가까이 붙이고 재시험한다. </font> <br>" +
                    "&nbsp&nbsp > <font color='yellow'> 재시험시 동일한 증상의 경우 모터를 교체한다. </font> <br>" + 
                    " 이동시간이 28초 이상 <br>" +
                    "&nbsp&nbsp > <font color='yellow'> 모터에 부하가 생기는 요소를 확인한다 (전선이 걸려 부하가 생김) </font> <br>" + 
                    "&nbsp&nbsp > <font color='yellow'> 부하 요소가 없을 경우 모터를 교체한다. </font> <br>" );
                break;
        case 'T4':
            document.getElementById("TEST1").className = "main_grid_top_2_clear";
            document.getElementById("TEST2").className = "main_grid_top_2_clear";
            document.getElementById("TEST3").className = "main_grid_top_2_clear";
            document.getElementById("TEST4").className = "main_grid_top_2_clear";
            document.getElementById("TEST5").className = "main_grid_top_2_run";
            viewTest("모터 검사2", 
            "검사자는 이동거리 및 시간의 변화를 확인하고 이상 없을시 후진버튼을 눌러 구동부를 뒤로 이동시킵니다. <br><br>" +
            " 이동거리 :  " + input[2] + "  [ mm ] <br>" +  
            " 이동시간 :  " + parseFloat(input[6])/20 + "  [ 초 ] <br><br>" +  
            " <font color='red' size='5'>불량 기준 및 대처 방안 </font><br>" +

                    " 75mm 이전에 멈추거나 이동거리가 증가하지않음 <br>" +
                    "&nbsp&nbsp > <font color='yellow'> 모터 뒷단에 홀 센서가 떨어져있는지 확인하여 떨어져있는 경우 가까이 붙이고 재시험한다. </font> <br>" +
                    "&nbsp&nbsp > <font color='yellow'> 재시험시 동일한 증상의 경우 모터를 교체한다. </font> <br>" + 
                    " 이동시간이 28초 이상 <br>" +
                    "&nbsp&nbsp > <font color='yellow'> 모터에 부하가 생기는 요소를 확인한다 (전선이 걸려 부하가 생김) </font> <br>" + 
                    "&nbsp&nbsp > <font color='yellow'> 부하 요소가 없을 경우 모터를 교체한다. </font> <br>" );

            break;
        case 'T5':
            document.getElementById("TEST1").className = "main_grid_top_2_clear";
            document.getElementById("TEST2").className = "main_grid_top_2_clear";
            document.getElementById("TEST3").className = "main_grid_top_2_clear";
            document.getElementById("TEST4").className = "main_grid_top_2_clear";
            document.getElementById("TEST5").className = "main_grid_top_2_clear";
            viewTest("검사 완료", 
            "제품 검사 완료. <br> 데이터 송신관련 테스트는 우측 wRITING TEST 버튼을 눌러주세요.[option] <br><br>" );
            break;
        default:

            break;

    }
}
function viewTest(str_master, str_detail){
    document.querySelector("#test_master").innerHTML = str_master;
    document.querySelector("#test_detail").innerHTML = str_detail;

}
