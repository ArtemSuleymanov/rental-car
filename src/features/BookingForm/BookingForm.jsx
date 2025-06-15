import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const BookingForm = () => {
  const initialValues = {
    name: '',
    email: '',
    date: '',
    comment: ''
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Too short')
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Email is required'),
    date: Yup.date()
      .nullable()
      .transform((curr, orig) => (orig === '' ? null : curr))
      .min(new Date(), 'Date cannot be in the past'),
    comment: Yup.string()
      .max(500, 'Too long')
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log(values); // тут може бути axios POST
    alert('✅ Car successfully booked!');
    resetForm();
  };

  return (
    <div>
      <h3>Book your car now</h3>
      <p>Stay connected! We are always ready to help you.</p>
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <Field name="name" placeholder="Name*" />
            <ErrorMessage name="name" component="div" style={{ color: 'red' }} />
          </div>

          <div>
            <Field name="email" type="email" placeholder="Email*" />
            <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
          </div>

          <div>
            <Field name="date" type="date" />
            <ErrorMessage name="date" component="div" style={{ color: 'red' }} />
          </div>

          <div>
            <Field as="textarea" name="comment" placeholder="Comment" />
            <ErrorMessage name="comment" component="div" style={{ color: 'red' }} />
          </div>

          <button type="submit">Send</button>
        </Form>
      </Formik>
    </div>
  );
};

export default BookingForm;
