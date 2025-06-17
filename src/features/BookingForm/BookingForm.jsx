import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import s from "./BookingForm.module.css";

const BookingForm = () => {
  const initialValues = {
    name: "",
    email: "",
    date: "",
    comment: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().min(2, "Too short").required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    date: Yup.date()
      .nullable()
      .transform((curr, orig) => (orig === "" ? null : curr))
      .min(new Date(), "Date cannot be in the past"),
    comment: Yup.string().max(500, "Too long"),
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    alert("✅ Car successfully booked!");
    resetForm();
  };

  return (
    <div className={s.bookingForm}>
      <h3 className={s.bookingTitle}>Book your car now</h3>
      <p className={s.bookingTxt}>
        Stay connected! We are always ready to help you.
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className={s.inputsContainer}>
          <div>
            <Field name="name" placeholder="Name*" className={s.inputField} />
            <ErrorMessage name="name" component="div" className={s.error} />
          </div>

          <div>
            <Field
              name="email"
              type="email"
              placeholder="Email*"
              className={s.inputField}
            />
            <ErrorMessage name="email" component="div" className={s.error} />
          </div>

          <div>
            <Field name="date" type="date" className={s.inputField} />
            <ErrorMessage name="date" component="div" className={s.error} />
          </div>

          <div>
            <Field
              as="textarea"
              name="comment"
              placeholder="Comment"
              className={s.inputField}
            />
            <ErrorMessage name="comment" component="div" className={s.error} />
          </div>
          </div>

          <button type="submit" className={s.sendBtn}>Send</button>
        </Form>
      </Formik>
    </div>
  );
};

export default BookingForm;
