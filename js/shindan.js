/* 家賃上限診断 */
(function () {
  const LINE_URL = 'https://line.me/R/ti/p/%40819vbkzr';   /* ← LINE公式アカウントのURLに差し替え */
  const TEDORI_RATE = 0.8;    /* 総支給→手取りの換算(約8割) */
  const RATE_MEYASU = 0.30;   /* 目安: 手取りの3割 */
  const RATE_LIMIT  = 0.35;   /* 現実的な上限: 3.5割 */
  const STRETCH     = 0.5;    /* そこからの背伸びは+5,000円まで */

  const COND = {
    eki:   { label: '駅から近い',     tip: '駅近は家賃が上がりやすい条件です。目安より少し下の家賃で探すと、徒歩5〜7分の選択肢が増えます。' },
    chiku: { label: '築浅・きれい',   tip: '築浅は家賃が一段上がります。候補駅から1〜2駅ずらすと、同じ家賃で築年が新しくなることが多いです。' },
    hiro:  { label: '広さ・収納',     tip: '1Kより1DKが狙える駅を選ぶのがコツ。候補駅のうち、相場が目安より低い駅から見てください。' },
    auto:  { label: 'オートロック',   tip: 'オートロックそのものの差より、築年と立地で家賃は決まります。2階以上と合わせて、駅ごとに探してもらうと早いです。' },
    none:  { label: 'とくに無い',     tip: '条件はあとから決めて大丈夫です。まず候補駅の部屋をいくつか見て、「これは譲れない」を見つけるのが近道です。' }
  };

  const state = { mode: 'gross', pay: 21, hub: null, cond: null, step: 1 };

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));
  const r1 = (n) => Math.round(n * 10) / 10;
  const yen = (n) => n.toFixed(1) + '万円';

  /* 給料のセレクトを作る */
  const sel = $('#pay');
  for (let v = 14; v <= 40; v++) {
    const o = document.createElement('option');
    o.value = v; o.textContent = v + '万円';
    if (v === state.pay) o.selected = true;
    sel.appendChild(o);
  }

  function tedori() {
    return state.mode === 'gross' ? state.pay * TEDORI_RATE : state.pay;
  }
  function payHint() {
    const t = tedori();
    $('#pay-hint').textContent = state.mode === 'gross'
      ? '手取りの目安は約' + r1(t).toFixed(1) + '万円(総支給の約8割で計算)'
      : '手取りで入力しています';
  }

  $$('#mode button').forEach((b) => b.addEventListener('click', () => {
    state.mode = b.dataset.mode;
    $$('#mode button').forEach((x) => x.classList.toggle('is-on', x === b));
    payHint();
  }));
  sel.addEventListener('change', () => { state.pay = Number(sel.value); payHint(); });
  payHint();

  /* 選択肢ボタン(勤務先・条件) */
  function bindChoices(groupSel, key) {
    $$(groupSel + ' .choice').forEach((b) => b.addEventListener('click', () => {
      state[key] = b.dataset.value;
      $$(groupSel + ' .choice').forEach((x) => x.classList.toggle('is-on', x === b));
      $('#next' + state.step).disabled = false;
    }));
  }
  bindChoices('#hub', 'hub');
  bindChoices('#cond', 'cond');

  /* ステップ移動 */
  function show(step) {
    state.step = step;
    $$('.q').forEach((q) => q.classList.toggle('hidden', Number(q.dataset.step) !== step));
    $$('.progress span').forEach((s, i) => s.classList.toggle('is-on', i < step));
    window.scrollTo({ top: $('#quiz').offsetTop - 12, behavior: 'smooth' });
  }
  $('#next1').addEventListener('click', () => show(2));
  $('#back2').addEventListener('click', () => show(1));
  $('#next2').addEventListener('click', () => show(3));
  $('#back3').addEventListener('click', () => show(2));
  $('#next3').addEventListener('click', () => { render(); show(4); });
  $('#redo').addEventListener('click', () => show(1));

  /* 候補駅を選ぶ: 現実的な上限に収まる駅のうち、目安に近い順。相場未入力の駅は後ろに回す */
  function pickStations(hubKey, meyasu, limit) {
    const hub = STATIONS[hubKey];
    if (!hub) return { list: [], label: '' };
    const withRent = hub.list.filter((s) => s.rent !== null && s.rent <= limit)
      .sort((a, b) => Math.abs(a.rent - meyasu) - Math.abs(b.rent - meyasu));
    const noRent = hub.list.filter((s) => s.rent === null);
    const list = withRent.slice(0, 3);
    for (const s of noRent) { if (list.length >= 3) break; list.push(s); }
    return { list, label: hub.label, stretchNote: withRent.length === 0 && hub.list.some((s) => s.rent !== null) };
  }

  function render() {
    const t = tedori();
    const meyasu = r1(t * RATE_MEYASU);
    const limit = r1(t * RATE_LIMIT);
    const stretch = r1(limit + STRETCH);
    const picked = pickStations(state.hub, meyasu, limit);
    const cond = COND[state.cond];

    $('#r-meyasu').textContent = meyasu.toFixed(1);
    $('#r-limit').textContent = yen(limit);
    $('#r-stretch').textContent = yen(stretch);
    $('#r-tedori').textContent = state.mode === 'gross'
      ? '総支給' + state.pay + '万円(手取り約' + r1(t).toFixed(1) + '万円)で計算'
      : '手取り' + state.pay + '万円で計算';

    /* 候補駅 */
    const ul = $('#r-stations'); ul.innerHTML = '';
    if (picked.list.length === 0) {
      ul.innerHTML = '<li>候補駅のデータを準備中です<span>LINEで勤務先を教えてください</span></li>';
    }
    picked.list.forEach((s) => {
      const li = document.createElement('li');
      const detail = s.rent !== null
        ? '1K/1DK ' + yen(s.rent) + (s.min ? '・' + picked.label + 'まで' + s.min + '分' : '')
        : '相場は準備中' + (s.min ? '・' + picked.label + 'まで' + s.min + '分' : '');
      li.innerHTML = '<b>' + s.name + '</b><span>' + s.line + '｜' + detail + '</span>';
      ul.appendChild(li);
    });
    $('#r-hub').textContent = picked.label;
    $('#r-stretch-note').classList.toggle('hidden', !picked.stretchNote);

    /* 初期費用の目安: キャンペーン物件なら家賃×4、礼金ありなら×5が多い */
    $('#r-init').textContent = '約' + Math.round(meyasu * 4) + '万〜' + Math.round(meyasu * 5) + '万円';

    /* 条件へのひとこと */
    $('#r-cond-label').textContent = cond.label;
    $('#r-cond-tip').textContent = cond.tip;

    /* LINEに貼る文章 */
    const names = picked.list.map((s) => s.name).join('・') || '(準備中)';
    $('#r-text').value =
      '【家賃上限診断の結果】\n' +
      '給料: ' + (state.mode === 'gross' ? '総支給' + state.pay + '万円(手取り約' + r1(t).toFixed(1) + '万円)' : '手取り' + state.pay + '万円') + '\n' +
      '勤務先: ' + picked.label + '\n' +
      '譲れない条件: ' + cond.label + '\n' +
      '家賃の目安: ' + yen(meyasu) + '(現実的な上限 ' + yen(limit) + ')\n' +
      '候補駅: ' + names + '\n' +
      '— この結果で、部屋探しメモをお願いします。';

    $$('.line-link').forEach((a) => a.href = LINE_URL);
    if (RENT_UPDATED) $('#r-updated').textContent = '相場は' + RENT_UPDATED + 'のSUUMO沿線データ(1K/1DK)です。';
  }

  /* コピー */
  $('#copy').addEventListener('click', async () => {
    const ta = $('#r-text');
    try {
      await navigator.clipboard.writeText(ta.value);
    } catch (e) {
      ta.select(); document.execCommand('copy');
    }
    $('#copy-ok').textContent = 'コピーしました。LINEを開いて貼り付けてください。';
  });

  show(1);
})();
