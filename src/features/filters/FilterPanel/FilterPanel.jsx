import { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import s from "./FilterPanel.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchBrands } from "../../catalog/catalogSlice";

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
            <Field as="select" name="brand" className={s.select}>
              <option value="">Choose a brand</option>
              {Array.isArray(brands) &&
                brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
            </Field>
          </div>

          <div className={s.fieldGroup}>
            <div className={s.label}>Price / 1 hour</div>
            <Field as="select" name="rentalPrice" className={s.select}>
              <option value="">Choose a price</option>
              {[30, 40, 50, 60, 70, 80].map((p) => (
                <option key={p} value={p}>
                  To ${p}
                </option>
              ))}
            </Field>
          </div>

          <div className={s.fieldGroup}>
            <div className={s.label}>Car mileage / km</div>
            <div className={s.mileageInputs}>
              <Field name="minMileage">
                {({ field }) => {
                  const hasValue =
                    field.value !== undefined && field.value !== "";
                  return (
                    <input
                      {...field}
                      type="number"
                      className={s.input}
                      placeholder={hasValue ? `From ${field.value}` : "From"}
                    />
                  );
                }}
              </Field>
              <Field name="maxMileage">
                {({ field }) => {
                  const hasValue =
                    field.value !== undefined && field.value !== "";
                  return (
                    <input
                      {...field}
                      type="number"
                      className={s.input}
                      placeholder={hasValue ? `To ${field.value}` : "To"}
                    />
                  );
                }}
              </Field>
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
