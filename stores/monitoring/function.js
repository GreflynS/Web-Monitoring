import { baseAxios, errorHandler } from '../index';
import Swal from 'sweetalert2';

export function getAreaNonGroup(dispatch) {
  baseAxios
    .get('/lokasi/getareaall', {
      headers: { token: localStorage.getItem('tokenjti') },
    })
    .then(async (respon) => {
      dispatch({
        type: 'SET_LISTAREA',
        data: respon.data,
      });
      Swal.close();
    })
    .catch(errorHandler);
}

export function daftarlokasi(data) {
  Swal.fire({
    title: 'Tunggu ...',
    didOpen() {
      Swal.showLoading();
    },
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
  });
  baseAxios
    .post('/lokasi/daftarlokasi', data, {
      headers: { token: localStorage.getItem('tokenjti') },
    })
    .then(async (respon) => {
      Swal.fire({
        title: respon.data.message,
        icon: 'success',
      }).then(() => {
        window.location.reload();
      });
    })
    .catch(errorHandler);
}

export function getShift(dispatch) {
  baseAxios
    .get('/laporan/getjamlaporan', {
      headers: { token: localStorage.getItem('tokenjti') },
    })
    .then(async (respon) => {
      dispatch({ type: 'SET_JAMLAPORAN', data: respon.data });
    })
    .catch(errorHandler);
}

export function daftarShift(data) {
  Swal.fire({
    title: 'Tunggu ...',
    didOpen() {
      Swal.showLoading();
    },
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
  });
  baseAxios
    .post('/laporan/daftarjamlaporan', data, {
      headers: { token: localStorage.getItem('tokenjti') },
    })
    .then(async (respon) => {
      Swal.fire({
        title: respon.data.message,
        icon: 'success',
      }).then(() => {
        window.location.reload();
      });
    })
    .catch(errorHandler);
}
export function deleteShift(data) {
  Swal.fire({
    title: 'Tunggu ...',
    didOpen() {
      Swal.showLoading();
    },
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
  });
  baseAxios
    .delete('/laporan/deletejamlaporan', {
      data: { _id: data },
      headers: { token: localStorage.getItem('tokenjti') },
    })
    .then(async (respon) => {
      Swal.fire({
        title: respon.data.message,
        icon: 'success',
      }).then(() => {
        window.location.reload();
      });
    })
    .catch(errorHandler);
}
export function deleteArea(data) {
  Swal.fire({
    title: 'Tunggu ...',
    didOpen() {
      Swal.showLoading();
    },
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
  });
  baseAxios
    .delete('/lokasi/deletearea', {
      data: { _id: data },
      headers: { token: localStorage.getItem('tokenjti') },
    })
    .then(async (respon) => {
      Swal.fire({
        title: respon.data.message,
        icon: 'success',
      }).then(() => {
        window.location.reload();
      });
    })
    .catch(errorHandler);
}

export function getLaporanRekap(dispatch, data) {
  baseAxios
    .get(
      `/laporan/historylaporan?tglmulai=${data.mulai}&tglselesai=${data.selesai}`,
      {
        headers: { token: localStorage.getItem('tokenjti') },
      }
    )
    .then(async (respon) => {
      dispatch({ type: 'SET_LISTLAPORAN', data: respon.data });
    })
    .catch(errorHandler);
}

export function laporkanSelesai(data) {
  baseAxios
    .post(`/laporan/laporanselesai`, data, {
      headers: { token: localStorage.getItem('tokenjti') },
    })
    .then(async (respon) => {
      Swal.fire({
        title: respon.data.message,
        icon: 'success',
      }).then(() => {
        window.location.reload();
      });
    })
    .catch(errorHandler);
}

export function getvisittotalhariini(dispatch) {
  baseAxios
    .get(`/laporan/getvisithariini`, {
      headers: { token: localStorage.getItem('tokenjti') },
    })
    .then(async (respon) => {
      dispatch({ type: 'SET_TOTALVISITHARIINI', data: respon.data });
    })
    .catch(errorHandler);
}

export function getvisitproblemtotal(dispatch) {
  baseAxios
    .get(`/laporan/getvisitproblem`, {
      headers: { token: localStorage.getItem('tokenjti') },
    })
    .then(async (respon) => {
      dispatch({ type: 'SET_TOTALPROBLEM', data: respon.data });
    })
    .catch(errorHandler);
}

export function getKpiMonitoring1(dispatch, data) {
  baseAxios
    .get(
      `/laporan/getkpimonitoring1?tglmulai=${data.mulai}&tglselesai=${data.selesai}`,
      {
        headers: { token: localStorage.getItem('tokenjti') },
      }
    )
    .then(async (respon) => {
      dispatch({ type: 'SET_KPI1', data: respon.data });
    })
    .catch(errorHandler);
}

export function getKpiMonitoring2(dispatch, data) {
  baseAxios
    .get(
      `/laporan/getkpimonitoring2?tglmulai=${data.mulai}&tglselesai=${data.selesai}`,
      {
        headers: { token: localStorage.getItem('tokenjti') },
      }
    )
    .then(async (respon) => {
      dispatch({ type: 'SET_KPI2', data: respon.data });
    })
    .catch(errorHandler);
}
