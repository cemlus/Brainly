import { Input } from "./InputBox";
import { Button } from "./Button";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../utils/config";
import { contentTypes } from "./Card";
import { YoutubeIcon } from "../assets/YoutubeIcon";
import { TwitterIcon } from "../assets/TwitterIcon";
import { File, Link } from "lucide-react";

interface ModalParams {
  open: boolean;
  onClose: () => void;
  closeIcon: React.ReactElement;
}

export function AddContentModal({ open, onClose, closeIcon }: ModalParams) {
  if (!open) return null;

  const [cardInfo, setCardInfo] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [embeddedLink, setEmbeddedLink] = useState("");
  const [tags, setTags] = useState<String[]>([]);
  const [contentType, setContentType] = useState<contentTypes>()

  const contentTypeButtons = [
    { type: "youtube" as contentTypes, text: "YouTube", icon: <YoutubeIcon /> },
    { type: "twitter" as contentTypes, text: "Twitter", icon: <TwitterIcon /> },
    { type: "document" as contentTypes, text: "Document", icon: <File /> },
    { type: "link" as contentTypes, text: "Link", icon: <Link /> }
  ];
  

  const addContent = async () => {
    try {
        const response = await axios.post(`${BACKEND_URL}content`, {
          cardInfo: cardInfo,
          title: title,
          description: description,
          embeddedLink: embeddedLink,
          tags: tags,
          contentType: contentType
        }, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        });
    
        if(response.status === 200){
            window.location.reload();
        }         
    } catch (error) {
        if(axios.isAxiosError(error)){
            if(error.response?.status === 401 || error.response?.status === 403){
                alert(`Token in invalid or has expired. ${error.response?.status}`)
            } else {
                alert(`Failed to fetch content`)
            }
        }
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="fixed inset-0 bg-gray-200 opacity-80 transition-opacity blur-s"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative bg-white w-full max-w-xl rounded-lg shadow-xl border-gray-300">
            <div
              className="absolute right-4 top-4 cursor-pointer"
              onClick={onClose}
            >
              {closeIcon}
            </div>

            <div className="p-6 w-full flex-col">
              <h2 className="text-2xl font-semibold mb-4">Add Content</h2>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {contentTypeButtons.map((btn) => (
                  <Button
                    key={btn.type}
                    variant={contentType === btn.type ? "primary" : "secondary"}
                    text={btn.text}
                    startIcon={btn.icon}
                    onClick={() => setContentType(btn.type)}
                    className="w-full transform transition-all duration-200"
                  />
                ))}
              </div>

              <div className="space-y-4">
                <Input placeholder={"Card Header"} type="text" onChange={(e) => setCardInfo(e.target.value)}/>
                <Input placeholder={"Title"} type="text" onChange={(e) => setTitle(e.target.value)} />
                <Input placeholder={"Description"} type="text" onChange={(e) => setDescription(e.target.value)} />
                <Input placeholder={"Link"} type="text" onChange={(e) => setEmbeddedLink(e.target.value)} />
                <Input placeholder={"Tags"} type="text" onChange={(e) => setTags(e.target.value.split(" "))} />

              </div>
              <div className="flex justify-center mt-3">
                {/* after clicking submit the data will be fed into the backend and rendered on the frontend simultaneously as a note */}
                <Button
                  variant="primary"
                  text="Submit"
                  widthFull={true}
                  onClick={() => {
                    addContent();
                    onClose();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
