
import React from 'react';
import { Button } from "@/components/ui/button";
import { Share2, Twitter, Linkedin, Facebook, Link, Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
  className?: string;
}

const SocialShare = ({ url, title, description = "", className = "" }: SocialShareProps) => {
  const { toast } = useToast();
  const fullUrl = `${window.location.origin}${url}`;

  const shareData = {
    title,
    text: description,
    url: fullUrl,
  };

  const handleNativeShare = async () => {
    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback to copying URL
      handleCopyLink();
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(fullUrl).then(() => {
      toast({
        title: "Link copiado!",
        description: "O link foi copiado para a área de transferência.",
      });
    });
  };

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(fullUrl)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  };

  const handleLinkedInShare = () => {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`;
    window.open(linkedinUrl, '_blank', 'width=600,height=400');
  };

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="font-semibold text-sm text-muted-foreground">Compartilhar artigo</h3>
      
      <div className="flex flex-wrap gap-2">
        {/* Native Share (mobile) */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleNativeShare}
          className="gap-2 md:hidden"
        >
          <Share2 className="h-4 w-4" />
          Compartilhar
        </Button>

        {/* Desktop share buttons */}
        <div className="hidden md:flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleTwitterShare}
            className="gap-2 hover:bg-blue-50 hover:border-blue-200"
          >
            <Twitter className="h-4 w-4" />
            Twitter
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleLinkedInShare}
            className="gap-2 hover:bg-blue-50 hover:border-blue-200"
          >
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleFacebookShare}
            className="gap-2 hover:bg-blue-50 hover:border-blue-200"
          >
            <Facebook className="h-4 w-4" />
            Facebook
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyLink}
            className="gap-2"
          >
            <Copy className="h-4 w-4" />
            Copiar link
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SocialShare;
