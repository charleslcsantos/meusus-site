import { Injectable, RendererFactory2, Inject, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { MetaBaseInfo } from './seo.interface';
import { AbsoluteUrlService } from '../utils/absoluteurl.service';


@Injectable()
export class MetabaseService {

  private titleDefaults: MetaBaseInfo = {
    description: 'MeuSUS - O SUS mais perto de você',
    follow: true,
    index: true
  };

  constructor(
    private ngMeta: Meta,
    private absoluteUrl: AbsoluteUrlService,
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document
  ) {

  }

  configure(data: MetaBaseInfo) {
    data = Object.assign(this.titleDefaults, data);
    this.setDescription(data.description);
    this.setRobots(data.index, data.follow);
    this.setCanonical(data.canonical);
  }

  setDescription(text: string) {
    let description: string = text;

    description = text.substring(0, 160);

    if (text.length > 160) {
      description = text.substring(0, 157) + '...';
    }

    this.ngMeta.updateTag({ name: 'description', content: description });
  }

  setCanonical(link: string) {
    try {
      const renderer = this.rendererFactory.createRenderer(this.document, {
        id: '-1',
        encapsulation: ViewEncapsulation.None,
        styles: [],
        data: {}
      });
      const canonical = document.querySelector('link[rel=\'canonical\']');
      const head = this.document.head;

      if (head === null) {
        return;
      }

      // if (!!canonical) {

      //   this.absoluteUrl.getAbsoluteUrlFromPath(link).subscribe( url => {
      //     canonical.setAttribute('href', url);
      //   });
      // }
      if (!!canonical) {
        canonical.setAttribute('href', this.absoluteUrl.getAbsoluteUrl(link));
      }
    } catch (e) {
      console.error('Error within linkService : ', e);
    }
  }

  setRobots(index: boolean, follow: boolean) {
    let text = '';
    text += index ? 'Index,' : 'NoIndex';
    text += follow ? ' Follow' : 'NoFollow';
    this.ngMeta.updateTag({ name: 'robots', content: text });
  }

}
