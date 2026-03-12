import { Suspense } from "react";
import { MenuHeader } from "./header";
import { checkIsAdmin } from "@/lib/auth-utils";

async function MenuHeaderData({ logo, auth }: { logo?: React.ReactNode, auth?: React.ReactNode }) {
  const isAdmin = await checkIsAdmin();
  return <MenuHeader isAdmin={isAdmin} logo={logo} auth={auth} />;
}

export function MenuHeaderServer({ logo, auth }: { logo?: React.ReactNode, auth?: React.ReactNode }) {
  return (
    <Suspense fallback={<MenuHeader isAdmin={false} logo={logo} auth={auth} />}>
      <MenuHeaderData logo={logo} auth={auth} />
    </Suspense>
  );
}
