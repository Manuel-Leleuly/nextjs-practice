import { Metadata, ResolvingMetadata } from "next";
import { ReactNode } from "react";

type Params = Record<string, string>;
type SearchParams = Record<string, string | string[] | undefined>;

export type PageParams<T extends Params> = {
  params: Promise<T>;
};

export type Props<
  T extends Params,
  Q extends SearchParams | undefined = undefined
> = {
  params: PageParams<T>["params"];
  searchParams: Q extends undefined ? undefined : Promise<SearchParams>;
};

export type PageLayout = Readonly<{ children: ReactNode }>;

export type PageError = {
  error: Error & { digest?: string };
  reset: () => void;
};

export type DynamicMetadata<
  T extends Params,
  Q extends SearchParams | undefined = undefined
> = (props: Props<T, Q>, parent: ResolvingMetadata) => Promise<Metadata>;
