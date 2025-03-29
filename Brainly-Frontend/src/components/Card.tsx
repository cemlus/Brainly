import { Share2, Trash2 } from "lucide-react";
import { YoutubeIcon } from "../assets/YoutubeIcon";
import { TwitterIcon } from "../assets/TwitterIcon";
import { FileIcon } from "../assets/FileIcon";
import { LinkIcon } from "../assets/LinkIcon";
import axios from "axios";
import { BACKEND_URL } from "../utils/config";
import { Types } from "mongoose";

export type contentTypes = "youtube" | "twitter" | "document" | "link";

interface CardProps {
  _id: Types.ObjectId | string;
  cardInfo?: string;
  title?: string;
  description?: string;
  embeddedLink: string;
  contentType: contentTypes;
  tags: string[];
  isPublic?: boolean;
  onDelete?: () => void;
}

const cardUtilityButtonClass = "h-6 w-6 cursor-pointer";

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
  _id,
  onDelete,
}: CardProps) {
  const deleteNote = async () => {
    try {
      const response = await axios.delete(`${BACKEND_URL}content`, {
        data: {
          contentId: _id,
        },
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      if (response.status === 200) {
        console.log(`note deleted.`);
        onDelete?.();
        window.location.reload();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(`Token is invalid or has probably expired, login again`);
        localStorage.removeItem("token");
      } else {
        alert(`error in deleting.`);
      }
    }
  };

  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 h-full flex flex-col">
      <div className="p-4 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            {iconType[contentType]}
            <span className="text-lg text-gray-500 font-mono line-clamp-1">
              {cardInfo}
            </span>
          </div>
          <div className="flex gap-2">
            <button className="text-gray-400 hover:text-gray-800">
              <Share2 className={cardUtilityButtonClass} />
            </button>
            <button
              className="text-gray-400 hover:text-gray-600"
              onClick={deleteNote}
            >
              <Trash2 className={cardUtilityButtonClass} />
            </button>
          </div>
        </div>

        {title && (
          <h3 className="text-xl font-bold mb-2 line-clamp-2">{title}</h3>
        )}

        <div className="flex justify-center items-center w-full overflow-hidden my-4">
          {contentType === "youtube" && embeddedLink && (
            <div className="w-full aspect-video">
              <iframe
                className="w-full h-full"
                src={embeddedLink
                  ?.replace("watch", "embed")
                  .replace("?v=", "/")}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          )}

          {contentType === "twitter" && embeddedLink && (
            <div className="w-full max-w-2xl mx-auto">
              <blockquote className="twitter-tweet w-full" data-theme="dark">
                <a href={embeddedLink.replace("x.com", "twitter.com")}></a>
              </blockquote>
            </div>
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
