import Head from "@docusaurus/Head";
import { AIPlayGround } from "@site/src/components/ai-playground";

export default function AISimulatorEmbed() {
  return (
    <>
      <Head>
        <title>Simulateur IA</title>
      </Head>
      <main className="ai-embed">
        <AIPlayGround embedded />
      </main>
    </>
  );
}
