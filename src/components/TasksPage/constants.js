const layout = {
  labelCol: {
    span: 8,
    offset: 2
  },
  wrapperCol: {
    span: 8,
    offset: 2
  },
};
const validateMessages = {
  required: 'Your input is required!',
};
const config = {
  rules: [
    {
      type: 'object',
      required: true,
      message: 'Please select time!',
    },
  ],
};
const levels = { basic: 'Basic Scope', advanced: 'Advanced Scope', extra: 'Extra Scope', fines: 'Fines' };

export { layout, validateMessages, config, levels };