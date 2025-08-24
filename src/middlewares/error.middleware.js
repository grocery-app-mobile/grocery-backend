const errorHandler = (err, req, res, next) => {
   return res.status(500).json({ message: 'Something went wrong', error: err.message });
};
  
export default errorHandler;
  