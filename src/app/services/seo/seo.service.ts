import { Injectable } from '@angular/core';
import { SEOInfo } from "./seo.interface";
import { TitleService } from "./title.service";
import { MetabaseService } from './metabase.service';


@Injectable()
export class SeoService {

  private seoInfoDefault: SEOInfo = {
    
    title: {
      fragment: "",
      full: "CREDUC - Crédito Educativo"
    },
    metabase: {
      description: "Descrição do texto. Texto longo aqui, mas precisa conferir as regras de tamanho máximo aqui",
      index: true,
      follow: true
    }

  };

  constructor(
    private titleService: TitleService, 
    private metabaseService: MetabaseService) {
  }

  setDefaultSeo(){
    let seoInfo: SEOInfo = Object.assign(this.seoInfoDefault, {});
    this.setSeoData(seoInfo);
  }

  setSeoData(data:SEOInfo){
    this.titleService.configure(data.title);
    this.metabaseService.configure(data.metabase);
  }

}
