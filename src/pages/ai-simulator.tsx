import Head from "@docusaurus/Head";
import { AIPlayGround } from "@site/src/components/ai-playground";
import { useEffect, useState } from "react";

export default function AISimulatorEmbed() {
  const [lang, setLang] = useState<string>();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const param = new URLSearchParams(window.location.search).get("lang");
    if (param) {
      setLang(param);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Simulateur IA</title>
      </Head>
      <main className="ai-embed">
        <AIPlayGround embedded lang={lang} />
      </main>
    </>
  );
}
