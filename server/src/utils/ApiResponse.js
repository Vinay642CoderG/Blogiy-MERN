class ApiResponse {
  constructor(statusCode, message = null, data = null) {
    this.success = statusCode < 400;

    Object.defineProperty(this, "statusCode", {
      value: statusCode,
      writable: true,
      configurable: true,
      enumerable: false,
    });

    if (message) this.message = message;
    if (data !== null) this.data = data;
  }
}

export default ApiResponse;
