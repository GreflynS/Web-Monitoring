import React, { useState, useEffect } from "react";
import { Button, Card, Col, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";
import {
  createClient,
  getAllClient,
  updateClient,
  deleteClient,
} from "stores/Client/function";
import { baseAxios } from "stores/index"; // Untuk delete

function Client() {
  const dispatch = useDispatch();
  const storeClient = useSelector((state) => state.clientReducer);

  const [isLoading, setIsLoading] = useState(false);
  const [openModalClient, setOpenModalClient] = useState(false);
  const [namaClient, setNamaClient] = useState("");
  const [idClient, setIdClient] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [listClient, setListClient] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  // Buka modal tambah
  const openTambah = () => {
    resetForm();
    setEditingId(null);
    setOpenModalClient(true);
  };

  // Buka modal edit
  const openEdit = (client) => {
    setEditingId(client.idClient);
    setIdClient(client.idClient);
    setNamaClient(client.namaClient);
    setOpenModalClient(true);
  };

  // Submit tambah
  const submitTambahClient = () => {
    if (namaClient === "" || idClient === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All fields are required!",
      });
      return;
    }

    const isDuplicate = listClient.some(
      (client) => client.idClient === idClient
    );
    if (isDuplicate) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Kode Client sudah ada!",
      });
      return;
    }

    createClient({ idClient, namaClient }).then((response) => {
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Staff added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        setOpenModalClient(false);
        resetForm();
        getAllClient(dispatch);
      }
    });
  };

  // Submit edit
  const submitEditClient = () => {
    if (namaClient === "") {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Nama Client wajib diisi!",
      });
      return;
    }

    updateClient(editingId, { namaClient }).then((response) => {
      if (response?.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Staff updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        setOpenModalClient(false);
        resetForm();
        getAllClient(dispatch);
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to update staff",
          text: response?.data?.message || "Terjadi kesalahan",
        });
      }
    });
  };

  // Delete client
  const deleteClient = (idClient) => {
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
        baseAxios
          .delete(`client/deleteclient?idClient=${idClient}`, {
            headers: { token: localStorage.getItem("token") },
          })
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: "Successfully deleted",
              showConfirmButton: false,
              timer: 1500,
            });
            getAllClient(dispatch);
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Gagal dihapus",
              text: err.response?.data?.message || "Terjadi kesalahan",
            });
          });
      }
    });
  };

  const resetForm = () => {
    setNamaClient("");
    setIdClient("");
  };

  useEffect(() => {
    setIsLoading(true);
    getAllClient(dispatch).finally(() => setIsLoading(false));
  }, [dispatch]);

  useEffect(() => {
    if (storeClient.listClient) {
      const tmp = storeClient.listClient.map((val, index) => ({
        ...val,
        no: (currentPage - 1) * perPage + index + 1,
      }));
      setListClient(tmp);
    }
  }, [storeClient.listClient, currentPage, perPage]);

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "#3478d1ff",
        color: "white",
        fontWeight: "bold",
        border: "1px solid #ddd",
        textAlign: "center",
        justifyContent: "center",
      },
    },
    cells: {
      style: {
        border: "1px solid #ddd",
        textAlign: "center",
        justifyContent: "center",
      },
    },
  };

  const columnsClient = [
    { name: "No", selector: (row) => row.no, width: "60px" },
    { name: "ID Staff", selector: (row) => row.idClient },
    { name: "Staff Name", selector: (row) => row.namaClient },
    {
      name: "Actions",
      cell: (row) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center", // ⬅️ TENGAH
            alignItems: "center",
            gap: "12px", // ⬅️ Biar ada jarak antar tombol
            width: "100%",
          }}
        >
          {/* EDIT BUTTON */}
          <button
            onClick={() => openEdit(row)}
            style={{
              backgroundColor: "#1E90FF",
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
            <i className="fa fa-info-circle"></i>
          </button>

          {/* DELETE BUTTON */}
          <button
            onClick={() => deleteClient(row.idClient)}
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
        </div>
      ),
    },
  ];

  return (
    <>
      <Modal
        size="lg"
        show={openModalClient}
        onHide={() => {
          resetForm();
          setOpenModalClient(false);
        }}
      >
        <Modal.Header closeButton />
        <Col md="12" style={{ marginTop: 20 }}>
          <Card className="stacked-form">
            <Card.Header>
              <Card.Title
                as="h4"
                style={{ color: "black", fontWeight: "bold" }}
              >
                {editingId ? "Edit Staff" : "Add Staff"}
                <hr />
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Form.Group>
                <label style={{ color: "black", fontWeight: "bold" }}>
                  ID Staff
                </label>
                <Form.Control
                  type="text"
                  disabled={editingId}
                  value={idClient}
                  onChange={(e) => setIdClient(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <label style={{ color: "black", fontWeight: "bold" }}>
                  Staff Name
                </label>
                <Form.Control
                  type="text"
                  value={namaClient}
                  onChange={(e) => setNamaClient(e.target.value)}
                />
              </Form.Group>
            </Card.Body>
            <Card.Footer>
              <Button
                onClick={editingId ? submitEditClient : submitTambahClient}
                style={{ backgroundColor: "#3478d1ff", border: 0 }}
              >
                {editingId ? "Update" : "Submit"}
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
            STAFF LIST
          </Card.Title>
        </Card.Header>
        <hr />
        <div>
          <button
            style={{
              margin: 15,
              backgroundColor: "#3478d1ff",
              border: 0,
              fontWeight: "bold",
              padding: "10px 18px",
              fontSize: "15px",
              display: "inline-flex",
              width: "fit-content",
              alignItems: "center",
              gap: "8px",
              color: "#fff",
              borderRadius: "5px",
            }}
            onClick={() => setOpenModalClient(true)}
          >
            Add Staff
          </button>
        </div>
        <DataTable
          columns={columnsClient}
          data={listClient}
          progressPending={isLoading}
          progressComponent={
            <div style={{ textAlign: "center", padding: "20px" }}>
              <i className="fa fa-spinner fa-spin fa-3x" />
              <p>Loading data...</p>
            </div>
          }
          customStyles={customStyles}
          pagination
          paginationPerPage={perPage}
          onChangePage={setCurrentPage}
          onChangeRowsPerPage={(newPerPage) => {
            setPerPage(newPerPage);
            setCurrentPage(1);
          }}
        />
      </Card>
    </>
  );
}

export default Client;
