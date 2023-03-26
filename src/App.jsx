import React, { useState, useEffect } from "react";
import ImageCard from "./components/ImageCard";
import ImageSearch from "./components/ImageSearch";
import "./App.css";

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState("");

  useEffect(() => {
    const key = import.meta.env.REACT_APP_PIXABAY_API_KEY;
    const fetchData = () => {
      fetch(
        `https://pixabay.com/api/?key=31046082-e9bc86444c88a924ab03a367c&q=${term}&image_type=photo`
      )
        .then((res) => res.json())
        .then((data) => {
          setImages(data.hits);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    };
    setTimeout(fetchData, 500);
  }, [term]);

  return (
    <div className="container mx-auto">
      <ImageSearch searchText={(text) => setTerm(text)} />

      {!isLoading && images.length === 0 && (
        <h1 className="text-6xl tetx-center mx-auto mt-32">
          No Matching Images Found
        </h1>
      )}

      {isLoading ? (
        <h1 className="text-6xl tetx-center mx-auto mt-32">
          Hang On Getting Content...
        </h1>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {images.map((image) => (
            <ImageCard key={image.id} image={image} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
