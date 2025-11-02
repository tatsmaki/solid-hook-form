import { Title } from "@solidjs/meta";
import { Container } from "~/components/container/container";
import changelog from "../../changelog.md?raw";

const Changelog = () => {
  return (
    <main>
      <Title>Changelog</Title>
      <Container>
        <div
          innerHTML={changelog
            .replaceAll(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
            .replaceAll(/^### (.+)$/gm, "<h3>$1</h3>")
            .replaceAll(/^## (.+)$/gm, "<h2>$1</h2>")
            .replaceAll(/^# (.+)$/gm, "<h1>$1</h1>")
            .replaceAll(/^- (.+)$/gm, "<li>$1</li>")}
        />
      </Container>
    </main>
  );
};

export default Changelog;
