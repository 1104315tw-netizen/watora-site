/* 駅データ(勤務先の拠点ごと)
   rent: SUUMO沿線ページ「1K/1DK」(建物種別=マンション)の家賃相場(万円)。全拠点 2026年10月10日更新分。
         2026-11-14・11-18 に SUUMO の沿線別ページから取得(25路線)。
         路線を2つ書いた駅は、先頭の路線のページの値。同じ駅でも路線ページごとに値が違うことがある。
   min : 拠点駅までの所要分。null なら表示しません。 */
const STATIONS = {
  umeda: {
    label: '梅田',
    list: [
      { name: '十三', line: '阪急', min: 3, rent: 6.0 },
      { name: '塚本', line: 'JR東海道本線', min: null, rent: 5.9 },
      { name: '野田', line: 'JR環状線・阪神', min: null, rent: 6.5 },
      { name: '御幣島', line: 'JR東西線', min: null, rent: 5.9 },
      { name: '三国', line: '阪急宝塚線', min: null, rent: 6.3 },
      { name: '淡路', line: '阪急京都線', min: null, rent: 5.7 },
      { name: '上新庄', line: '阪急京都線', min: null, rent: 4.2 },
      { name: '相川', line: '阪急京都線', min: null, rent: 4.7 },
      { name: '千船', line: '阪神本線', min: null, rent: 5.7 },
      { name: '姫島', line: '阪神本線', min: null, rent: 6.0 },
      { name: '園田', line: '阪急神戸線', min: 12, rent: 4.9 },
      { name: '吹田', line: 'JR東海道本線', min: null, rent: 5.6 },
      { name: '岸辺', line: 'JR東海道本線', min: null, rent: 6.0 },
      { name: '曽根', line: '阪急宝塚線', min: null, rent: 5.2 },
      { name: '千里丘', line: 'JR東海道本線', min: null, rent: 5.7 },
      { name: '茨木', line: 'JR東海道本線', min: null, rent: 5.7 }
    ]
  },
  namba: {
    label: 'なんば・本町',
    list: [
      { name: '住吉大社', line: '南海本線', min: null, rent: 4.5 },
      { name: '河内小阪', line: '近鉄奈良線', min: null, rent: 4.6 },
      { name: '布施', line: '近鉄奈良線・大阪線', min: null, rent: 5.5 },
      { name: '今里', line: '千日前線', min: null, rent: 6.0 },
      { name: '弁天町', line: '中央線・JR環状線', min: null, rent: 6.0 },
      { name: '北加賀屋', line: '四つ橋線', min: null, rent: 4.2 },
      { name: '八戸ノ里', line: '近鉄奈良線', min: null, rent: 4.6 },
      { name: '我孫子前', line: '南海高野線', min: null, rent: 4.6 },
      { name: '九条', line: '中央線・阪神なんば線', min: null, rent: 6.1 },
      { name: '緑橋', line: '中央線', min: null, rent: 6.1 },
      { name: '玉出', line: '四つ橋線', min: null, rent: 4.6 },
      { name: '岸里玉出', line: '南海本線・高野線', min: null, rent: 5.0 },
      { name: '天下茶屋', line: '南海・堺筋線', min: null, rent: 5.4 },
      { name: '動物園前', line: '御堂筋線・堺筋線', min: null, rent: 5.8 },
      { name: '長瀬', line: '近鉄大阪線', min: null, rent: 4.3 },
      { name: '俊徳道', line: '近鉄大阪線', min: null, rent: 4.5 }
    ]
  },
  kyobashi: {
    label: '京橋・OBP',
    list: [
      { name: '野江', line: '京阪本線', min: null, rent: 6.0 },
      { name: '関目', line: '京阪本線', min: null, rent: 5.9 },
      { name: '森小路', line: '京阪本線', min: null, rent: 5.6 },
      { name: '千林', line: '京阪本線', min: null, rent: 5.0 },
      { name: '滝井', line: '京阪本線', min: null, rent: 5.2 },
      { name: '土居', line: '京阪本線', min: null, rent: 5.2 },
      { name: '守口市', line: '京阪本線', min: null, rent: 5.3 },
      { name: '西三荘', line: '京阪本線', min: null, rent: 5.2 },
      { name: '門真市', line: '京阪本線', min: null, rent: 4.7 },
      { name: '古川橋', line: '京阪本線', min: null, rent: 4.2 },
      { name: '大和田', line: '京阪本線', min: null, rent: 3.9 },
      { name: '萱島', line: '京阪本線', min: null, rent: 3.9 },
      { name: '寝屋川市', line: '京阪本線', min: null, rent: 3.7 },
      { name: '香里園', line: '京阪本線', min: null, rent: 4.0 },
      { name: '鴫野', line: 'JR学研都市線', min: null, rent: 6.0 },
      { name: '放出', line: 'JR学研都市線', min: null, rent: 6.0 },
      { name: '徳庵', line: 'JR学研都市線', min: null, rent: 5.3 },
      { name: '鴻池新田', line: 'JR学研都市線', min: null, rent: 5.0 },
      { name: '住道', line: 'JR学研都市線', min: null, rent: 4.4 },
      { name: '野崎', line: 'JR学研都市線', min: null, rent: 4.1 },
      { name: '四条畷', line: 'JR学研都市線', min: null, rent: 3.7 },
      { name: '蒲生四丁目', line: '長堀鶴見緑地線', min: null, rent: 6.0 },
      { name: '今福鶴見', line: '長堀鶴見緑地線', min: null, rent: 5.9 },
      { name: '横堤', line: '長堀鶴見緑地線', min: null, rent: 5.5 },
      { name: '鶴見緑地', line: '長堀鶴見緑地線', min: null, rent: 5.3 },
      { name: '門真南', line: '長堀鶴見緑地線', min: null, rent: 4.8 }
    ]
  },
  shinosaka: {
    label: '新大阪・江坂',
    list: [
      { name: '千里中央', line: '北大阪急行', min: null, rent: 5.3 },
      { name: '桃山台', line: '北大阪急行', min: null, rent: 5.5 },
      { name: '緑地公園', line: '北大阪急行', min: null, rent: 6.0 },
      { name: '箕面萱野', line: '北大阪急行', min: null, rent: 4.3 },
      { name: '箕面船場阪大前', line: '北大阪急行', min: null, rent: 5.3 },
      { name: '高槻', line: 'JR東海道本線', min: null, rent: 5.3 },
      { name: '放出', line: 'おおさか東線', min: null, rent: 6.0 },
      { name: '鴫野', line: 'おおさか東線', min: null, rent: 6.0 },
      { name: '西中島南方', line: '御堂筋線・阪急', min: null, rent: 6.2 },
      { name: 'JR総持寺', line: 'JR東海道本線', min: null, rent: 5.1 },
      { name: '吹田', line: 'JR東海道本線', min: null, rent: 5.6 },
      { name: '岸辺', line: 'JR東海道本線', min: null, rent: 6.0 },
      { name: '千里丘', line: 'JR東海道本線', min: null, rent: 5.7 }
    ]
  },
  tennoji: {
    label: '天王寺・あべの',
    list: [
      { name: '我孫子町', line: 'JR阪和線', min: null, rent: 4.9 },
      { name: '鶴ケ丘', line: 'JR阪和線', min: null, rent: 5.1 },
      { name: '杉本町', line: 'JR阪和線', min: null, rent: 4.6 },
      { name: '長居', line: 'JR阪和線', min: null, rent: 5.0 },
      { name: '南田辺', line: 'JR阪和線', min: null, rent: 5.7 },
      { name: '加美', line: 'JR大和路線', min: null, rent: 4.1 },
      { name: '平野', line: 'JR大和路線', min: null, rent: 4.5 },
      { name: '東部市場前', line: 'JR大和路線', min: null, rent: 5.2 },
      { name: '八尾', line: 'JR大和路線', min: null, rent: 5.3 },
      { name: '久宝寺', line: 'JR大和路線', min: null, rent: 4.9 },
      { name: '矢田', line: '近鉄南大阪線', min: null, rent: 3.9 },
      { name: '針中野', line: '近鉄南大阪線', min: null, rent: 4.1 },
      { name: '今川', line: '近鉄南大阪線', min: null, rent: 4.7 },
      { name: '北田辺', line: '近鉄南大阪線', min: null, rent: 5.6 },
      { name: '喜連瓜破', line: '谷町線', min: null, rent: 4.2 },
      { name: '駒川中野', line: '谷町線', min: null, rent: 4.4 },
      { name: '出戸', line: '谷町線', min: null, rent: 4.5 },
      { name: 'あびこ', line: '御堂筋線', min: null, rent: 4.7 },
      { name: '西田辺', line: '御堂筋線', min: null, rent: 5.4 }
    ]
  }
};
const RENT_UPDATED = '2026年10月';
