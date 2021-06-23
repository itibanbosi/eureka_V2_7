/* Ver3.4 Eureka_IO &　iːo*/

enum eureka_IO {
  B,
  A,
  C,
}
enum eureka_denki {
  B,
  A,
}
enum eureka_tlp {
  B,
  A,
}
enum eureka_p1416 {
  B,
  A,
}
enum onoff {
  ON,
  OFF,
}

enum moter_d {
  両方前,
  両方後,
  Ｌだけ前,
  Ｒだけ前,
  Ｌだけ後,
  Ｒだけ後,
  停止,
}
enum etc {
  AKARUSA,
  JINKAN,
}
enum L9110moter {
  seiten,
  gyakuten,
  seisi,
}
enum sonar_avg{
    平均20回,
    平均5回,
    生データ,
}
enum kyori{
    短い,
    長い,
}

let kousei_A=1;
let kousei_B=1;
let kousei_C=1;

enum LED_onoff {
    しない=0,
    ゆっくり=2000,
    ふつう=800,
    はやく=300,
}
enum LED_color {
    赤,
    オレンジ,
    き,
    みどり,
    水,
    青,
    むらさき,
    白,
}

enum neoLED_color {
    白,
    赤,
    黄,
    緑,
    青,
    だいだい,
    あい,
    すみれ,
    紫,
    黒,
}

enum LED_wait {
    //% block="えらぶ",
    zero,
    //% block="0.2",
    dot_two,
    //% block="0.3",
    dot_three,
    //% block="0.5",
    dot_five,
    //% block="0.8",
    dot_eight,
    //% block="1",
    one,
    //% block="1.3",
    one_dot_three,
    //% block="1.5",
    one_dot_five,
    //% block="1.8",
    one_dot_eight,
    //% block="2",
    two,
    }

    let io_neo = neopixel.create(DigitalPin.P9, 4, NeoPixelMode.RGB);
    
//% color="#32cd32" weight=90 block="ふく合ﾕﾆｯﾄ"

namespace eureka_blocks {

  //% color="#4741f1" weight=89 blockId=eureka_tl_blue block="(複合)青信号 点灯|%mode| ﾎﾟｰﾄ|%pin|" group="2_信号機ユニット"
  //% advanced=true
    export function eureka_tl_blue(mode: onoff, pin: eureka_tlp) {
    switch (pin) {
      case eureka_tlp.A:
        if (mode == onoff.ON) {
          return pins.digitalWritePin(DigitalPin.P14, 1);
        } else {
          return pins.digitalWritePin(DigitalPin.P14, 0);
        }
      case eureka_tlp.B:
        if (mode == onoff.ON) {
          return pins.digitalWritePin(DigitalPin.P16, 1);
        } else {
          return pins.digitalWritePin(DigitalPin.P16, 0);
        }
    }
  }
  //% color="#ffa800" weight=87 blockId=eureka_tl_yellow block="(複合)黄信号 点灯|%mode| ﾎﾟｰﾄ|%pin|" group="2_信号機ユニット"
  //% advanced=true
  export function eureka_tl_yellow(mode: onoff, pin: eureka_tlp) {
    switch (pin) {
      case eureka_tlp.A:
        if (mode == onoff.ON) {
          return pins.digitalWritePin(DigitalPin.P13, 1);
        } else {
          return pins.digitalWritePin(DigitalPin.P13, 0);
        }
      case eureka_tlp.B:
        if (mode == onoff.ON) {
          return pins.digitalWritePin(DigitalPin.P15, 1);
        } else {
          return pins.digitalWritePin(DigitalPin.P15, 0);
        }
    }
  }
  //% color="#ff4940" weight=85 blockId=eureka_tl_red block="(複合)赤信号 点灯|%mode| ﾎﾟｰﾄ|%pin|" group="2_信号機ユニット"
  //% advanced=true
  export function eureka_tl_red(mode: onoff, pin: eureka_tlp) {
    switch (pin) {
      case eureka_tlp.A:
        if (mode == onoff.ON) {
          return pins.digitalWritePin(DigitalPin.P0, 1);
        } else {
          return pins.digitalWritePin(DigitalPin.P0, 0);
        }
      case eureka_tlp.B:
        if (mode == onoff.ON) {
          return pins.digitalWritePin(DigitalPin.P1, 1);
        } else {
          return pins.digitalWritePin(DigitalPin.P1, 0);
        }
    }
  }

  //% color="#1E90FF" weight=83 block="待ち時間（秒）|%second|" group="2_信号機ユニット"
  //% advanced=true
  //% second.min=0 second.max=10
  export function driveForwards(second: number): void {
    basic.pause(second * 1000);
  }

  //% color="#228b22"  weight=82 blockId=eureka_denkiLED block="光ｾﾝｻの値を表示する ﾎﾟｰﾄ|%tlp|" group="3_電気の利用ユニット"
  export function eureka_denkiLED(tlp: eureka_tlp){
    switch (tlp) {
      case eureka_tlp.A:
             basic.showNumber(Math.round((pins.analogReadPin(AnalogPin.P0) / 1023) * 100));
        break;
      case eureka_tlp.B:
             basic.showNumber(Math.round((pins.analogReadPin(AnalogPin.P1) / 1023) * 100));
        break;
    }
  }



  //% color="#009A00"  weight=81 block="光ｾﾝｻ値 |%limit| より暗い ﾎﾟｰﾄ|%tlp|" group="3_電気の利用ユニット"
  //% limit.min=0 limit.max=100
  export function decideLight(limit: number, tlp: eureka_tlp): boolean {
    switch (tlp) {
      case eureka_tlp.A:
        if ((pins.analogReadPin(AnalogPin.P0) / 1023) * 100 < limit) {
          return true;
        } else {
          return false;
        }
        break;
      case eureka_tlp.B:
        if ((pins.analogReadPin(AnalogPin.P1) / 1023) * 100 < limit) {
          return true;
        } else {
          return false;
        }
        break;
    }
  }



  //% color="#009A00"  weight=80 blockId=eureka_denkitemp block="光ｾﾝｻ値 ﾎﾟｰﾄ|%pin|" group="3_電気の利用ユニット"
  export function eureka_denkitemp(pin: eureka_denki): number {
    switch (pin) {
      case eureka_denki.A:
        return Math.round((pins.analogReadPin(AnalogPin.P0) / 1023) * 100);
      case eureka_denki.B:
        return Math.round((pins.analogReadPin(AnalogPin.P1) / 1023) * 100);
    }
  }
  //% color="#a0522d"  weight=77 blockId=eureka_denkihuman block="人感ｾﾝｻ値 ﾎﾟｰﾄ|%pin|" group="3_電気の利用ユニット"
  export function eureka_denkihuman(pin: eureka_denki): number {
    switch (pin) {
      case eureka_denki.A:
        pins.setPull(DigitalPin.P14, PinPullMode.PullNone);
        return pins.digitalReadPin(DigitalPin.P14);
      case eureka_denki.B:
        pins.setPull(DigitalPin.P16, PinPullMode.PullNone);
        return pins.digitalReadPin(DigitalPin.P16);
    }
  }


  //% color="#a0522d"  weight=79 blockId=eureka_denkihumanLED block="人感ｾﾝｻの値を表示する ﾎﾟｰﾄ|%pin|" group="3_電気の利用ユニット"
  export function eureka_denkihumanLED(pin: eureka_p1416) {

    pins.setPull(DigitalPin.P14, PinPullMode.PullNone);
    pins.setPull(DigitalPin.P16, PinPullMode.PullNone);
    switch (pin) {
      case eureka_p1416.A:
       basic.showNumber(pins.digitalReadPin(DigitalPin.P14));
        break;
      case eureka_p1416.B:
       basic.showNumber(pins.digitalReadPin(DigitalPin.P16));
        break;
    }
  }




  //% color="#a0522d" weight=78 block="人が動いたら ﾎﾟｰﾄ|%pin|" group="3_電気の利用ユニット"
  export function humanDetection(pin: eureka_p1416): boolean {
    pins.setPull(DigitalPin.P14, PinPullMode.PullNone);
    pins.setPull(DigitalPin.P16, PinPullMode.PullNone);
    switch (pin) {
      case eureka_p1416.A:
        if (pins.digitalReadPin(DigitalPin.P14) == 1) {
          return true;
        } else {
          return false;
        }
        break;
      case eureka_p1416.B:
        if (pins.digitalReadPin(DigitalPin.P16) == 1) {
          return true;
        } else {
          return false;
        }
        break;
    }
  }



  //% color="#a9a9a9"  weight=75 blockId=eureka_denkiwhite block="LED |%mode| ﾎﾟｰﾄ|%pin|" group="3_電気の利用ユニット"
  export function eureka_denkiwhite(mode: onoff, port: eureka_denki) {
    switch (port) {
      case eureka_denki.A:
        if (mode == onoff.ON) {
          return pins.digitalWritePin(DigitalPin.P13, 1);
        } else {
          return pins.digitalWritePin(DigitalPin.P13, 0);
        }
      case eureka_denki.B:
        if (mode == onoff.ON) {
          return pins.digitalWritePin(DigitalPin.P15, 1);
        } else {
          return pins.digitalWritePin(DigitalPin.P15, 0);
        }
    }
  }
}


//% color="#0000ff" weight=93 block="たん体ﾕﾆｯﾄ" 

namespace eureka_blocks_soro {

  //% color="#4169e1" weight=50 blockId=eureka_O2check block="酸素センサー電池チェック ﾎﾟｰﾄ|%pin|" group="酸素センサー"
  export function eureka_O2chekck(pin: eureka_IO) {
    let volt;
    switch (pin) {
      case eureka_IO.A:        
        volt=pins.analogReadPin(AnalogPin.P0);
        if (volt>350) {
        basic.showNumber(volt);
        music.startMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Once)
        basic.showString("OK");    
        }  
        else{
        basic.showNumber(volt);
        basic.showString("NG");      
        music.playTone(262, music.beat(BeatFraction.Whole))
        }
        break; 
      case eureka_IO.B:
        volt=pins.analogReadPin(AnalogPin.P1);
        if (volt>350) {
        basic.showNumber(volt);
        music.startMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Once)
        basic.showString("OK");    
        }  
        else{
        basic.showNumber(volt);
        basic.showString("NG");      
        music.playTone(262, music.beat(BeatFraction.Whole))
        }
        break;
     case eureka_IO.C:
        volt=pins.analogReadPin(AnalogPin.P2);
        if (volt>350) {
        basic.showNumber(volt);
        music.startMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Once)
        basic.showString("OK");    
        }  
        else{
        basic.showNumber(volt);
        basic.showString("NG");      
        music.playTone(262, music.beat(BeatFraction.Whole))
        }
        break; 
    }
  }
    //% color="#4169e1" weight=48 blockId=eureka_O2kousei block="酸素センサー校正 ﾎﾟｰﾄ|%pin|" group="酸素センサー"
  export function eureka_O2kousei(pin: eureka_IO) {
    switch (pin) {
      case eureka_IO.A:
        kousei_A=pins.analogReadPin(AnalogPin.P0);
        break; 
      case eureka_IO.B:
        kousei_B=pins.analogReadPin(AnalogPin.P1);
        break;
     case eureka_IO.C:
        kousei_C=pins.analogReadPin(AnalogPin.P2);
        break; 
        }
  }
  //% color="#4169e1" weight=46 blockId=eureka_O2LED block="酸素濃度をmicro:bitへ表示 ﾎﾟｰﾄ|%pin|" group="酸素センサー"
  export function eureka_O2LED(pin: eureka_IO) {
    switch (pin) {
      case eureka_IO.A:
        let O2_0=Math.round( pins.analogReadPin(AnalogPin.P0)/kousei_A*20.95* 10) / 10
        if (O2_0 >= 5 && O2_0 <= 25){
        basic.showString(convertToText("" + O2_0 + "% "));
        }
        else {
            basic.showString("ER")
        }
        break; 
      case eureka_IO.B:
         let O2_1=Math.round( pins.analogReadPin(AnalogPin.P1)/kousei_B*20.95* 10) / 10
        if (O2_1 >= 5 && O2_1 <= 25){
        basic.showString(convertToText("" + O2_1 + "% "));
        }
        else {
            basic.showString("ER")
        }   
        break;
     case eureka_IO.C:
         let O2_2=Math.round( pins.analogReadPin(AnalogPin.P2)/kousei_C*20.95* 10) / 10
        if (O2_2 >= 5 && O2_2 <= 25){
        basic.showString(convertToText("" + O2_2 + "% "));
        }
        else {
            basic.showString("ER")
        }   
        break; 
        }
  }

 //% color="#4169e1" weight=44 blockId=eureka_O2serial block="酸素濃度をシリアル出力 ﾎﾟｰﾄ|%pin|" group="酸素センサー"
  export function eureka_O2serial(pin: eureka_IO) {
    basic.pause(100);
    switch (pin) {
      case eureka_IO.A:
        serial.writeLine(convertToText(Math.round( pins.analogReadPin(AnalogPin.P0)/kousei_A*20.95* 100) / 100));
        break; 
      case eureka_IO.B:
        serial.writeLine(convertToText(Math.round( pins.analogReadPin(AnalogPin.P1)/kousei_B*20.95* 100) / 100));
        break;
     case eureka_IO.C:
        serial.writeLine(convertToText(Math.round( pins.analogReadPin(AnalogPin.P2)/kousei_C*20.95* 100) / 100));
        break; 
        }
  }

  //% color="#4169e1"  weight=40 blockId=eureka_O2disp block="酸素濃度 ﾎﾟｰﾄ|%pin|" group="酸素センサー"
  export function eureka_O2disp(pin: eureka_IO): number {
    switch (pin) {
      case eureka_IO.A:
        return pins.analogReadPin(AnalogPin.P0)/kousei_A*20.95;
        break; 
      case eureka_IO.B:
        return pins.analogReadPin(AnalogPin.P1)/kousei_B*20.95;
        break;
     case eureka_IO.C:
        return pins.analogReadPin(AnalogPin.P2)/kousei_C*20.95;
        break; 
        }
  }


  //% color="#6041f1"  weight=60 blockId=eureka_L9110 block="ﾓｰﾀｰﾌｧﾝL |%mode| ﾎﾟｰﾄ|%pin|" group="4_ユーレカ装置"
  //% advanced=true
  //% mode.min=-100 mode.max=100
  export function L9110driver(port: eureka_denki, mode: number) {
    switch (port) {
      case eureka_denki.A:
        if (mode > 0) {
          pins.analogWritePin(AnalogPin.P0, Math.round(mode * 10.23));
          pins.digitalWritePin(DigitalPin.P13, 0);
        }
        if (mode < 0) {
          pins.digitalWritePin(DigitalPin.P0, 0);
          pins.analogWritePin(AnalogPin.P13, Math.round(-mode * 10.23));
        }
        if (mode == 0) {
          pins.digitalWritePin(DigitalPin.P0, 0);
          pins.digitalWritePin(DigitalPin.P13, 0);
        }
        break;
      case eureka_denki.B:
        if (mode > 0) {
          pins.analogWritePin(AnalogPin.P1, Math.round(mode * 10.23));
          pins.digitalWritePin(DigitalPin.P15, 0);
        }
        if (mode < 0) {
          pins.digitalWritePin(DigitalPin.P1, 0);
          pins.analogWritePin(AnalogPin.P15, Math.round(-mode * 10.23));
        }
        if (mode == 0) {
          pins.digitalWritePin(DigitalPin.P1, 0);
          pins.digitalWritePin(DigitalPin.P15, 0);
        }
        break;
    }
  }

  //% color="#a9a9a9" weight=58 blockId=eureka_relay block="電磁・FETﾘﾚｰ(ﾃﾞｼﾞﾀﾙ出力) |%mode| ﾎﾟｰﾄ|%pin|" group="単体のリレーユニット"
  export function eureka_relay(mode: onoff, pin: eureka_IO) {
    switch (pin) {
      case eureka_IO.A:
        if (mode == onoff.ON) {
          return pins.digitalWritePin(DigitalPin.P0, 1);
        } else {
          return pins.digitalWritePin(DigitalPin.P0, 0);
        }
      case eureka_IO.B:
        if (mode == onoff.ON) {
          return pins.digitalWritePin(DigitalPin.P1, 1);
        } else {
          return pins.digitalWritePin(DigitalPin.P1, 0);
        }
      case eureka_IO.C:
        if (mode == onoff.ON) {
          return pins.digitalWritePin(DigitalPin.P2, 1);
        } else {
          return pins.digitalWritePin(DigitalPin.P2, 0);
        }
    }
  }
  //% color="#a9a9a9" weight=56 blockId=eureka_relay_2 block="FETﾘﾚｰ(ｱﾅﾛｸﾞ出力) |%syuturyoku| ﾎﾟｰﾄ|%pin|" group="単体のリレーユニット"
  //% syuturyoku.min=0 syuturyoku.max=1023
  export function eureka_relay_2(syuturyoku: number, pin: eureka_IO) {
    switch (pin) {
      case eureka_IO.A: {
        return pins.analogWritePin(AnalogPin.P0, syuturyoku);
      }
      case eureka_IO.B: {
        return pins.analogWritePin(AnalogPin.P1, syuturyoku);
      }
      case eureka_IO.C: {
        return pins.analogWritePin(AnalogPin.P2, syuturyoku);
      }
    }
  }


  //% color="#20b2aa" weight=52 blockId=eureka_m_driver block="ﾓｰﾀｰﾄﾞﾗｲﾊﾞｰD 動き|%mode| ﾎﾟｰﾄ|%pin|" group="モータードライバー"
  export function eureka_m_driver(mode: moter_d, pin: eureka_denki) {
    switch (pin) {
      case eureka_denki.A:
        if (mode == moter_d.両方前) {
          pins.digitalWritePin(DigitalPin.P0, 1);
          pins.digitalWritePin(DigitalPin.P13, 0);
          pins.digitalWritePin(DigitalPin.P14, 1);
        }
        if (mode == moter_d.両方後) {
          pins.digitalWritePin(DigitalPin.P0, 0);
          pins.digitalWritePin(DigitalPin.P13, 1);
          pins.digitalWritePin(DigitalPin.P14, 0);
        }
        if (mode == moter_d.Ｌだけ前) {
          pins.digitalWritePin(DigitalPin.P0, 0);
          pins.digitalWritePin(DigitalPin.P13, 0);
          pins.digitalWritePin(DigitalPin.P14, 1);
        }
        if (mode == moter_d.Ｒだけ前) {
          pins.digitalWritePin(DigitalPin.P0, 1);
          pins.digitalWritePin(DigitalPin.P13, 0);
          pins.digitalWritePin(DigitalPin.P14, 0);
        }
        if (mode == moter_d.Ｌだけ後) {
          pins.digitalWritePin(DigitalPin.P0, 0);
          pins.digitalWritePin(DigitalPin.P13, 1);
          pins.digitalWritePin(DigitalPin.P14, 1);
        }
        if (mode == moter_d.Ｒだけ後) {
          pins.digitalWritePin(DigitalPin.P0, 1);
          pins.digitalWritePin(DigitalPin.P13, 1);
          pins.digitalWritePin(DigitalPin.P14, 0);
        }
        if (mode == moter_d.停止) {
          pins.digitalWritePin(DigitalPin.P0, 0);
          pins.digitalWritePin(DigitalPin.P13, 0);
          pins.digitalWritePin(DigitalPin.P14, 0);
        }
        break;
      case eureka_denki.B:
        if (mode == moter_d.両方前) {
          pins.digitalWritePin(DigitalPin.P1, 1);
          pins.digitalWritePin(DigitalPin.P15, 0);
          pins.digitalWritePin(DigitalPin.P16, 1);
        }
        if (mode == moter_d.両方後) {
          pins.digitalWritePin(DigitalPin.P1, 0);
          pins.digitalWritePin(DigitalPin.P15, 1);
          pins.digitalWritePin(DigitalPin.P16, 0);
        }
        if (mode == moter_d.Ｌだけ前) {
          pins.digitalWritePin(DigitalPin.P1, 0);
          pins.digitalWritePin(DigitalPin.P15, 0);
          pins.digitalWritePin(DigitalPin.P16, 1);
        }
        if (mode == moter_d.Ｒだけ前) {
          pins.digitalWritePin(DigitalPin.P1, 1);
          pins.digitalWritePin(DigitalPin.P15, 0);
          pins.digitalWritePin(DigitalPin.P16, 0);
        }
        if (mode == moter_d.Ｌだけ後) {
          pins.digitalWritePin(DigitalPin.P1, 0);
          pins.digitalWritePin(DigitalPin.P15, 1);
          pins.digitalWritePin(DigitalPin.P16, 1);
        }
        if (mode == moter_d.Ｒだけ後) {
          pins.digitalWritePin(DigitalPin.P1, 1);
          pins.digitalWritePin(DigitalPin.P15, 1);
          pins.digitalWritePin(DigitalPin.P16, 0);
        }
        if (mode == moter_d.停止) {
          pins.digitalWritePin(DigitalPin.P1, 0);
          pins.digitalWritePin(DigitalPin.P15, 0);
          pins.digitalWritePin(DigitalPin.P16, 0);
        }
        break;
    }
  }

  //% color="#ffd700"  weight=40 blockId=eureka_light block="単体_光ｾﾝｻ値 ﾎﾟｰﾄ|%pin|" group="5_単体ユニットセンサー"
  //% advanced=true
  export function tantai_light(pin: eureka_IO): number {
    switch (pin) {
      case eureka_IO.A:
        return Math.round((pins.analogReadPin(AnalogPin.P0) / 1023) * 100);
      case eureka_IO.B:
        return Math.round((pins.analogReadPin(AnalogPin.P1) / 1023) * 100);
      case eureka_IO.C:
        return Math.round((pins.analogReadPin(AnalogPin.P2) / 1023) * 100);
    }
  }

  //% color="#ffd700"  blockID=tantai_Light weight=38 block="単体_光ｾﾝｻ |%limit| より暗い ﾎﾟｰﾄ|%pin|" group="5_単体ユニットセンサー"
  //% advanced=true
  //% limit.min=0 limit.max=100
  export function tantai_Light(limit: number, pin: eureka_IO): boolean {
    switch (pin) {
      case eureka_IO.A:
        if ((pins.analogReadPin(AnalogPin.P0) / 1023) * 100 < limit) {
          return true;
        } else {
          return false;
        }
        break;
      case eureka_IO.B:
        if ((pins.analogReadPin(AnalogPin.P1) / 1023) * 100 < limit) {
          return true;
        } else {
          return false;
        }
        break;
      case eureka_IO.C:
        if ((pins.analogReadPin(AnalogPin.P2) / 1023) * 100 < limit) {
          return true;
        } else {
          return false;
        }
        break;
    }
  }

  //% color="#858585" weight=36 block="単体_人が動いたら ﾎﾟｰﾄ|%pin|" group="5_単体ユニットセンサー"
  //% advanced=true
  export function tantai_humanDetection(pin: eureka_IO): boolean {
    pins.setPull(DigitalPin.P14, PinPullMode.PullNone);
    pins.setPull(DigitalPin.P16, PinPullMode.PullNone);
    switch (pin) {
      case eureka_IO.A:
        pins.setPull(DigitalPin.P0, PinPullMode.PullNone);
        if (pins.digitalReadPin(DigitalPin.P0) == 1) {
          return true;
        } else {
          return false;
        }
        break;
      case eureka_IO.B:
        pins.setPull(DigitalPin.P0, PinPullMode.PullNone);
        if (pins.digitalReadPin(DigitalPin.P1) == 1) {
          return true;
        } else {
          return false;
        }
        break;
      case eureka_IO.C:
        pins.setPull(DigitalPin.P0, PinPullMode.PullNone);
        if (pins.digitalReadPin(DigitalPin.P2) == 1) {
          return true;
        } else {
          return false;
        }
        break;
    }
  }
  //% color="#858585" weight=34 blockId=eureka_human block="単体_人感ｾﾝｻ値 ﾎﾟｰﾄ|%pin|" group="5_単体ユニットセンサー"
  //% advanced=true
    export function eureka_human(pin: eureka_IO): number {
    switch (pin) {
      case eureka_IO.A:
        pins.setPull(DigitalPin.P0, PinPullMode.PullNone);
        return pins.digitalReadPin(DigitalPin.P0);
      case eureka_IO.B:
        pins.setPull(DigitalPin.P1, PinPullMode.PullNone);
        return pins.digitalReadPin(DigitalPin.P1);
      case eureka_IO.C:
        pins.setPull(DigitalPin.P2, PinPullMode.PullNone);
        return pins.digitalReadPin(DigitalPin.P2);
    }
  }

  //% color="#ff7b00" weight=32 blockId=eureka_tempDS block="温度ｾﾝｻDS ﾎﾟｰﾄ|%pin|" group="5_単体ユニットセンサー"
  //% advanced=true
  export function eureka_tempDS(pin: eureka_IO): number {
    switch (pin) {
      case eureka_IO.A:
        return Math.round(dstemp.celsius(DigitalPin.P0)  
        );
        break;
      case eureka_IO.B:
        return Math.round(dstemp.celsius(DigitalPin.P1)
        );
        break;
      case eureka_IO.C:
        return Math.round(dstemp.celsius(DigitalPin.P2)
        );
        break;
    }
  }



  //% color="#ff7b00" weight=32 blockId=eureka_temp block="温度ｾﾝｻMCP ﾎﾟｰﾄ|%pin|" group="5_単体ユニットセンサー"
  //% advanced=true
  export function eureka_temp(pin: eureka_IO): number {
    switch (pin) {
      case eureka_IO.A:
        return Math.round(
          ((pins.analogReadPin(AnalogPin.P0) * 3250) / 1024 - 500) / 10
        );
        break;
      case eureka_IO.B:
        return Math.round(
          ((pins.analogReadPin(AnalogPin.P1) * 3250) / 1024 - 500) / 10
        );
        break;
      case eureka_IO.C:
        return Math.round(
          ((pins.analogReadPin(AnalogPin.P2) * 3250) / 1024 - 500) / 10
        );
        break;
    }
  }

   //% color="#2a2aba" weight=30 blockId=sonar_ping block="超音波きょりｾﾝｻ |%sonar_quality| ﾎﾟｰﾄ|%pin|" group="超音波距離センサー"
  export function ping(sonar_quality:sonar_avg,pin: eureka_tlp): number {
        if (sonar_quality　==sonar_avg.平均20回){
            sonar_quality=20
        }
        if (sonar_quality==sonar_avg.平均5回){
            sonar_quality=5
        }
        if (sonar_quality==sonar_avg.生データ){
            sonar_quality=1
        }
    let  d1=0;
    let  d2=0;

    switch (pin) {


    case eureka_tlp.A:
        for ( let i=0 ; i<sonar_quality ; i++ ){
            basic.pause(5);
            pins.setPull(DigitalPin.P13, PinPullMode.PullNone);
            pins.digitalWritePin(DigitalPin.P13, 0);
            control.waitMicros(2);
            pins.digitalWritePin(DigitalPin.P13, 1);
            control.waitMicros(10);
            pins.digitalWritePin(DigitalPin.P13, 0);
            // read
            d1 = pins.pulseIn(DigitalPin.P14, PulseValue.High, 500 * 58);
            d2=d2+d1;
            }
            return Math.round(Math.idiv(d2/sonar_quality, 58)*1.5);
        break;

    case eureka_tlp.B:
        for  ( let i=0 ; i<sonar_quality; i++){
        basic.pause(20);
        pins.setPull(DigitalPin.P15, PinPullMode.PullNone);
        pins.digitalWritePin(DigitalPin.P15, 0);
        control.waitMicros(2);
        pins.digitalWritePin(DigitalPin.P15, 1);
        control.waitMicros(10);
        pins.digitalWritePin(DigitalPin.P15, 0);
        // read
        d1 = pins.pulseIn(DigitalPin.P16, PulseValue.High, 500 * 58);
        d2=d2+d1;
        }
        return Math.round(Math.idiv(d2/sonar_quality, 58)*1.5);
    }
  }


 //% color="#2a2aba" weight=27 blockId=sonar_ping_3 block="きょりが |%limit| cmより長い ﾎﾟｰﾄ|%pin|" group="超音波距離センサー"
  //% limit.min=0 limit.max=50
  export function sonar_ping_3(limit: number ,pin:eureka_tlp) :boolean{
    let  d1=0;
    let  d2=0;

    switch(pin){
        case eureka_tlp.A:
        for ( let i=0 ; i<20 ; i++ ){
        // send
        basic.pause(5);
        pins.setPull(DigitalPin.P16, PinPullMode.PullNone);
        pins.digitalWritePin(DigitalPin.P13, 0);
        control.waitMicros(2);
        pins.digitalWritePin(DigitalPin.P13, 1);
        control.waitMicros(10);
        pins.digitalWritePin(DigitalPin.P13, 0);
        // read
        d1 = pins.pulseIn(DigitalPin.P14, PulseValue.High, 500 * 58);
        d2= d1+d2;
        }
                if (Math.idiv(d2/20, 58) * 1.5 < limit) {
                return false;
                } else {
                return true;
                }
 
        case eureka_tlp.B:
        for ( let i=0 ; i<20 ; i++ ){
        // send
        basic.pause(5);
        pins.setPull(DigitalPin.P16, PinPullMode.PullNone);
        pins.digitalWritePin(DigitalPin.P15, 0);
        control.waitMicros(2);
        pins.digitalWritePin(DigitalPin.P15, 1);
        control.waitMicros(10);
        pins.digitalWritePin(DigitalPin.P15, 0);
        // read
        d1 = pins.pulseIn(DigitalPin.P16, PulseValue.High, 500 * 58);
        d2= d1+d2;
        }

            if (Math.idiv(d2/20, 58) * 1.5 < limit) {
            return false;
            } else {
            return true;
            }

            }
        }



  //% color="#2a2aba" weight=28 blockId=sonar_ping_4 block="きょりが |%limit| cmより短い ﾎﾟｰﾄ|%pin|" group="超音波距離センサー"
  //% limit.min=0 limit.max=50
  export function sonar_ping_4(limit: number ,pin:eureka_tlp) :boolean{
    let  d1=0;
    let  d2=0;

    switch(pin){
        case eureka_tlp.A:
        for ( let i=0 ; i<20 ; i++ ){
        // send
        basic.pause(5);
        pins.setPull(DigitalPin.P16, PinPullMode.PullNone);
        pins.digitalWritePin(DigitalPin.P13, 0);
        control.waitMicros(2);
        pins.digitalWritePin(DigitalPin.P13, 1);
        control.waitMicros(10);
        pins.digitalWritePin(DigitalPin.P13, 0);
        // read
        d1 = pins.pulseIn(DigitalPin.P14, PulseValue.High, 500 * 58);
        d2= d1+d2;
        }
                if (Math.idiv(d2/20, 58) * 1.5 < limit) {
                return true;
                } else {
                return false;
                }
 
        case eureka_tlp.B:
        for ( let i=0 ; i<20 ; i++ ){
        // send
        basic.pause(5);
        pins.setPull(DigitalPin.P16, PinPullMode.PullNone);
        pins.digitalWritePin(DigitalPin.P15, 0);
        control.waitMicros(2);
        pins.digitalWritePin(DigitalPin.P15, 1);
        control.waitMicros(10);
        pins.digitalWritePin(DigitalPin.P15, 0);
        // read
        d1 = pins.pulseIn(DigitalPin.P16, PulseValue.High, 500 * 58);
        d2= d1+d2;
        }

            if (Math.idiv(d2/20, 58) * 1.5 < limit) {
            return true;
            } else {
            return false;
            }

            }
        }













  //% color="#f071bd" weight=26 blockId=eureka_CdS block="単体_ﾌｫﾄﾘﾌﾚｸﾀｰ ﾎﾟｰﾄ|%pin|" group="5_単体ユニットセンサー"
  //% advanced=true
  export function eureka_CdS(pin: eureka_IO): number {
    switch (pin) {
      case eureka_IO.A:
        return (pins.analogReadPin(AnalogPin.P0) / 1023) * 100;
      case eureka_IO.B:
        return (pins.analogReadPin(AnalogPin.P1) / 1023) * 100;
      case eureka_IO.C:
        return (pins.analogReadPin(AnalogPin.P2) / 1023) * 100;
    }
  }

  //% color="#ff7b00" weight=54 blockId=eureka_white block="単体LED |%mode| ﾎﾟｰﾄ|%pin|" group="たん体ＬＥＤ"

  export function eureka_white(mode: onoff,port: eureka_IO ) {
    switch (port) {
      case eureka_IO.A:
        if (mode == onoff.ON) {
          return pins.digitalWritePin(DigitalPin.P0, 1);
        } else {
          return pins.digitalWritePin(DigitalPin.P0, 0);
        }
      case eureka_IO.B:
        if (mode == onoff.ON) {
          return pins.digitalWritePin(DigitalPin.P1, 1);
        } else {
          return pins.digitalWritePin(DigitalPin.P1, 0);
        }
      case eureka_IO.C:
        if (mode == onoff.ON) {
          return pins.digitalWritePin(DigitalPin.P2, 1);
        } else {
          return pins.digitalWritePin(DigitalPin.P2, 0);
        }
    }
  }




  //% color="#ff7b00" weight=17 blockId=eureka_whiteselect block="単体LED |%mode| 時間|%LED_time|秒 ﾎﾟｰﾄ|%pin|" group="たん体ＬＥＤ"
  export function eureka_whiteselect ( mode: onoff , LED_time:LED_wait , port:eureka_IO) {
    switch (port) {
      case eureka_IO.A:
        if (mode == onoff.ON) {
            pins.digitalWritePin(DigitalPin.P0, 1);
            basic.pause(LED_time*200);
        return
        } else {
            pins.digitalWritePin(DigitalPin.P0, 0);
            basic.pause(LED_time*200);
        return
        }
      case eureka_IO.B:
        if (mode == onoff.ON) {
            pins.digitalWritePin(DigitalPin.P1, 1);
            basic.pause(LED_time*200);
        return
        } else {
            pins.digitalWritePin(DigitalPin.P1, 0);
            basic.pause(LED_time*200);
        return
        }
      case eureka_IO.C:
        if (mode == onoff.ON) {
            pins.digitalWritePin(DigitalPin.P2, 1);
            basic.pause(LED_time*200);
        return
        } else {
            pins.digitalWritePin(DigitalPin.P2, 0);
            basic.pause(LED_time*200);
        return
        }
    }
  }



  //% color="#ff7b00" weight=17 blockId=eureka_white2 block="単体LED　点めつは|%mode| ﾎﾟｰﾄ|%pin|" group="たん体ＬＥＤ"
  export function eureka_white2(mode: LED_onoff ,port: eureka_IO ) {
    switch (port) {
      case eureka_IO.A:
        pins.digitalWritePin(DigitalPin.P0, 1);
        basic.pause(mode);
        if (mode == 0){
            return
        } else {
        pins.digitalWritePin(DigitalPin.P0, 0);
        basic.pause(mode);
        return
        }

      case eureka_IO.B:
        pins.digitalWritePin(DigitalPin.P1, 1);
        basic.pause(mode);
        if (mode == 0){
            return
        } else {
        pins.digitalWritePin(DigitalPin.P1, 0);
        basic.pause(mode);
        return
        }
      case eureka_IO.C:
        pins.digitalWritePin(DigitalPin.P2, 1);
        basic.pause(mode);
        if (mode == 0){
            return
        } else {
        pins.digitalWritePin(DigitalPin.P2, 0);
        basic.pause(mode);
        return
     }

    }
  }



    //% color="#858585" weight=54 blockId=eureka_fullcolor block="ＬＥＤ |%color|色で点めつは|%mode| ﾎﾟｰﾄ|%pin|" group="フルカラーＬＥＤ"
    export function eureka_fullcolor(color:LED_color, mode:LED_onoff, pin: eureka_tlp) {
    switch (color) {
        case LED_color.赤:
        pins.digitalWritePin(DigitalPin.P0, 1);
        basic.pause(mode);
        if (mode ==0) {
            return
        } else {
        pins.digitalWritePin(DigitalPin.P0, 0);
        pins.digitalWritePin(DigitalPin.P13, 0);
        pins.digitalWritePin(DigitalPin.P14, 0);
        basic.pause(mode);
        return
        }
        case LED_color.オレンジ:
        pins.digitalWritePin(DigitalPin.P0, 1);
        pins.analogWritePin(AnalogPin.P13, 240)
        basic.pause(mode);
        if (mode ==0) {
            return
        } else {
        pins.digitalWritePin(DigitalPin.P0, 0);
        pins.digitalWritePin(DigitalPin.P13, 0);
        pins.digitalWritePin(DigitalPin.P14, 0);
        basic.pause(mode);
         return
        }
        case LED_color.き:
        pins.digitalWritePin(DigitalPin.P0, 1);
        pins.digitalWritePin(DigitalPin.P13, 1);
        basic.pause(mode);
        if (mode ==0) {
            return
        } else {
        pins.digitalWritePin(DigitalPin.P0, 0);
        pins.digitalWritePin(DigitalPin.P13, 0);
        pins.digitalWritePin(DigitalPin.P14, 0);
        basic.pause(mode);
        return
        }
            case LED_color.みどり:
        pins.digitalWritePin(DigitalPin.P13, 1);
        basic.pause(mode);
        if (mode ==0) {
            return
        } else {
        pins.digitalWritePin(DigitalPin.P0, 0);
        pins.digitalWritePin(DigitalPin.P13, 0);
        pins.digitalWritePin(DigitalPin.P14, 0);
        basic.pause(mode);
        return
        }
            case LED_color.水:
        pins.analogWritePin(AnalogPin.P0, 388)
        pins.digitalWritePin(DigitalPin.P13, 1);
        pins.analogWritePin(AnalogPin.P14, 767)
        basic.pause(mode);
        if (mode ==0) {
            return
        } else {
        pins.digitalWritePin(DigitalPin.P0, 0);
        pins.digitalWritePin(DigitalPin.P13, 0);
        pins.digitalWritePin(DigitalPin.P14, 0);
         basic.pause(mode);
        return
        }
            case LED_color.青:
        pins.digitalWritePin(DigitalPin.P14, 1);
        basic.pause(mode);
        if (mode ==0) {
            return
        } else {
        pins.digitalWritePin(DigitalPin.P0, 0);
        pins.digitalWritePin(DigitalPin.P13, 0);
        pins.digitalWritePin(DigitalPin.P14, 0);
        basic.pause(mode);
        return
        }
            case LED_color.むらさき:
        pins.analogWritePin(AnalogPin.P0, 338)
        pins.digitalWritePin(DigitalPin.P14, 1);
        basic.pause(mode);
        if (mode ==0) {
            return
        } else {
        pins.digitalWritePin(DigitalPin.P0, 0);
        pins.digitalWritePin(DigitalPin.P13, 0);
        pins.digitalWritePin(DigitalPin.P14, 0);
        basic.pause(mode);
        return
        }
        case LED_color.白:
        pins.digitalWritePin(DigitalPin.P0, 1);
        pins.digitalWritePin(DigitalPin.P13, 1);
        pins.digitalWritePin(DigitalPin.P14, 1);
        basic.pause(mode);
        if (mode ==0) {
            return
        } else {
        pins.digitalWritePin(DigitalPin.P0, 0);
        pins.digitalWritePin(DigitalPin.P13, 0);
        pins.digitalWritePin(DigitalPin.P14, 0);
        basic.pause(mode);
        return
        }
      }
    }

    //% color="#4741f1" weight=53 blockId=eureka_full_blue block="青 点とう|%mode| ﾎﾟｰﾄ|%pin|" group="フルカラーＬＥＤ"
    export function eureka_full_blue(mode: onoff, pin: eureka_tlp) {
    switch (pin) {
      case eureka_tlp.A:
        if (mode == onoff.ON) {
          return pins.digitalWritePin(DigitalPin.P14, 1);
        } else {
          return pins.digitalWritePin(DigitalPin.P14, 0);
        }
      case eureka_tlp.B:
        if (mode == onoff.ON) {
          return pins.digitalWritePin(DigitalPin.P16, 1);
        } else {
          return pins.digitalWritePin(DigitalPin.P16, 0);
        }
    }
  }
 
  //% color="#32cd32" weight=52 blockId=eureka_full_green block="みどり 点とう|%mode| ﾎﾟｰﾄ|%pin|" group="フルカラーＬＥＤ"
  export function eureka_full_green(mode: onoff, pin: eureka_tlp) {
    switch (pin) {
      case eureka_tlp.A:
        if (mode == onoff.ON) {
          return pins.digitalWritePin(DigitalPin.P13, 1);
        } else {
          return pins.digitalWritePin(DigitalPin.P13, 0);
        }
      case eureka_tlp.B:
        if (mode == onoff.ON) {
          return pins.digitalWritePin(DigitalPin.P15, 1);
        } else {
          return pins.digitalWritePin(DigitalPin.P15, 0);
        }
    }
  }

  //% color="#ff4940" weight=51 blockId=eureka_full_red block="赤 点とう|%mode| ﾎﾟｰﾄ|%pin|" group="フルカラーＬＥＤ"
  export function eureka_full_red(mode: onoff, pin: eureka_tlp) {
    switch (pin) {
      case eureka_tlp.A:
        if (mode == onoff.ON) {
          return pins.digitalWritePin(DigitalPin.P0, 1);
        } else {
          return pins.digitalWritePin(DigitalPin.P0, 0);
        }
      case eureka_tlp.B:
        if (mode == onoff.ON) {
          return pins.digitalWritePin(DigitalPin.P1, 1);
        } else {
          return pins.digitalWritePin(DigitalPin.P1, 0);
        }
    }
  }

}

//% color="#ff4500" weight=94 block="iːo(ｲｰｵ)専用"

namespace newio_blocks {



    //% color="#4741f1" weight=89 blockId=neopixel_blue block="iːo青信号 点灯|%mode|" group="1 iːoネオピクセル"
    export function neopixel_blue_block(mode: onoff) {
    switch (mode) {
      case  onoff.ON :
        io_neo.setPixelColor(0, neopixel.colors(NeoPixelColors.Blue))
        io_neo.show()
        break;
                
      case onoff.OFF:
         io_neo.setPixelColor(0, neopixel.colors(NeoPixelColors.Black))
         io_neo.show()
        break;
    }
  }

    //% color="#ffa800" weight=86 blockId=neopixel_yellow block="iːo黄信号 点灯|%mode|" group="1 iːoネオピクセル"
    export function neopixel_yellow_block(mode: onoff) {
    switch (mode) {
      case  onoff.ON :
        io_neo.setPixelColor(1, neopixel.colors(NeoPixelColors.Yellow))
        io_neo.show()
        break;
                
      case onoff.OFF:
         io_neo.setPixelColor(1, neopixel.colors(NeoPixelColors.Black))
         io_neo.show()
        break;
    }
  }

    //% color="#ff4940" weight=84 blockId=neopixel_red block="iːo赤信号 点灯|%mode|" group="1 iːoネオピクセル"
    export function neopixel_red_block(mode: onoff) {
    switch (mode) {
      case  onoff.ON :
        io_neo.setPixelColor(2, neopixel.colors(NeoPixelColors.Red))
        io_neo.show()
        break;
                
      case onoff.OFF:
         io_neo.setPixelColor(2, neopixel.colors(NeoPixelColors.Black))
         io_neo.show()
        break;
    }
  }
 
    //% color="#20b2aa" weight=82 blockId=neopixel_select block="ﾌﾙｶﾗｰLED |%neo_color| 色で |%neo_number|個つける" group="1 iːoネオピクセル"
    export function neopixel_select_block(neo_color: neoLED_color,neo_number:number) {

    switch (neo_color){
        case neoLED_color.赤 :
        for (let n=0 ; n < neo_number;n++){
        io_neo.setPixelColor(n, neopixel.colors(NeoPixelColors.Red))            
        } 
        io_neo.show()
        break;                
        case neoLED_color.だいだい :
        for (let n=0 ; n < neo_number;n++){
        io_neo.setPixelColor(n, neopixel.colors(NeoPixelColors.Orange))            
        } 
        io_neo.show()
        break;    
        case neoLED_color.黄 :
        for (let n=0 ; n < neo_number;n++){
        io_neo.setPixelColor(n, neopixel.colors(NeoPixelColors.Yellow))            
        } 
        io_neo.show()
        break;                
        case neoLED_color.緑 :
        for (let n=0 ; n < neo_number;n++){
        io_neo.setPixelColor(n, neopixel.colors(NeoPixelColors.Green))            
        } 
        io_neo.show()
        break;
        case neoLED_color.青 :
        for (let n=0 ; n < neo_number;n++){
        io_neo.setPixelColor(n, neopixel.colors(NeoPixelColors.Blue))            
        } 
        io_neo.show()
        break;                
        case neoLED_color.あい :
        for (let n=0 ; n < neo_number;n++){
        io_neo.setPixelColor(n, neopixel.colors(NeoPixelColors.Indigo))            
        } 
        io_neo.show()
        break;
        case neoLED_color.すみれ :
        for (let n=0 ; n < neo_number;n++){
        io_neo.setPixelColor(n, neopixel.colors(NeoPixelColors.Violet))            
        } 
        io_neo.show()
        break;                
        case neoLED_color.紫 :
        for (let n=0 ; n < neo_number;n++){
        io_neo.setPixelColor(n, neopixel.colors(NeoPixelColors.Purple))            
        } 
        io_neo.show()
        break;
        case neoLED_color.白 :
        for (let n=0 ; n < neo_number;n++){
        io_neo.setPixelColor(n, neopixel.colors(NeoPixelColors.White))            
        } 
        io_neo.show()
        break;                
        case neoLED_color.黒 :
        for (let n=0 ; n < neo_number;n++){
        io_neo.setPixelColor(n, neopixel.colors(NeoPixelColors.Black))            
        } 
        io_neo.show()
        break;
    }
  }

    //% color="#cd853f" weight=80 blockId=neopixel_erace block="ﾌﾙｶﾗｰLEDを全部消す" group="1 iːoネオピクセル"
    export function neopixel_erace_block() {
        for (let n=0 ; n < 4 ; n++){
        io_neo.setPixelColor(n, neopixel.colors(NeoPixelColors.Black))            
        } 
        io_neo.show()
    }



  //% color="#1E90FF" weight=83 block="待ち時間（秒）|%second|" group="1 iːoネオピクセル"
  //% second.min=0 second.max=10
  export function driveForwards(second: number): void {
    basic.pause(second * 1000);
  }


  //% color="#a0522d" weight=36 block="iːo人が動いたら" group="2 iːo人感センサー"
  export function IO_humanDetection(): boolean {
        pins.setPull(DigitalPin.P14, PinPullMode.PullNone);
        if (pins.digitalReadPin(DigitalPin.P14) == 1) {
          return true;
        } else {
          return false;
        }
  }
 
  //% color="#a0522d" weight=34 blockId=IO_human block="iːo人感ｾﾝｻ値" group="2 iːo人感センサー"
    export function IO_human(): number {
        pins.setPull(DigitalPin.P14, PinPullMode.PullNone);
        return pins.digitalReadPin(DigitalPin.P14);
  }

  //% color="#a0522d"  weight=79 blockId=IO_human_DISP block="iːo人感ｾﾝｻの値を表示する" group="2 iːo人感センサー"
  export function IO_human_DISP() {

    pins.setPull(DigitalPin.P14, PinPullMode.PullNone);
       basic.showNumber(pins.digitalReadPin(DigitalPin.P14));
  }

  //% color="#009A00"  weight=81 blockId=microbit2_decideLight block="m:bit光ｾﾝｻ値 |%limit| より暗い" group="3 microbitの光ｾﾝｻ"
  //% limit.min=0 limit.max=100
  export function microbit2_decideLight(limit: number) :boolean{
        if (input.lightLevel()/254*100  < limit) {            
          return true;
        } else {
          return false;
        }
   }



  //% color="#009A00"  weight=80 blockId=microbit2_denkitemp block="m:bit光ｾﾝｻ値" group="3 microbitの光ｾﾝｻ"
  export function microbit2_denkitemp():number{

        return Math.round(input.lightLevel()/254*100);

  }


  //% color="#228b22"  weight=82 blockId=microbit2_denkiLED block="m:bit光ｾﾝｻの値を表示する" group="3 microbitの光ｾﾝｻ"
  export function microbit2_denkiLED(){
            basic.showNumber(Math.round(input.lightLevel()/254*100));
  }


  //% color="#696969" weight=58 blockId=IO_relay block="iːoﾘﾚｰ(ﾃﾞｼﾞﾀﾙ) |%mode|" group="4 iːoリレー"
  export function IO_relay(mode: onoff) {
    switch (mode) {
      case onoff.ON:{
          return pins.digitalWritePin(DigitalPin.P8, 1);
        } 
      case onoff.OFF: {
           return pins.digitalWritePin(DigitalPin.P8, 0);
        }
    }
  }
  //% color="#696969" weight=56 blockId=IO_relay_2 block="iːoﾘﾚｰ(ｱﾅﾛｸﾞ) |%syuturyoku|" group="4 iːoリレー"
  //% syuturyoku.min=0 syuturyoku.max=1023
  export function IO_relay_2(syuturyoku: number) {
        return pins.analogWritePin(AnalogPin.P8, syuturyoku);
  }
}





