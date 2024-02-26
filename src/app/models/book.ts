import { Author } from "./author";
import { Genre } from "./genre";

export interface Book {
    id: number;
    title: string;
    synopsis: string;
    publicationDate: string;
    isbn: string;
    genres: Genre[];
    authors: Author[];
};