import "../styles/globals.css";
import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DefaultLayout from "../Component/Layout/DefaultLayout";
function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  const Layout = Component.Layout || DefaultLayout;
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}

export default MyApp;
