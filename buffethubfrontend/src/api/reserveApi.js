import jwtAxios from "../util/jwtUtil";

//서버 주소
export const API_SERVER_HOST = "http://localhost:8080";

const prefix = `${API_SERVER_HOST}/api/reserve`;

export const getOne = async (rsNb) => {
  const res = await jwtAxios.get(`${prefix}/${rsNb}`)
  return res.data;
}

export const postRegist = async (reserveObj) => {
  const res = await jwtAxios.post(`${prefix}/`, reserveObj);
  return res.data;
};

export const getList = async (pageParam, userId) => {
  const { page, size } = pageParam;
  const res = await jwtAxios.get(`${prefix}/list`, {
    params: { page, size, userId }, // userId를 파라미터로 추가
  });
  return res.data;
};


export const deleteOne = async (rsNb) => {
  const res = await jwtAxios.delete(`${prefix}/${rsNb}`);
  return res.data;
};

export const putOne = async (reserve) => {
  const res = await jwtAxios.put(`${prefix}/${reserve.rsNb}`, reserve);
  return res.data;
};
