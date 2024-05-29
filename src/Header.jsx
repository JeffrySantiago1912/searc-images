/* Header.jsx
By: Jeffry Santiago
Email: engineer_santiago1912@hotmail.com 
Logic: Configure Header logic by calling the Gallery Images component which contains part of the image loading logic*/

import { Formik, Form, Field } from "formik";
import { useState } from "react";
import GalleryImages from "./GalleryImages";
import Swal from "sweetalert2";
import "./assets/SearchImage.css";

const Header = () => {
  const [photos, setPhotos] = useState([]);
  const openPhotos = (url) => window.open(url);

  return (
    <div>
      <header className="headerStyles">
        <Formik
          initialValues={{ search: "" }}
          onSubmit={async (values) => {
            try {
              // Llamada al API de Unsplash
              const response = await fetch(
                `https://api.unsplash.com/search/photos?per_page=9&query=${values.search}`,
                {
                  headers: {
                    Authorization:
                      "Client-ID LHoGvmGUhh3cIbbzHL9WQ4lp6vc5PIOrtCcFjOkYSxY",
                  },
                }
              );

              if (!response.ok) {
                throw new Error("Failed to fetch data from Unsplash API");
              }

              //Use SweetAlertModal Sucess
              Swal.fire({
                title: "Showing results",
                icon: "success",
                timer: 3000,
                showConfirmButton: false,
              });

              const data = await response.json();
              setPhotos(data.results);
            } catch (error) {
              
              //Use SweetAlertModal Warning
              Swal.fire({
                title: "Sorry",
                icon: "warning",
                text: `We did not find data for ${values.search}`,
                timer: 7000,
                confirmButtonText: "Perform another search",
                showConfirmButton: true,
                customClass: {
                  confirmButton: "custom-confirm-button",
                },
              });
            }
          }}
        >
          <Form>
            <Field placeholder="Write anything" name="search" />
          </Form>
        </Formik>
      </header>
      <GalleryImages photos={photos} openPhotos={openPhotos} />
    </div>
  );
};

export default Header;
