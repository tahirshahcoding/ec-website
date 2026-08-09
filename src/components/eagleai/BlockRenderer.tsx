import { ArchitectureBlock, LeadAction, PortfolioCard, RagSources, RecommendationBlock, ServiceCard } from "./RichResponses";
import type { EagleAIBlock } from "@/lib/eagleai";

interface BlockRendererProps {
  block: EagleAIBlock;
  onLeadClick?: () => void;
}

export function BlockRenderer({ block, onLeadClick }: BlockRendererProps) {
  switch (block.type) {
    case "recommendation":
      return (
        <RecommendationBlock
          title={block.data.title}
          reasons={block.data.reasons}
        />
      );
    case "architecture":
      return (
        <ArchitectureBlock
          title={block.data.title}
          stack={block.data.stack}
          description={block.data.description}
          note={block.data.note}
        />
      );
    case "portfolio":
      return (
        <PortfolioCard
          title={block.data.title}
          tags={block.data.tags}
          href={block.data.href}
          description={block.data.description}
        />
      );
    case "service":
      return (
        <ServiceCard
          title={block.data.title}
          href={block.data.href}
          description={block.data.description}
        />
      );
    case "lead_action":
      return (
        <LeadAction
          title={block.data.title}
          buttonText={block.data.button}
          onClick={onLeadClick}
        />
      );
    case "sources":
      return <RagSources sources={block.data.items} />;
    default:
      return null;
  }
}
