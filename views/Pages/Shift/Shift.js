import React, { useState, useEffect } from "react";
import { Button, Card, Col, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";
import { createShift, getAllShift, deleteShift } from "stores/Shift/function";
import { getAllCabang } from "stores/Cabang/function";

function Shift() {
  const dispatch = useDispatch();
  const storeShift = useSelector((state) => state.shiftReducer);
  const storeCabang = useSelector((state) => state.cabangReducer);

  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [openModalShift, setOpenModalShift] = useState(false);

  const [namaShift, setNamaShift] = useState("");
  const [idCabang, setIdCabang] = useState("");
  const [pilihCabang, setPilihCabang] = useState(null);

  const [durasi, setDurasi] = useState(0);
  const [patroli, setPatroli] = useState(0);
  const [jam, setJam] = useState(0);
  const [status, setStatus] = useState(true);

  const [listShift, setListShift] = useState([]);

  // FETCH DATA
  useEffect(() => {
    setIsLoading(true);
    getAllShift(dispatch);
    getAllCabang(dispatch).finally(() => setIsLoading(false));
  }, [dispatch]);

  // SET LIST SHIFT
  useEffect(() => {
    let tmp =
      storeShift.listShift?.map((val) => ({
        ...val,
        action: <></>,
      })) || [];
    setListShift(tmp);
  }, [storeShift.listShift]);

  // CABANG DROPDOWN OPTIONS
  const cabangOptions =
    storeCabang.listCabang?.map((item) => ({
      value: item._id,
      label: item.namaCabang,
    })) || [];

  // SUBMIT SHIFT
  const submitTambahShift = () => {
    if (!namaShift || !idCabang || !durasi || !patroli || !jam) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All fields are required!",
      });
      return;
    }

    createShift({
      namaShift,
      idCabang,
      durasi,
      patroli,
      jam,
      status,
    }).then((response) => {
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Shift added successfully!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          setOpenModalShift(false);
          setNamaShift("");
          setPilihCabang(null);
          setIdCabang("");
          setDurasi(0);
          setPatroli(0);
          setJam(0);
          setStatus(true);
          getAllShift(dispatch);
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: response.data.message,
        });
      }
    });
  };

  // DELETE SHIFT
  const handleDeleteShift = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this data?",
      text: "Deleted data cannot be restored!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3478d1ff",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteShift(id)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Successfully deleted",
              showConfirmButton: false,
              timer: 1500,
            });
            getAllShift(dispatch);
          })
          .catch(() => {
            Swal.fire("Gagal!", "Tidak dapat menghapus shift", "error");
          });
      }
    });
  };

  // TABLE COLUMNS
  const columnsShift = [
    {
      name: "No",
      selector: (row, index) => (currentPage - 1) * perPage + index + 1,
      width: "60px",
    },
    { name: "Shift", selector: (row) => row.namaShift, center: true },
    { name: "Duration", selector: (row) => row.durasi, center: true },
    { name: "Start Time", selector: (row) => row.patroli, center: true },
    { name: "Finish Time", selector: (row) => row.jam, center: true },
    {
      name: "Status",
      selector: (row) => (row.status ? "Active" : "Tidak Aktif"),
      center: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <button
          onClick={() => handleDeleteShift(row._id)}
          style={{
            backgroundColor: "#FF4C4C",
            border: "none",
            borderRadius: "10px",
            padding: "8px 12px",
            color: "#fff",
            cursor: "pointer",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <i className="fa fa-trash"></i>
        </button>
      ),
      width: "120px",
      center: true,
    },
  ];

  return (
    <>
      {/* MODAL ADD SHIFT */}
      <Modal
        size="lg"
        show={openModalShift}
        onHide={() => setOpenModalShift(false)}
      >
        <Modal.Header closeButton></Modal.Header>
        <Col md="12" style={{ marginTop: 20 }}>
          <Card className="stacked-form">
            <Card.Header>
              <Card.Title
                as="h4"
                style={{ color: "black", fontWeight: "bold" }}
              >
                Form Add Shift
                <hr />
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group>
                  <label style={{ fontWeight: "bold" }}>Title</label>
                  <Form.Control
                    type="text"
                    placeholder="Input Title"
                    onChange={(e) => setNamaShift(e.target.value)}
                  />
                </Form.Group>

                <Form.Group>
                  <label style={{ fontWeight: "bold" }}>Choose Branch</label>
                  <Select
                    className="react-select primary"
                    classNamePrefix="react-select"
                    value={pilihCabang}
                    onChange={(opt) => {
                      setPilihCabang(opt);
                      setIdCabang(opt.value);
                    }}
                    options={cabangOptions}
                    placeholder="Choose Branch"
                  />
                </Form.Group>

                <Form.Group>
                  <label style={{ fontWeight: "bold" }}>Duration</label>
                  <Form.Control
                    type="number"
                    min="0"
                    max="24"
                    placeholder="Input Duration"
                    value={durasi}
                    onChange={(e) => {
                      const val = e.target.value;
                      setDurasi(val === "" ? "" : Math.max(0, Number(val)));
                    }}
                  />
                </Form.Group>

                <Form.Group>
                  <label style={{ fontWeight: "bold" }}>Start Time</label>
                  <Form.Control
                    type="number"
                    min="0"
                    max="24"
                    placeholder="Input Start Time"
                    value={patroli}
                    onChange={(e) => {
                      const val = e.target.value;
                      setPatroli(val === "" ? "" : Math.max(0, Number(val)));
                    }}
                  />
                </Form.Group>

                <Form.Group>
                  <label style={{ fontWeight: "bold" }}>Finish Time</label>
                  <Form.Control
                    type="number"
                    min="0"
                    max="24"
                    placeholder="Input End Time"
                    value={jam}
                    onChange={(e) => {
                      const val = e.target.value;
                      setJam(val === "" ? "" : Math.max(0, Number(val)));
                    }}
                  />
                </Form.Group>
              </Form>
            </Card.Body>

            <Card.Footer>
              <Button
                style={{ backgroundColor: "#3478d1ff", border: 0 }}
                onClick={submitTambahShift}
              >
                Submit
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Modal>

      {/* MAIN TABLE */}
      <Card style={{ border: 0 }}>
        <Card.Header>
          <Card.Title
            style={{
              fontWeight: 700,
              fontSize: "30px",
              letterSpacing: "1px",
              color: "#3478d1ff",
            }}
          >
            SHIFT LIST
          </Card.Title>
        </Card.Header>

        <hr />

        <Card.Header className="d-flex justify-content-start">
          <Button
            style={{
              backgroundColor: "#3478d1ff",
              border: 0,
              fontWeight: "bold",
              borderRadius: "8px",
              padding: "8px 16px",
              width: "auto",
            }}
            onClick={() => setOpenModalShift(true)}
          >
            Add Shift
          </Button>
        </Card.Header>

        <DataTable
          columns={columnsShift}
          data={listShift}
          progressPending={isLoading}
          progressComponent={
            <div style={{ textAlign: "center", padding: "20px" }}>
              <i className="fa fa-spinner fa-spin fa-3x" />
              <p>Loading data...</p>
            </div>
          }
          customStyles={{
            rows: { style: { minHeight: "72px" } },
            headCells: {
              style: {
                backgroundColor: "#3478d1ff",
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
              },
            },
            cells: {
              style: {
                border: "1px solid #ddd",
                textAlign: "center",
              },
            },
          }}
          pagination
          paginationPerPage={perPage}
          onChangePage={(page) => setCurrentPage(page)}
          onChangeRowsPerPage={(newPerPage, page) => {
            setPerPage(newPerPage);
            setCurrentPage(page);
          }}
        />
      </Card>
    </>
  );
}

export default Shift;
