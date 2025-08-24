export const successResponse = (res, code, data) => {

    return res.status(code).json({
      status: 'success',
      code: code,
      data: data,
    });
    
};

  // export const successResponse = (res, code, data) => {
  //   const responseBody = JSON.stringify({
  //     status: 'success',
  //     code: code,
  //     data: data,
  //   });
  
  //   res.setHeader('Content-Type', 'application/json');
  //   res.setHeader('Content-Length', Buffer.byteLength(responseBody));
  
  //   res.status(code);
  //   return res.end(responseBody); // Use end() to send raw JSON string since we already stringified it
  // };
  
  export const errorResponse = (res, code, message) => {
    return res.status(code).json({
      status: 'fail',
      code: code,
      message: message,
    });
  };
  