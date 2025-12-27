import React, { useState, useEffect } from "react";
import { Button, Card, Col, Form, Modal, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";
import {
  createPatrol,
  getAllPatrol,
  deletePatrol,
} from "stores/Patrol/function";
import { getAllCabang } from "stores/Cabang/function";
import { getAllClient } from "stores/Client/function";
import { getAllRuangan } from "stores/Ruangan/function";
import { getAllShift } from "stores/Shift/function";
import Select from "react-select";
import moment from "moment";
import ReactPaginate from "react-paginate";
import "./Pagination.css";

function Patrol() {
  const dispatch = useDispatch();
  const storePatrol = useSelector((state) => state.patrolReducer);
  const storeCabang = useSelector((state) => state.cabangReducer);
  const storeClient = useSelector((state) => state.clientReducer);
  const storeRuangan = useSelector((state) => state.ruanganReducer);
  const storeShift = useSelector((state) => state.shiftReducer);

  const [isLoading, setIsLoading] = useState(false);
  const [openModalPatrol, setOpenModalPatrol] = useState(false);
  const [modalDetail, setModalDetail] = useState(false);

  // form fields
  const [kirimCabang, setKirimCabang] = useState(null);
  const [judul, setJudul] = useState("");
  const [tglPelaksana, setTglPelaksana] = useState("");
  const [idRuangan, setIdRuangan] = useState(null);
  const [idShift, setIdShift] = useState(null);
  const [deskripsi, setDeskripsi] = useState("");
  const [dokumentasi, setDokumentasi] = useState([]);
  const [previewDokumentasi, setPreviewDokumentasi] = useState([]);

  // lists
  const [listPatrol, setListPatrol] = useState([]);
  const [listCabang, setListCabang] = useState([]);
  const [listRuangan, setListRuangan] = useState([]);
  const [listShift, setListShift] = useState([]);

  // pagination & filters
  const [page, setPage] = useState(0);
  const [totalPerhalaman, setTotalPerhalaman] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [tglAwal, setTglAwal] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [tglAkhir, setTglAkhir] = useState(new Date());

  const [dataDetail, setDataDetail] = useState(null);
  const [resetKey, setResetKey] = useState(0);

  const [modalFoto, setModalFoto] = useState(false);
  const [fotoList, setFotoList] = useState([]);

  const options = [
    { value: 10, label: "10" },
    { value: 50, label: "50" },
    { value: 100, label: "100" },
  ];

  useEffect(() => {
    fetchData();
    getAllCabang(dispatch);
    getAllClient(dispatch);
    getAllRuangan(dispatch);
    getAllShift(dispatch);
  }, [dispatch, tglAwal, tglAkhir, page, totalPerhalaman]);

  const fetchData = () => {
    setIsLoading(true);
    getAllPatrol(dispatch, {
      dariTgl: tglAwal.getTime(),
      smpTgl: tglAkhir.getTime(),
      page: page + 1,
      limit: totalPerhalaman,
      search: searchText,
    }).finally(() => setIsLoading(false));
  };

  // normalize patrol list so table & modal always have expected fields
  // useEffect(() => {
  //   const tmp =
  //     storePatrol.dataPatrol &&
  //     storePatrol.dataPatrol.map((val, idx) => {
  //       // derive fields from possible shapes the backend returns
  //       const namaClient =
  //         val.namaClient ||
  //         val.client?.namaClient ||
  //         val.idClient?.namaClient ||
  //         val.idClient ||
  //         "-";
  //       const namaCabang =
  //         val.namaCabang ||
  //         val.cabang?.namaCabang ||
  //         val.idCabang?.namaCabang ||
  //         val.idCabang ||
  //         "-";
  //       const namaRuangan =
  //         val.namaRuangan ||
  //         val.ruangan?.namaRuangan ||
  //         val.idRuangan?.namaRuangan ||
  //         "-";
  //       const namaShift =
  //         val.namaShift ||
  //         val.shift?.namaShift ||
  //         val.idShift?.namaShift ||
  //         "-";
  //       const reporter =
  //         val.pelapor || val.reporter || val.dilaporkanOleh || "-";
  //       // tglPelaksanaan may come with different keys; prefer explicit schedule date, fall back to createdAt
  //       const tgl =
  //         val.tglPelaksanaan ||
  //         val.tglPelaksana ||
  //         val.tanggal ||
  //         val.createdAt ||
  //         val.updatedAt ||
  //         null;

  //       return {
  //         ...val,
  //         namaClient,
  //         namaCabang,
  //         namaRuangan,
  //         namaShift,
  //         reporter,
  //         tglPelaksanaan: tgl,
  //         action: (
  //           <div style={{ display: "flex", gap: 10 }}>
  //             <Button
  //               variant="info"
  //               onClick={() => {
  //                 setModalDetail(true);
  //                 // attach normalized fields to dataDetail for modal
  //                 setDataDetail({
  //                   ...val,
  //                   namaClient,
  //                   namaCabang,
  //                   namaRuangan,
  //                   namaShift,
  //                   pelapor: reporter,
  //                   tglPelaksanaan: tgl,
  //                 });
  //               }}
  //             >
  //               <i className="fa fa-info-circle fa-lg" />
  //             </Button>
  //             <Button
  //               variant="danger"
  //               onClick={() => handleDeletePatrol(val._id)}
  //             >
  //               <i className="fa fa-trash fa-lg" />
  //             </Button>
  //           </div>
  //         ),
  //       };
  //     });

  //   setListPatrol(tmp);
  // }, [storePatrol.dataPatrol]);

  // useEffect(() => {
  //   if (!storePatrol.dataPatrol) return;

  //   const tmp = storePatrol.dataPatrol.map((val) => {
  //     return {
  //       _id: val._id,

  //       // ✅ FIXED DISPLAY FIELDS
  //       // staff:
  //       //   val.namaClient ||
  //       //   val.client?.namaClient ||
  //       //   val.idClient?.namaClient ||
  //       //   "-",

  //       // branch:
  //       //   val.namaCabang ||
  //       //   val.cabang?.namaCabang ||
  //       //   val.idCabang?.namaCabang ||
  //       //   "-",

  //       ruangan:
  //         val.namaRuangan ||
  //         val.ruangan?.namaRuangan ||
  //         val.idRuangan?.namaRuangan ||
  //         "-",

  //       judul: val.judul || val.judul || "-",

  //       shift:
  //         val.namaShift ||
  //         val.shift?.namaShift ||
  //         val.idShift?.namaShift ||
  //         "-",

  //       reporter: val.pelapor || val.reporter || val.dilaporkanOleh || "-",

  //       tglPelaksanaan:
  //         val.tglPelaksanaan || val.tglPelaksana || val.createdAt || null,

  //       raw: val, // simpan data asli kalau perlu detail
  //     };
  //   });

  //   setListPatrol(tmp);
  // }, [storePatrol.dataPatrol]);

  useEffect(() => {
    if (!storePatrol.dataPatrol) return;

    const tmp = storePatrol.dataPatrol.map((val) => {
      return {
        _id: val._id,
        judul: val.judul || "-",
        ruangan:
          val.namaRuangan ||
          val.ruangan?.namaRuangan ||
          val.idRuangan?.namaRuangan ||
          "-",
        reporter: val.pelapor || val.reporter || val.dilaporkanOleh || "-",
        shift:
          val.namaShift ||
          val.shift?.namaShift ||
          val.idShift?.namaShift ||
          "-",
        tglPelaksanaan:
          val.tglPelaksanaan || val.tglPelaksana || val.createdAt || null,

        dokumentasi: val.dokumentasi || val.foto || [], // ✅ INI KUNCI
        raw: val,
      };
    });

    setListPatrol(tmp);
  }, [storePatrol.dataPatrol]);

  // build select options for cabang while preserving useful fields (idCabang, idClient, namaCabang, namaClient)
  useEffect(() => {
    const tmp =
      storeCabang.listCabang &&
      storeCabang.listCabang.map((val) => ({
        value: val._id,
        label: `${val.namaCabang} - ${val.namaClient}`,
        idCabang: val._id,
        idClient: val.idClient || val.idClient, // keep what's present
        namaCabang: val.namaCabang,
        namaClient: val.namaClient,
        ...val,
      }));
    setListCabang(tmp);
  }, [storeCabang.listCabang]);

  useEffect(() => {
    const tmp =
      storeRuangan.listRuangan &&
      storeRuangan.listRuangan.map((val) => ({
        value: val._id,
        label: val.namaRuangan || val.kodeRuangan || "Ruangan",
        ...val,
      }));
    setListRuangan(tmp);
  }, [storeRuangan.listRuangan]);

  useEffect(() => {
    const tmp =
      storeShift.listShift &&
      storeShift.listShift.map((val) => ({
        value: val._id,
        label: val.namaShift || val.kodeShift || val.jam,
        ...val,
      }));
    setListShift(tmp);
  }, [storeShift.listShift]);

  // handlers
  const handlePageSizeChange = (selectedOption) => {
    setTotalPerhalaman(selectedOption.value);
    setPage(0);
  };
  const handleFilter = () => fetchData();
  const handleClearSearch = () => {
    setSearchText("");
    fetchData();
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") fetchData();
  };

  const handleDokumentasiChange = (e) => {
    const files = Array.from(e.target.files);
    setDokumentasi([...dokumentasi, ...files]);

    const previews = files.map(
      (file) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => resolve(reader.result);
        })
    );
    Promise.all(previews).then((res) =>
      setPreviewDokumentasi([...previewDokumentasi, ...res])
    );
  };

  // const submitTambahPatrol = async () => {
  //   if (!judul || !kirimCabang || !tglPelaksana || !idRuangan || !idShift) {
  //     return Swal.fire({
  //       toast: false,
  //       position: "center",
  //       icon: "warning",
  //       title: "Semua field wajib diisi",
  //       showConfirmButton: false,
  //       timer: 2000,
  //       timerProgressBar: true,
  //       background: "#F7F7F7",
  //       color: "#333",
  //       iconColor: "#FF6B6B",
  //       customClass: {
  //         popup: "shadow-sm rounded-2xl p-3 w-auto",
  //         title: "fw-bold text-center",
  //       },
  //     });
  //   }

  //   const fd = new FormData();

  //   // robust getters for cabang/client fields (some backends return nested objects, some just ids)
  //   const idCabangVal =
  //     kirimCabang?.idCabang ||
  //     kirimCabang?._id ||
  //     kirimCabang?.value ||
  //     kirimCabang?.value;
  //   const idClientVal =
  //     kirimCabang?.idClient ||
  //     kirimCabang?.idClient ||
  //     kirimCabang?.client ||
  //     null;
  //   const namaCabangVal = kirimCabang?.namaCabang || kirimCabang?.label || "";
  //   const namaClientVal =
  //     kirimCabang?.namaClient || kirimCabang?.namaClient || "";

  //   fd.append("idCabang", idCabangVal);
  //   if (idClientVal) fd.append("idClient", idClientVal);
  //   fd.append("namaCabang", namaCabangVal);
  //   fd.append("namaClient", namaClientVal);

  //   fd.append("judul", judul);

  //   // ensure we send an ISO timestamp for the scheduled date
  //   // if user provided string from datetime-local, convert to ISO
  //   let isoTgl = null;
  //   try {
  //     isoTgl = new Date(tglPelaksana).toISOString();
  //   } catch (e) {
  //     isoTgl = new Date().toISOString();
  //   }
  //   fd.append("tglPelaksanaan", isoTgl);

  //   fd.append("idRuangan", idRuangan?._id || idRuangan?.value || idRuangan);
  //   fd.append("idShift", idShift?._id || idShift?.value || idShift);
  //   fd.append("status", "done");
  //   fd.append("deskripsi", deskripsi);
  //   dokumentasi.forEach((file) => fd.append("dokumentasi", file));

  //   try {
  //     const response = await createPatrol(fd);
  //     if (response && response.status === 200) {
  //       Swal.fire({
  //         position: "center",
  //         icon: "success",
  //         title: response.data.message || "Berhasil Ditambahkan",
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
  //       setOpenModalPatrol(false);
  //       fetchData();
  //       // reset form
  //       setKirimCabang(null);
  //       setJudul("");
  //       setTglPelaksana("");
  //       setIdRuangan(null);
  //       setIdShift(null);
  //       setDeskripsi("");
  //       setDokumentasi([]);
  //       setPreviewDokumentasi([]);
  //       setResetKey((r) => r + 1);
  //     } else {
  //       Swal.fire(
  //         "Failed",
  //         response?.data?.message || "Gagal menambahkan",
  //         "error"
  //       );
  //     }
  //   } catch (err) {
  //     Swal.fire("Error", err.response?.data?.message || err.message, "error");
  //   }
  // };

  const submitTambahPatrol = async () => {
    if (!judul || !tglPelaksana || !idRuangan || !idShift) {
      return Swal.fire("Warning", "Semua field wajib diisi", "warning");
    }

    const payload = {
      judul,
      // idCabang: kirimCabang.value,
      idRuangan: idRuangan.value,
      idShift: idShift.value,
      tglPelaksanaan: new Date(tglPelaksana).toISOString(),
      deskripsi,
      foto: previewDokumentasi, // kirim URL/base64
    };

    try {
      const res = await createPatrol(payload);
      Swal.fire({
        icon: "success",
        title: "Patrol added successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      setOpenModalPatrol(false);
      fetchData();
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || err.message, "error");
    }
  };

  const handleDeletePatrol = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this data?",
      text: "Deleted data cannot be restored!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3478d1ff",
      confirmButtonText: "Delete!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deletePatrol(id)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Successfully deleted",
              showConfirmButton: false,
              timer: 1500,
            });
            fetchData();
          })
          .catch((err) => Swal.fire("Failed!", err.message, "error"));
      }
    });
  };

  const handleDeleteFile = (index) => {
    setDokumentasi(dokumentasi.filter((_, i) => i !== index));
    setPreviewDokumentasi(previewDokumentasi.filter((_, i) => i !== index));
  };

  // const columnsPatrol = [
  //   {
  //     name: "No",
  //     cell: (row, index) => (
  //       <span>{index + (storePatrol.paginatePatrol?.pagingCounter || 1)}</span>
  //     ),
  //     sortable: false,
  //     width: "60px",
  //   },
  //   { name: "Staff", wrap: true, selector: (row) => row.namaClient || "-" },
  //   { name: "Branch", wrap: true, selector: (row) => row.namaCabang || "-" },
  //   { name: "Room", wrap: true, selector: (row) => row.namaRuangan || "-" },
  //   // {
  //   //   name: "Title",
  //   //   wrap: true,
  //   //   selector: (row) => row.judul || row.title || "-",
  //   // },
  //   {
  //     name: "Title",
  //     selector: (row) => row.judul ?? "-",
  //   },
  //   {
  //     name: "Reporter",
  //     wrap: true,
  //     selector: (row) =>
  //       row.pelapor || row.reporter || row.dilaporkanOleh || "-",
  //   },
  //   // {
  //   //   name: "Date & Time",
  //   //   selector: (row) => {
  //   //     const d = row.tglPelaksanaan || row.createdAt || row.updatedAt || null;
  //   //     return d ? moment(d).format("DD-MM-YYYY, HH:mm") : "-";
  //   //   },
  //   // },
  //   {
  //     name: "Date & Time",
  //     selector: (row) =>
  //       row.tglPelaksanaan
  //         ? moment(row.tglPelaksanaan).format("DD-MM-YYYY HH:mm")
  //         : "-",
  //   },
  //   { name: "Shift", selector: (row) => row.namaShift || "-" },
  //   {
  //     name: "Action",
  //     cell: (row) => (
  //       <div
  //         style={{
  //           display: "flex",
  //           justifyContent: "center", // ⬅️ TENGAH
  //           alignItems: "center",
  //           gap: "12px", // ⬅️ Biar ada jarak antar tombol
  //           width: "100%",
  //         }}
  //       >
  //         {/* <button
  //           className="btn btn-sm"
  //           style={{
  //             backgroundColor: "#1E90FF", // warna biru soft custom
  //             color: "white",
  //             borderRadius: "6px",
  //             padding: "6px 12px",
  //             border: "none",
  //           }}
  //           onClick={() => handleEditUser(row)}
  //         >
  //           <i className="fa fa-info-circle" />
  //         </button> */}

  //         <button
  //           className="btn btn-sm"
  //           style={{
  //             backgroundColor: "#ff5c5c", // merah soft custom
  //             color: "white",
  //             borderRadius: "6px",
  //             padding: "6px 12px",
  //             border: "none",
  //           }}
  //           onClick={() => handleDeletePatrol(row._id)}
  //         >
  //           <i className="fa fa-trash" />
  //         </button>
  //       </div>
  //     ),
  //   },
  // ];

  // TABLE
  const columnsPatrol = [
    {
      name: "No",
      cell: (row, index) => index + 1,
      width: "60px",
    },
    {
      name: "Title",
      selector: (row) => row.judul,
    },
    {
      name: "Room",
      selector: (row) => row.ruangan,
    },
    {
      name: "Shift",
      selector: (row) => row.shift,
    },
    {
      name: "Date",
      selector: (row) => moment(row.tglPelaksanaan).format("DD-MM-YYYY HH:mm"),
    },
    {
      name: "Action",
      cell: (row) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            size="sm"
            variant="primary"
            onClick={() => {
              setModalDetail(true);
              setDataDetail({
                ...row.raw, // ✅ data backend lengkap
                ruangan: row.ruangan, // ✅ string siap tampil
                shift: row.shift, // ✅ string siap tampil
                reporter: row.reporter,
                tglPelaksanaan: row.tglPelaksanaan,
                dokumentasi: row.dokumentasi,
              });
            }}
          >
            <i className="fa fa-info-circle" />
          </Button>

          <Button
            size="sm"
            variant="danger"
            onClick={() => handleDeletePatrol(row._id)}
          >
            <i className="fa fa-trash" />
          </Button>
        </div>
      ),
      center: true,
    },
  ];

  const CustomLoader = () => {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
          width: "100%",
        }}
      >
        <div className="spinner-border" role="status" />
        <p style={{ marginTop: 10, color: "#425A6B", fontWeight: "bold" }}>
          Loading Patrol Data...
        </p>
      </div>
    );
  };

  return (
    <>
      {/* MODAL ADD PATROL */}
      <Modal
        show={openModalPatrol}
        onHide={() => setOpenModalPatrol(false)}
        size="lg"
      >
        <Modal.Header closeButton />
        <Col md="12" style={{ marginTop: 20 }}>
          <Card className="stacked-form">
            <Card.Header>
              <Card.Title
                as="h4"
                style={{ color: "black", fontWeight: "bold" }}
              >
                Add Patrol
                <hr />
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group>
                  <label style={{ fontWeight: "bold" }}>Title</label>
                  <Form.Control
                    placeholder="Enter Tittle"
                    type="text"
                    value={judul}
                    onChange={(e) => setJudul(e.target.value)}
                  />
                </Form.Group>

                {/* <Form.Group>
                  <label style={{ fontWeight: "bold" }}>Branch</label>
                  <Select
                    value={kirimCabang}
                    onChange={(v) => setKirimCabang(v)}
                    options={[
                      { value: "", label: "Pilih Cabang", isDisabled: true },
                      ...(listCabang || []),
                    ]}
                    placeholder="Pilih Cabang"
                  />
                </Form.Group> */}

                <Form.Group>
                  <label style={{ fontWeight: "bold" }}>Room</label>
                  <Select
                    value={idRuangan}
                    onChange={(v) => setIdRuangan(v)}
                    options={[
                      { value: "", label: "Pilih Ruangan", isDisabled: true },
                      ...(listRuangan || []),
                    ]}
                    placeholder="Choose Room"
                  />
                </Form.Group>

                <Form.Group>
                  <label style={{ fontWeight: "bold" }}>Shift</label>
                  <Select
                    value={idShift}
                    onChange={(v) => setIdShift(v)}
                    options={[
                      { value: "", label: "Pilih Shift", isDisabled: true },
                      ...(listShift || []),
                    ]}
                  />
                </Form.Group>

                <Form.Group>
                  <label style={{ fontWeight: "bold" }}>Time & Date</label>
                  <Form.Control
                    type="datetime-local"
                    value={tglPelaksana || ""}
                    onChange={(e) => setTglPelaksana(e.target.value)}
                  />
                </Form.Group>

                <Form.Group>
                  <label style={{ fontWeight: "bold" }}>Description</label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter Description"
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                  />
                </Form.Group>

                <Form.Group>
                  {dokumentasi.length < 5 && (
                    <label
                      className="label-input-file btn btn-primary text-white mb-4"
                      htmlFor="patrolImages"
                    >
                      Add Photo
                      <input
                        type="file"
                        id="patrolImages"
                        onClick={(e) => (e.target.value = "")}
                        onChange={handleDokumentasiChange}
                        style={{ display: "none" }}
                        accept="image/*"
                        multiple
                      />
                    </label>
                  )}

                  {previewDokumentasi.map((val, index) => (
                    <div className="d-flex align-items-start mb-2" key={index}>
                      <Image
                        src={val}
                        thumbnail
                        style={{
                          width: 120,
                          height: 80,
                          objectFit: "cover",
                          marginRight: 8,
                        }}
                      />
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <small>{dokumentasi[index]?.name}</small>
                        <Button
                          variant="danger"
                          size="sm"
                          className="btn-link remove text-danger mt-1"
                          onClick={() => handleDeleteFile(index)}
                        >
                          <i className="fa fa-times" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </Form.Group>
              </Form>
            </Card.Body>
            <Card.Footer>
              <Button
                className="btn-fill"
                onClick={submitTambahPatrol}
                style={{ backgroundColor: "#3478d1ff", border: 0 }}
              >
                Submit
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Modal>

      {/* MAIN CARD */}
      <Card style={{ border: 0 }}>
        <Card.Header>
          <Card.Title
            style={{
              fontWeight: "700",
              // fontFamily: "Poppins, sans-serif",
              fontSize: "35px",
              // textTransform: "uppercase",
              letterSpacing: "1px",
              color: "#3478d1ff", // biru elegant
              textShadow: "0 1px 3px rgba(0,0,0,0.15)",
              margin: 0,
            }}
          >
            PATROL
          </Card.Title>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", gap: 15, alignItems: "center" }}>
              <Form.Group>
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  value={moment(tglAwal).format("YYYY-MM-DD")}
                  onChange={(e) => setTglAwal(new Date(e.target.value))}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  value={moment(tglAkhir).format("YYYY-MM-DD")}
                  onChange={(e) => setTglAkhir(new Date(e.target.value))}
                />
              </Form.Group>
            </div>

            <div>
              <Form.Group>
                <Form.Label>Search</Form.Label>
                <div className="d-flex">
                  <Form.Control
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search"
                  />
                  <Button
                    variant="primary"
                    onClick={fetchData}
                    style={{ marginLeft: 5 }}
                  >
                    <i className="fas fa-search" />
                  </Button>
                  <Button
                    variant="light"
                    onClick={handleClearSearch}
                    style={{ marginLeft: 5 }}
                  >
                    <i className="fas fa-times" />
                  </Button>
                </div>
              </Form.Group>
            </div>
          </div>
        </Card.Header>

        <hr />

        <div>
          <Button
            className="btn-wd mr-1"
            style={{
              backgroundColor: "#3478d1ff",
              border: 0,
              fontWeight: "bold",
            }}
            onClick={() => {
              setOpenModalPatrol(true);

              // ✅ SET DEFAULT DATE & TIME (SAMA DENGAN TRAINING)
              setTglPelaksana(moment().format("YYYY-MM-DDTHH:mm"));
            }}
          >
            Add Patrol
          </Button>
        </div>

        <DataTable
          columns={columnsPatrol}
          data={listPatrol}
          progressPending={isLoading}
          progressComponent={
            //Loading Laman
            <div style={{ textAlign: "center", padding: "20px" }}>
              <i className="fa fa-spinner fa-spin fa-3x" />
              <p>Loading...</p>
            </div>
          }
          pagination
          customStyles={{
            rows: { style: { minHeight: "72px" } },
            headCells: {
              style: {
                paddingLeft: "8px",
                paddingRight: "8px",
                backgroundColor: "#3478d1ff",
                fontWeight: "bold",
                color: "white",
                // border: "1px solid #ddd",
                textAlign: "center",
                justifyContent: "center",
              },
            },
            cells: {
              style: {
                paddingLeft: "8px",
                paddingRight: "8px",
                border: "1px solid #ddd",
                textAlign: "center",
                justifyContent: "center",
              },
            },
          }}
        />
      </Card>

      {/* MODAL DETAIL PATROL */}
      <Modal size="lg" show={modalDetail} onHide={() => setModalDetail(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Detail Patrol</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {dataDetail && (
            <>
              <p>
                <strong>Title:</strong> {dataDetail.judul || "-"}
              </p>
              <p>
                <strong>Room:</strong> {dataDetail.ruangan || "-"}
              </p>
              <p>
                <strong>Shift:</strong> {dataDetail.shift || "-"}
              </p>
              <p>
                <strong>Reporter:</strong>{" "}
                {dataDetail.pelapor || dataDetail.reporter || "-"}
              </p>
              <p>
                <strong>Date & Time:</strong>{" "}
                {dataDetail.tglPelaksanaan
                  ? moment(dataDetail.tglPelaksanaan).format(
                      "DD-MM-YYYY, HH:mm"
                    )
                  : "-"}
              </p>
              <p>
                <strong>Description:</strong> {dataDetail.deskripsi || "-"}
              </p>
              {dataDetail.dokumentasi && dataDetail.dokumentasi.length > 0 && (
                <div className="d-flex gap-2 flex-wrap">
                  {dataDetail.dokumentasi.map((img, idx) => (
                    <Image
                      key={idx}
                      src={img}
                      thumbnail
                      style={{ width: 120, height: 80, objectFit: "cover" }}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalDetail(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Patrol;
