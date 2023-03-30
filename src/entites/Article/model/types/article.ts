import { User } from 'entites/User';

export enum ArticleBlockType {
  CODE = 'CODE',
  IMAGE = 'IMAGE',
  TEXT = 'TEXT',
}

export interface ArticleBlockBase {
  id: string,
  type: ArticleBlockType,
}

export interface ArticleBlockCode extends ArticleBlockBase{
  type: ArticleBlockType.CODE,
  code: string,
}

export interface ArticleBlockImage extends ArticleBlockBase{
  type: ArticleBlockType.IMAGE,
  src: string,
  title?: string,
}

export interface ArticleBlockText extends ArticleBlockBase{
  type: ArticleBlockType.TEXT,
  paragraphs: string[],
  title?: string,
}

export enum ArticleTypes {
  IT = 'IT',
  SCIENCE = 'SCIENCE',
  ECONOMICS = 'ECONOMICS'
}

export enum ArticleView {
  SMALL = 'SMALL',
  BIG = 'BIG'
}

export type ArticleBlocks = ArticleBlockCode | ArticleBlockImage | ArticleBlockText;

export interface Article {
  id: string,
  user: User,
  title: string,
  subtitle: string,
  img: string,
  views: number,
  createdAt: string,
  type: ArticleTypes[],
  blocks: ArticleBlocks[]
}
