/* 駅データ(勤務先の拠点ごと)
   rent: SUUMO沿線ページ「1K/1DK」の値(万円)。null のままだと結果画面に「相場は準備中」と出ます。
   min : 拠点駅までの所要分。null なら表示しません。
   相場の更新日は一番下の RENT_UPDATED に書いてください。 */
const STATIONS = {
  umeda: {
    label: '梅田',
    list: [
      { name: '十三',    line: '阪急',       min: 3,    rent: 6.0 },
      { name: '塚本',    line: 'JR',         min: null, rent: null },
      { name: '野田',    line: 'JR・阪神',   min: null, rent: null },
      { name: '御幣島',  line: 'JR東西線',   min: null, rent: null },
      { name: '三国',    line: '阪急',       min: null, rent: null },
      { name: '淡路',    line: '阪急',       min: null, rent: null },
      { name: '上新庄',  line: '阪急',       min: null, rent: null },
      { name: '相川',    line: '阪急',       min: null, rent: null },
      { name: '千船',    line: '阪神',       min: null, rent: null },
      { name: '姫島',    line: '阪神',       min: null, rent: null },
      { name: '園田',    line: '阪急',       min: 12,   rent: null },
      { name: '吹田',    line: 'JR',         min: null, rent: null },
      { name: '岸辺',    line: 'JR',         min: null, rent: null },
      { name: '曽根',    line: '阪急',       min: null, rent: null },
      { name: '千里丘',  line: 'JR',         min: null, rent: null },
      { name: '茨木',    line: 'JR',         min: null, rent: null }
    ]
  },
  namba: {
    label: 'なんば・本町',
    list: [
      { name: '住吉大社', line: '南海',       min: null, rent: null },
      { name: '河内小阪', line: '近鉄',       min: null, rent: null },
      { name: '布施',     line: '近鉄',       min: null, rent: null },
      { name: '今里',     line: '地下鉄',     min: null, rent: null },
      { name: '弁天町',   line: 'JR・地下鉄', min: null, rent: null },
      { name: '北加賀屋', line: '地下鉄',     min: null, rent: null },
      { name: '八戸ノ里', line: '近鉄',       min: null, rent: null },
      { name: '我孫子前', line: '南海',       min: null, rent: null },
      { name: '九条',     line: '地下鉄・阪神', min: null, rent: null },
      { name: '緑橋',     line: '地下鉄',     min: null, rent: null }
    ]
  },
  shinosaka: {
    label: '新大阪・江坂',
    list: [
      { name: '千里中央',       line: '北大阪急行', min: null, rent: null },
      { name: '桃山台',         line: '北大阪急行', min: null, rent: null },
      { name: '緑地公園',       line: '北大阪急行', min: null, rent: null },
      { name: '箕面萱野',       line: '北大阪急行', min: null, rent: null },
      { name: '箕面船場阪大前', line: '北大阪急行', min: null, rent: null },
      { name: '高槻',           line: 'JR',         min: null, rent: null },
      { name: '放出',           line: 'JR',         min: null, rent: null },
      { name: '鴫野',           line: 'JR',         min: null, rent: null },
      { name: '西中島南方',     line: '地下鉄・阪急', min: null, rent: null },
      { name: 'JR総持寺',       line: 'JR',         min: null, rent: null }
    ]
  },
  tennoji: {
    label: '天王寺・あべの',
    list: [
      { name: '矢田',       line: '近鉄',   min: null, rent: null },
      { name: '針中野',     line: '近鉄',   min: null, rent: null },
      { name: '加美',       line: 'JR',     min: null, rent: null },
      { name: '平野',       line: 'JR',     min: null, rent: null },
      { name: '今川',       line: '近鉄',   min: null, rent: null },
      { name: '我孫子町',   line: 'JR',     min: null, rent: null },
      { name: '長居',       line: 'JR・地下鉄', min: null, rent: null },
      { name: '鶴ケ丘',     line: 'JR',     min: null, rent: null },
      { name: '東部市場前', line: 'JR',     min: null, rent: null },
      { name: '北田辺',     line: '近鉄',   min: null, rent: null },
      { name: '杉本町',     line: 'JR',     min: null, rent: null }
    ]
  }
};
const RENT_UPDATED = '';  /* 例: '2026年7月' */
