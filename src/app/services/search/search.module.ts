import { NgModule } from '@angular/core';

// Services
import { CourseSearchService } from './search-course.service';
import { IesSearchService } from './search-ies.service';


@NgModule({

    providers: [
        CourseSearchService,
        IesSearchService
    ]

})
export class SearchModule{}