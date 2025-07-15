export interface Sustainability {
    esg_score: number;
    initiatives: string[];
}

export interface DictionaryItem {
    sustainability: Sustainability;
    _id: string;
    name: string;
    link: string;
    description: string;
    foundation: string;
    headquarters: string;
    relevant_facts: string[];
    competitors: string[];
    main_products: string[];
    operating_markets: string[];
    competitive_advantages: string[];
    business_risks: string[];
    perspectives: string;
    __v: number;
}

export interface DictionaryListResponse {
    result: DictionaryItem[];
    offset: number;
    limit: number;
    total: number;
    page: number;
    pages: number;
}

export interface DictionaryFilter {
    page?: number;
    pageSize?: number;
    name?: string;
}