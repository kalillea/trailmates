import "./ImageUpload.css";
import { ChangeEvent, useState, useEffect } from "react";
import { ReactComponent as RightButton } from "../assets/caro/carousel_right.svg";
import { ReactComponent as LeftButton } from "../assets/caro/carousel_left.svg";
import { getImgUrl } from "../../storage/util/methods";

interface Props {
  setImageIds: React.Dispatch<React.SetStateAction<string[]>>;
  setFiles: React.Dispatch<React.SetStateAction<FileList | null>>;
  defaultImageIds: string[];
  tripId: string;
}

const ImageUpload = ({
  setImageIds,
  setFiles,
  defaultImageIds,
  tripId,
}: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    Promise.all(
      defaultImageIds.map((imageId: string) =>
        getImgUrl(`trips/${tripId}/${imageId}`),
      ),
    ).then(setImageUrls);
  }, [defaultImageIds]);

  const handleFilesChanged = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.currentTarget.files;
    setFiles(selectedFiles);

    const newImageUrls: string[] = [];
    const newImageIds: string[] = [];

    for (let i = 0; i < (selectedFiles?.length || 0); i++) {
      const id = crypto.randomUUID();
      newImageIds.push(id);
      const url = URL.createObjectURL(selectedFiles![i]);
      newImageUrls.push(url);
    }
    setImageIds(newImageIds);
    setImageUrls(newImageUrls);
  };

  const handlePrevClick = () => {
    setActiveIndex(activeIndex === 0 ? imageUrls.length - 1 : activeIndex - 1);
  };

  const handleNextClick = () => {
    setActiveIndex(activeIndex === imageUrls.length - 1 ? 0 : activeIndex + 1);
  };

  return (
    <div className="flex-column">
      {imageUrls.length > 0 && (
        <div className="image-preview-container flex-column">
          <div
            className="image-preview"
            style={{
              backgroundImage: `url(${imageUrls[activeIndex]})`,
            }}
          />
        </div>
      )}
      <div className="flex-row preview-controllers">
        <LeftButton
          className={imageUrls.length > 0 ? "image-carousel-button" : "hide"}
          onClick={handlePrevClick}
        />
        <RightButton
          className={imageUrls.length > 0 ? "image-carousel-button" : "hide"}
          onClick={handleNextClick}
        />
        <input
          type="file"
          name="image"
          onChange={handleFilesChanged}
          accept="image/*"
          multiple={true}
        />
      </div>
    </div>
  );
};

export default ImageUpload;
