import NextTopLoader, { type NextTopLoaderProps } from "nextjs-toploader";
import colors from "tailwindcss/colors";

type Props = NextTopLoaderProps;

function TopLoadingBar(props: Props) {
  const options: NextTopLoaderProps = {
    ...props,
    color: props?.color ? props?.color : colors.slate[900],
    height: props?.height ? props?.height : 4,
  };
  return <NextTopLoader {...options} />;
}

export default TopLoadingBar;
