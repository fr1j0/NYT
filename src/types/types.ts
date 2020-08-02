export type ArticleData = {
  abstract: string;
  byline: {
    organization: string;
    original: string;
    person: string[];
  };
  document_type: string;
  headline: {
    content_kicker: string | null;
    kicker: string | null;
    main: string;
    name: string | null;
    print_headline: string;
    seo: string | null;
    sub: string | null;
  };
  keywords: string[];
  lead_paragraph: string;
  multimedia: Multimedia[];
  news_desk: string;
  pub_date: string;
  section_name: string;
  snippet: string;
  source: string;
  type_of_material: string;
  uri: string;
  web_url: string;
  word_count: number;
};

export type Multimedia = {
  caption: string | null;
  credit: string | null;
  crop_name: string;
  height: number;
  legacy: {
    xlarge: string;
    xlargewidth: number;
    xlargeheight: number;
  };
  rank: number;
  subType: MultimediaSubtype;
  type: "image";
  url: string;
  width: number;
};

export type MultimediaSubtype =
  | "xlarge"
  | "popup"
  | "blog480"
  | "blog533"
  | "blog427"
  | "tmagSF"
  | "tmagArticle"
  | "slide"
  | "jumbo"
  | "superJumbo"
  | "blog225"
  | "master1050"
  | "master675"
  | "master495"
  | "master180"
  | "master315"
  | "master768"
  | "thumbnail"
  | "blogSmallThumb"
  | "thumbLarge"
  | "smallSquare168"
  | "smallSquare252"
  | "square320"
  | "wide";

export type RootState = {
  articles: { list: ArticleData[]; page: number };
};

export type Articles = {
  list: ArticleData[];
  page: number;
};
