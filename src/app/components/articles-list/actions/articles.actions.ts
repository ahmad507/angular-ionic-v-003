import { createAction, props } from "@ngrx/store";
import { Articles } from "src/app/interfaces/global/articles";

export const retrievedArticles = createAction(
  '[Article Retrieve], Retrieve Articles',props<{articles: Articles['r_data']}>()
);
