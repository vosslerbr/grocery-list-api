const successResMsg = (message: string, data: any) => {
  return {
    success: true,
    message,
    data,
  };
};

const errorResMsg = (message: string, err: any) => {
  return {
    success: false,
    message,
    err,
  };
};

export { successResMsg, errorResMsg };
