
export interface ISearchService {
    
    items: any;
    url: string;

    search (term: any, data: any);
    generateUrl (term: any);
}