import React, { useState, useEffect } from "react";
import { Button, Card, Col, Form, Modal, Row, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";
import { createTraining, getAllTraining } from "stores/Training/function";
import { getAllCabang } from "stores/Cabang/function";
import { getAllClient } from "stores/Client/function";
import Select from "react-select";
import moment from "moment";
import ReactPaginate from "react-paginate";
import "./Pagination.css";
import { deleteTraining } from "stores/Training/function";

function Training() {
  const dispatch = useDispatch();
  const storeTraining = useSelector((state) => state.trainingReducer);
  const user = useSelector((state) => state.userReducer);
  const storeClient = useSelector((state) => state.clientReducer);
  const storeCabang = useSelector((state) => state.cabangReducer);
  const [isLoading, setIsLoading] = useState(false);
  const [modalFoto, setModalFoto] = useState(false);
  const [fotoList, setFotoList] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [openModalTraining, setOpenModalTraining] = useState(false);
  const [idCabang, setIdCabang] = useState("");
  const [idClient, setIdClient] = useState("");
  const [namaCabang, setNamaCabang] = useState("");
  const [namaClient, setNamaClient] = useState("");
  const [judul, setJudul] = useState("");
  const [tglPelaksana, setTglPelaksana] = useState("");
  const [status, setStatus] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [dokumentasi, setDokumentasi] = useState([]);
  const [previewDokumentasi, setPreviewDokumentasi] = useState([]);
  const [listTraining, setListTraining] = useState([]);
  const [pilihClient, setPilihClient] = useState(null);
  const [pilihCabang, setPilihCabang] = useState(null);
  const [listCabang, setListCabang] = useState([]);
  // const [kirimCabang, setKirimCabang] = useState({
  //   value: "",
  //   label: "Pilih Cabang",
  //   isDisabled: true,
  // });
  const [kirimCabang, setKirimCabang] = useState(null);

  const [totalPerhalaman, setTotalPerhalaman] = useState(10);
  const [page, setPage] = useState(0);
  const handlePageSizeChange = (selectedOption) => {
    setTotalPerhalaman(selectedOption.value);
    setPage(0);
  };
  const [tglAkhir, setTglAkhir] = useState(new Date());

  const [tglAwal, setTglAwal] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const [modalDetail, setModalDetail] = useState(false);
  const [dataDetail, setDataDetail] = useState([]);
  // const submitTambahTraining = () => {
  //   if (!judul || !kirimCabang?._id || !tglPelaksana) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Oops...",
  //       text: "Semua field wajib diisi!",
  //     });
  //   } else {
  //     let fd = new FormData();
  //     // fd.append("idCabang", kirimCabang.idCabang);
  //     // fd.append("idClient", kirimCabang.idClient);
  //     fd.append("idCabang", kirimCabang._id);
  //     fd.append("idClient", kirimCabang.idClient || "");
  //     fd.append("namaCabang", kirimCabang.namaCabang);
  //     fd.append("namaClient", kirimCabang.namaClient);
  //     fd.append("judul", judul);
  //     fd.append("tglPelaksanaan", new Date(tglPelaksana).toISOString());
  //     fd.append("deskripsi", deskripsi);
  //     dokumentasi.map((val) => {
  //       fd.append("dokumentasi", val);
  //     });
  //     createTraining(fd).then((response) => {
  //       if (response.status === 200) {
  //         window.location.reload();
  //         Swal.fire({
  //           position: "center",
  //           icon: "success",
  //           text: "Berhasil Ditambahkan",
  //           title: response.data.message,
  //           showConfirmButton: false,
  //           timer: 1500,
  //         }).then(() => {
  //           setOpenModalTraining(false);
  //         });
  //       }
  //     });
  //   }
  // };

  const submitTambahTraining = async () => {
    console.log("DEBUG SUBMIT:", {
      judul,
      kirimCabang,
      tglPelaksana,
      deskripsi,
      dokumentasi,
    });

    if (!judul || !kirimCabang || !kirimCabang._id || !tglPelaksana) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Semua field wajib diisi!",
      });
      return;
    }

    try {
      const fd = new FormData();
      fd.append("idCabang", kirimCabang._id);
      fd.append("idClient", kirimCabang.idClient);
      fd.append("namaCabang", kirimCabang.namaCabang);
      fd.append("namaClient", kirimCabang.namaClient);
      fd.append("judul", judul);
      fd.append("tglPelaksanaan", new Date(tglPelaksana).toISOString());
      fd.append("deskripsi", deskripsi || "");

      dokumentasi.forEach((file) => {
        fd.append("dokumentasi", file);
      });

      const response = await createTraining(fd);

      if (response?.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Training added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });

        setOpenModalTraining(false);
        setJudul("");
        setDeskripsi("");
        setTglPelaksana("");
        setDokumentasi([]);
        setKirimCabang(null);

        handleFilterChange();
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Terjadi kesalahan saat menyimpan data",
      });
    }
  };

  const [searchText, setSearchText] = useState("");
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleFilterChange();
    }
  };

  const handleClearSearch = () => {
    setSearchText("");
    handleFilterChange();
  };

  const handleFilterChange = () => {
    setIsLoading(true);
    getAllTraining(dispatch, {
      dariTgl: tglAwal.getTime(),
      smpTgl: tglAkhir.getTime(),
      page: page + 1,
      limit: totalPerhalaman,
      search: searchText,
    })
      .then(() => setIsLoading(false))
      .catch(() => {
        setIsLoading(false);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Terjadi kesalahan saat memuat data.",
        });
      });
  };

  const handleTglAwalChange = (e) => {
    setTglAwal(new Date(e.target.value));
  };

  const handleTglAkhirChange = (e) => {
    setTglAkhir(new Date(e.target.value));
  };

  const handleDeleteTraining = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this data?",
      text: "Deleted data cannot be restored!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3478d1ff",
      confirmButtonText: "Delete!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteTraining(id);

          Swal.fire({
            icon: "success",
            title: "Successfully deleted",
            showConfirmButton: false,
            timer: 1500,
          });

          handleFilterChange(); // reload data tanpa reload page
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Gagal",
            text: "Terjadi kesalahan saat menghapus data",
          });
        }
      }
    });
  };

  const handleDokumentasiChange = (e) => {
    const files = Array.from(e.target.files);
    setDokumentasi(files);

    const previews = files.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
      });
    });
    Promise.all(previews).then(setPreviewDokumentasi);
  };

  useEffect(() => {
    setIsLoading(true);
    getAllTraining(dispatch, {
      dariTgl: tglAwal.getTime(),
      smpTgl: tglAkhir.getTime(),
      page: page + 1,
      limit: totalPerhalaman,
      search: searchText,
    }).finally(() => setIsLoading(false));
    getAllCabang(dispatch);
    getAllClient(dispatch);
  }, [dispatch, tglAwal, tglAkhir, page, totalPerhalaman]);

  useEffect(() => {
    let tmp =
      storeTraining.dataTraining &&
      storeTraining.dataTraining.map((val) => {
        return {
          ...val,
          action: (
            <div
              style={{ display: "flex", gap: "10px", justifyContent: "center" }}
            >
              <Button
                variant="primary"
                onClick={() => {
                  setModalDetail(true);
                  setDataDetail(val);
                }}
              >
                <i className="fa fa-info-circle fa-lg" />
              </Button>

              <Button
                variant="danger"
                onClick={() => handleDeleteTraining(val._id)}
              >
                <i className="fa fa-trash fa-lg" />
              </Button>
            </div>
          ),
        };
      });
    setListTraining(tmp);
  }, [storeTraining.dataTraining]);

  useEffect(() => {
    let tmp =
      storeCabang.listCabang &&
      storeCabang.listCabang.map((val) => {
        return {
          ...val,
          value: val._id,
          label: `${val.namaCabang} - ${val.namaClient}`,
        };
      });
    setListCabang(tmp);
  }, [storeCabang.listCabang]);

  const columnsTraining = [
    {
      name: "No",
      selector: (row, index) =>
        index + storeTraining.paginateTraining.pagingCounter,
      sortable: true,
      width: "60px",
    },
    { name: "Staff", wrap: true, selector: (row) => row.namaClient || "-" },
    { name: "Branch", wrap: true, selector: (row) => row.namaCabang || "-" },
    { name: "Title", wrap: true, selector: (row) => row.judul },
    { name: "Reporter", wrap: true, selector: (row) => row.dilaporkanOleh },
    {
      name: "Date & Time",
      wrap: true,
      selector: (row) => moment(row.tglPelaksanaan).format("DD-MM-YYYY, HH:mm"),
    },
    { name: "Status", wrap: true, selector: (row) => row.status },
    // {
    //   name: "Aksi",
    //   cell: (row) => (
    //     <div
    //       style={{
    //         display: "flex",
    //         justifyContent: "center", // ⬅️ TENGAH
    //         alignItems: "center",
    //         gap: "10px", // ⬅️ Biar ada jarak antar tombol
    //         width: "100%",
    //       }}
    //     >
    //       {/* BUTTON DETAIL */}
    //       <button
    //         className="btn btn-sm"
    //         style={{
    //           backgroundColor: "#5aa0e0", // biru soft
    //           color: "white",
    //           borderRadius: "6px",
    //           padding: "6px 12px",
    //           border: "none",
    //         }}
    //         onClick={() => {
    //           setModalDetail(true);
    //           setDataDetail(row);
    //         }}
    //       >
    //         <i className="fa fa-info-circle" />
    //       </button>

    //       {/* BUTTON DELETE */}
    //       <button
    //         className="btn btn-sm"
    //         style={{
    //           backgroundColor: "#ff5c5c",
    //           color: "white",
    //           borderRadius: "6px",
    //           padding: "6px 12px",
    //           border: "none",
    //         }}
    //         onClick={() => handleDeleteTraining(row._id)}
    //       >
    //         <i className="fa fa-trash" />
    //       </button>
    //     </div>
    //   ),
    //   ignoreRowClick: true,
    //   allowOverflow: true,
    //   button: true,
    // },
    {
      name: "Aksi",
      cell: (row) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            width: "100%",
          }}
        >
          {/* DETAIL */}
          <button
            className="btn btn-sm"
            style={{
              backgroundColor: "#5aa0e0",
              color: "white",
              borderRadius: "6px",
              border: "none",
            }}
            onClick={() => {
              setModalDetail(true);
              setDataDetail(row);
            }}
          >
            <i className="fa fa-info-circle" />
          </button>

          {/* VIEW PHOTO */}
          {/* <button
            className="btn btn-sm"
            style={{
              backgroundColor: "#28a745",
              color: "white",
              borderRadius: "6px",
              border: "none",
            }}
            onClick={() => {
              setFotoList(row.dokumentasi || []);
              setModalFoto(true);
            }}
            disabled={!row.dokumentasi || row.dokumentasi.length === 0}
          >
            <i className="fa fa-image" />
          </button> */}

          {/* DELETE */}
          <button
            className="btn btn-sm"
            style={{
              backgroundColor: "#ff5c5c",
              color: "white",
              borderRadius: "6px",
              border: "none",
            }}
            onClick={() => handleDeleteTraining(row._id)}
          >
            <i className="fa fa-trash" />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const resetForm = () => {
    setKirimCabang(null);
  };

  const options = [
    { value: 10, label: "10" },
    { value: 50, label: "50" },
    { value: 100, label: "100" },
  ];

  return (
    <>
      <Modal
        show={openModalTraining}
        onHide={() => {
          setOpenModalTraining(false);
          setTglPelaksana("");
          setKirimCabang(null);
        }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Col md="12" style={{ marginTop: 20 }}>
          <Card className="stacked-form">
            <Card.Header>
              <Card.Title
                as="h4"
                style={{ color: "black", fontWeight: "bold" }}
              >
                Add Training
                <hr />
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group>
                  <label style={{ color: "black", fontWeight: "bold" }}>
                    Title
                  </label>
                  <Form.Control
                    placeholder="Enter Tittle"
                    type="text"
                    onChange={(e) => setJudul(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <label style={{ color: "black", fontWeight: "bold" }}>
                    Select Branch
                  </label>
                  {/* <Select
                    className="react-select primary"
                    classNamePrefix="react-select"
                    name="Pilih Cabang"
                    value={kirimCabang}
                    onChange={(value) => {
                      setKirimCabang(value);
                    }}
                    options={[
                      {
                        value: "",
                        label: "Pilih Cabang",
                        isDisabled: true,
                      },
                      ...listCabang,
                    ]}
                    placeholder="Pilih Cabang"
                  /> */}
                  <Select
                    className="react-select primary"
                    classNamePrefix="react-select"
                    value={kirimCabang}
                    onChange={(value) => setKirimCabang(value)}
                    options={listCabang}
                    placeholder="Choose Branch"
                  />
                </Form.Group>
                <Form.Group>
                  <label style={{ color: "black", fontWeight: "bold" }}>
                    Date & Time
                  </label>
                  <Form.Control
                    type="datetime-local"
                    value={tglPelaksana || ""}
                    onChange={(e) => setTglPelaksana(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <label style={{ color: "black", fontWeight: "bold" }}>
                    Description
                  </label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter Description"
                    onChange={(e) => setDeskripsi(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  {dokumentasi.length < 5 ? (
                    <label
                      className="label-input-file btn btn-danger text-white mb-4"
                      htmlFor="import2"
                    >
                      Add Photo
                      <input
                        type="file"
                        id="import2"
                        onClick={(e) => {
                          e.target.value = "";
                        }}
                        onChange={(e) => {
                          setDokumentasi([
                            ...dokumentasi,
                            ...Array.from(e.target.files),
                          ]);
                        }}
                        style={{ display: "none" }}
                        accept="image/*"
                        multiple
                      />
                    </label>
                  ) : null}
                  {dokumentasi.map((val, index) => {
                    return (
                      <div className="d-flex align-items-start" key={index}>
                        <p>{val.name}</p>
                        <Button
                          onClick={() => {
                            setDokumentasi([
                              ...dokumentasi.slice(0, index),
                              ...dokumentasi.slice(
                                index + 1,
                                dokumentasi.length
                              ),
                            ]);
                          }}
                          variant="danger"
                          size="sm"
                          className="btn-link remove text-danger"
                        >
                          <i className="fa fa-times" />
                        </Button>
                      </div>
                    );
                  })}
                </Form.Group>
              </Form>
            </Card.Body>
            <Card.Footer>
              <Button
                type="button"
                className="btn-fill"
                onClick={submitTambahTraining}
                style={{ backgroundColor: "#3478d1ff", border: 0 }}
              >
                Submit
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Modal>

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
            TRAINING
          </Card.Title>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
              <Form.Group>
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  value={moment(tglAwal).format("YYYY-MM-DD")}
                  onChange={handleTglAwalChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  value={moment(tglAkhir).format("YYYY-MM-DD")}
                  onChange={handleTglAkhirChange}
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
                    onChange={handleSearch}
                    onKeyDown={handleKeyDown}
                    placeholder="Search"
                  />
                  <Button
                    variant="primary"
                    onClick={handleFilterChange}
                    style={{ marginLeft: "5px" }}
                  >
                    <i className="fas fa-search"></i>
                  </Button>
                  <Button
                    variant="light"
                    onClick={handleClearSearch}
                    style={{ marginLeft: "5px" }}
                  >
                    <i className="fas fa-times"></i>
                  </Button>
                </div>
              </Form.Group>
            </div>
          </div>
        </Card.Header>
        <hr />
        <div>
          <Button
            onClick={() => {
              setOpenModalTraining(true);
              setJudul("");
              setDeskripsi("");
              setDokumentasi([]);
              setKirimCabang(null);

              // ✅ SET DEFAULT DATE & TIME
              setTglPelaksana(moment().format("YYYY-MM-DDTHH:mm"));
            }}
          >
            Add Training
          </Button>
        </div>
        <div>
          <DataTable
            columns={columnsTraining}
            data={listTraining}
            progressPending={isLoading}
            progressComponent={
              <div style={{ textAlign: "center", padding: "20px" }}>
                <i className="fa fa-spinner fa-spin fa-3x" />
                <p>Loading...</p>
              </div>
            }
            customStyles={{
              rows: {
                style: {
                  minHeight: "72px",
                },
              },
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
            paginationPerPage={totalPerhalaman}
          />
          <div style={{ marginTop: 35 }}>
            <Row style={{ display: "flex", justifyContent: "space-between" }}>
              <Col>
                <Row style={{ alignItems: "center" }}>
                  <div
                    style={{ paddingRight: 0, marginLeft: 20, marginRight: 10 }}
                  >
                    <label style={{ fontWeight: "bold" }}>Rows per page</label>
                  </div>
                  <Col sm="3" style={{ paddingLeft: 0 }}>
                    <Select
                      className="react-select primary"
                      classNamePrefix="react-select"
                      name="Pilih Client"
                      value={options.find(
                        (option) => option.value === totalPerhalaman
                      )}
                      onChange={handlePageSizeChange}
                      options={options}
                      placeholder="Rows per page"
                    />
                  </Col>
                </Row>
              </Col>
              <Col>
                <ReactPaginate
                  forcePage={page}
                  containerClassName="paginations justify-content-end"
                  previousClassName="pages-items-containers"
                  previousLinkClassName="pages-links-labels"
                  nextClassName="pages-items-containers"
                  nextLinkClassName="pages-links-labels"
                  breakClassName="pages-items-containers"
                  pageCount={storeTraining.paginateTraining.totalPages}
                  pageRangeDisplayed={3}
                  marginPagesDisplayed={1}
                  pageLinkClassName="pages-links-labels"
                  pageClassName="pages-items-containers"
                  activeClassName="activees"
                  activeLinkClassName="activess"
                  nextLabel=" > "
                  previousLabel=" < "
                  initialPage={page}
                  disableInitialCallback={true}
                  onPageChange={(val) => setPage(val.selected)}
                />
              </Col>
            </Row>
          </div>
        </div>
      </Card>

      {/* MODAL DETAIL */}
      <Modal size="lg" show={modalDetail} onHide={() => setModalDetail(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Training Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm="5">Client</Col>
            <Col sm="0.5">:</Col>
            <Col sm="6">{dataDetail.namaClient}</Col>
          </Row>
          <Row>
            <Col sm="5">Branch</Col>
            <Col sm="0.5">:</Col>
            <Col sm="6">{dataDetail.namaCabang}</Col>
          </Row>
          <Row>
            <Col sm="5">Title</Col>
            <Col sm="0.5">:</Col>
            <Col sm="6">{dataDetail.judul}</Col>
          </Row>
          <Row>
            <Col sm="5">Reporter</Col>
            <Col sm="0.5">:</Col>
            <Col sm="6">{dataDetail.dilaporkanOleh}</Col>
          </Row>
          <Row>
            <Col sm="5">Implementation Date</Col>
            <Col sm="0.5">:</Col>
            <Col sm="6">
              {moment(dataDetail.tglPelaksanaan).format("DD-MM-YYYY, HH:mm")}
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Row>
                <Col sm="5">Description</Col>
                <Col sm="0.5">:</Col>
                <Col sm="6">{dataDetail.deskripsi}</Col>
              </Row>
              <Row>
                <Col sm="5">Documentation</Col>
                <Col sm="0.5">:</Col>
              </Row>
              <Row>
                {!dataDetail.dokumentasi ||
                dataDetail.dokumentasi.length === 0 ? (
                  <Col sm="12" style={{ textAlign: "center" }}>
                    Documentation not available
                  </Col>
                ) : (
                  dataDetail.dokumentasi.map((val, index) => (
                    <Col sm="4" key={index}>
                      <Image
                        src={val}
                        style={{ width: 200, height: 250, margin: 20 }}
                        thumbnail
                      />
                    </Col>
                  ))
                )}
              </Row>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}

export default Training;
