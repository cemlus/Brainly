import Sidebar from "../components/Sidebar";
import { Button } from "../components/Button";
import { ShareIcon } from "../assets/ShareIcon";
import { PlusIcon } from "../assets/PlusIcon";
import { Card } from "../components/Card";
import { AddContentModal } from "../components/AddContentModal";
import { useState } from "react";
import { CrossIcon } from "../assets/CrossIcon";
import { Content, useContent } from "../hooks/UseContent";

export default function SecondBrain() {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  // fetching content from backend using the custom hook created
  // @ts-ignore
  const { content, loading, error } = useContent();

  // take care of loading and error component first
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-600">
        {error}
      </div>
    );

  return (
    <>
      <AddContentModal
        open={modalOpen}
        onClose={closeModal}
        closeIcon={<CrossIcon onClose={closeModal} />}
      />

      <div className="flex h-screen bg-white">
        {/* Sidebar */}
        <Sidebar />

        {/* Content */}
        <div className="flex-1 p-6">
          <nav className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">All Notes</h2>
            <div className="flex gap-2">
              <Button
                onClick={openModal}
                variant="primary"
                text="Add Content"
                startIcon={<PlusIcon />}
              />
              <Button
                variant="secondary"
                text="Share Brain"
                startIcon={<ShareIcon />}
              />
            </div>
          </nav>

          {/* Notes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 w-full">
            {Object.values(content).map((item: Content) => (
              <Card
                key={item._id.toString()}
                _id={item._id.toString()}
                cardInfo={item.cardInfo}
                title={item.title}
                description={item.description}
                embeddedLink={item.embeddedLink}
                contentType={item.contentType}
                tags={item.tags}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
