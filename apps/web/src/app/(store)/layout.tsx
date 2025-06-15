import type { ReactNode } from "react";
import Header from "~/components/header";

type Props = {
  children: ReactNode;
};

function StoreLayout({ children }: Props) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default StoreLayout;
