data = [
  //Rのデータ
  {"title":"R-1",
  "rarelity":1},
  {"title":"R-2",
  "rarelity":1},
  {"title":"R-3",
  "rarelity":1},
  {"title":"R-4",
  "rarelity":1},
  {"title":"R-5",
  "rarelity":1},
  {"title":"R-6",
  "rarelity":1},
  {"title":"R-7",
  "rarelity":1},
  {"title":"R-8",
  "rarelity":1},
  {"title":"R-9",
  "rarelity":1},
  {"title":"R-10",
  "rarelity":1},
  {"title":"R-11",
  "rarelity":1},
  {"title":"R-12",
  "rarelity":1},
  {"title":"R-13",
  "rarelity":1},
  {"title":"R-14",
  "rarelity":1},
  {"title":"R-15",
  "rarelity":1},
  {"title":"R-16",
  "rarelity":1},
  {"title":"R-17",
  "rarelity":1},
  {"title":"R-18",
  "rarelity":1},
  {"title":"R-19",
  "rarelity":1},
  {"title":"R-20",
  "rarelity":1},

  //SRのデータ
  {"title":"SR-1",
  "rarelity":2},
  {"title":"SR-2",
  "rarelity":2},
  {"title":"SR-3",
  "rarelity":2},
  {"title":"SR-4",
  "rarelity":2},
  {"title":"SR-5",
  "rarelity":2},
  {"title":"SR-6",
  "rarelity":2},
  {"title":"SR-7",
  "rarelity":2},
  {"title":"SR-8",
  "rarelity":2},
  {"title":"SR-9",
  "rarelity":2},
  {"title":"SR-10",
  "rarelity":2},

  //SSRのデータ
  {"title":"SSR-1",
  "rarelity":3},
  {"title":"SSR-2",
  "rarelity":3},
  {"title":"SSR-3",
  "rarelity":3},
  {"title":"SSR-4",
  "rarelity":3},
  {"title":"SSR-5",
  "rarelity":3},
]


  //counterの設定
let countUpValue = 0;

  //レアリティの収納先
let r_count = 0;
let sr_count = 0;
let ssr_count =0;


$(function(){

  function createResult(){
    // ランダムな数を作る関数を定義
    function randomChoice(array, num){
        const arr = array.concat();
        const choiced = []
        let l = array.length;
        let n = Math.min(num, array.length);
        
        while(n-- > 0){
            let i = Math.floor(Math.random() * l--);
            choiced.push(arr[i]);
        }
        return choiced;
    }

    // 全データからランダムに9枚持ってくる
    result = randomChoice(data, 9);

    // 2以上のデータからランダムに1枚持ってきて9枚に足す
    thats_all_2 = data.filter((datum) => {
        return datum.rarelity >= 2
    })
    result.push(randomChoice(thats_all_2, 1)[0]);
      }

    // ガチャ実行ボタン
  $('#try').on('click',function(){
    createResult();
    // ガチャの結果表示画面(アイテム)
    let stock1 = '';
    for (let i=0; i<result.length;i++){
    stock1 += '<li>'+ result[i].title + '</li>';
    }
    $('#result1').html(stock1)

    // ガチャの結果表示(レアリティ)
    let stock2 = '';
    for (let i=0; i<result.length;i++){
    stock2 += '<li>'+ '星' + (result[i].rarelity) + '</li>';
    }
    $('#result2').html(stock2)

    //排出された結果をレアリティで振り分け
    let count = {}; 
    for (let i = 0; i < result.length;i++) {
    let elm = result[i].rarelity;
    count[elm] = (count[elm] || 0) + 1;
    }
    //対象のレアリティがなかった時に０で表示させる
    if(!count[1]) count[1] = 0;
    if(!count[2]) count[2] = 0;
    if(!count[3]) count[3] = 0;

    //総数の一時保存
    r_count= r_count+ count[1];
    sr_count = sr_count + count[2];
    ssr_count = ssr_count + count[3];
    
    //排出されたレアリティの表示
    result3 = `<te>R${r_count}:SR${sr_count}:SSR${ssr_count}</te>`
    $('#result3').html(result3);
    
    //押した回数の表示(10連刻み)
    countUpValue+= 10;
    $('#counter').html(`${countUpValue}連目`);
  })

    //リセットボタン 
  $('#reset').on('click',function(){
   $('#result1').html('');
   $('#result2').html('');
   $('#result3').html('');
   countUpValue= 0;
   $('#counter').html('');
   r_count = 0;
   sr_count = 0;
   ssr_count = 0;
  })
})