import { AuthForm } from "@/components/auth-form";
import { PageRouteProps } from "@/models/models";

type Props = PageRouteProps<undefined, { mode?: string }>;

export default async function Home({ searchParams }: Props) {
  const { mode } = await searchParams;
  const formMode = mode ?? "login";

  return <AuthForm mode={formMode} />;
}
