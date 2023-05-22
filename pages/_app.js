import "styles/globals.css";
import { BaseProvider } from "src/context/BaseContext";

export default function App({ Component, pageProps }) {
  return (
    <BaseProvider>
      <Component {...pageProps} />
    </BaseProvider>
  );
}
