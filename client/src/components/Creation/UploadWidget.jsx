import { useEffect, useRef } from "react";

export default function UploadWidget(props) {

  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "efille",
        uploadPreset: "The Good Cook Book",
      },
      function (error, result) {
        if (!error && result && result.event === "success") {
          props.onUpload(result.info.secure_url);
        }
      }
    );
  }, [props]);

  return (
    <div className="widgetContainer">
      <span>Upload an Image</span>
      <br />
      <a onClick={() => widgetRef.current.open()}>Upload</a>
    </div>
  );
}
