'use client';

import { useEffect, useMemo, useState } from 'react';
import { adviceV4, pick, detectTopic } from './advice-v4';
const qs = [
  { q: '昨夜はよく眠れた？', a: ['よく眠れた', 'まあまあ', 'あまり眠れなかった'] },
  { q: '今の気分はどう？', a: ['😊 とてもいい', '🙂 まあまあ', '😐 普通', '😔 少し沈んでいる', '😣 かなりしんどい'] },
  { q: '今日は忙しい？', a: ['ゆっくり', '普通', '忙しい', 'かなり忙しい'] },
  { q: '今日はどんな気分で過ごしたい？', a: ['元気に', '穏やかに', '集中して', '楽しく', '静かに'] },
  { q: '今、何か気になっていることはある？', a: ['特になし', '少しある', '話してみたい'] }
];

const suggestions = {
  calm: {
    title: '今日は、自分のペースで。',
    text: '今のあなたには、小さく整える時間が合いそうです。',
    food: '温かいものを一品',
    color: '淡いブルー',
    action: '5分だけ外の空気を',
    rest: '3分だけ何もしない'
  },
  tired: {
    title: '今日は、余白をひとつ。',
    text: '少し疲れがありそう。全部を頑張らず、休めるところを作ってみよう。',
    food: '消化のよい温かいもの',
    color: 'やわらかなグリーン',
    action: '肩をゆっくり回す',
    rest: '目を閉じて3分休む'
  },
  bright: {
    title: 'いい流れを、大切に。',
    text: '今日は比較的気持ちよく始められそう。その感覚を急がず大切にしよう。',
    food: '好きなものを一品',
    color: 'やさしいイエロー',
    action: '少し遠回りして歩く',
    rest: '好きな飲み物で一息'
  }
};

function Megu({ mood = 'smile' }) {
  return (
    <div className={'megu ' + mood} aria-label="芽ちゃん">
      <i />
      <b>{mood === 'sleep' ? '⌒' : '•'}</b>
      <b>{mood === 'sleep' ? '⌒' : '•'}</b>
      <span>{mood === 'sad' ? '︵' : mood === 'sleep' ? '﹏' : '‿'}</span>
    </div>
  );
}

function classify(a) {
  if (
    (a[0] || '').includes('あまり') ||
    (a[1] || '').includes('しんどい') ||
    (a[2] || '').includes('かなり')
  ) return 'tired';

  if ((a[1] || '').includes('とてもいい')) return 'bright';

  return 'calm';
}

export default function Page() {
  const [screen, setScreen] = useState('home');
  const [step, setStep] = useState(0);
  const [ans, setAns] = useState([]);
  const [records, setRecords] = useState([]);
  const [memories, setMemories] = useState([]);
  const [msg, setMsg] = useState('');
  const [chat, setChat] = useState([]);
  const [notice, setNotice] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [saved, setSaved] = useState(false);
  const [treasures, setTreasures] = useState([]);

  useEffect(() => {
    try {
      setRecords(JSON.parse(localStorage.getItem('kokoro-records') || '[]'));
      setMemories(JSON.parse(localStorage.getItem('kokoro-memories') || '[]'));
      setNotice(JSON.parse(localStorage.getItem('kokoro-notice') ?? 'true'));
      setChat(JSON.parse(localStorage.getItem('kokoro-chat') || '[]'));
      setTreasures(JSON.parse(localStorage.getItem('kokoro-treasures') || '[]'));

      const draft = JSON.parse(
        localStorage.getItem('kokoro-draft') || 'null'
      );

      if (draft && Date.now() - draft.at < 86400000) {
        setAns(draft.ans || []);
        setStep(draft.step || 0);
      }
    } catch {}

    setLoaded(true);
  }, []);

  const today = useMemo(
    () => new Date().toLocaleDateString('ja-JP'),
    []
  );

  const latest = records[0];

  const goHome = () => {
    setScreen('home');
    setStep(0);
    setAns([]);
    setSaved(false);
    localStorage.removeItem('kokoro-draft');
  };

  const startCheck = () => {
    setSaved(false);

    const draft = JSON.parse(
      localStorage.getItem('kokoro-draft') || 'null'
    );

    if (
      draft &&
      Date.now() - draft.at < 86400000 &&
      (draft.ans || []).length
    ) {
      setAns(draft.ans);
      setStep(draft.step);
      setScreen('check');
    } else {
      setStep(0);
      setAns([]);
      setScreen('check');
    }
  };

  const choose = (v) => {
    const n = [...ans, v];
    setAns(n);

    if (step < 4) {
      const next = step + 1;
      setStep(next);

      localStorage.setItem(
        'kokoro-draft',
        JSON.stringify({
          ans: n,
          step: next,
          at: Date.now()
        })
      );

      return;
    }

    const type = classify(n);

    const r = {
      date: today,
      mood: n[1],
      type,
      answers: n
    };

    const nr = [
      r,
      ...records.filter((x) => x.date !== r.date)
    ].slice(0, 30);

    setRecords(nr);

    localStorage.setItem(
      'kokoro-records',
      JSON.stringify(nr)
    );

    localStorage.removeItem('kokoro-draft');

    setScreen('result');
  };

  const remember = () => {
    if (!ans[4] || ans[4] === '特になし') return;

    const m = {
      id: Date.now(),
      date: today,
      text: `今日、気になることが「${ans[4]}」だった`
    };

    const nm = [m, ...memories].slice(0, 20);

    setMemories(nm);
    setSaved(true);

    localStorage.setItem(
      'kokoro-memories',
      JSON.stringify(nm)
    );
  };

  const removeMemory = (id) => {
    const nm = memories.filter((x) => x.id !== id);

    setMemories(nm);

    localStorage.setItem(
      'kokoro-memories',
      JSON.stringify(nm)
    );
  };

  const treasureTypes = [
    { key: 'good', icon: '😊', label: 'よかったこと', energy: 'しあわせの種' },
    { key: 'effort', icon: '⭐', label: 'がんばったこと', energy: 'がんばりのしずく' },
    { key: 'reward', icon: '🎁', label: '自分へのごほうび', energy: 'ごほうびの実' },
    { key: 'rest', icon: '🌿', label: '休めたこと', energy: 'やすらぎのしずく' },
    { key: 'brave', icon: '💪', label: '乗り越えたこと', energy: '勇気の種' }
  ];

  const addTreasure = (type) => {
    const item = treasureTypes.find((x) => x.key === type);
    if (!item) return;
    const nt = [{
      id: Date.now(),
      date: today,
      type: item.key,
      label: item.label,
      energy: item.energy
    }, ...treasures].slice(0, 100);
    setTreasures(nt);
    localStorage.setItem('kokoro-treasures', JSON.stringify(nt));
  };

  const gardenStage =
    treasures.length >= 30 ? '小さなお庭' :
    treasures.length >= 15 ? '花のある場所' :
    treasures.length >= 7 ? '若葉の庭' :
    treasures.length >= 3 ? '小さな花壇' : '芽ちゃんのはじまり';

  const meguReply = (value) => {
    const t = value.toLowerCase();
    // ===== ここから v4 相談エンジン =====
    const topic = detectTopic(t);
    const seed = `${t}-${chat.length}-${today}`;

    // 「別の案」に対応
    if (/別の|ほか|他に|違う案/.test(t)) {
      return `もちろん。別の案なら「${pick(
        adviceV4.food.normal,
        seed
      )}」もあるよ。食事以外なら「${pick(
        adviceV4.tired,
        seed + 'action'
      )}」も候補だよ。今は、食事・休み方・仕事の整理のどれを一緒に考えたい？`;
    }

    // 危険性の高い相談
    if (topic === 'danger') {
      return '今は普段のアドバイスより、安全を優先したいよ。ひとりで抱えず、近くの信頼できる人や専門の相談窓口につながってね。差し迫った危険がある場合は、地域の緊急窓口を利用してね。';
    }

    // 食事
    if (topic === 'food') {
      const food1 = pick(adviceV4.food.normal, seed);
      const food2 = pick(adviceV4.food.low, seed + '2');

      return `食事のことなら、今日は「${food1}」はどうかな。もう一案なら「${food2}」もあるよ。今の食欲は、しっかり食べたい・軽めがいい・あまりない、のどれに近い？`;
    }

    // 仕事
    if (topic === 'work') {
      const action = pick(adviceV4.work, seed);

      return `仕事のことなんだね。今日は「${action}」くらいまで小さくしてみるのも一つだよ。今は解決策を一緒に整理したい？ それとも、まず何があったか聞いてほしい？`;
    }

    // 睡眠
    if (topic === 'sleep') {
      const rest = pick(adviceV4.rest, seed);

      return `眠りのことが気になっているんだね。今日は「${rest}」くらいからでもいいよ。眠れない感じは、考えごとが止まらない・生活リズム・体が眠くならない、のどれに近い？`;
    }

    // 不安・心配
    if (topic === 'anxious') {
      const action = pick(adviceV4.anxious, seed);

      return `不安があるんだね。今すぐ全部を解決しようとせず、「${action}」から始めてみるのも一つだよ。その心配は、まだ起きていないこと？ それとも今起きていることかな？`;
    }

    // 怒り
    if (topic === 'anger') {
      return pick(
        [
          'それは腹が立つよね。ここではきれいにまとめなくて大丈夫。何を言われたことが一番引っかかった？',
          'イライラしているんだね。今すぐ結論を出さなくてもいいよ。本当は相手にどうしてほしかった？',
          'その怒りには理由がありそうだね。出来事そのものと、自分が傷ついた部分を分けて話してみる？'
        ],
        seed
      );
    }

    // 悲しい・落ち込み
    if (topic === 'sad') {
      const action = pick(adviceV4.sad, seed);

      return `つらかったんだね。無理に前向きにならなくていいよ。今なら「${action}」くらいの小さなことでも十分。今日は話を聞いてほしい？ それとも少し楽になる方法を一緒に探す？`;
    }

    // 疲れ
    if (topic === 'tired') {
      const action = pick(adviceV4.tired, seed);
      const rest = pick(adviceV4.rest, seed + 'rest');

      return `少し使い切っている感じかな。今日は「${action}」か「${rest}」のどちらか一つで十分だよ。疲れは、体・気持ち・人付き合い・仕事のどれが一番大きい？`;
    }
    // ===== ここまで v4 相談エンジン =====
    

    if (/死にたい|消えたい|自殺|生きたくない/.test(t)) {
      return 'とてもつらい気持ちを話してくれてありがとう。今は一人で抱え込まず、身近な人や専門の相談先につながってね。差し迫った危険があるなら、地域の緊急窓口に連絡してね。';
    }

    if (/ありがとう|ありがと/.test(t)) {
      return pick([
        'こちらこそ話してくれてありがとう。少しでも心が軽くなっていたらうれしいな。',
        'うん、ありがとう。芽ちゃんはいつでもここにいるよ。'
      ]);
    }

    if (/大丈夫|落ち着いた|もう平気/.test(t)) {
      return pick([
        '少し落ち着けたんだね。その感覚を大切にしよう。今日はこのままゆっくり過ごす？',
        'よかった。無理に元気を足さなくても、今の落ち着きをそのまま大切にしてね。'
      ]);
    }

    if (/嬉しい|うれしい|楽しい|よかった|最高|できた|成功/.test(t)) {
      return pick([
        'それはうれしいね。どんなところが一番うれしかった？',
        'いい時間だったんだね。その気持ち、もう少し聞かせて。'
      ]);
    }

    if (/疲れ|つかれ|しんど|忙し|くたくた/.test(t)) {
      return pick([
        '今日はよく頑張ったんだね。いちばん疲れたのは、体と気持ちのどちらに近い？',
        'おつかれさま。今は解決より、少し休むことを優先してもよさそう。何が一番しんどかった？'
      ]);
    }

    if (/仕事|会社|上司|部下|職場|会議/.test(t)) {
      return pick([
        '仕事のことなんだね。今日いちばん心に残っている場面はどこだった？',
        '仕事のことは頭から離れにくいよね。話せる範囲で、何があったか聞かせて。'
      ]);
    }

    if (/不安|心配|怖|こわ|焦|どうしよう/.test(t)) {
      return pick([
        '不安があるんだね。まだ起きていないことへの心配？ それとも今起きていることかな？',
        '心配なことを言葉にしてくれてありがとう。いちばん気になっている部分を一つだけ挙げるとしたら何かな？'
      ]);
    }

    if (/怒|むかつ|腹が立|イライラ|許せない/.test(t)) {
      return pick([
        'それは腹が立つよね。ここではきれいにまとめなくていいよ。何が一番引っかかった？',
        '怒っているんだね。その気持ちには理由がありそう。何があったか、そのまま話してみる？'
      ]);
    }

    if (/眠れ|寝れ|睡眠|寝不足|夜中/.test(t)) {
      return pick([
        '眠れないのはつらいね。今は考えごとが止まらない感じ？ それとも体が眠くならない感じかな？',
        '眠りのことが気になっているんだね。今夜は「眠らなきゃ」と頑張りすぎず、まず体を休ませるだけでもいいよ。'
      ]);
    }

    if (/悲し|寂し|さみし|泣|つらい|辛い/.test(t)) {
      return pick([
        'つらかったんだね。無理に前向きにしなくていいよ。今の気持ちをもう少し話してみる？',
        'ここでは我慢しなくていいよ。何がいちばん心に残っている？'
      ]);
    }

    return pick([
      'うん、聞いているよ。それについて、今どんな気持ち？',
      '話してくれてありがとう。もう少し聞かせてもらってもいい？',
      'そうなんだね。今いちばん心に引っかかっているのはどの部分かな？'
    ]);
  };

  const sendChat = (value) => {
    const text = value.trim();

    if (!text) return;

    const next = [
      ...chat,
      { who: 'user', text },
      { who: 'megu', text: meguReply(text) }
    ].slice(-20);

    setChat(next);
    setMsg(text);

    try {
      localStorage.setItem(
        'kokoro-chat',
        JSON.stringify(next)
      );
    } catch {}
  };

  if (!loaded) {
    return (
      <main>
        <section className="hero">
          <Megu mood="sleep" />
          <p>芽ちゃんが準備しています…</p>
        </section>
      </main>
    );
  }

  if (screen === 'check') {
    return (
      <main>
        <header>
          こころ日和 <em>{step + 1}/5</em>
        </header>

        <section className="card chat">
          <Megu mood={step === 1 ? 'smile' : 'sleep'} />

          <div className="bubble">
            <h2>{qs[step].q}</h2>
            <p>
              急がなくて大丈夫。
              今の気持ちに近いものを選んでね。
            </p>
          </div>

          {qs[step].a.map((x) => (
            <button
              className="answer"
              key={x}
              onClick={() => choose(x)}
            >
              {x}
            </button>
          ))}
        </section>

        <button className="back" onClick={goHome}>
          ← ホームへ
        </button>
      </main>
    );
  }

  if (screen === 'result') {
    const s = suggestions[classify(ans)];

    return (
      <main>
        <header>今日のあなた</header>

        <section className="card center">
          <Megu
            mood={
              classify(ans) === 'tired'
                ? 'sleep'
                : 'smile'
            }
          />

          <h2>{s.title}</h2>
          <p>{s.text}</p>

          <div className="grid">
            <div>
              🍚
              <b>食事</b>
              <small>{s.food}</small>
            </div>

            <div>
              🫧
              <b>今日の色</b>
              <small>{s.color}</small>
            </div>

            <div>
              🌿
              <b>行動</b>
              <small>{s.action}</small>
            </div>

            <div>
              ☕
              <b>休憩</b>
              <small>{s.rest}</small>
            </div>
          </div>

          <blockquote>
            全部できなくても大丈夫。
            ひとつ選べれば十分だよ。
          </blockquote>

          {ans[4] &&
            ans[4] !== '特になし' &&
            !memories.some((m) => m.date === today) &&
            !saved && (
              <button
                className="soft"
                onClick={remember}
              >
                🌱 今日の気がかりを覚えておく
              </button>
            )}

          {saved && (
            <p className="saved">
              ✓ 芽ちゃんが覚えました。
              設定からいつでも削除できます。
            </p>
          )}

          <button onClick={goHome}>
            これでいこう
          </button>
        </section>
      </main>
    );
  }

  if (screen === 'records') {
    return (
      <main>
        <header>気分の記録</header>

        <section className="card">
          <h2>最近のこころ日和</h2>

          {records.length ? (
            records.map((r, i) => (
              <div className="record" key={i}>
                <span>{r.date}</span>
                <b>{r.mood}</b>
              </div>
            ))
          ) : (
            <p>
              まだ記録はありません。
              今日から少しずつ残していこう。
            </p>
          )}
        </section>

        <button className="back" onClick={goHome}>
          ← ホームへ
        </button>
      </main>
    );
  }

  if (screen === 'memory') {
    return (
      <main>
        <header>芽ちゃんの記憶</header>

        <section className="card">
          <Megu />

          <h2>覚えていること</h2>

          <p>
            あなたが「覚えておく」を選んだことだけ、
            ここに残ります。
          </p>

          {memories.length ? (
            memories.map((m) => (
              <div className="memory" key={m.id}>
                <div>
                  <small>{m.date}</small>
                  <p>{m.text}</p>
                </div>

                <button
                  onClick={() =>
                    removeMemory(m.id)
                  }
                >
                  削除
                </button>
              </div>
            ))
          ) : (
            <p className="empty">
              まだありません。
              勝手に覚えることはしないよ。
            </p>
          )}
        </section>

        <button className="back" onClick={goHome}>
          ← ホームへ
        </button>
      </main>
    );
  }

  if (screen === 'settings') {
    return (
      <main>
        <header>設定</header>

        <section className="card">
          <h2>こころ日和の設定</h2>

          <div className="setting">
            <div>
              <b>やさしい通知</b>
              <small>
                端末通知への接続は次の段階で行います
              </small>
            </div>

            <button
              className={
                notice ? 'toggle on' : 'toggle'
              }
              onClick={() => {
                const n = !notice;
                setNotice(n);

                localStorage.setItem(
                  'kokoro-notice',
                  JSON.stringify(n)
                );
              }}
            >
              {notice ? 'ON' : 'OFF'}
            </button>
          </div>

          <button
            className="menu"
            onClick={() => setScreen('memory')}
          >
            🌱 芽ちゃんの記憶 <span>›</span>
          </button>

          <div className="privacy">
            このMVPの気分・記憶・会話は、
            この端末のブラウザ内だけに保存します。
            外部AIや課金サービスには送信しません。
          </div>
        </section>

        <button className="back" onClick={goHome}>
          ← ホームへ
        </button>
      </main>
    );
  }

  if (screen === 'talk') {
    return (
      <main>
        <header>芽ちゃんとお話し</header>

        <section className="card chat">
          <Megu
            mood={chat.length ? 'smile' : 'sleep'}
          />

          {memories[0] && (
            <div className="memoryhint">
              🌱 覚えていること：
              {memories[0].text}
            </div>
          )}

          <div className="bubble">
            なんでも話してね。
            うれしいこと、ちょっと疲れたこと。
            何でも聞くよ。
          </div>

          {chat.map((m, i) =>
            m.who === 'user' ? (
              <div
                className="userbubble"
                key={i}
              >
                {m.text}
              </div>
            ) : (
              <div
                className="bubble"
                key={i}
              >
                {m.text}
              </div>
            )
          )}

          <form
            className="input"
            onSubmit={(e) => {
              e.preventDefault();

              const v =
                e.currentTarget.elements.message.value;

              sendChat(v);

              e.currentTarget.reset();
            }}
          >
            <input
              name="message"
              maxLength="1000"
              placeholder="メッセージを入力…"
              autoComplete="off"
            />

            <button aria-label="送信">
              ➤
            </button>
          </form>

          <small className="demo">
            会話はこの端末内で処理します。
            外部AIには送信しません。
          </small>
        </section>

        <button className="back" onClick={goHome}>
          ← ホームへ
        </button>
      </main>
    );
  }

  return (
    <main>
      <header>
        こころ日和 <i>🌱</i>
      </header>

      <section className="hero">
        <Megu
          mood={
            latest?.type === 'tired'
              ? 'sleep'
              : 'smile'
          }
        />

        <h1>おはよう。</h1>

        <p>
          {latest?.date === today
            ? '今日はもう気持ちを聞かせてもらったね。'
            : '今日の気分はどう？'}
          <br />
          ここでは、急がなくていいよ。
        </p>

        <div className="moods">
          😊　🙂　😐　😔　😣
        </div>

        <button onClick={startCheck}>
          {latest?.date === today
            ? '今日の気分を更新する'
            : '今日のチェックイン'}
        </button>
      </section>

      <section className="card">
        <h3>今日の小さなおすすめ</h3>

        <div className="grid">
          <div>
            🍚<b>食事</b>
          </div>

          <div>
            🫧<b>色</b>
          </div>

          <div>
            🌿<b>行動</b>
          </div>

          <div>
            ☕<b>休憩</b>
          </div>
        </div>

        <button
          className="soft"
          onClick={() => setScreen('talk')}
        >
          💬 芽ちゃんと少し話す
        </button>
      </section>

      <section className="card">
        <h3>今日のたからもの</h3>
        <p>今日の小さな「よかった」を、芽ちゃんの成長エネルギーにしよう。</p>
        <div className="grid">
          {treasureTypes.map((x) => (
            <button className="soft" key={x.key} onClick={() => addTreasure(x.key)}>
              {x.icon}<b>{x.label}</b><small>{x.energy}</small>
            </button>
          ))}
        </div>
        {treasures[0] && <p className="saved">✓ 「{treasures[0].energy}」が芽ちゃんの世界に届いたよ。</p>}
      </section>

      <section className="card center">
        <h3>芽ちゃんのお庭</h3>
        <Megu mood="smile" />
        <h2>{gardenStage}</h2>
        <p>
          {treasures.length === 0
            ? 'まだ小さな始まり。今日のたからものを一つ見つけてみよう。'
            : `これまでに ${treasures.length} 個のたからものが、この世界を育てているよ。`}
        </p>
        <div className="moods" aria-label="芽ちゃんの庭">
          🌱 {treasures.length >= 3 ? '🌼' : ''} {treasures.length >= 7 ? '🌿' : ''} {treasures.length >= 15 ? '🐦' : ''} {treasures.length >= 30 ? '🪑 🏡' : ''}
        </div>
        <small>芽ちゃんは大きくなりすぎず、思い出と庭が少しずつ育ちます。</small>
      </section>

      <nav>
        <button onClick={() => setScreen('home')}>
          ⌂
          <small>ホーム</small>
        </button>

        <button onClick={() => setScreen('records')}>
          ♡
          <small>記録</small>
        </button>

        <button onClick={() => setScreen('memory')}>
          🌱
          <small>相棒</small>
        </button>

        <button onClick={() => setScreen('settings')}>
          ⚙
          <small>設定</small>
        </button>
      </nav>
    </main>
  );
}
