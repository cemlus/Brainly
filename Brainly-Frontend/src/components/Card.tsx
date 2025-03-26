import { Share2, Trash2 } from "lucide-react";
import { YoutubeIcon } from "../assets/YoutubeIcon";
import { TwitterIcon } from "../assets/TwitterIcon";
import { FileIcon } from "../assets/FileIcon";
import { LinkIcon } from "../assets/LinkIcon";

type contentTypes = "youtube" | "twitter" | "document" | "link";

interface CardProps {
  cardInfo: string;
  title?: string;
  description?: string;
  embeddedLink: string;
  contentType: contentTypes;
  tags: string[];
  isPublic?: boolean;
}

const iconType = {
  youtube: <YoutubeIcon />,
  twitter: <TwitterIcon />,
  document: <FileIcon />,
  link: <LinkIcon />,
};

export function Card({
  cardInfo,
  title,
  description,
  embeddedLink,
  contentType,
  tags,
}: CardProps) {
  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 h-full flex flex-col">
      <div className="p-4 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            {iconType[contentType]}
            <span className="text-lg text-blue-950 font-medium line-clamp-1">
              {cardInfo}
            </span>
          </div>
          <div className="flex gap-2">
            <button className="text-gray-400 hover:text-gray-600">
              <Share2 className="h-5 w-5" />
            </button>
            <button className="text-gray-400 hover:text-gray-600">
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        {title && (
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">{title}</h3>
        )}

        <div className="flex justify-center items-center w-full overflow-hidden my-4">
          {contentType === "youtube" && embeddedLink && (
            <div className="w-full aspect-video">
              <iframe
                className="w-full h-full"
                src={embeddedLink?.replace("watch", "embed").replace("?v=", "/")}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          )}

          {contentType === "twitter" && embeddedLink && (
            <blockquote className="twitter-tweet w-full" data-theme="dark">
              <a href={embeddedLink.replace("x.com", "twitter.com")}></a>
            </blockquote>
          )}
        </div>

        {description && (
          <div className="mb-4 min-w-content">
              <p className="break-words whitespace-normal">{description}</p>
        </div>
        )}
      </div>

      {tags.length > 0 && (
        <div className="p-4 pt-0">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag: string) => (
              <span
                key={tag}
                className="text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}