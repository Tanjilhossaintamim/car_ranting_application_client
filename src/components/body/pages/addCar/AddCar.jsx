import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { fetchCatagory } from "../../../../redux/catagorySlice";
import axios from "axios";
import { BASEURL } from "../../../utils/BaseUrl";
import { useNavigate } from "react-router-dom";

const AddCar = ({ showToast }) => {
  const { catagories } = useSelector((state) => state.catagory);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCatagory());
  }, []);

  const handelImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageUrl(file);
    }
  };
  const submitToDatabase = (values) => {
    // add all to a form data
    const formData = new FormData();
    formData.append("image", imageUrl);
    formData.append("title", values.carname);
    formData.append("description", values.description);
    formData.append("catagory_id", values.category);
    formData.append("price", values.price);
    const header = {
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    };

    axios.post(`${BASEURL}/api/ownercar/`, formData, header).then((res) => {
      showToast("Car Successfully Added !");
      navigate("/myproduct");
    });
  };
  document.title = "Add Car";
  return (
    <section className="max-w-4xl p-6 mx-auto bg-gray-100 rounded-md shadow-md mt-20">
      <h1 className="text-xl font-bold text-gray-700 capitalize">Add Car</h1>
      <Formik
        initialValues={{
          carname: "",
          price: "",
          description: "",
          category: "1",
          image: "",
        }}
        validate={(values) => {
          let errors = {};
          if (!/^[0-9]+(\.[0-9]+)?$/.test(values.price)) {
            errors.price = "price mustbe number!";
          }
          if (values.price.length > 12) {
            errors.price = "Price limit only 12 digit";
          }
          return errors;
        }}
        onSubmit={(values) => {
          submitToDatabase(values);
        }}
      >
        {({ values, handleChange, handleSubmit, errors }) => (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label className="text-gray-700" htmlFor="carname">
                  Car Name
                </label>
                <input
                  name="carname"
                  required
                  id="carname"
                  type="text"
                  value={values.carname}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md   focus:border-blue-500  focus:outline-none focus:ring"
                />
              </div>

              <div>
                <label className=" text-gray-700" htmlFor="price">
                  Price
                </label>
                <input
                  id="price"
                  name="price"
                  type="text"
                  value={values.price}
                  onChange={handleChange}
                  required
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md  focus:border-blue-500  focus:outline-none focus:ring"
                />
                <span className="text-red-700">{errors.price}</span>
              </div>

              <div>
                <label
                  className=" text-gray-700"
                  htmlFor="passwordConfirmation"
                >
                  Category
                </label>
                <select
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md   focus:border-blue-500  focus:outline-none focus:ring"
                  name="category"
                  value={values.category}
                  onChange={handleChange}
                >
                  {catagories?.map((category) => {
                    return (
                      <option key={category.id} value={category.id}>
                        {category.title}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div>
                <label className=" text-gray-700" htmlFor="description">
                  Description
                </label>
                <textarea
                  name="description"
                  id="textarea"
                  type="textarea"
                  value={values.description}
                  onChange={handleChange}
                  required
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md  focus:border-blue-500  focus:outline-none focus:ring resize-none"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium ">Image</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 "
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span className="">Upload a file</span>
                        <input
                          id="file-upload"
                          name="image"
                          onChange={handelImageUpload}
                          type="file"
                          className="sr-only"
                          required
                        />
                      </label>
                      <p className="pl-1 ">or drag and drop</p>
                    </div>
                    <p className="text-xs ">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="px-6 py-2 leading-5  transition-colors duration-200 text-white transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600"
              >
                Save
              </button>
            </div>
          </form>
        )}
      </Formik>
    </section>
  );
};

export default AddCar;
