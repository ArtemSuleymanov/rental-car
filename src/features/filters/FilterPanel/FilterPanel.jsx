import { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import s from "./FilterPanel.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchBrands } from "../../catalog/catalogSlice";
import sprite from "../../../assets/sprite.svg";

const FilterPanel = ({ onSearch }) => {
  const dispatch = useDispatch();
  const brands = useSelector((state) => state.catalog.brands);

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  const initialValues = {
    brand: "",
    rentalPrice: "",
    minMileage: "",
    maxMileage: "",
  };

  const handleSubmit = (values) => {
    onSearch(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {() => (
        <Form className={s.form}>
          <div className={s.fieldGroup}>
            <div className={s.label}>Car brand</div>
            <div className={s.selectWrapper}>
              <Field as="select" name="brand" className={s.select}>
                <option value="">Choose a brand</option>
                {Array.isArray(brands) &&
                  brands.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
              </Field>
              <svg className={s.icon} width="16" height="16">
                <use href={`${sprite}#icon-arrow-top`} />
              </svg>
            </div>
          </div>

          <div className={s.fieldGroup}>
            <div className={s.label}>Price / 1 hour</div>
            <div className={s.selectWrapper}>
              <Field as="select" name="rentalPrice" className={s.select}>
                <option value="">Choose a price</option>
                {[30, 40, 50, 60, 70, 80].map((p) => (
                  <option key={p} value={p}>
                    To ${p}
                  </option>
                ))}
              </Field>
              <svg className={s.icon} width="16" height="16">
                <use href={`${sprite}#icon-arrow-top`} />
              </svg>
            </div>
          </div>

          <div className={s.fieldGroup}>
            <div className={s.label}>Car mileage / km</div>
            <div className={s.mileageInputs}>
              <div className={s.mileageInputs}>
                <Field name="minMileage">
                  {({ field }) => (
                    <input
                      {...field}
                      type="number"
                      className={s.input}
                      placeholder="From"
                    />
                  )}
                </Field>

                <div className={s.divider} />

                <Field name="maxMileage">
                  {({ field }) => (
                    <input
                      {...field}
                      type="number"
                      className={s.input}
                      placeholder="To"
                    />
                  )}
                </Field>
              </div>
            </div>
          </div>

          <button type="submit" className={s.button}>
            Search
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default FilterPanel;
