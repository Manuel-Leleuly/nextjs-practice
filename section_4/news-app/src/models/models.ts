import { Metadata, ResolvingMetadata } from "next";
import { ReactNode } from "react";

type Params = Record<string, string | string[] | undefined>;
type SearchParams = Record<string, string | string[] | undefined>;

export type PageParams<T extends Params> = {
  params: Promise<T>;
};

export type PageSearchParams<T extends SearchParams> = {
  searchParams: Promise<T>;
};

export type Props<
  T extends Params,
  Q extends SearchParams | undefined = undefined
> = {
  params: PageParams<T>["params"];
  searchParams: Q extends undefined ? undefined : Promise<SearchParams>;
};

// TODO: improve this
export type PageLayout<T extends [string, ...string[]] = ["children"]> =
  Readonly<Record<T[number], ReactNode>>;

export type PageError = {
  error: Error & { digest?: string };
  reset: () => void;
};

export type DynamicMetadataFunction<
  T extends Params,
  Q extends SearchParams | undefined = undefined
> = (props: Props<T, Q>, parent: ResolvingMetadata) => Promise<Metadata>;
