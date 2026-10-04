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
      '風水・陰陽五行の伝統的な見方では、西は「金」と白に対応します。気持ちを切り替えたいなら、西側の窓辺や棚を一か所だけ整え、白い小物を一つ置いて「区切り」の合図にしてみるのも一案だよ。',
      '風水では方位と住環境の調和を重視します。落ち着かない日は、まず西側の窓辺や棚から不要な物を一つ減らし、明るく清潔に整えてみるのも一案だよ。'
    ],
    work: [
      '陰陽五行では西は「金」に対応する方位とされます。仕事を切り替えたい日は、西側の机や棚を一か所整え、白系の小物や文具を一つ置いて仕事の区切りにする、という取り入れ方ができるよ。',
      '風水を仕事の環境づくりとして使うなら、まず作業場所の西側にある不要な物を一つ減らしてみよう。方位だけでなく、実際に使いやすい空間に整えることを優先してね。'
    ],
    tired: [
      '風水の伝統的な考え方を気分転換に使うなら、西側の窓辺や棚を静かに整え、白や金属質の小物を一つだけ取り入れてみる方法があるよ。休息そのものの代わりではなく、気持ちを切り替える合図として使ってね。',
      '今日は何かを増やすより、西側の一角を少し片づけて視界をすっきりさせるのも一案だよ。風水では西は五行の「金」に対応するとされているよ。'
    ],
    sad: [
      '気分を変えるきっかけが欲しいなら、風水・陰陽五行の伝統的な対応で「西＝金＝白」を使い、西側の窓辺や棚を明るく整えて白い小物を一つ置いてみるのも一案だよ。',
      '風水の視点では住環境と方位の調和を見ます。今日は西側の一角を掃除して、目に入る物を少し減らすところから始めてみてもいいね。'
    ],
    general: [
      '風水・陰陽五行では、西は五行の「金」、色では白に対応するとされます。気分転換なら、西側の窓辺や棚を一か所整えて、白い小物を一つ置くような小さな取り入れ方ができるよ。'
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
    title: '風水説・陰陽五行の方位対応',
    publisher: '平凡社・小学館系百科事典（コトバンク掲載）',
    url: 'https://kotobank.jp/word/%E9%A2%A8%E6%B0%B4%E8%AA%AC-122971'
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


export const fengShuiLifeAdvice = {
  mood: {
    label: '気分転換',
    options: [
      '風水・陰陽五行の伝統的な対応では、西は「金」、色は白に結び付けられます。気分を切り替えたい日は、西側の窓辺や棚を一か所整え、白い小物を一つ置いてみるのも一案だよ。',
      '気分を変えたい日は、風水の見方を借りて西側の空間を明るく整えてみよう。まずは窓辺や棚の不要な物を一つ減らすだけでも十分だよ。'
    ]
  },
  work: {
    label: '仕事・集中',
    options: [
      '伝統的な五行では東は「木」に対応します。仕事を始めるきっかけが欲しい日は、部屋や机の東側を整え、植物や木製の小物を一つ置いて「始める場所」にしてみるのも一案だよ。',
      '仕事の停滞感があるなら、風水の考え方を生活の合図として、東側の机や棚を整理してみよう。方位だけでなく、実際に作業しやすいことを一番大切にしてね。'
    ]
  },
  money: {
    label: 'お金・豊かさ',
    options: [
      '風水の流派では金運と方位の結び付け方に違いがあります。単純に「西に黄色で必ず金運アップ」とは言わず、まず西側を清潔に整え、白や金属質の小物を控えめに取り入れる方法を提案するよ。',
      'お金のことが気になる日は、風水だけで結果を決めず、西側の収納や財布まわりを整理する「環境を整える日」にしてみるのも一案だよ。'
    ]
  },
  relationships: {
    label: '人間関係',
    options: [
      '人間関係を整えたい日は、風水の伝統的な五行で南西・北東などを「土」と見る考え方があります。まず家の共有スペースを一か所整え、ベージュや陶器など土を連想する物を控えめに取り入れるのも一案だよ。',
      '対人関係で心がざわつく日は、玄関や共有スペースを整えて「人を迎える場所」を気持ちよくする、という風水的な取り入れ方もできるよ。'
    ]
  },
  sleep: {
    label: '睡眠・休息',
    options: [
      '眠りについては風水より、暗さ・静かさ・室温など実際の睡眠環境を優先しよう。その上で伝統的な風水の雰囲気づくりとして、寝室の物を減らし、落ち着いた色でまとめる程度に取り入れるのがおすすめだよ。',
      '休みたい日は、寝床の周囲を一か所だけ片づけよう。風水では環境を整えることを重視するけれど、睡眠改善の効果を保証するものではないよ。'
    ]
  },
  love: {
    label: '恋愛',
    options: [
      '恋愛については流派によって方位や色の解釈が異なるよ。「この方角に置けば恋が叶う」とは言い切らず、まず玄関や自分が長く過ごす場所を清潔にして、人を迎えたくなる空間を作るという取り入れ方がおすすめだよ。',
      '風水を恋愛のきっかけとして楽しむなら、部屋の一角を整えて、花や自分が心地よいと感じる物を飾るところから始めてみよう。結果を保証するものではなく、暮らしを整えるための伝統的な視点だよ。'
    ]
  }
};

export function detectFengShuiLifeTopic(text) {
  if (/金運|お金|貯金|収入|財布/.test(text)) return 'money';
  if (/恋愛|恋人|彼氏|彼女|結婚|好きな人/.test(text)) return 'love';
  if (/人間関係|家族|友人|友達|夫婦|対人/.test(text)) return 'relationships';
  if (/眠れ|睡眠|寝室|寝不足|休みたい/.test(text)) return 'sleep';
  if (/仕事|集中|やる気|職場|勉強/.test(text)) return 'work';
  if (/気分|落ち込|元気|憂うつ|モヤモヤ/.test(text)) return 'mood';
  return 'mood';
}

export function fengShuiPracticalAdvice(text, seed = '') {
  const key = detectFengShuiLifeTopic(text);
  const item = fengShuiLifeAdvice[key];
  return {
    topic: key,
    title: `風水の視点：${item.label}`,
    text: pick(item.options, seed + '-practical-feng'),
    disclaimer: '風水・陰陽五行の伝統的な考え方を暮らしのヒントとして紹介しています。科学的な効果や運勢の変化を保証するものではありません。',
    source: lensSources.onmyo
  };
}
