import { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import styles from './FilterPanel.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrands } from '../../catalog/catalogSlice';

const FilterPanel = ({ onSearch }) => {
  const dispatch = useDispatch();
  const brands = useSelector((state) => state.catalog.brands);

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  const initialValues = {
    brand: '',
    rentalPrice: '',
    minMileage: '',
    maxMileage: '',
  };

  const handleSubmit = (values) => {
    onSearch(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form className={styles.form}>
        <Field as="select" name="brand" className={styles.select}>
          <option value="">Choose a brand</option>
          {Array.isArray(brands) &&
            brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
        </Field>

        <Field as="select" name="rentalPrice" className={styles.select}>
          <option value="">Choose a price</option>
          {[30, 40, 50, 60, 70, 80].map((p) => (
            <option key={p} value={p}>
              To ${p}
            </option>
          ))}
        </Field>

        <Field
          type="number"
          name="minMileage"
          placeholder="From 3,000"
          className={styles.input}
        />
        <Field
          type="number"
          name="maxMileage"
          placeholder="To 5,500"
          className={styles.input}
        />

        <button type="submit" className={styles.button}>
          Search
        </button>
      </Form>
    </Formik>
  );
};

export default FilterPanel;
