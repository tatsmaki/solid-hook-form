import { Title } from "@solidjs/meta";
import { Link } from "solid-uix";
import { Container } from "~/components/container/container";
import changelog from "../../../CHANGELOG.md?raw";
import { For, createMemo, JSX } from "solid-js";
import { Footer } from "~/components/footer/footer";

const Changelog = () => {
  const parsedContent = createMemo(() => {
    const lines = changelog.split("\n");
    const elements: JSX.Element[] = [];
    let currentListItems: JSX.Element[] = [];

    const flushList = () => {
      if (currentListItems.length > 0) {
        elements.push(<ul>{currentListItems}</ul>);
        currentListItems = [];
      }
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Parse headings
      if (line.match(/^### (.+)$/)) {
        flushList();
        const text = line.replace(/^### (.+)$/, "$1");
        elements.push(<h3>{parseLineWithLinks(text)}</h3>);
      } else if (line.match(/^## (.+)$/)) {
        flushList();
        const text = line.replace(/^## (.+)$/, "$1");
        elements.push(
          <>
            <br />
            <h2>{parseLineWithLinks(text)}</h2>
          </>
        );
      } else if (line.match(/^# (.+)$/)) {
        flushList();
        const text = line.replace(/^# (.+)$/, "$1");
        elements.push(<h1>{parseLineWithLinks(text)}</h1>);
      } else if (line.match(/^- (.+)$/)) {
        const text = line.replace(/^- (.+)$/, "$1");
        currentListItems.push(<li>{parseLineWithLinks(text)}</li>);
      } else if (line.trim() !== "") {
        flushList();
        elements.push(<p>{parseLineWithLinks(line)}</p>);
      } else {
        flushList();
      }
    }

    // Flush any remaining list items at the end
    flushList();

    return elements;
  });

  return (
    <main>
      <Title>Changelog</Title>
      <Container>
        <div>
          <For each={parsedContent()}>{(element) => element}</For>
        </div>

        <Footer />
      </Container>
    </main>
  );
};

const parseLineWithLinks = (text: string): JSX.Element[] => {
  const parts: JSX.Element[] = [];
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      parts.push(<>{text.substring(lastIndex, match.index)}</>);
    }

    // Add the Link component
    parts.push(
      <Link href={match[2]} target="_blank" underline="always">
        {match[1]}
      </Link>
    );

    lastIndex = linkRegex.lastIndex;
  }

  // Add remaining text after the last link
  if (lastIndex < text.length) {
    parts.push(<>{text.substring(lastIndex)}</>);
  }

  // If no links were found, return the text as-is
  if (parts.length === 0) {
    return [<>{text}</>];
  }

  return parts;
};

export default Changelog;
