import { NgModule } from '@angular/core';

// Services
import { SeoService } from './seo.service';
import { MetabaseService } from './metabase.service';
import { TitleService } from './title.service';

@NgModule({

    providers: [
        SeoService,
        TitleService,
        MetabaseService
    ]

})
export class SeoModule {}
