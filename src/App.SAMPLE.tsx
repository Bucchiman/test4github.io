import terre from './img_5terre.jpg';
import forest from './img_forest.jpg';
import lights from './img_lights.jpg';
import mountains from './img_mountains.jpg';

const GalleryItem: React.FC<{ src: string; alt: string; desc: string }> = ({ src, alt, desc }) => (
  <div className="gallery">
    <a target="_blank" href={src}>
      <img src={src} alt={alt} width="600" height="400" />
    </a>
    <div className="desc">{desc}</div>
  </div>
);

const Gallery: React.FC = () => (
  <div>
    <style>
      {`
        .gallery {
          margin: 5px;
          border: 1px solid #ccc;
          float: left;
          width: 180px;
        }

        .gallery:hover {
          border: 1px solid #777;
        }

        .gallery img {
          width: 100%;
          height: auto;
        }

        .desc {
          padding: 15px;
          text-align: center;
        }
      `}
    </style>

    <GalleryItem src={terre} alt="Cinque Terre" desc="Add a description of the image here" />
    <GalleryItem src={forest} alt="Forest" desc="Add a description of the image here" />
    <GalleryItem src={lights} alt="Northern Lights" desc="Add a description of the image here" />
    <GalleryItem src={mountains} alt="Mountains" desc="Add a description of the image here" />

    {/*<GalleryItem src="https://www.w3schools.com/css/img_5terre.jpg" alt="Cinque Terre" desc="Add a description of the image here" />
    <GalleryItem src="https://www.w3schools.com/css/img_forest.jpg" alt="Forest" desc="Add a description of the image here" />
    <GalleryItem src="https://www.w3schools.com/css/img_lights.jpg" alt="Northern Lights" desc="Add a description of the image here" />
    <GalleryItem src="https://www.w3schools.com/css/img_mountains.jpg" alt="Mountains" desc="Add a description of the image here" />*/}

  </div>
);

export default Gallery;

