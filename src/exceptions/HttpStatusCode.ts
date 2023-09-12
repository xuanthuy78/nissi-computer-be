const HttpStatusCode = {
  OK: 200,
  INSERT_OK: 201,
  BAD_REQUEST: 400, // nguoi dung nhap thieu
  NOT_FOUND: 404, //ko tim thay
  INTERNAL_SERVER_ERROR: 500, //nam o catch, ko tiem thay trong bang
};

export default HttpStatusCode;
