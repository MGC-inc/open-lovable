export type AccessOffice = {
  /** Heading; "\n" becomes a line break, as on the original page. */
  title: string;
  zip: string;
  address: string;
  tel: string;
  fax: string;
  mail: string;
  /** Google Maps embed URL used by the original page. */
  map: string;
};

export const accessOffices: AccessOffice[] = [
  {
    title: "本社\nサービス事業本部",
    zip: "〒595-0811",
    address: "大阪府泉北郡忠岡町忠岡北3丁目5番32号",
    tel: "0725-33-4801",
    fax: "0725-22-6722",
    mail: "y.k.a@yahata-sa.co.jp",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3288.213187692729!2d135.3864244157408!3d34.49747920158161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000c430cb677f05%3A0x21018d26a5dec18b!2z44CSNTk1LTA4MTEg5aSn6Ziq5bqc5rOJ5YyX6YOh5b-g5bKh55S65b-g5bKh5YyX77yT5LiB55uu77yV4oiS77yT77yS!5e0!3m2!1sja!2sjp!4v1632904277211!5m2!1sja!2sjp"
  },
  {
    title: "製造事業本部",
    zip: "〒595-0811",
    address: "大阪府泉北郡忠岡町忠岡北3丁目9 番19号",
    tel: "0725-21-1020",
    fax: "0725-21-0624",
    mail: "y.s@yahata-sa.co.jp",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13152.701979874442!2d135.38144014616594!3d34.49843490148734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000c43ab96bc4ef%3A0xcb5df0a49e43da2!2z44CSNTk1LTA4MTEg5aSn6Ziq5bqc5rOJ5YyX6YOh5b-g5bKh55S65b-g5bKh5YyX77yT5LiB55uu77yZ4oiS77yR77yZ!5e0!3m2!1sja!2sjp!4v1632905077610!5m2!1sja!2sjp"
  },
  {
    title: "岡山営業所",
    zip: "〒701-1152",
    address: "岡山県岡山市北区津高40番1号",
    tel: "086-230-7742",
    fax: "086-230-7743",
    mail: "qqun9tk9k@crocus.ocn.ne.jp",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3280.301747869082!2d133.89411731574387!3d34.6975683908928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3554068fd5a65039%3A0x547f3a24ad8b5947!2z44CSNzAxLTExNTIg5bKh5bGx55yM5bKh5bGx5biC5YyX5Yy65rSl6auY77yU77yQ4oiS77yR!5e0!3m2!1sja!2sjp!4v1632905019796!5m2!1sja!2sjp"
  }
];
