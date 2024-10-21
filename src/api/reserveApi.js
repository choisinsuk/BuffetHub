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

// 전체 리스트를 가져오는 메서드
export const getList = async (pageParam, userId) => {
  const { page, size } = pageParam;
  const res = await jwtAxios.get(`${prefix}/list`, {
    params: { page, size, userId }, // userId를 파라미터로 추가
  });
  return res.data;
};

// 진행중 예약을 가져오는 메서드
export const getFutureReservations = async (pageParam, userId) => {
  const { page, size } = pageParam;
  const res = await jwtAxios.get(`${prefix}/list`, {
    params: { page, size, userId, paid: false }, 
  });
  
  return res.data;
};

// 결제 완료된 예약 리스트를 가져오는 메서드
export const getPaidReservations = async (pageParam) => {
  const { page, size } = pageParam;

  const res = await jwtAxios.get(`${prefix}/list`, {
      params: { page, size, paid: true }, // userId를 제외하고 paid 파라미터만 전달
  });
  
  return res.data;
};
  
// 삭제 메서드
export const deleteOne = async (rsNb) => {
  const res = await jwtAxios.delete(`${prefix}/${rsNb}`);
  return res.data;
};

// 수정 메서드
export const putOne = async (reserve) => {
  const res = await jwtAxios.put(`${prefix}/${reserve.rsNb}`, reserve);
  return res.data;
};

// 결제 상태 업데이트 메서드
export const putPaymentStatus = async (rsNb) => {
  const res = await jwtAxios.put(`${prefix}/${rsNb}/payment-status`, {
    rsPaymentCompleteYn: true, // 결제 완료 상태
  });
  return res.data;
};