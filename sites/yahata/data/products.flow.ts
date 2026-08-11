export type ProductStep = {
  en: string;
  ja: string;
  /** Bold lead-in above the body copy. */
  lead: string;
  /** Body copy; one entry per line. */
  body: string[];
  /** Optional second lead + body pair (the 製造 step has one). */
  extra?: { lead: string; body: string[] };
  images: { src: string; alt: string }[];
};

export const productsPolicy = [
  "私達は、お客様から信頼され喜ばれる物づくりを行います",
  "私達は、品質に妥協すること無く、手順を守り、\n品質向上に努めます",
  "私達は、お客様からお預かりしたシャシや支給品は丁寧に扱い、\n損傷させたり、汚したりはしません",
  "私達は、5S活動を実践し、安全で効率の良い作業環境、\n職場作りを行います"
];

export const productSteps: ProductStep[] = [
  {
    en: "Hearing",
    ja: "商談（ヒアリング）",
    lead: "お客様の運送課題をヒアリング",
    body: [
      "お客様は今どのようにまた、どんな荷物を運ばれているのか、運送に関する現状をヒヤリングし課題やニーズをもれなく聞きとります"
    ],
    images: [{ src: "/assets/img/products/img01_1.jpg", alt: "商談（ヒアリング） 1" }]
  },
  {
    en: "Estimate",
    ja: "見積作成",
    lead: "何がどれだけかかるか一目でわかるように",
    body: [
      "根太、アオリ、鳥居、附属品、塗装などパーツ毎に細かく算出し見積書に記載していきます。そしてその都度お客様と共有し確認をとっていきます。"
    ],
    images: [{ src: "/assets/img/products/img02_1.jpg", alt: "見積作成 1" }]
  },
  {
    en: "Planning",
    ja: "設計開発",
    lead: "最適なトラックボデーを提案",
    body: [
      "お客様からお聞きした情報を設計部門と共有し、検証を重ねオリジナルな商品を図面化していきます。その後、お客様に仕様書、図面（ボデー寸法・床面地上高・付属品関係・燃料タンク容量個数・工具箱仕様取付け位置・床面仕様・床フック・立柱・コイル立の仕様位置個数・鳥居物入れ詳細等）を分かりやすく提案ご報告の上納得していただきます。"
    ],
    images: [
      { src: "/assets/img/products/img03_1.jpg", alt: "設計開発 1" },
      { src: "/assets/img/products/img03_2.jpg", alt: "設計開発 2" }
    ]
  },
  {
    en: "Manufacture",
    ja: "製造",
    lead: "ボデー製造がスタート",
    body: [
      "仕様書、図面に従いボデー製造をスタートします。根太・架装・木工・電装・塗装の各工程において作業漏れはないか、品質に問題はないか検証を重ねる検査を実施しています。また、製造途中の塗装前段階で、お客様にボデー検収を行っていただくことにより、お客様のご意向と相違ない商品を製造することができます。",
      "よって納車したその時から、即戦力の車輌としてフル稼働することが可能となります。"
    ],
    extra: {
      lead: "各過程において徹底的に検査を実施することで、品質の高い商品をご提供することが出来ます。",
      body: [
        "弊社は、各過程において（根太・架装・木工・電装・塗装）検査を実施し、作業漏れはないか、品質に問題はないか、検証を重ね、最終的に検収を行い、見事検査に合格した商品をお届け致しております。",
        "ヤハタの情熱が、お客様に少しでも伝わるように妥協する事なく、品質管理を徹底しています。",
        "信頼を得る事は、妥協する事なく、実績を積み上げる日々の努力、年月のかかるものであり、1つの仕事を大切に感謝し続ける事をモットーとしております。"
      ]
    },
    images: [
      { src: "/assets/img/products/img04_1.jpg", alt: "製造 1" },
      { src: "/assets/img/products/img04_2.jpg", alt: "製造 2" }
    ]
  },
  {
    en: "Equipment",
    ja: "設備",
    lead: "平成29年4月 新工場 完成",
    body: [
      "塗装場所2レーンと、電装場所1レーンの作業場所として　面積45423m2の新工場が完成。",
      "今まで以上に商品製造に対して妥協することなく、品質管理を徹底しお客様に納得いただき信頼いただけるように感謝をもって一つ一つ丁寧に遂行していきます。また、作業現場での安全安心を徹底的に行っていきます。"
    ],
    images: [
      { src: "/assets/img/products/img05_1.jpg", alt: "設備 1" },
      { src: "/assets/img/products/img05_2.jpg", alt: "設備 2" }
    ]
  }
];

export type ProductMachine = {
  image: string;
  alt: string;
  name: string;
  /** Maker / model / installation date; one entry per line. */
  spec: string[];
  description?: string;
};

export const productMachines: ProductMachine[] = [
  {
    image: "/assets/img/products/img06_1.jpg",
    alt: "ショットコンベアブラスト",
    name: "ショットコンベアブラスト",
    spec: ["新東工業製 KVC 100 TR", "H24.12 導入"],
    description:
      "鉄材料・トラックパーツの表面を最適に面粗し梨地処理を行い、塗装の乗りを良くし防錆対策を行っています。"
  },
  {
    image: "/assets/img/products/img06_2.jpg",
    alt: "プレスブレーキ",
    name: "プレスブレーキ",
    spec: ["アマダ製 HDS 2203NT", "H24.1 導入"],
    description:
      "高精度ベンディングマシン。個々に圧力調整がじどうでに行われ、精度が究極に追求された設備であり、特別仕様の工具箱等の高精度な架装物に対応できます。"
  },
  {
    image: "/assets/img/products/img06_3.jpg",
    alt: "シャーリング",
    name: "シャーリング",
    spec: ["相澤鐵工所製 AST1025", "H24.10 導入"],
    description: "材料の切断を行います。逆板押さえ機能により、まっすぐに切断する事ができます。"
  },
  {
    image: "/assets/img/products/img06_4.jpg",
    alt: "CAD",
    name: "CAD",
    spec: []
  }
];
