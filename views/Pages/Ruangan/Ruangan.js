import React, { useState, useEffect } from "react";
import { Button, Card, Col, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";
import {
  createRuangan,
  getAllRuangan,
  deleteRuangan,
} from "stores/Ruangan/function";

function Ruangan() {
  const dispatch = useDispatch();
  const storeRuangan = useSelector((state) => state.ruanganReducer);

  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [openModalRuangan, setOpenModalRuangan] = useState(false);
  const [idRuangan, setIdRuangan] = useState("");
  const [namaRuangan, setNamaRuangan] = useState("");

  // AMBIL LIST
  useEffect(() => {
    setIsLoading(true);
    getAllRuangan(dispatch).finally(() => setIsLoading(false));
  }, []);

  // SUBMIT TAMBAH RUANGAN
  const submitTambahRuangan = () => {
    if (!idRuangan || !namaRuangan) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All fields are required!",
      });
      return;
    }

    createRuangan({
      idRuangan,
      namaRuangan,
    })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Room added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });

        setOpenModalRuangan(false);
        setIdRuangan("");
        setNamaRuangan("");

        getAllRuangan(dispatch);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "The Room ID is Already in Use",
        });
      });
  };

  // DELETE RUANGAN
  const handleDeleteRuangan = (id) => {
    Swal.fire({
      title: "Delete Room?",
      text: "Deleted data cannot be restored!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRuangan(id)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Successfully deleted",
              showConfirmButton: false,
              timer: 1500,
            });
            getAllRuangan(dispatch);
          })
          .catch(() =>
            Swal.fire("Failed!", "Unable to delete the room.", "error")
          );
      }
    });
  };

  // TABLE COLUMNS
  const columnsRuangan = [
    {
      name: "No",
      selector: (row, index) => (currentPage - 1) * perPage + index + 1,
      width: "60px",
    },
    {
      name: "Room ID",
      selector: (row) => row.idRuangan,
    },
    {
      name: "Room",
      selector: (row) => row.namaRuangan,
    },
    // {
    //   name: "Kode",
    //   selector: (row) => row.kodeRuangan || "-",
    // },
    {
      name: "Action",
      button: true,
      cell: (row) => (
        <button
          onClick={() => handleDeleteRuangan(row._id)}
          style={{
            backgroundColor: "#FF4C4C",
            border: 0,
            padding: "8px 12px",
            borderRadius: "8px",
            color: "white",
            cursor: "pointer",
          }}
        >
          <i className="fa fa-trash" />
        </button>
      ),
    },
  ];

  // STYLE TABLE
  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "#3478d1ff",
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        justifyContent: "center",
      },
    },
    cells: {
      style: {
        textAlign: "center",
        justifyContent: "center",
      },
    },
  };

  return (
    <>
      {/* MODAL */}
      <Modal
        size="lg"
        show={openModalRuangan}
        onHide={() => setOpenModalRuangan(false)}
      >
        <Modal.Header closeButton />
        <Col md="12" style={{ marginTop: 20 }}>
          <Card>
            <Card.Header>
              <Card.Title style={{ fontWeight: "bold" }}>Add Room</Card.Title>
            </Card.Header>

            <Card.Body>
              <Form>
                <Form.Group>
                  <label>Room ID</label>
                  <Form.Control
                    placeholder="Enter Room ID"
                    value={idRuangan}
                    onChange={(e) => setIdRuangan(e.target.value)}
                  />

                  <label style={{ marginTop: 10 }}>Room Name</label>
                  <Form.Control
                    placeholder="Enter Room Name"
                    value={namaRuangan}
                    onChange={(e) => setNamaRuangan(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Card.Body>

            <Card.Footer>
              <Button
                style={{ backgroundColor: "#3478d1ff", border: 0 }}
                onClick={submitTambahRuangan}
              >
                Submit
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Modal>

      {/* HEADER */}
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
            ROOM LIST
          </Card.Title>
        </Card.Header>

        <div>
          <Button
            style={{
              margin: 15,
              backgroundColor: "#3478d1ff",
              border: 0,
              fontWeight: "bold",
            }}
            onClick={() => setOpenModalRuangan(true)}
          >
            Add Room
          </Button>
        </div>

        {/* TABLE */}
        <DataTable
          columns={columnsRuangan}
          data={storeRuangan.listRuangan || []}
          progressPending={isLoading}
          progressComponent={
            <div style={{ textAlign: "center", padding: 20 }}>
              <i className="fa fa-spinner fa-spin fa-3x" />
              <p>Loading data...</p>
            </div>
          }
          customStyles={customStyles}
          pagination
          paginationPerPage={perPage}
          onChangePage={(p) => setCurrentPage(p)}
          onChangeRowsPerPage={(newSize, p) => {
            setPerPage(newSize);
            setCurrentPage(p);
          }}
        />
      </Card>
    </>
  );
}

export default Ruangan;
