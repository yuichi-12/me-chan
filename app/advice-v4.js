// こころ日和 v4：芽ちゃん相談バリエーションデータ

export const adviceV4 = {
  food: {
    low: [
      'たらこ風パスタ＋野菜スープ',
      '卵雑炊＋冷ややっこ',
      '鮭おにぎり＋豚汁',
      'きつねうどん＋温泉卵',
      '鶏そぼろ丼＋みそ汁',
      'サンドイッチ＋ミネストローネ',
      '豆腐と卵のスープ＋小さめのおにぎり',
      'ツナと大葉の和風パスタ'
    ],
    normal: [
      '鮭定食＋具だくさんみそ汁',
      '鶏と野菜の親子丼',
      'トマトパスタ＋サラダ',
      '豚しゃぶうどん',
      'オムライス＋野菜スープ',
      '焼き魚＋ごはん＋小鉢',
      'そぼろご飯＋温野菜',
      'ツナサンド＋ヨーグルト'
    ],
    bright: [
      '好きなパスタ＋季節のサラダ',
      '具だくさんタコライス',
      'サーモン丼＋みそ汁',
      '野菜たっぷりカレー',
      'お気に入りのパン＋スープ',
      '好きな店のランチを一品'
    ]
  },

  work: [
    '今日終える仕事を1つだけ決める',
    '10分だけ一番小さい作業から始める',
    '返信が必要なものを1件だけ処理する',
    '25分作業して5分離席する',
    '「今日やらないこと」を1つ決める'
  ],

  tired: [
    '窓辺で3分だけ外を見る',
    '肩と首をゆっくり1分動かす',
    '5分だけ外の空気を吸う',
    '机の上を1か所だけ整える',
    'スマホを置いて3分ぼんやりする'
  ],

  anxious: [
    '心配事を紙に1つだけ書く',
    '「今できること／今できないこと」に分ける',
    '4秒吸って6秒吐く呼吸を3回',
    '5分だけ歩きながら周囲を眺める',
    '次にする行動を1つだけ決める'
  ],

  sad: [
    '温かい飲み物をゆっくり飲む',
    '無理に元気を出さず10分休む',
    '信頼できる人に短いメッセージを送る',
    '好きだった音楽を1曲だけ聴く',
    'シャワーか入浴で体をゆるめる'
  ],

  rest: [
    '目を閉じて3分休む',
    '温かい飲み物で5分休憩',
    '昼休みに5分だけ一人になる',
    '帰宅後すぐ予定を入れず10分休む',
    '入浴後は照明を少し落として過ごす',
    '寝る前のスマホ時間を10分短くする'
  ],

  color: [
    '淡いブルー',
    'セージグリーン',
    'アイボリー',
    'やさしいイエロー',
    'コーラル',
    'ラベンダー',
    'グレージュ',
    'オフホワイト'
  ],

  sound: [
    '歌詞のない落ち着いた曲を1曲',
    '昔好きだった曲を1曲',
    '自然音を5分',
    '少しテンポのある曲を1曲',
    '今日は無音の時間を5分'
  ]
};

export function pick(items, seed = '') {
  const n = [...seed].reduce(
    (total, c) => total + c.charCodeAt(0),
    0
  );

  return items[n % items.length];
}

export function detectTopic(text) {
  if (/死にたい|消えたい|自殺|生きたくない|殺したい/.test(text)) {
    return 'danger';
  }

  if (/上司|部下|仕事|会社|職場|会議|残業/.test(text)) {
    return 'work';
  }

  if (/眠れ|寝不足|睡眠|夜中|寝れ/.test(text)) {
    return 'sleep';
  }

  if (/不安|心配|怖|焦|どうしよう/.test(text)) {
    return 'anxious';
  }

  if (/怒|イライラ|むかつ|腹が立|許せない/.test(text)) {
    return 'anger';
  }

  if (/悲し|寂し|さみし|泣|つらい|辛い|落ち込/.test(text)) {
    return 'sad';
  }

  if (/食べ|ご飯|ごはん|昼|夕飯|料理|パスタ|食事/.test(text)) {
    return 'food';
  }

  if (/疲れ|しんど|忙し|くたくた/.test(text)) {
    return 'tired';
  }

  return 'general';
}


// 伝統文化・占術の視点。
// 注意：以下は科学的効果や未来予測を保証するものではありません。
// 「その体系ではどう解釈するか」を明示する補助的な振り返り用データです。
export const culturalLenses = {
  fengShui: {
    label: '風水・五行の視点',
    basis: '陰陽五行の伝統的な考え方では、木・火・土・金・水の関係や調和を重視します。',
    disclaimer: '伝統文化上の解釈で、科学的な効果を保証するものではありません。',
    anxious: [
      '風水・五行の考え方を借りるなら、まず身の回りを一か所だけ整えて「区切り」をつくる、という使い方ができるよ。',
      '風水の考え方では環境を整えることを大切にするよ。机の上を一か所だけ片づけて、気持ちを切り替える合図にしてみるのも一案だよ。'
    ],
    work: [
      '風水の考え方を生活の区切りとして使うなら、仕事を始める場所を整え、必要な物だけを手元に置く方法があるよ。',
      '五行という伝統的な枠組みでは「調和」を重視するよ。今日は増やすより、机や予定から一つ減らすことを意識してみるのも一案だよ。'
    ],
    tired: [
      '風水の考え方を気分転換に使うなら、休む場所と作業する場所を少し分けてみるのも一案だよ。',
      '伝統的な風水では環境との調和を重視するよ。今日は部屋の一角を静かに整えて、休む合図にしてみてもいいね。'
    ],
    sad: [
      '風水の視点を気分転換として使うなら、目に入る場所を一か所だけ明るく整える、という方法もあるよ。',
      '五行の「調和」という考え方を借りて、今日は何かを足すより、自分が落ち着ける空間を一つ作ってみるのもいいね。'
    ],
    general: [
      '風水・五行では、人と環境の調和を大切にする考え方があるよ。今日は身の回りを一か所だけ整えて、気持ちの切り替えに使ってみる？'
    ]
  },
  astrology: {
    label: '西洋占星術の視点',
    basis: '西洋占星術では、生年月日・出生時刻・出生地などから出生図を作り、象徴として解釈します。',
    disclaimer: '占星術による性格・未来予測は科学的に確立されたものではありません。自己理解を振り返るための文化的な視点として扱います。',
    general: [
      '西洋占星術の視点も使えるよ。ただし、きちんと出生図として扱うには生年月日だけでなく出生時刻や出生地などが必要になるので、情報なしに星座の話を作ることはしないよ。'
    ]
  }
};

export function culturalAdvice(topic, seed = '') {
  const feng = culturalLenses.fengShui;
  const choices = feng[topic] || feng.general;
  return {
    title: feng.label,
    basis: feng.basis,
    text: pick(choices, seed + '-feng'),
    disclaimer: feng.disclaimer
  };
}


// v5: 出典管理つき占術レンズ。URLは画面表示用の参照先。
// 占術は「伝統的な体系に基づく解釈」であり、科学的事実として提示しない。
export const lensSources = {
  onmyo: {
    title: '陰陽五行と日本の民俗',
    publisher: '国立国会図書館サーチ',
    url: 'https://ndlsearch.ndl.go.jp/books/R100000002-I000001640287'
  },
  fourPillars: {
    title: '四柱推命（エッセンスシリーズ）',
    publisher: '東洋書院',
    url: 'https://www.toyoshoin.com/book/b308411.html'
  },
  nineStar: {
    title: '日本で一番わかりやすい九星方位気学の本',
    publisher: 'PHP研究所',
    url: 'https://www.php.co.jp/books/detail.php?isbn=978-4-569-85131-0'
  }
};

export const fortuneLenses = {
  fourPillars: {
    label: '四柱推命の視点',
    requires: '生年月日と、精密に見る場合は出生時刻',
    basis: '四柱推命では、年・月・日・時を十干十二支で表し、陰陽五行などの関係から命式を読む伝統的な占術です。',
    disclaimer: '伝統的な占術上の解釈で、科学的な性格診断や未来予測ではありません。',
    sourceKey: 'fourPillars'
  },
  nineStar: {
    label: '九星気学の視点',
    requires: '生年月日。方位を見る場合は時期や移動方向なども必要',
    basis: '九星気学では九星と方位、年・月・日などの盤を用いて吉凶を読む流儀があります。',
    disclaimer: '伝統的な占術上の解釈で、科学的な効果や未来を保証するものではありません。',
    sourceKey: 'nineStar'
  }
};

export function requestedLens(text) {
  if (/四柱推命/.test(text)) return 'fourPillars';
  if (/九星|気学/.test(text)) return 'nineStar';
  if (/占星術|星占い|ホロスコープ/.test(text)) return 'astrology';
  if (/風水|五行/.test(text)) return 'fengShui';
  return null;
}

export function lensReply(lens, topic, seed = '') {
  if (lens === 'fengShui') {
    const view = culturalAdvice(topic, seed);
    return {
      ...view,
      source: lensSources.onmyo,
      needsProfile: false
    };
  }
  if (lens === 'astrology') {
    const view = culturalLenses.astrology;
    return {
      title: view.label,
      basis: view.basis,
      text: pick(view.general, seed),
      disclaimer: view.disclaimer,
      source: null,
      needsProfile: true
    };
  }
  const view = fortuneLenses[lens];
  if (!view) return null;
  return {
    title: view.label,
    basis: view.basis,
    text: `きちんと見るには「${view.requires}」が必要だよ。情報がない状態で結果を作ることはしないよ。`,
    disclaimer: view.disclaimer,
    source: lensSources[view.sourceKey],
    needsProfile: true
  };
}
