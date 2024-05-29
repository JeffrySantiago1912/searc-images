/* GalleryImages.jsx
By: Jeffry Santiago
Email: engineer_santiago1912@hotmail.com 
Logic: Configure component which contains part of the image loading logic*/

import PropTypes from "prop-types";
import "./assets/SearchImage.css";

const GalleryImages = ({ photos, openPhotos }) => (
  <div className="container">
    <div className="center">
      {photos.map((photo) => (
        <article key={photo.id} onClick={() => openPhotos(photo.links.html)}>
          <img
            className="img-fixed-size"
            src={photo.urls.small}
            alt={photo.alt_description || "Photo"}
          />
          <p>{photo.description ? photo.description : "Title not available"}</p>
        </article>
      ))}
    </div>
  </div>
);

GalleryImages.propTypes = {
  photos: PropTypes.array.isRequired,
  openPhotos: PropTypes.func.isRequired,
};

export default GalleryImages;
