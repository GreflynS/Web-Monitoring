import React, { useState } from "react";
import { Button, Card, Col, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { CardBody, CardHeader } from "reactstrap";
import { getAllCabang } from "stores/Cabang/function";
import { getAllClient } from "stores/Client/function";
import "./User.css";
import {
  createUser,
  getAllUser,
  updateUser,
  deleteUser,
} from "stores/User/function";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";

function User() {
  const dispatch = useDispatch();
  const storeUser = useSelector((state) => state.userReducer);
  const storeClient = useSelector((state) => state.clientReducer);
  const storeCabang = useSelector((state) => state.cabangReducer);

  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [openModalUser, setOpenModalUser] = useState(false);
  const [selectedCabang, setSelectedCabang] = useState(null);

  const [nama, setNama] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [idClient, setIdClient] = useState("");

  const [pilihClient, setPilihClient] = useState(null);
  const [pilihPerusahaan, setPilihPerusahaan] = useState(null);
  const [pilihCabang, setPilihCabang] = useState(null);
  const [pilihRole, setPilihRole] = useState(null);

  // const [listClient, setListClient] = useState(null);
  // const [listCabang, setListCabang] = useState(null);
  const [listCabang, setListCabang] = useState([]);
  const [listClient, setListClient] = useState([]);
  const [idCabang, setIdCabang] = useState("");
  // const [perusahaan, setPerusahaan] = useState([]);
  const [perusahaan, setPerusahaan] = useState("");
  const [listUser, setListUser] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [edit, setEdit] = useState(false);

  const roleOption = [
    { value: "super admin", label: "Super Admin" },
    { value: "admin", label: "Admin" },
    { value: "user", label: "User" },
  ];

  const submitTambahUser = () => {
    // if (!username || !nama || !role || !perusahaan) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Oops...",
    //     text: "All fields are required!",
    //   });
    //   return;
    // }
    if (!username || !nama || !role || !idCabang || !idClient) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All fields are required!",
      });
      return;
    }

    setIsSubmitting(true);

    // createUser({
    //   username,
    //   nama,
    //   role,
    //   idClient: perusahaan.value,
    //   perusahaan: perusahaan.label,
    // })
    createUser({
      username,
      nama,
      role,
      idCabang,
      idClient,
      perusahaan, // string label cabang
    })
      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "User added successfully!",
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            setOpenModalUser(false);
            resetForm();
            window.location.reload();
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed",
            text: "Failed to Add Data",
          });
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "An Error Occurred While Saving the Data",
        });
      })
      .finally(() => setIsSubmitting(false));
  };

  const editUser = () => {
    if (!username || !nama || !pilihRole || !pilihPerusahaan) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All Fields Are Required!",
      });
      return;
    }

    setIsSubmitting(true);

    updateUser(username, {
      nama,
      role: pilihRole.value,
      idClient: pilihPerusahaan.value,
      perusahaan: pilihPerusahaan.label,
    })
      .then((response) => {
        if (!response.error && response.status === 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "User updated successfully!",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            setEdit(false);
            resetForm();
            getAllUser(dispatch);
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed to update user",
          });
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "An Error Occurred While Saving the Data",
        });
      })
      .finally(() => setIsSubmitting(false));
  };

  const handleEditUser = (row) => {
    setUsername(row.username);
    setNama(row.nama);

    setPilihRole({ value: row.role, label: row.role });
    setRole(row.role);

    setPilihPerusahaan({ value: row.idClient, label: row.perusahaan });
    setPerusahaan({ value: row.idClient, label: row.perusahaan });

    setEdit(true);
    setOpenModalUser(true);
  };

  const resetForm = () => {
    setOpenModalUser(false);
    setNama("");
    setUsername("");
    setPilihCabang(null);
    setIdCabang("");
    setPilihClient(null);
    setIdClient("");
    setRole("");
    setPilihRole("");
    setPilihPerusahaan(null);
    setPerusahaan("");
  };

  const handleDeleteUser = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure you want to delete this data?",
      text: "Deleted data cannot be restored!",
      icon: "warning",
      showCancelButton: true,
      border: 0,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3478d1ff",
      confirmButtonText: "Delete",
    });

    if (result.isConfirmed) {
      setIsLoading(true);
      try {
        await deleteUser(id);
        Swal.fire({
          icon: "success",
          title: "Successfully deleted",
          showConfirmButton: false,
          timer: 1500,
        });
        getAllUser(dispatch);
      } catch {
        Swal.fire(
          "Gagal",
          "An error occurred while deleting the user",
          "error"
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  // React.useEffect(() => {
  //   setIsLoading(true);
  //   getAllUser(dispatch).finally(() => setIsLoading(false));
  // }, [dispatch]);

  React.useEffect(() => {
    setIsLoading(true);

    getAllCabang(dispatch);
    getAllClient(dispatch);
    getAllUser(dispatch).finally(() => setIsLoading(false));
  }, [dispatch]);

  React.useEffect(() => {
    const tmp =
      storeClient.listClient?.map((v) => ({
        value: v.idClient,
        label: v.namaClient,
      })) || [];

    setListClient(tmp);
  }, [storeClient.listClient]);

  React.useEffect(() => {
    const tmp =
      storeCabang.listCabang?.map((v) => ({
        ...v,
        value: v._id,
        label: `${v.namaCabang} - ${v.namaClient}`,
      })) || [];

    setListCabang(tmp);
  }, [storeCabang.listCabang]);

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "#3478d1ff",
        color: "white",
        fontWeight: "bold",
        // border: "1px solid #ddd",
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

  const columnsUser = [
    {
      name: "No",
      selector: (row, index) => (currentPage - 1) * perPage + index + 1,
      width: "60px",
    },
    { name: "Username", selector: (row) => row.username },
    { name: "Name", selector: (row) => row.nama },
    { name: "Role", selector: (row) => row.role || "-" },
    { name: "Company", selector: (row) => row.perusahaan || "-" },
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
          <button
            className="btn btn-sm"
            style={{
              backgroundColor: "#1E90FF", // warna biru soft custom
              color: "white",
              borderRadius: "6px",
              padding: "6px 12px",
              border: "none",
            }}
            onClick={() => handleEditUser(row)}
          >
            <i className="fa fa-info-circle" />
          </button>

          <button
            className="btn btn-sm"
            style={{
              backgroundColor: "#ff5c5c", // merah soft custom
              color: "white",
              borderRadius: "6px",
              padding: "6px 12px",
              border: "none",
            }}
            onClick={() => handleDeleteUser(row._id)}
          >
            <i className="fa fa-trash" />
          </button>
        </div>
      ),
      ignoreRowClick: true,
    },
  ];

  return (
    <>
      <Modal
        size="lg"
        show={openModalUser}
        backdrop="static"
        onHide={() => {
          resetForm();
          setEdit(false);
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
                {edit ? "Edit User" : "Tambah User"}
                <hr />
              </Card.Title>
            </Card.Header>

            <Card.Body>
              <Form>
                <Form.Group>
                  <label style={{ color: "black", fontWeight: "bold" }}>
                    Username
                  </label>
                  <Form.Control
                    placeholder="Enter Username"
                    disabled={edit}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />

                  <label style={{ color: "black", fontWeight: "bold" }}>
                    Name
                  </label>
                  <Form.Control
                    placeholder="Enter Name"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                  />

                  <label style={{ color: "black", fontWeight: "bold" }}>
                    Choose Role
                  </label>
                  <Select
                    value={pilihRole}
                    onChange={(v) => {
                      setPilihRole(v);
                      setRole(v.value);
                    }}
                    options={roleOption}
                    placeholder=" Choose Role"
                  />

                  <label style={{ color: "black", fontWeight: "bold" }}>
                    Choose Company
                  </label>
                  {/* <Select
                    value={pilihPerusahaan}
                    onChange={(v) => {
                      setPilihPerusahaan(v);
                      setPerusahaan(v);
                    }}
                    options={listClient}
                    placeholder="Choose Company"
                  /> */}
                  <Select
                    value={pilihCabang}
                    onChange={(v) => {
                      setPilihCabang(v);
                      setIdCabang(v._id || v.value);
                      setIdClient(v.idClient); // 🔥 PENTING
                      setPerusahaan(v.namaClient); // 🔥 STRING
                    }}
                    options={listCabang}
                    placeholder="Choose Branch"
                  />
                </Form.Group>
              </Form>
            </Card.Body>

            <Card.Footer>
              {edit ? (
                <Button
                  style={{ backgroundColor: "#3478d1ff", border: 0 }}
                  onClick={editUser}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Updating..." : "Update"}
                </Button>
              ) : (
                <Button
                  style={{ backgroundColor: "#3478d1ff", border: 0 }}
                  onClick={submitTambahUser}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              )}
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
            USER LIST
          </Card.Title>
        </Card.Header>
      </Card>

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
          onClick={() => setOpenModalUser(true)}
        >
          Add User
        </button>
      </div>

      <DataTable
        columns={columnsUser}
        data={storeUser.listUser || []}
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
    </>
  );
}

export default User;
