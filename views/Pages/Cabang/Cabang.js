import React, { useState, useEffect } from "react";
import { Button, Card, Col, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";
import Select from "react-select";
import { deleteCabang as deleteCabangAPI } from "stores/Cabang/function";
// import { deleteCabang } from "stores/Cabang/function";

import {
  createCabang,
  getAllCabang,
  updateCabang,
  deleteCabang,
} from "stores/Cabang/function";
import { getAllClient } from "stores/Client/function";

function Cabang() {
  const dispatch = useDispatch();
  const storeCabang = useSelector((state) => state.cabangReducer);
  const storeClient = useSelector((state) => state.clientReducer);

  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [openModalCabang, setOpenModalCabang] = useState(false);
  const [idCabang, setIdCabang] = useState("");
  const [namaCabang, setNamaCabang] = useState("");
  const [idClient, setIdClient] = useState("");
  const [listCabang, setListCabang] = useState([]);
  const [listClient, setListClient] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const resetForm = () => {
    setIdCabang("");
    setNamaCabang("");
    setIdClient(null);
    setEditingId(null);
  };

  useEffect(() => {
    setIsLoading(true);
    getAllClient(dispatch).finally(() => {
      getAllCabang(dispatch).finally(() => setIsLoading(false));
    });
  }, [dispatch]);

  useEffect(() => {
    if (storeClient.listClient) setListClient(storeClient.listClient);
  }, [storeClient.listClient]);

  useEffect(() => {
    if (storeCabang.listCabang && listClient.length > 0) {
      const tmp = storeCabang.listCabang.map((val, idx) => ({
        ...val,
        no: (currentPage - 1) * perPage + idx + 1,
        namaClient:
          listClient.find((c) => c.idClient === val.idClient)?.namaClient ||
          "-",
      }));
      setListCabang(tmp);
    }
  }, [storeCabang.listCabang, listClient, currentPage, perPage]);

  const submitCabang = async () => {
    if (!idCabang || !namaCabang || !idClient) {
      Swal.fire("Oops...", "All Fields Are Required!", "Error");
      return;
    }

    setIsLoading(true);
    try {
      if (editingId) {
        // Update
        const res = await updateCabang(editingId, { namaCabang, idClient });
        Swal.fire({
          icon: "success",
          title: "Branch update successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        // Cek duplicate
        const isDuplicate = listCabang.some((c) => c.idCabang === idCabang);
        if (isDuplicate) {
          Swal.fire("Failed", "Branch Code Already Exist!", "Error");
          setIsLoading(false);
          return;
        }
        await createCabang({ idCabang, namaCabang, idClient });
        Swal.fire({
          icon: "success",
          title: "Branch added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      resetForm();
      setOpenModalCabang(false);
      getAllCabang(dispatch);
    } catch (error) {
      console.error(error);
      Swal.fire("Failed", "An Error Occurred While Saving The Data.", "Error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (row) => {
    setEditingId(row.idCabang);
    setIdCabang(row.idCabang);
    setNamaCabang(row.namaCabang);
    setIdClient(row.idClient);
    setOpenModalCabang(true);
  };

  const handleDelete = (idCabang) => {
    Swal.fire({
      title: "Are you sure you want to delete this data?",
      text: "Deleted data cannot be restored!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3478d1ff",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteCabangAPI(idCabang);

          Swal.fire({
            icon: "success",
            title: "Successfully deleted",
            showConfirmButton: false,
            timer: 1500,
          });

          getAllCabang(dispatch);
        } catch (error) {
          console.error(error);
          Swal.fire(
            "Failed!",
            "An Error Occured While Deleting Data.",
            "Error"
          );
        }
      }
    });
  };

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "#3478d1ff",
        color: "white",
        fontWeight: "bold",
        border: " #ddd",
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

  // --- POTONGAN KODE DI BAGIAN COLUMNS (ACTIONS) ---
  const columns = [
    { name: "No", selector: (row) => row.no, width: "60px" },
    { name: "CEO Name", selector: (row) => row.namaClient },
    { name: "Branch Code", selector: (row) => row.idCabang },
    { name: "Branch Name", selector: (row) => row.namaCabang },
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
            onClick={() => handleEdit(row)}
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
            onClick={() => handleDelete(row.idCabang)}
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
        show={openModalCabang}
        onHide={() => {
          resetForm();
          setOpenModalCabang(false);
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
                {editingId ? "Edit Branch" : "Form Add Branch"}
                <hr />
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Form.Group>
                <label style={{ fontWeight: "bold" }}>Choose CEO</label>
                <Select
                  value={
                    listClient.find((c) => c.idClient === idClient)
                      ? {
                          value: idClient,
                          label: listClient.find((c) => c.idClient === idClient)
                            .namaClient,
                        }
                      : null
                  }
                  onChange={(selected) => setIdClient(selected?.value)}
                  options={listClient.map((c) => ({
                    value: c.idClient,
                    label: c.namaClient,
                  }))}
                  placeholder="Choose CEO"
                />
              </Form.Group>
              <Form.Group>
                <label style={{ fontWeight: "bold" }}>Branch Code</label>
                <Form.Control
                  type="text"
                  value={idCabang}
                  onChange={(e) => setIdCabang(e.target.value)}
                  disabled={!!editingId}
                />
              </Form.Group>
              <Form.Group>
                <label style={{ fontWeight: "bold" }}>Branch Name</label>
                <Form.Control
                  type="text"
                  value={namaCabang}
                  onChange={(e) => setNamaCabang(e.target.value)}
                />
              </Form.Group>
            </Card.Body>
            <Card.Footer>
              <Button
                style={{ backgroundColor: "#3478d1ff", border: 0 }}
                onClick={submitCabang}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : editingId ? "Update" : "Submit"}
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
            BRANCH LIST
          </Card.Title>
        </Card.Header>

        <hr />
        <Button
          style={{
            margin: 15,
            backgroundColor: "#3478d1ff",
            border: 0,
            fontWeight: "bold",
            padding: "10px 18px",
            display: "inline-flex",
            width: "fit-content",
            fontSize: "15px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            borderRadius: "5px",
          }}
          onClick={() => setOpenModalCabang(true)}
        >
          Add Branch
        </Button>

        <DataTable
          columns={columns}
          data={listCabang}
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
          onChangeRowsPerPage={(newPerPage, page) => {
            setPerPage(newPerPage);
            setCurrentPage(page);
          }}
        />
      </Card>
    </>
  );
}

export default Cabang;
