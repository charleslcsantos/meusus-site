import { Injectable } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { TitleInfo } from "./seo.interface";

@Injectable()
export class TitleService {

  private titleDefaults: TitleInfo = {
    fragment: "",
    prefix: "",
    suffix: " | CREDUC"
  }

  constructor(
    private ngTitle: Title
  ) { }

  configure(titleObj: TitleInfo) {
    
    let title: TitleInfo = Object.assign(this.titleDefaults, titleObj);
    title.full = titleObj.full ? title.full : `${title.prefix}${title.fragment}${title.suffix}`;
    this.ngTitle.setTitle( title.full );
  }

}
