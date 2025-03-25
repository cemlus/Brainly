/*
{notes.map((note) => (
    <NoteCard key={note.id} note={note} />
  ))}
*/

// import { TwitterCard } from "./special-cards/TwitterCard"
import { Share2, Trash2} from "lucide-react";
import { YoutubeIcon } from "../assets/YoutubeIcon";


type contentTypes = "youtube" | "twitter" | "document" | "link";
// interface embeddedContent {
//     "youtube":
// }

interface CardProps {
  cardInfo: string;
  title?: string; // should have the context of the data the card stores
  description?: string;
  embeddedLink: string;
  contentType: contentTypes;
  tags: string[];
  isPublic?: boolean;
}

export function Card({
  cardInfo,
  title,
  description,
  embeddedLink,
  contentType,
  tags,
}: CardProps) {
  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden border-b-gray-200 border-gray-100">
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            <YoutubeIcon />
            <span className="text-lg text-blue-950 font-medium">{cardInfo}</span>
          </div>
          <div className="flex gap-1 mb-2">
            <button className="text-gray-400 hover:text-gray-600 mx-2">
              <Share2 className="h-5 w-5" />
            </button>
            <button className="text-gray-400 hover:text-gray-600">
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
        <div className="flex justify-center items-center w-[100%] h-[100%] overflow-hidden">
            {contentType === "youtube" && embeddedLink && (
            <iframe
                width="560"
                className="flex"
                height="315"
                src={embeddedLink?.replace("watch", "embed").replace("?v=", "/")}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            ></iframe>
            )}

            {contentType === "twitter" && embeddedLink && (
            <blockquote className="twitter-tweet" data-theme="dark">
                <a href={embeddedLink.replace("x.com","twitter.com")}></a>
            </blockquote>
            )}

        </div>


        {/* 
            if the note has an image uploaded to it

            {note.hasImage ? (
                <div className="bg-gray-200 h-20 w-full flex items-center justify-center mb-2 rounded">
                <FileText className="h-10 w-10 text-gray-400" />
                </div>
            ) : (  
            */}
        <div className="mb-4">
          {/* this is for iterating over an array of strings that stores different bullet pointers if the type is "Project Ideas" else it simply prints each element line by line  */}
          <p>{description}</p>
          {/*   
                            if the notes were stored as array of strings
                                        
                                {note.content.map((item: string, index: number) =>
                                    note.type === "Project Ideas" ? (
                                    <div key={index} className="flex items-start gap-2">
                                        <span className="text-gray-800 mt-1">•</span>
                                        <p className="text-gray-800">{item}</p>
                                    </div>
                                    ) : (
                                    <p key={index} className="text-gray-800">
                                        {item}
                                    </p>
                                    ),
                                )} 
                            */}
        </div>

        <div className="flex flex-wrap gap-1 mt-3">
          {tags.map((tag: string) => (
            <span
              key={tag}
              className="text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/*
            date will come from backend
                <div className="text-xs text-gray-500 mt-2">Added on {note.date}</div> 
            */}
      </div>
    </div>
  );
}

