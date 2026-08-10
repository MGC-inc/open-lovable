export type ServiceItem = {
  title: string;
  /** Lead paragraph; each entry renders as its own line. */
  lines: string[];
  /** Optional bulleted specification list. */
  specs?: string[];
  images: { src: string; alt: string }[];
};

export type ServiceGroup = {
  title: string;
  items: ServiceItem[];
};

export const servicePolicy = [
  "今日も一日　創意工夫で合理化を推進します",
  "今日も一日　親切と協力で信用を高めます",
  "今日も一日　確実な仕事で自分の責任を遂行します"
];

export const serviceGroups: ServiceGroup[] = [
  {
    title: "整備",
    items: [
      {
        title: "車検",
        lines: ["安全性の確保・公害防止という面から点検・整備・検査を行います。"],
        specs: [
          "車検班…2班",
          "リフト…2台",
          "大型リフト…2台",
          "乗用車用2柱リフト…1台",
          "指定年月日…昭和47年4月27日",
          "指定番号…大指大第　521号"
        ],
        images: [
          { src: "/assets/img/service/img01_1.jpg", alt: "車検 01" },
          { src: "/assets/img/service/img01_2.jpg", alt: "車検 02" }
        ]
      },
      {
        title: "法定点検",
        lines: ["事業用自動車は、全50項目の3ヶ月定期点検"],
        specs: ["12ヶ月点検", "6ヶ月点検", "3ヶ月点検"],
        images: [
          { src: "/assets/img/service/img02_1.jpg", alt: "法定点検 01" },
          { src: "/assets/img/service/img02_3.jpg", alt: "法定点検 02" }
        ]
      },
      {
        title: "特定整備",
        lines: ["従来の分解整備にプラスし、電子制御装置の整備が追加され令和3年3月18日に認証されました。"],
        specs: ["認証年月日…昭和44年4月11日", "認証番号…大陸整認大　第6077A号"],
        images: [
          { src: "/assets/img/service/img03_1.jpg", alt: "特定整備 01" },
          { src: "/assets/img/service/img03_2.jpg", alt: "特定整備 02" }
        ]
      },
      {
        title: "一般整備",
        lines: ["EGオイル交換", "故障診断（スキャンツール）"],
        specs: ["G Scan-3", "G Scan", "HDM-3000", "UD車・ボルボ車専用スキャンツール"],
        images: [
          { src: "/assets/img/service/img04_2.jpg", alt: "一般整備 01" },
          { src: "/assets/img/service/img04_3.jpg", alt: "一般整備 02" }
        ]
      },
      {
        title: "荷台修理",
        lines: ["シャーリング、プレス設備を有しトラックボデーパーツ材料も数多く在庫で保有しております。"],
        specs: ["パイプベンダー他", "ホイスト・クレーン…2基"],
        images: [
          { src: "/assets/img/service/img05_1.jpg", alt: "荷台修理 01" },
          { src: "/assets/img/service/img05_2.jpg", alt: "荷台修理 02" }
        ]
      },
      {
        title: "板金・塗装",
        lines: ["急な事故に対応いたします。"],
        specs: ["塗装場所…5レーン", "新車塗装～補修塗装迄"],
        images: [
          { src: "/assets/img/service/img06_1.jpg", alt: "板金・塗装 01" },
          { src: "/assets/img/service/img06_2.jpg", alt: "板金・塗装 02" }
        ]
      },
      {
        title: "電装",
        lines: [
          "車幅灯・作業灯・室内S/W・タイヤ灯・看板灯等の配線取付",
          "バッテリーチェッカーにてバッテリーの性能をチェック交換時期を提案します。",
          "デジタルテスタにて電流・電圧・抵抗・アンペアをチェック不具合を見つけだします。"
        ],
        images: [
          { src: "/assets/img/service/img07_1.jpg", alt: "電装 01" },
          { src: "/assets/img/service/img07_2.jpg", alt: "電装 02" }
        ]
      }
    ]
  },
  {
    title: "営業",
    items: [
      {
        title: "新車・中古車販売",
        lines: ["トラックメーカーのシャーシーと荷台を選定し最適なものを提案いたします。"],
        images: [
          { src: "/assets/img/service/img08_1.jpg", alt: "車検 01" },
          { src: "/assets/img/service/img08_2.jpg", alt: "車検 02" }
        ]
      },
      {
        title: "各種保険",
        lines: [
          "「損害保険募集人」の資格を有する者が「自動車損害賠償責任保険」「任意保険」への対応を行っています。",
          "また、東京日動火災保険株式会社の代理店として行っております。"
        ],
        images: [
          { src: "/assets/img/service/img09_1.jpg", alt: "法定点検 01" },
          { src: "/assets/img/service/img09_2.jpg", alt: "法定点検 02" }
        ]
      }
    ]
  }
];
