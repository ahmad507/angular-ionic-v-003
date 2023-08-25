import { createReducer, on } from "@ngrx/store";
import { retrievedArticles } from "../actions/articles.actions";
import { Articles } from "src/app/interfaces/global/articles";

export const initialState: Articles['r_data'] = [];

export const articlesReducer = createReducer(
  initialState,
  on(retrievedArticles, (state, {articles}) => articles)
);
