interface formErrorProps {
  touched: any;
  errors: any;
}

const FormError = ({ touched, errors }: formErrorProps) => {
  return (
    <div>
      {touched && errors ? (
        <div>
          <p className="error-align-left" style={{ color: "red" }}>
            {errors}
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default FormError;
