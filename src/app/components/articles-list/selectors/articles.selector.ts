import { createSelector, createFeatureSelector } from "@ngrx/store";
import { Articles } from "src/app/interfaces/global/articles";

export const selectArticles = createFeatureSelector<Articles['r_data']>('articles');

export const selectArticleCollection = createSelector(
    selectArticles,
    (articles) => articles.map((items)=>items)
);
