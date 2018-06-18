import { Injectable } from '@angular/core';
import { SEOInfo } from './seo.interface';
import { TitleService } from './title.service';
import { MetabaseService } from './metabase.service';


@Injectable()
export class SeoService {

  private seoInfoDefault: SEOInfo = {

    title: {
      fragment: '',
      full: 'MeuSUS - O SUS mais perto de você'
    },
    metabase: {
      description: `Já pensou se existisse um app que reunisse todas as informações sobre serviços e unidades do SUS?
                    O MeuSUS é um serviço que tem como objetivo disponibilizar para consulta,
                    de forma fácil e prática, todos os serviços prestados pelo Sistema Único de Saúde (SUS).
                    Esse é o MeuSUS. Alias, nosso SUS! :)`,
      index: true,
      follow: true
    }

  };

  constructor(
    private titleService: TitleService,
    private metabaseService: MetabaseService) {
  }

  setDefaultSeo() {
    const seoInfo: SEOInfo = Object.assign(this.seoInfoDefault, {});
    this.setSeoData(seoInfo);
  }

  setSeoData(data: SEOInfo) {
    this.titleService.configure(data.title);
    this.metabaseService.configure(data.metabase);
  }

}
