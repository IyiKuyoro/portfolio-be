export default class GeneralValidators {
  static validateProps(obj, ...props) {
    const errors = [];

    props.forEach((property) => {
      if (!obj[property] || obj[property].trim() === '') {
        errors.push(`${property} not provided`);
      }
    });

    return errors;
  }
}
