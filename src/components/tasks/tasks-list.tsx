"use client";

import React from "react";
import FileViewer from "@/components/file-viewer";
import { useState } from "react";
import { Slide } from "yet-another-react-lightbox";
import { getSlides } from "@/utils/file";
import { TaskItem } from "@/components/tasks/task";
import { PopulatedTask } from "@/app/lib/schema";

export default function TasksList({
  tasks,
  isAdmin,
}: {
  tasks: PopulatedTask[];
  isAdmin: boolean;
}) {
  const [files, setFiles] = useState<Slide[]>([]);
  const [fileOpenIndex, setFileOpenIndex] = useState<number>(0);

  const handleViewerClose = () => {
    setFiles([]);
    setFileOpenIndex(0);
  };

  const handleViewerOpen = (files: string[], index: number) => {
    const slides = getSlides(files);
    setFiles(slides);
    setFileOpenIndex(index);
  };

  return (
    <div>
      <div className="mt-4 flex flex-col gap-4">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            handleViewerOpen={handleViewerOpen}
            isAdmin={isAdmin}
          />
        ))}
      </div>

      {files && files.length > 0 && (
        <FileViewer
          onClose={handleViewerClose}
          files={files}
          openIndex={fileOpenIndex}
        />
      )}
    </div>
  );
}
