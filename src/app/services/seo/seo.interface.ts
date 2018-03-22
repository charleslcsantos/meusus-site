
export interface TitleInfo {
    fragment: string;
    full?: string;
    prefix?: string;
    suffix?: string;
}

export interface MetaBaseInfo {
    description: string;
    follow?: boolean;
    index?: boolean;
    canonical?: string;
}

export interface SEOInfo {
    title: TitleInfo;
    metabase: MetaBaseInfo;
}
