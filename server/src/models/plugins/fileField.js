const buildUploadUrl = (filename, req) => {
  return `${process.env.APP_HOST}/uploads/${filename}`;
};

export default function fileField(schema, options) {
  const fileFields = options.fields || [];

  // Virtuals
  fileFields.forEach((field) => {
    const virtualName = `_${field}`;
    schema.virtual(virtualName).get(function () {
      const value = this[field];
      if (!value) return null;

      if (Array.isArray(value)) {
        return value.map((f) => ({
          filename: f,
          url: buildUploadUrl(f),
        }));
      }

      return {
        filename: value,
        url: buildUploadUrl(value),
      };
    });
  });

  schema.set("toJSON", { virtuals: true });
  schema.set("toObject", { virtuals: true });

  // Optional method for controller modifications
  schema.methods.getFileObjects = function () {
    const result = {};
    fileFields.forEach((field) => {
      const value = this[field];
      if (!value) return;

      const virtualName = `_${field}`;

      if (Array.isArray(value)) {
        result[virtualName] = value.map((f) => ({
          filename: f,
          url: buildUploadUrl(f),
        }));
      } else {
        result[virtualName] = {
          filename: value,
          url: buildUploadUrl(value),
        };
      }
    });
    return result;
  };
}
