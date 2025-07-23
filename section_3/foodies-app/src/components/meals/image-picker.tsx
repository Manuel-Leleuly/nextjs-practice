"use client";

import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import styles from "./image-picker.module.css";

interface Props {
  label: string;
  name: string;
}

export const ImagePicker = ({ label, name }: Props) => {
  const [pickedImage, setPickedImage] = useState<FileReader["result"]>();
  const imageInputRef = useRef<HTMLInputElement>({} as HTMLInputElement);

  const handlePickClick = () => {
    imageInputRef.current.click();
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return setPickedImage(null);
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  };

  return (
    <div className={styles.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={styles.controls}>
        <div className={styles.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && (
            <Image
              src={pickedImage as string}
              alt="The image selected by user."
              fill
            />
          )}
        </div>
        <input
          className={styles.input}
          type="file"
          name={name}
          id={name}
          accept="image/png, image/jpeg"
          ref={imageInputRef}
          onChange={handleImageChange}
          required
        />
        <button
          className={styles.button}
          type="button"
          onClick={handlePickClick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
};
