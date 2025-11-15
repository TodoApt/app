import Lightbox, { Slide } from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

const FileViewer = ({
  onClose,
  files,
  openIndex,
}: {
  onClose: () => void;
  files: Slide[];
  openIndex?: number;
}) => {
  return (
    <Lightbox
      open
      close={onClose}
      slides={files}
      plugins={[Fullscreen, Thumbnails, Video, Zoom]}
      index={openIndex}
      carousel={{
        finite: true,
      }}
    />
  );
};

export default FileViewer;
